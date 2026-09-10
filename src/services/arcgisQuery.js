import * as turf from "@turf/turf";

const WGS84 = { wkid: 4326 };

export const SPATIAL_REL = {
  intersects: "esriSpatialRelIntersects",
  contains: "esriSpatialRelContains",
};

// ArcGIS wants clockwise outer rings, the opposite of GeoJSON's right-hand rule.
export const geojsonToEsriGeometry = (geometry) => {
  if (geometry.type === "Point") {
    return {
      x: geometry.coordinates[0],
      y: geometry.coordinates[1],
      spatialReference: WGS84,
    };
  }
  const oriented = turf.rewind(geometry, { reverse: true });
  const rings =
    oriented.type === "MultiPolygon"
      ? oriented.coordinates.flat()
      : oriented.coordinates;
  return { rings, spatialReference: WGS84 };
};

const esriGeometryType = (geometry) =>
  geometry.type === "Point" ? "esriGeometryPoint" : "esriGeometryPolygon";

export const buildQueryParams = ({
  where = "1=1",
  geometry,
  spatialRel = SPATIAL_REL.intersects,
  outFields = "*",
}) => {
  const params = {
    f: "geojson",
    where,
    outFields,
    returnGeometry: "true",
    outSR: "4326",
  };
  if (geometry) {
    params.geometry = JSON.stringify(geojsonToEsriGeometry(geometry));
    params.geometryType = esriGeometryType(geometry);
    params.inSR = "4326";
    params.spatialRel = spatialRel;
  }
  return params;
};

export const queryFeatureLayer = async (url, options) => {
  const response = await fetch(`${url}/query`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(buildQueryParams(options)),
  });
  if (!response.ok) {
    throw new Error(`ArcGIS query failed with HTTP ${response.status}`);
  }
  const json = await response.json();
  if (json.error) throw new Error(json.error.message);
  return json;
};
