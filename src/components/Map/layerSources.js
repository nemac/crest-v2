const TILE_SIZE = 256;
const DEFAULT_LEGACY_MAX_ZOOM = 14;

export const OVERLAY_ANCHOR_LAYER = "overlay-anchor";

const isPmtiles = (url) => url.startsWith("pmtiles://");

export const layerSourceSpec = (layer) => {
  if (layer.type === "vector") {
    return { type: "vector", url: layer.url };
  }
  if (isPmtiles(layer.url)) {
    const spec = { type: "raster", url: layer.url, tileSize: TILE_SIZE };
    if (layer.maxzoom !== undefined) spec.maxzoom = layer.maxzoom;
    return spec;
  }
  return {
    type: "raster",
    tiles: [layer.url],
    tileSize: TILE_SIZE,
    maxzoom: layer.maxNativeZoom ?? DEFAULT_LEGACY_MAX_ZOOM,
  };
};

export const layerSpec = (layer) => {
  const id = `layer-${layer.id}`;
  if (layer.type === "vector") {
    return {
      id,
      type: "line",
      "source-layer": layer.sourceLayer,
      paint: {
        "line-color": layer.color ?? "#ffffff",
        "line-width": layer.lineWidth ?? 2,
        "line-opacity": layer.opacity ?? 1,
      },
      beforeId: OVERLAY_ANCHOR_LAYER,
    };
  }
  return {
    id,
    type: "raster",
    paint: { "raster-opacity": layer.opacity ?? 1 },
    beforeId: OVERLAY_ANCHOR_LAYER,
  };
};
