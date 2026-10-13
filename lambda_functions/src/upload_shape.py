import hashlib
import json
import os

import boto3

from src import config as cfg
from src.responses import ValidationError, json_body, json_response, lambda_entry

MAX_BODY_BYTES = 6 * 1024 * 1024


@lambda_entry("upload_shape")
def handler(event, context):
    geojson = json_body(event, MAX_BODY_BYTES)
    if not isinstance(geojson, dict) or geojson.get("type") != "FeatureCollection":
        raise ValidationError("request body must be a FeatureCollection")
    geobytes = json.dumps(geojson).encode("utf-8")
    bucket = cfg.load_config()["user_shapes_bucket"]
    key = f"{os.environ.get('STAGE', 'local')}/{hashlib.md5(geobytes).hexdigest()}"
    boto3.client("s3").put_object(Body=geobytes, Bucket=bucket, Key=key, ContentType="application/json", ACL="public-read")
    return json_response(200, {"key": key, "bucket": bucket})
