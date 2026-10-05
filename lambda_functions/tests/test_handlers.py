import json

import pytest
from botocore.exceptions import ClientError

from src import identify, read_s3, upload_shape, write_s3, zonal_stats


class FakeS3:
    def __init__(self):
        self.objects = {}
        self.calls = []

    def put_object(self, **kwargs):
        self.calls.append(("put", kwargs))
        key = (kwargs["Bucket"], kwargs["Key"])
        if kwargs.get("IfNoneMatch") == "*" and key in self.objects:
            raise ClientError({"Error": {"Code": "PreconditionFailed", "Message": "exists"}}, "PutObject")
        self.objects[key] = kwargs["Body"]
        return {}

    def get_object(self, Bucket, Key):
        self.calls.append(("get", {"Bucket": Bucket, "Key": Key}))
        if (Bucket, Key) not in self.objects:
            raise ClientError({"Error": {"Code": "NoSuchKey", "Message": "missing"}}, "GetObject")
        body = self.objects[(Bucket, Key)]
        return {"Body": type("B", (), {"read": lambda self_: body})()}


@pytest.fixture(autouse=True)
def env(monkeypatch, fixture_dir):
    monkeypatch.setenv("CONFIG_PATH", str(fixture_dir / "config.yml"))
    monkeypatch.setenv("STAGE", "test")
    monkeypatch.setenv("SHARE_PREFIX", "dev/")


@pytest.fixture
def s3(monkeypatch):
    fake = FakeS3()
    for module in (upload_shape, read_s3, write_s3):
        monkeypatch.setattr(module.boto3, "client", lambda name, fake=fake: fake)
    return fake


def get_event(params):
    return {"queryStringParameters": params, "requestContext": {"http": {"method": "GET"}}}


def post_event(body, params=None, base64=False):
    return {"queryStringParameters": params or {}, "body": body, "isBase64Encoded": base64,
            "requestContext": {"http": {"method": "POST"}}}


def body_of(response):
    return json.loads(response["body"])


def feature_collection(geometry):
    return {"type": "FeatureCollection", "features": [{"type": "Feature", "properties": {"areaName": "Area 1"}, "geometry": geometry}]}


def test_identify_returns_stringified_values(point_inside):
    lng, lat = point_inside
    response = identify.handler(get_event({"region": "demo", "lng": str(lng), "lat": str(lat)}), None)
    assert response["statusCode"] == 200
    assert "Access-Control-Allow-Origin" not in response["headers"]
    assert body_of(response) == {"index_a": "2", "vlm": "-1"}


def test_identify_nodata_is_stringified_raw(point_nodata_row):
    lng, lat = point_nodata_row
    assert body_of(identify.handler(get_event({"region": "demo", "lng": lng, "lat": lat}), None)) == {"index_a": "255", "vlm": "3"}


def test_identify_outside_raster_is_nan(point_outside):
    lng, lat = point_outside
    assert body_of(identify.handler(get_event({"region": "demo", "lng": lng, "lat": lat}), None)) == {"index_a": "NaN", "vlm": "NaN"}


@pytest.mark.parametrize("params", [
    {"lng": "1", "lat": "1"}, {"region": "nowhere", "lng": "1", "lat": "1"},
    {"region": "demo", "lng": "x", "lat": "1"}, {"region": "demo", "lng": "1"}, {"region": "demo", "lng": "200", "lat": "1"},
])
def test_identify_validation(params):
    response = identify.handler(get_event(params), None)
    assert response["statusCode"] == 400
    assert "message" in body_of(response)


def test_identify_missing_query_string():
    assert identify.handler({"queryStringParameters": None}, None)["statusCode"] == 400


def test_zonal_stats_contract(whole_polygon):
    response = zonal_stats.handler(post_event(json.dumps(feature_collection(whole_polygon)), {"region": "demo", "source": "sketch"}), None)
    assert response["statusCode"] == 200
    feature = body_of(response)["features"][0]
    assert feature["properties"]["areaName"] == "Area 1"
    mean = feature["properties"]["mean"]
    assert mean["index_a"] == pytest.approx((778 * 2 + 780 * 4) / 1558)
    assert mean["vlm"] == pytest.approx(2000 / 1200)
    assert mean["lc_background"] == pytest.approx(5.0)
    assert mean["lc_open_water"] == pytest.approx(47.5)


def test_zonal_stats_nan_and_missing_landcover(far_polygon):
    feature = body_of(zonal_stats.handler(post_event(json.dumps(feature_collection(far_polygon)), {"region": "demo"}), None))["features"][0]
    assert feature["properties"]["mean"] == {"index_a": "NaN", "vlm": "NaN"}


def test_zonal_stats_base64_body(whole_polygon):
    import base64
    raw = base64.b64encode(json.dumps(feature_collection(whole_polygon)).encode()).decode()
    assert zonal_stats.handler(post_event(raw, {"region": "demo"}, base64=True), None)["statusCode"] == 200


def test_zonal_stats_feature_without_properties(whole_polygon):
    fc = {"type": "FeatureCollection", "features": [{"type": "Feature", "geometry": whole_polygon}]}
    feature = body_of(zonal_stats.handler(post_event(json.dumps(fc), {"region": "demo"}), None))["features"][0]
    assert feature["properties"]["mean"]["index_a"] == pytest.approx((778 * 2 + 780 * 4) / 1558)


