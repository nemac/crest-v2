import rasterio

from src import config as cfg
from src.rasters import GDAL_ENV, band_means, class_percentages
from src.responses import ValidationError, json_body, json_response, lambda_entry, query_params

MAX_FEATURES = 50
MAX_BODY_BYTES = 6 * 1024 * 1024
POLYGON_TYPES = ("Polygon", "MultiPolygon")


def parse_request(event, config):
    region = query_params(event).get("region")
    if region not in config["regions"]:
        raise ValidationError(f"unknown region: {region}")
    geojson = json_body(event, MAX_BODY_BYTES)
    features = geojson.get("features") if isinstance(geojson, dict) else None
    if not isinstance(geojson, dict) or geojson.get("type") != "FeatureCollection" or not isinstance(features, list) or not features:
        raise ValidationError("request body must be a FeatureCollection with at least one feature")
    if len(features) > MAX_FEATURES:
        raise ValidationError(f"at most {MAX_FEATURES} features per request")
    for feature in features:
        geometry = (feature or {}).get("geometry") or {}
        if geometry.get("type") not in POLYGON_TYPES:
            raise ValidationError("every geometry must be a Polygon or MultiPolygon")
    return geojson, region


def stat(value):
    return "NaN" if value is None else value


def get_response(geojson, region, config=None):
    config = config or cfg.load_config()
    rc = cfg.region_config(config, region)
    names = cfg.dataset_names(config, region)
    classes = cfg.landcover_classes(config, rc["landcover"])
    with rasterio.Env(**GDAL_ENV), rasterio.open(rc["vrt"]) as src, rasterio.open(rc["landcover_vrt"]) as landcover:
        for feature in geojson["features"]:
            geometry = feature["geometry"]
            mean = {name: stat(value) for name, value in zip(names, band_means(src, geometry), strict=True)}
            mean.update(class_percentages(landcover, geometry, classes))
            if not isinstance(feature.get("properties"), dict):
                feature["properties"] = {}
            feature["properties"]["mean"] = mean
    return geojson


@lambda_entry("zonal_stats")
def handler(event, context):
    config = cfg.load_config()
    geojson, region = parse_request(event, config)
    return json_response(200, get_response(geojson, region, config))
