"""Request parsing, responses, and the per-request log line shared by every handler."""
import base64
import binascii
import functools
import json
import logging
import os
import re
import time

logger = logging.getLogger("crest")
logger.setLevel(logging.INFO)

SHARE_KEY = re.compile(r"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}_[^/\\\x00-\x1f]{1,40}\.json$")


class ValidationError(Exception):
    def __init__(self, message, status=400):
        super().__init__(message)
        self.status = status


def json_response(status, body):
    return {"statusCode": status, "headers": {"Content-Type": "application/json"}, "body": json.dumps(body)}


def query_params(event):
    return event.get("queryStringParameters") or {}


def body_text(event):
    body = event.get("body") or ""
    if event.get("isBase64Encoded"):
        body = base64.b64decode(body).decode("utf-8")
    return body


def json_body(event, max_bytes):
    try:
        text = body_text(event)
        if len(text.encode("utf-8")) > max_bytes:
            raise ValidationError("request body too large", 413)
        return json.loads(text)
    except (ValueError, binascii.Error, UnicodeDecodeError) as err:
        raise ValidationError("request body must be JSON") from err


def share_prefix():
    return os.environ.get("SHARE_PREFIX", "")


def lambda_entry(fn_name):
    def decorator(handler):
        @functools.wraps(handler)
        def wrapped(event, context):
            started = time.monotonic()
            params = query_params(event)
            try:
                response = handler(event, context)
            except ValidationError as err:
                response = json_response(err.status, {"message": str(err)})
            except Exception:  # noqa: BLE001
                logger.exception("unhandled error in %s", fn_name)
                response = json_response(500, {"message": "internal error"})
            logger.info(json.dumps({
                "fn": fn_name, "stage": os.environ.get("STAGE", "local"), "region": params.get("region"),
                "source": params.get("source"), "status": response["statusCode"],
                "ms": round((time.monotonic() - started) * 1000),
            }))
            return response
        return wrapped
    return decorator