@pytest.mark.parametrize("body,params", [
    ("not json", {"region": "demo"}),
    (json.dumps({"type": "FeatureCollection", "features": []}), {"region": "demo"}),
    (json.dumps(feature_collection({"type": "Point", "coordinates": [0, 0]})), {"region": "demo"}),
    (json.dumps({"type": "Feature"}), {"region": "demo"}),
    ("{}", {"region": "nowhere"}),
    ("[]", {"region": "demo"}),
    ("5", {"region": "demo"}),
])
def test_zonal_stats_validation(body, params):
    assert zonal_stats.handler(post_event(body, params), None)["statusCode"] == 400


@pytest.mark.parametrize("raw", ["%%%", "abcde"])
def test_zonal_stats_malformed_base64_is_400(raw):
    assert zonal_stats.handler(post_event(raw, {"region": "demo"}, base64=True), None)["statusCode"] == 400


def test_zonal_stats_too_many_features(whole_polygon):
    fc = feature_collection(whole_polygon)
    fc["features"] = fc["features"] * 51
    assert zonal_stats.handler(post_event(json.dumps(fc), {"region": "demo"}), None)["statusCode"] == 400


def test_upload_shape_writes_public_object_under_stage(s3, whole_polygon):
    response = upload_shape.handler(post_event(json.dumps(feature_collection(whole_polygon))), None)
    assert response["statusCode"] == 200
    body = body_of(response)
    assert body["bucket"] == "shapes-test" and body["key"].startswith("test/")
    _, kwargs = s3.calls[0]
    assert kwargs["ACL"] == "public-read" and kwargs["ContentType"] == "application/json"


def test_upload_shape_rejects_non_feature_collection(s3):
    assert upload_shape.handler(post_event(json.dumps({"type": "Feature"})), None)["statusCode"] == 400


def test_write_then_read_share_link(s3):
    key = "3d5c71ef-b24b-41f9-9319-ffdb8dd1e699_2026-Sep-10.json"
    response = write_s3.handler(post_event(json.dumps({"location": key, "state": {"a": 1}})), None)
    assert response["statusCode"] == 200
    assert ("share-test", "dev/" + key) in s3.objects
    read = read_s3.handler(get_event({"shareUrl": key[:-5]}), None)
    assert read["statusCode"] == 200 and body_of(read) == {"a": 1}


def test_write_share_link_refuses_overwrite(s3):
    key = "3d5c71ef-b24b-41f9-9319-ffdb8dd1e699_2026-Sep-10.json"
    write_s3.handler(post_event(json.dumps({"location": key, "state": {"a": 1}})), None)
    assert write_s3.handler(post_event(json.dumps({"location": key, "state": {"a": 2}})), None)["statusCode"] == 409


@pytest.mark.parametrize("location", ["../x.json", "abc.json", "3d5c71ef-b24b-41f9-9319-ffdb8dd1e699_2026-Sep-10.txt", "", None, 5])
def test_write_share_link_validates_key(s3, location):
    assert write_s3.handler(post_event(json.dumps({"location": location, "state": {}})), None)["statusCode"] == 400


UUID = "3d5c71ef-b24b-41f9-9319-ffdb8dd1e699"


@pytest.mark.parametrize("date", ["2026-9月-10", "2026-сент.-10", "2026-thg 9-10"])
def test_write_share_link_accepts_localized_month(s3, date):
    key = f"{UUID}_{date}.json"
    assert write_s3.handler(post_event(json.dumps({"location": key, "state": {}})), None)["statusCode"] == 200
    assert read_s3.handler(get_event({"shareUrl": key[:-5]}), None)["statusCode"] == 200


@pytest.mark.parametrize("location", [f"{UUID}_2026-Sep-10.json\n", f"{UUID}_2026/Sep-10.json"])
def test_write_share_link_rejects_trailing_newline_and_slash(s3, location):
    assert write_s3.handler(post_event(json.dumps({"location": location, "state": {}})), None)["statusCode"] == 400


def test_read_share_link_rejects_trailing_newline(s3):
    assert read_s3.handler(get_event({"shareUrl": f"{UUID}_2026-Sep-10\n"}), None)["statusCode"] == 400


def test_write_share_link_conditional_conflict_is_409(s3, monkeypatch):
    def conflict(**kwargs):
        raise ClientError({"Error": {"Code": "ConditionalRequestConflict", "Message": "race"}}, "PutObject")
    monkeypatch.setattr(s3, "put_object", conflict)
    key = f"{UUID}_2026-Sep-10.json"
    assert write_s3.handler(post_event(json.dumps({"location": key, "state": {}})), None)["statusCode"] == 409


def test_write_share_link_requires_object_state(s3):
    key = "3d5c71ef-b24b-41f9-9319-ffdb8dd1e699_2026-Sep-10.json"
    assert write_s3.handler(post_event(json.dumps({"location": key, "state": "x"})), None)["statusCode"] == 400


def test_read_share_link_missing_is_404(s3):
    assert read_s3.handler(get_event({"shareUrl": "3d5c71ef-b24b-41f9-9319-ffdb8dd1e699_2026-Sep-10"}), None)["statusCode"] == 404


def test_read_share_link_validates_key(s3):
    assert read_s3.handler(get_event({"shareUrl": "../../etc"}), None)["statusCode"] == 400
    assert read_s3.handler({"queryStringParameters": None}, None)["statusCode"] == 400


def test_unexpected_error_is_500(monkeypatch, point_inside):
    monkeypatch.setattr(identify, "get_identify", lambda *a, **k: 1 / 0)
    lng, lat = point_inside
    response = identify.handler(get_event({"region": "demo", "lng": lng, "lat": lat}), None)
    assert response["statusCode"] == 500 and body_of(response) == {"message": "internal error"}
