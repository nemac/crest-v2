import rasterio

from src import config as cfg
from src.rasters import GDAL_ENV, sample_point
from src.responses import ValidationError, json_response, lambda_entry, query_params


def parse_params(params, config):
    region = params.get("region")
    if region not in config["regions"]:
        raise ValidationError(f"unknown region: {region}")
    try:
        lng, lat = float(params["lng"]), float(params["lat"])
    except (KeyError, TypeError, ValueError) as err:
        raise ValidationError("lng and lat are required numbers") from err
    if not (-180 <= lng <= 180 and -90 <= lat <= 90):
        raise ValidationError("lng or lat out of range")
    return region, lng, lat


def get_identify(region, lng, lat, config):
    rc = cfg.region_config(config, region)
    names = cfg.dataset_names(config, region)
    with rasterio.Env(**GDAL_ENV), rasterio.open(rc["vrt"]) as src:
        values = sample_point(src, lng, lat)
    return {name: "NaN" if value is None else str(value) for name, value in zip(names, values)}


@lambda_entry("identify")
def handler(event, context):
    config = cfg.load_config()
    region, lng, lat = parse_params(query_params(event), config)
    return json_response(200, get_identify(region, lng, lat, config))
