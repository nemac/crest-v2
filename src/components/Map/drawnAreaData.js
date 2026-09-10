export const AREA_FILL_LAYER = "drawn-areas-fill";
export const BUFFER_FILL_LAYER = "drawn-buffers-fill";
export const DRAWN_INTERACTIVE_LAYERS = [AREA_FILL_LAYER, BUFFER_FILL_LAYER];

export const AREA_COLORS = { base: "#4992f9", hover: "#dda006" };
export const BUFFER_COLORS = { base: "#99c3ff", hover: "#ffc107" };

const named = (geometry, areaName) => ({
  type: "Feature",
  geometry,
  properties: { areaName },
});

export const drawnAreaCollections = (features) => ({
  areas: {
    type: "FeatureCollection",
    features: features.map((feature) =>
      named(feature.geometry, feature.properties.areaName),
    ),
  },
  buffers: {
    type: "FeatureCollection",
    features: features
      .filter((feature) => feature.properties.buffGeo)
      .map((feature) =>
        named(feature.properties.buffGeo.geometry, feature.properties.areaName),
      ),
  },
});
