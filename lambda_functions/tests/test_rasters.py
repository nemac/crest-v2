import pytest
import rasterio

from src import config as cfg
from src.rasters import GDAL_ENV, band_means, class_percentages, sample_point


@pytest.fixture
def opened(demo_config):
    rc = cfg.region_config(demo_config, "demo")
    with rasterio.Env(**GDAL_ENV), rasterio.open(rc["vrt"]) as src, rasterio.open(rc["landcover_vrt"]) as lc:
        yield src, lc


def test_whole_polygon_means_honour_each_bands_nodata(opened, whole_polygon):
    src, _ = opened
    means = band_means(src, whole_polygon)
    assert means[0] == pytest.approx(3.0)
    assert means[1] == pytest.approx(2000 / 1200)


def test_whole_polygon_vlm_mean_exact(opened, whole_polygon):
    src, _ = opened
    assert band_means(src, whole_polygon)[1] == pytest.approx(2000 / 1200)


def test_left_half_keeps_negative_values(opened, left_half_polygon):
    src, _ = opened
    assert band_means(src, left_half_polygon) == [pytest.approx(2.0), pytest.approx(-1.0)]


def test_polygon_outside_returns_none_per_band(opened, far_polygon):
    src, lc = opened
    assert band_means(src, far_polygon) == [None, None]
    assert class_percentages(lc, far_polygon, {"lc_background": 0}) == {}


def test_landcover_percentages_include_background(opened, whole_polygon, demo_config):
    _, lc = opened
    classes = cfg.landcover_classes(demo_config, "ccap")
    pct = class_percentages(lc, whole_polygon, classes)
    assert pct == {
        "lc_background": pytest.approx(5.0),
        "lc_developed_high_intensity": pytest.approx(47.5),
        "lc_open_water": pytest.approx(47.5),
    }


def test_multipolygon_is_accepted(opened, left_half_polygon):
    src, _ = opened
    multi = {"type": "MultiPolygon", "coordinates": [left_half_polygon["coordinates"]]}
    assert band_means(src, multi) == [pytest.approx(2.0), pytest.approx(-1.0)]


def test_sample_point_returns_raw_values(opened, point_inside, point_nodata_row, point_outside):
    src, _ = opened
    assert sample_point(src, *point_inside) == [2, -1]
    assert sample_point(src, *point_nodata_row) == [255, 3]
    assert sample_point(src, *point_outside) == [None, None]
