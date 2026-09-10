// MapLibre zoom 0 is a 512 px world and Leaflet's is 256 px, so stored zooms sit one level above MapLibre's.
export const ZOOM_OFFSET = 1;

export const toMapZoom = (storedZoom) => storedZoom - ZOOM_OFFSET;

export const fromMapZoom = (mapZoom) => mapZoom + ZOOM_OFFSET;

export const toLngLat = ([lat, lng]) => [lng, lat];

export const toInitialViewState = ({ center, zoom }) => ({
  longitude: center[1],
  latitude: center[0],
  zoom: toMapZoom(zoom),
});

export const readViewState = (map) => {
  const { lat, lng } = map.getCenter();
  return { center: [lat, lng], zoom: fromMapZoom(map.getZoom()) };
};

export const jumpToStored = (map, { center, zoom }) =>
  map.jumpTo({ center: toLngLat(center), zoom: toMapZoom(zoom) });

export const flyToStored = (map, center, zoom, options = {}) =>
  map.flyTo({ center: toLngLat(center), zoom: toMapZoom(zoom), ...options });
