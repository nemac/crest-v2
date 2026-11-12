"""Configuration loading for the CREST API handlers."""
import os

import yaml

DEFAULT_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "config.yml")


def load_config(path=None):
    path = path or os.environ.get("CONFIG_PATH") or DEFAULT_PATH
    with open(path, encoding="utf-8") as stream:
        config = yaml.safe_load(stream)
    config["_dir"] = os.path.dirname(os.path.abspath(path))
    return config


def region_config(config, region):
    entry = config["regions"][region]
    return {
        "vrt": os.path.join(config["_dir"], entry["vrt"]),
        "landcover_vrt": os.path.join(config["_dir"], entry["landcover_vrt"]),
        "landcover": entry["landcover"],
    }


def dataset_names(config, key):
    return [dataset["name"] for dataset in config["datasets"][key]]


def dataset_nodata(config, key):
    default = config["default_nodata"]
    return [int(dataset.get("nodata", default)) for dataset in config["datasets"][key]]


def landcover_classes(config, scheme):
    return config["landcover_classes"][scheme]
