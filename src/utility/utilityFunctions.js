import * as turf from '@turf/turf';

export const calculateAreaOfPolygon = ((geojson) => {
  const coordinates = geojson.geometry.coordinates;
  const polygon = turf.polygon(coordinates);
  const area = turf.area(polygon);
  return area;
});

/* this function determines if the polygon is valid per our checks:
  1. max size is under 500 sq km
*/
// TODO: Need to add more validation checks e.g. number of vertices
export const validPolygon = ((geojson) => {
  const area = calculateAreaOfPolygon(geojson);
  const maxPolygonAreaSize = 500000000; // 500 sq km
  if (area > maxPolygonAreaSize) {
    return false;
  }
  return true;
});
