import os
import xml.etree.ElementTree as ET

import numpy as np
import pytest
import rasterio
import yaml
from affine import Affine
from rasterio.crs import CRS

from src import config as cfg
from tests.helpers import write_raster
from tools.build_vrt import build_vrt

CRS_5070 = CRS.from_epsg(5070)


def make_config(tmp_path, second_crs=CRS_5070, second_offset=(0, 0)):
    transform = Affine(30, 0, 1500000.0, 0, -30, 1200000.0)
    second_transform = Affine(30, 0, 1500000.0 + second_offset[0], 0, -30, 1200000.0 + second_offset[1])
    write_raster(tmp_path / "a.tif", np.full((4, 4), 2, np.uint8), transform, CRS_5070, 255)
    write_raster(tmp_path / "b.tif", np.full((4, 4), -1, np.int8), second_transform, second_crs, 0)
    config = {
        "dataset_bucket": "unused", "default_nodata": 255,
        "regions": {"demo": {"vrt": "demo.vrt", "landcover_vrt": "demo_lc.vrt", "landcover": "ccap"}},
        "datasets": {"demo": [{"name": "a", "path": "a.tif"}, {"name": "b", "path": "b.tif", "nodata": 0}],
                     "demo_landcover": [{"name": "landcover", "path": "a.tif"}]},
        "landcover_classes": {"ccap": {}},
    }
    path = tmp_path / "config.yml"
    path.write_text(yaml.safe_dump(config, sort_keys=False))
    return cfg.load_config(str(path))


def test_build_vrt_keeps_per_band_nodata_and_dtype(tmp_path):
    config = make_config(tmp_path)
    out = build_vrt(config, "demo", local_dir=str(tmp_path))
    assert out == str(tmp_path / "demo.vrt")
    with rasterio.open(out) as src:
        assert src.count == 2
        assert src.dtypes == ("uint8", "int8")
        assert src.nodatavals == (255.0, 0.0)
        assert src.read(2)[0, 0] == -1
    bands = ET.parse(out).getroot().findall("VRTRasterBand")
    for band, name in zip(bands, ("a.tif", "b.tif"), strict=True):
        source = band.find(".//SourceFilename")
        assert source.get("relativeToVRT") == "0"
        assert source.text == os.path.join(str(tmp_path), name)


def test_landcover_key_writes_the_landcover_vrt(tmp_path):
    config = make_config(tmp_path)
    assert build_vrt(config, "demo_landcover", local_dir=str(tmp_path)) == str(tmp_path / "demo_lc.vrt")


def test_mixed_projections_are_rejected(tmp_path):
    config = make_config(tmp_path, second_crs=CRS.from_epsg(3857))
    with pytest.raises(ValueError, match="projection"):
        build_vrt(config, "demo", local_dir=str(tmp_path))


def test_s3_sources_use_the_vsi_prefix(tmp_path):
    config = make_config(tmp_path)
    from tools import build_vrt as module
    assert module.source_path(config, {"path": "x/y.tif"}, None, "/vsis3/") == "/vsis3/unused/x/y.tif"


def test_relative_local_dir_yields_absolute_sources(tmp_path, monkeypatch):
    config = make_config(tmp_path)
    monkeypatch.chdir(tmp_path.parent)
    out = build_vrt(config, "demo", local_dir=tmp_path.name)
    for source in ET.parse(out).getroot().iter("SourceFilename"):
        assert os.path.isabs(source.text)
    monkeypatch.chdir(tmp_path)
    with rasterio.open(out) as src:
        assert src.count == 2


def test_extent_is_the_union_of_offset_sources(tmp_path):
    config = make_config(tmp_path, second_offset=(60, -60))
    out = build_vrt(config, "demo", local_dir=str(tmp_path))
    with rasterio.open(out) as src:
        assert (src.width, src.height) == (6, 6)
        assert tuple(src.bounds) == (1500000.0, 1200000.0 - 180, 1500000.0 + 180, 1200000.0)
        band2 = src.read(2)
    assert band2[2, 2] == -1
    assert band2[5, 5] == -1
    assert band2[0, 0] == 0
    assert band2[0, 5] == 0
