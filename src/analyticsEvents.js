// Google Analytics events sent from components, defined in one place so their names and labels can be tested.
const engagement = (action, label) => ({
  category: "engagement",
  action,
  label,
});

export const opacityChangedEvent = (layerId) =>
  engagement("map_layer_opacity", layerId);

// format is "image" or "csv".
export const exportAllChartsEvent = (format) =>
  engagement("export_chart", `${format} all`);

// Sketches keep their original event so existing reports stay comparable; uploads and place searches get their own.
const ADDED_AREA_ACTIONS = {
  sketch: "add_area_sketch_area",
  upload: "add_area_upload_area",
  search: "add_area_place_search_area",
};

const ADDED_AREA_LABELS = {
  sketch: "sketch_area",
  upload: "upload",
  search: "place_search",
};

export const areaAddedEvent = (source) =>
  engagement(
    ADDED_AREA_ACTIONS[source] ?? "add_area_unknown_source",
    ADDED_AREA_LABELS[source] ?? String(source),
  );
