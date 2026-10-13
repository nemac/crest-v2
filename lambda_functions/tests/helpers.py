import rasterio


def write_raster(path, array, transform, crs, nodata):
    with rasterio.open(
        path, "w", driver="GTiff", height=array.shape[0], width=array.shape[1], count=1,
        dtype=array.dtype, crs=crs, transform=transform, nodata=nodata,
    ) as dst:
        dst.write(array, 1)
