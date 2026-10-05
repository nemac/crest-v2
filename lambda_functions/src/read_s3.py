import json

import boto3
from botocore.exceptions import ClientError

from src import config as cfg
from src.responses import SHARE_KEY, ValidationError, json_response, lambda_entry, query_params, share_prefix


@lambda_entry("read_s3")
def handler(event, context):
    share = query_params(event).get("shareUrl") or ""
    location = f"{share}.json"
    if not SHARE_KEY.match(location):
        raise ValidationError("invalid share link")
    bucket = cfg.load_config()["share_link_bucket"]
    try:
        obj = boto3.client("s3").get_object(Bucket=bucket, Key=share_prefix() + location)
    except ClientError as err:
        if err.response["Error"]["Code"] in ("NoSuchKey", "404"):
            raise ValidationError("share link not found", 404) from err
        raise
    return json_response(200, json.loads(obj["Body"].read().decode("utf-8")))
