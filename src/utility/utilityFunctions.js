import * as turf from "@turf/turf";
import { sketchShapeThresholds } from "../configuration/config";

export const calculateAreaOfPolygon = (geojson) => {
  const coordinates = geojson.geometry.coordinates;
  const polygon = turf.polygon(coordinates);
  const area = turf.area(polygon);
  return area;
};

export const caclulatePolygonVertices = (geojson) => {
  const coordinates = geojson.geometry.coordinates;
  let totalVertices = 0;
  coordinates.forEach((ring) => {
    totalVertices += ring.length;
  });
  return totalVertices;
};

/* this function determines if the polygon is valid per our checks:
  1. max size is under 500 sq km
  2. polygon has less than 1000 vertices
*/
// TODO: Need to add more validation checks e.g. number of vertices
export const validPolygon = (geojson) => {
  const areaThreshold = sketchShapeThresholds.areaThreshold;
  const verticeThreshold = sketchShapeThresholds.verticeThreshold;

  const area = calculateAreaOfPolygon(geojson);
  const maxPolygonAreaSize = areaThreshold * 1000000; // sq km
  const vertices = caclulatePolygonVertices(geojson);
  const maxVertices = verticeThreshold;
  if (area > maxPolygonAreaSize || vertices > maxVertices) {
    return false;
  }
  return true;
};

/*
  This function is necessary because the data coming back from the AGOL query
  has all of the zonal stats data under properties along with region. We need to
  restructure it ever so slightly
*/
export const convertDataForZonalStats = (geojson, zonalStatsKeys) => {
  const geoCopy = structuredClone(geojson);
  geoCopy.properties.zonalStatsData = Object.keys(geoCopy.properties)
    .filter((key) => zonalStatsKeys.includes(key))
    .reduce((obj, key) => {
      const objCopy = structuredClone(obj);
      objCopy[key] = geoCopy.properties[key];
      return objCopy;
    }, {});
  geoCopy.properties.isNull = Object.values(
    geoCopy.properties.zonalStatsData,
  ).every((value) => value === null); // return null if all values are null
  const turfCenter = turf.center(geoCopy.geometry);
  geoCopy.properties.center = {
    lat: turfCenter.geometry.coordinates[1],
    lng: turfCenter.geometry.coordinates[0],
  };
  return geoCopy;
};
