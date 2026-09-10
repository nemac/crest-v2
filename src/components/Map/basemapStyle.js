export const BASEMAP_STYLES_ROOT =
  "https://basemapstyles-api.arcgis.com/arcgis/rest/services/styles/v2/styles";

export const basemapStyleUrl = (basemap, token) => {
  const params = new URLSearchParams({ token });
  if (basemap.worldview) params.set("worldview", basemap.worldview);
  return `${BASEMAP_STYLES_ROOT}/${basemap.basemap}?${params.toString()}`;
};
