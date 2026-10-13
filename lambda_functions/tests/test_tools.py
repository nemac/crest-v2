import copy
import os

import pytest

from src import config as cfg
from tools import download_rasters


def test_download_rasters_builds_one_copy_per_dataset(monkeypatch):
    config = cfg.load_config()
    commands = []
    monkeypatch.setattr(os, "system", commands.append)
    download_rasters.download_region(config, "north_atlantic", "/tmp/na")
    assert len(commands) == len(config["datasets"]["north_atlantic"])
    assert commands[0] == f"aws s3 cp s3://{config['dataset_bucket']}/{config['datasets']['north_atlantic'][0]['path']} /tmp/na"


def test_download_rasters_main_rejects_unknown_region(monkeypatch):
    monkeypatch.setattr(os, "system", lambda command: None)
    with pytest.raises(KeyError):
        download_rasters.main(["--dir", "/tmp/x", "--region", "atlantis"])


def test_prep_hubs_imports_and_reprojects():
    pytest.importorskip("fiona")
    pyproj = pytest.importorskip("pyproj")
    from tools import prep_hubs

    transformer = pyproj.Transformer.from_crs("epsg:26918", "epsg:4326", always_xy=True)
    polygon = {"type": "Polygon", "coordinates": [[[500000, 4400000], [500000, 4401000], [501000, 4400000], [500000, 4400000]]]}
    multi = {"type": "MultiPolygon", "coordinates": [copy.deepcopy(polygon["coordinates"])]}
    out = prep_hubs.transform_geom(polygon, transformer)
    assert out["coordinates"][0][0] == pytest.approx([-75.0, 39.7499], abs=1e-3)
    assert prep_hubs.transform_geom(multi, transformer)["coordinates"][0][0][0] == out["coordinates"][0][0]
    with pytest.raises(ValueError):
        prep_hubs.transform_geom({"type": "Point", "coordinates": [0, 0]}, transformer)
    assert set(prep_hubs.config) <= set(cfg.load_config()["regions"])


def test_prep_hubs_conform_feature_fills_the_schema():
    pytest.importorskip("fiona")
    from tools import prep_hubs

    feature = {"type": "Feature", "geometry": None, "properties": {"STATEFP": "45", "mean": {"exposure": 4.5, "sea_level_rise": 2.0, "lc_open_water": 10.0}}}
    props = prep_hubs.conform_feature(feature, "continental_us")["properties"]
    assert list(props) == list(prep_hubs.config["continental_us"]["schema"]["properties"])
    assert props["exposure"] == 4.5 and props["slr"] == 2.0 and props["hubs"] is None
    assert "mean" not in props and "lc_open_water" not in props
