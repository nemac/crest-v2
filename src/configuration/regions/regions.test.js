import { describe, expect, it } from "vitest";
import { mapConfig } from "../config";
import { continentalUSDevConfig } from "./continental_us_dev";

const regionEntries = Object.entries(mapConfig.regions);
const schemaEntries = [...regionEntries, ["dev CONUS", continentalUSDevConfig]];

describe("region configs", () => {
  it("has nine regions whose keys match their labels", () => {
    expect(regionEntries).toHaveLength(9);
    regionEntries.forEach(([key, region]) => {
      expect(region.label).toBe(key);
      expect(region.mapProperties.center).toHaveLength(2);
      expect(typeof region.mapProperties.zoom).toBe("number");
    });
  });

  it.each(schemaEntries)(
    "%s layers have the fields the map needs",
    (key, region) => {
      const ids = region.layerList.map((layer) => layer.id);
      expect(new Set(ids).size).toBe(ids.length);
      region.layerList.forEach((layer) => {
        expect(layer.id).toBeTruthy();
        expect(layer.label).toBeTruthy();
        expect(layer.url).toMatch(/^(https:\/\/|pmtiles:\/\/)/);
        expect(layer.description).toBeTruthy();
        expect(layer.region).toBe(region.regionName);
        expect(Boolean(layer.chartCSSColor || layer.palette)).toBe(true);
        if (!layer.url.startsWith("pmtiles://")) {
          expect([12, 13, 14]).toContain(layer.maxNativeZoom);
        }
      });
    },
  );
});
