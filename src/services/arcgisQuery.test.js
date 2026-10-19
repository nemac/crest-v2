import { afterEach, describe, expect, it, vi } from "vitest";
import {
  searchWhereClause,
  SPATIAL_REL,
  geojsonToEsriGeometry,
  buildQueryParams,
  queryFeatureLayer,
} from "./arcgisQuery";

const ccwSquare = {
  type: "Polygon",
  coordinates: [
    [
      [-77.96, 34.23],
      [-77.94, 34.23],
      [-77.94, 34.25],
      [-77.96, 34.25],
      [-77.96, 34.23],
    ],
  ],
};

describe("geojsonToEsriGeometry", () => {
  it("converts a point to x/y in WGS84", () => {
    expect(
      geojsonToEsriGeometry({ type: "Point", coordinates: [-95.37, 29.76] }),
    ).toEqual({ x: -95.37, y: 29.76, spatialReference: { wkid: 4326 } });
  });

  it("emits clockwise outer rings for polygons", () => {
    const esri = geojsonToEsriGeometry(ccwSquare);
    expect(esri.spatialReference).toEqual({ wkid: 4326 });
    expect(esri.rings).toHaveLength(1);
    expect(esri.rings[0][1]).toEqual([-77.96, 34.25]);
  });

  it("flattens multipolygon rings", () => {
    const multi = {
      type: "MultiPolygon",
      coordinates: [ccwSquare.coordinates, ccwSquare.coordinates],
    };
    expect(geojsonToEsriGeometry(multi).rings).toHaveLength(2);
  });
});

describe("buildQueryParams", () => {
  it("defaults to a where-only geojson query", () => {
    expect(buildQueryParams({ where: "region = 'Guam'" })).toEqual({
      f: "geojson",
      where: "region = 'Guam'",
      outFields: "*",
      returnGeometry: "true",
      outSR: "4326",
    });
  });

  it("adds geometry parameters for spatial queries", () => {
    const params = buildQueryParams({
      geometry: { type: "Point", coordinates: [-95.37, 29.76] },
    });
    expect(params.where).toBe("1=1");
    expect(params.geometryType).toBe("esriGeometryPoint");
    expect(params.spatialRel).toBe(SPATIAL_REL.intersects);
    expect(params.inSR).toBe("4326");
    expect(JSON.parse(params.geometry).x).toBe(-95.37);
  });

  it("uses contains for polygon within-queries", () => {
    const params = buildQueryParams({
      geometry: ccwSquare,
      spatialRel: SPATIAL_REL.contains,
    });
    expect(params.geometryType).toBe("esriGeometryPolygon");
    expect(params.spatialRel).toBe("esriSpatialRelContains");
  });
});

describe("queryFeatureLayer", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("posts a form body to /query and returns the parsed collection", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ type: "FeatureCollection", features: [] }),
    });
    vi.stubGlobal("fetch", fetchMock);
    const result = await queryFeatureLayer("https://x/FeatureServer/0", {
      where: "1=1",
    });
    expect(result.features).toEqual([]);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://x/FeatureServer/0/query");
    expect(init.method).toBe("POST");
    expect(init.body.get("f")).toBe("geojson");
  });

  it("rejects on ArcGIS error payloads", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ error: { message: "Invalid token" } }),
      }),
    );
    await expect(
      queryFeatureLayer("https://x/FeatureServer/0", {}),
    ).rejects.toThrow("Invalid token");
  });
});

describe("searchWhereClause", () => {
  it("matches names containing the typed text within one region", () => {
    expect(searchWhereClause("Cape", "Guam")).toBe(
      "search_field LIKE '%Cape%' AND region = 'Guam'",
    );
  });

  it("keeps apostrophes inside the text and the region as part of the value", () => {
    expect(searchWhereClause("O'Brien's", "Hawai'i")).toBe(
      "search_field LIKE '%O''Brien''s%' AND region = 'Hawai''i'",
    );
  });

  it("cannot be used to end the string and add a condition", () => {
    const where = searchWhereClause("x' OR '1'='1", "Guam");
    expect(where).toBe(
      "search_field LIKE '%x'' OR ''1''=''1%' AND region = 'Guam'",
    );
  });
});
