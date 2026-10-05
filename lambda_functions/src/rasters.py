"""Raster reads shared by identify and zonal_stats: one polygon mask, one band at a time."""
import numpy as np
from rasterio.errors import WindowError
from rasterio.features import geometry_mask, geometry_window
from rasterio.warp import transform, transform_geom
from rasterio.windows import Window

MAX_VALID = 100  # Legacy rasters hold stray values above 100 that must not count.
WGS84 = "EPSG:4326"
GDAL_ENV = {
    "GDAL_DISABLE_READDIR_ON_OPEN": "EMPTY_DIR",
    "CPL_VSIL_CURL_ALLOWED_EXTENSIONS": ".tif,.vrt",
    "VSI_CACHE": True,
}


def polygon_mask(src, geometry):
    """Return (window, inside) for a WGS84 polygon, or (None, None) when it misses the raster."""
    geom = transform_geom(WGS84, src.crs, geometry)
    try:
        window = geometry_window(src, [geom])
    except WindowError:
        return None, None
    height, width = int(window.height), int(window.width)
    if height == 0 or width == 0:
        return None, None
    inside = geometry_mask([geom], out_shape=(height, width), transform=src.window_transform(window), invert=True)
    if not inside.any():
        return None, None
    return window, inside


def _valid_values(src, band, window, inside):
    data = src.read(band, window=window, masked=True)
    valid = inside & ~np.ma.getmaskarray(data) & (np.asarray(data) <= MAX_VALID)
    return np.asarray(data)[valid]


def band_means(src, geometry):
    window, inside = polygon_mask(src, geometry)
    if window is None:
        return [None] * src.count
    means = []
    for band in range(1, src.count + 1):
        values = _valid_values(src, band, window, inside)
        means.append(float(values.astype("float64").mean()) if values.size else None)
    return means


def class_percentages(src, geometry, classes):
    window, inside = polygon_mask(src, geometry)
    if window is None:
        return {}
    values = _valid_values(src, 1, window, inside)
    if values.size == 0:
        return {}
    counts = np.bincount(values.astype(np.int64).ravel(), minlength=256)
    return {key: float(counts[value] / values.size * 100) for key, value in classes.items()}


def sample_point(src, lng, lat):
    xs, ys = transform(WGS84, src.crs, [lng], [lat])
    row, col = src.index(xs[0], ys[0])
    if not (0 <= row < src.height and 0 <= col < src.width):
        return [None] * src.count
    window = Window(col, row, 1, 1)
    return [src.read(band, window=window)[0, 0].item() for band in range(1, src.count + 1)]
