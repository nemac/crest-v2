#! /usr/bin/env python
"""Copy a region's rasters from the dataset bucket into a local directory."""
import argparse
import os
import shlex
import subprocess
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
from src import config as cfg  # noqa: E402


def dataset_sources(config, region):
    bucket = config["dataset_bucket"]
    return [f's3://{bucket}/{dataset["path"]}' for dataset in config["datasets"][region]]


def download_region(config, region, dir_path):
    for source in dataset_sources(config, region):
        command = ["aws", "s3", "cp", source, dir_path]
        print(shlex.join(command))
        subprocess.run(command, check=True)


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dir", required=True)
    parser.add_argument("--region", required=True, help="a key under datasets in config.yml")
    parser.add_argument("--config", help="alternative config.yml (default: CONFIG_PATH or src/config.yml)")
    args = parser.parse_args(argv)
    download_region(cfg.load_config(args.config), args.region, args.dir)


if __name__ == "__main__":
    main()
