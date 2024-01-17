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
  geoCopy.properties.isNull = Object.values(geoCopy.properties.zonalStatsData)
    .every((value) => value === null); // return null if all values are null
  geoCopy.properties.areaName = geoCopy.properties.NAME;
  const turfCenter = turf.center(geoCopy.geometry);
  geoCopy.properties.center = {
    lat: turfCenter.geometry.coordinates[1],
    lng: turfCenter.geometry.coordinates[0]
  };
  return geoCopy;
};
