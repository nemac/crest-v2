import numpy as np
import pytest
import yaml
from affine import Affine
from rasterio.crs import CRS
from rasterio.warp import transform, transform_bounds, transform_geom

from src import config as cfg
from tests.helpers import write_raster
from tools.build_vrt import build_vrt

INDEX_CRS = CRS.from_epsg(5070)
WGS84 = "EPSG:4326"
ORIGIN_X, ORIGIN_Y, PIXEL, SIZE = 1500000.0, 1200000.0, 30, 40
EXTENT = (ORIGIN_X, ORIGIN_Y - SIZE * PIXEL, ORIGIN_X + SIZE * PIXEL, ORIGIN_Y)


def box(left, bottom, right, top):
    return {"type": "Polygon", "coordinates": [[
        [left, bottom], [right, bottom], [right, top], [left, top], [left, bottom]]]}


@pytest.fixture(scope="session")
def fixture_dir(tmp_path_factory):
    d = tmp_path_factory.mktemp("rasters")
    transform_5070 = Affine(PIXEL, 0, ORIGIN_X, 0, -PIXEL, ORIGIN_Y)
    index_a = np.full((SIZE, SIZE), 2, np.uint8)
    index_a[:, 20:] = 4
    index_a[0, :] = 255
    index_a[5, 5] = 128
    index_a[6, 6] = 128
    write_raster(d / "index_a.tif", index_a, transform_5070, INDEX_CRS, 255)
    vlm = np.full((SIZE, SIZE), 3, np.int8)
    vlm[:, :10] = -1
    vlm[:, 10:20] = 0
    write_raster(d / "vlm.tif", vlm, transform_5070, INDEX_CRS, 0)
    left, bottom, right, top = transform_bounds(INDEX_CRS, WGS84, *EXTENT)
    landcover = np.full((20, 20), 2, np.uint8)
    landcover[:, 10:] = 21
    landcover[0, :] = 0
    dx, dy = (right - left) / 20, (top - bottom) / 20
    write_raster(d / "landcover.tif", landcover,
                 Affine(dx, 0, left, 0, -dy, top), CRS.from_epsg(4326), 255)
    config = {
        "dataset_bucket": "unused", "user_shapes_bucket": "shapes-test", "share_link_bucket": "share-test",
        "default_nodata": 255,
        "regions": {"demo": {"vrt": "demo.vrt", "landcover_vrt": "demo_landcover.vrt", "landcover": "ccap"}},
        "datasets": {
            "demo": [{"name": "index_a", "path": "index_a.tif"}, {"name": "vlm", "path": "vlm.tif", "nodata": 0}],
            "demo_landcover": [{"name": "landcover", "path": "landcover.tif"}],
        },
        "landcover_classes": {
            "ccap": {"lc_background": 0, "lc_developed_high_intensity": 2, "lc_open_water": 21},
            "nlcd": {"lc_open_water": 11},
        },
        "test": {},
    }
    (d / "config.yml").write_text(yaml.safe_dump(config, sort_keys=False))
    loaded = cfg.load_config(str(d / "config.yml"))
    build_vrt(loaded, "demo", local_dir=str(d))
    build_vrt(loaded, "demo_landcover", local_dir=str(d))
    return d


@pytest.fixture
def demo_config(fixture_dir):
    return cfg.load_config(str(fixture_dir / "config.yml"))


@pytest.fixture
def whole_polygon():
    left, bottom, right, top = transform_bounds(INDEX_CRS, WGS84, *EXTENT)
    return box(left - 0.01, bottom - 0.01, right + 0.01, top + 0.01)


@pytest.fixture
def left_half_polygon():
    geom = box(ORIGIN_X - 100, EXTENT[1] - 100, ORIGIN_X + 20 * PIXEL, ORIGIN_Y + 100)
    return transform_geom(INDEX_CRS, WGS84, geom)


@pytest.fixture
def far_polygon():
    return box(-100.1, 40.0, -100.0, 40.1)


def lnglat(col, row):
    xs, ys = transform(INDEX_CRS, WGS84, [ORIGIN_X + col * PIXEL + 15], [ORIGIN_Y - row * PIXEL - 15])
    return xs[0], ys[0]


@pytest.fixture
def point_inside():
    return lnglat(8, 5)


@pytest.fixture
def point_nodata_row():
    return lnglat(30, 0)


@pytest.fixture
def point_outside():
    return lnglat(500, 500)
