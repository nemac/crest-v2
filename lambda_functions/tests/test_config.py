import os
import xml.etree.ElementTree as ET

import pytest

from src import config as cfg

SRC_DIR = os.path.join(os.path.dirname(__file__), "..", "src")


@pytest.fixture(scope="module")
def real_config():
    return cfg.load_config(os.path.join(SRC_DIR, "config.yml"))


def test_schema_top_level_keys(real_config):
    for key in ("dataset_bucket", "share_link_bucket", "default_nodata",
                "regions", "datasets", "landcover_classes", "test"):
        assert key in real_config
    assert real_config["default_nodata"] == 255
    assert set(real_config["landcover_classes"]) == {"nlcd", "ccap"}


def test_every_region_has_vrts_and_a_scheme(real_config):
    for region in real_config["regions"]:
        rc = cfg.region_config(real_config, region)
        assert os.path.isfile(rc["vrt"]), rc["vrt"]
        assert os.path.isfile(rc["landcover_vrt"]), rc["landcover_vrt"]
        assert rc["landcover"] in real_config["landcover_classes"]
        assert region in real_config["datasets"]
        assert f"{region}_landcover" in real_config["datasets"]


def test_legacy_schemes(real_config):
    for region, scheme in (("continental_us", "nlcd"), ("alaska", "nlcd"),
                           ("great_lakes", "nlcd"), ("puerto_rico", "ccap")):
        assert cfg.region_config(real_config, region)["landcover"] == scheme


def test_continental_us_dataset_order_is_unchanged(real_config):
    assert cfg.dataset_names(real_config, "continental_us") == [
        "exposure", "asset", "threat", "wildlife", "aquatic", "terrestrial", "hubs",
        "crit_infra", "crit_facilities", "pop_density", "social_vuln", "drainage",
        "erosion", "floodprone_areas", "geostress", "sea_level_rise", "slope", "storm_surge",
    ]


@pytest.mark.parametrize("region", [
    "continental_us", "puerto_rico", "us_virgin_islands", "northern_mariana_islands",
    "hawaii", "american_samoa", "guam", "alaska", "great_lakes", "north_atlantic",
])
def test_vrt_bands_match_datasets(real_config, region):
    bucket = real_config["dataset_bucket"]
    for key, vrt_key in ((region, "vrt"), (f"{region}_landcover", "landcover_vrt")):
        vrt_path = cfg.region_config(real_config, region)[vrt_key]
        bands = ET.parse(vrt_path).getroot().findall("VRTRasterBand")
        datasets = real_config["datasets"][key]
        assert len(bands) == len(datasets), key
        for band, dataset, nodata in zip(bands, datasets, cfg.dataset_nodata(real_config, key), strict=True):
            source = band.find(".//SourceFilename").text
            assert source == f"/vsis3/{bucket}/{dataset['path']}", key
            assert int(float(band.find("NoDataValue").text)) == nodata, key


def test_north_atlantic_names_match_the_tiling_manifest(real_config):
    import json
    manifest = json.load(open(os.path.join(SRC_DIR, "..", "..", "tiling", "layers.json")))
    names = [layer["name"] for layer in manifest["layers"] if layer["name"] != "land_cover"]
    assert cfg.dataset_names(real_config, "north_atlantic") == names
    nodata = dict(zip(names, cfg.dataset_nodata(real_config, "north_atlantic"), strict=True))
    assert nodata["vertical_land_motion"] == 0
    assert all(value == 255 for name, value in nodata.items() if name != "vertical_land_motion")
    assert cfg.region_config(real_config, "north_atlantic")["landcover"] == "ccap"
    assert cfg.dataset_names(real_config, "north_atlantic_landcover") == ["landcover"]
    assert real_config["datasets"]["north_atlantic_landcover"][0]["path"] == "north-atlantic/CONUS_NAtl_Land_Cover_CCAP_2021.tif"


def test_unknown_region_raises(real_config):
    with pytest.raises(KeyError):
        cfg.region_config(real_config, "atlantis")


def test_config_path_env_override(tmp_path, monkeypatch):
    p = tmp_path / "c.yml"
    p.write_text("default_nodata: 7\nregions: {}\ndatasets: {}\nlandcover_classes: {}\n")
    monkeypatch.setenv("CONFIG_PATH", str(p))
    assert cfg.load_config()["default_nodata"] == 7
