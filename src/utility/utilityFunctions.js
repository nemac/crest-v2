import * as turf from '@turf/turf';

export const calculateAreaOfPolygon = ((geojson) => {
  const coordinates = geojson.geometry.coordinates;
  const polygon = turf.polygon(coordinates);
  const area = turf.area(polygon);
  return area;
});

export const caclulatePolygonVertices = ((geojson) => {
  const coordinates = geojson.geometry.coordinates;
  let totalVertices = 0;
  coordinates.forEach((ring) => {
    totalVertices += ring.length;
  });
  return totalVertices;
});

/* this function determines if the polygon is valid per our checks:
  1. max size is under 500 sq km
  2. polygon has less than 1000 vertices
*/
// TODO: Need to add more validation checks e.g. number of vertices
export const validPolygon = ((geojson) => {
  const area = calculateAreaOfPolygon(geojson);
  const maxPolygonAreaSize = 500000000; // 500 sq km
  const vertices = caclulatePolygonVertices(geojson);
  const maxVertices = 1000;
  if (area > maxPolygonAreaSize || vertices > maxVertices) {
    return false;
  }
  return true;
});
