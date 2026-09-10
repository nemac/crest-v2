import { describe, expect, it } from "vitest";
import { drawnAreaCollections } from "./drawnAreaData";

const square = {
  type: "Polygon",
  coordinates: [
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
      [0, 0],
    ],
  ],
};

const withBuffer = {
  type: "Feature",
  geometry: square,
  properties: {
    areaName: "Area 1",
    zonalStatsData: { hubs: 3 },
    buffGeo: {
      type: "Feature",
      geometry: square,
      properties: { areaName: "Area 1" },
    },
  },
};

const withoutBuffer = {
  type: "Feature",
  geometry: square,
  properties: { areaName: "Area 2" },
};

describe("drawnAreaCollections", () => {
  it("emits one area feature per drawn feature with only the name", () => {
    const { areas } = drawnAreaCollections([withBuffer, withoutBuffer]);
    expect(areas.type).toBe("FeatureCollection");
    expect(areas.features).toHaveLength(2);
    expect(areas.features[0].properties).toEqual({ areaName: "Area 1" });
    expect(areas.features[0].geometry).toBe(square);
  });

  it("emits buffer features only for features that have one", () => {
    const { buffers } = drawnAreaCollections([withBuffer, withoutBuffer]);
    expect(buffers.features).toHaveLength(1);
    expect(buffers.features[0].properties).toEqual({ areaName: "Area 1" });
  });

  it("handles an empty list", () => {
    expect(drawnAreaCollections([])).toEqual({
      areas: { type: "FeatureCollection", features: [] },
      buffers: { type: "FeatureCollection", features: [] },
    });
  });
});
