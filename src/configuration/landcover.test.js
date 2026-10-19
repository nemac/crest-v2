import { describe, expect, it } from "vitest";
import { landcoverClassesFor, landcoverLabel } from "./landcover";
import { mapConfig } from "./config";
import { continentalUSDevConfig } from "./regions/continental_us_dev";

const ccapName = (key) =>
  mapConfig.ccapLandcover.find((landClass) => landClass.value === key)?.name;
const nlcdName = (key) =>
  mapConfig.nlcdLandcover.find((landClass) => landClass.value === key)?.name;

// Tests run without the dev data channel, so "North Atlantic" is the legacy NLCD config here.
describe("landcoverClassesFor", () => {
  it.each(["Alaska", "U.S. Great Lakes", "North Atlantic"])(
    "uses NLCD classes for %s",
    (region) => {
      expect(landcoverClassesFor(region)).toBe(mapConfig.nlcdLandcover);
    },
  );

  it.each(["Guam", "Puerto Rico", "Hawai'i", "U.S. Virgin Islands"])(
    "uses C-CAP classes for %s",
    (region) => {
      expect(landcoverClassesFor(region)).toBe(mapConfig.ccapLandcover);
    },
  );

  it("uses C-CAP classes for the dev North Atlantic config", () => {
    expect(continentalUSDevConfig.regionName).toBe("north_atlantic");
    expect(landcoverClassesFor("Unknown region")).toBe(mapConfig.ccapLandcover);
  });
});

describe("landcoverLabel", () => {
  it("names C-CAP classes from the C-CAP list", () => {
    expect(landcoverLabel("Guam", "lc_scrub_shrub")).toBe(
      ccapName("lc_scrub_shrub"),
    );
    expect(landcoverLabel("Guam", "lc_estuar_emergent_wetland")).toBe(
      ccapName("lc_estuar_emergent_wetland"),
    );
  });

  it("names NLCD classes from the NLCD list", () => {
    expect(landcoverLabel("Alaska", "lc_dwarf_scrub")).toBe(
      nlcdName("lc_dwarf_scrub"),
    );
  });

  it("falls back to a readable name for classes with no configured name", () => {
    expect(landcoverLabel("Guam", "lc_background")).toBe("Background");
    expect(landcoverLabel("Guam", "lc_some_new_class")).toBe("Some New Class");
  });

  it("has a configured C-CAP name for every class the dev North Atlantic requests", () => {
    const unnamedOnPurpose = ["lc_background", "lc_unclassified"];
    const keys = continentalUSDevConfig.zonalStatsKeys.filter(
      (key) => key.startsWith("lc_") && !unnamedOnPurpose.includes(key),
    );
    expect(keys.length).toBeGreaterThan(20);
    keys.forEach((key) => {
      expect(ccapName(key), key).toBeTruthy();
    });
  });
});
