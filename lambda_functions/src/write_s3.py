import json

import boto3
from botocore.exceptions import ClientError

from src import config as cfg
from src.responses import SHARE_KEY, ValidationError, json_body, json_response, lambda_entry, share_prefix

MAX_BODY_BYTES = 1024 * 1024


@lambda_entry("write_s3")
def handler(event, context):
    body = json_body(event, MAX_BODY_BYTES)
    location = body.get("location") if isinstance(body, dict) else None
    state = body.get("state") if isinstance(body, dict) else None
    if not isinstance(location, str) or not SHARE_KEY.match(location):
        raise ValidationError("invalid share link key")
    if not isinstance(state, dict):
        raise ValidationError("state must be an object")
    bucket = cfg.load_config()["share_link_bucket"]
    try:
        boto3.client("s3").put_object(
            Body=json.dumps(state).encode("utf-8"), Bucket=bucket, Key=share_prefix() + location,
            ContentType="application/json", IfNoneMatch="*")
    except ClientError as err:
        if err.response["Error"]["Code"] in ("PreconditionFailed", "412"):
            raise ValidationError("share link already exists", 409) from err
        raise
    return json_response(200, {"location": location})
