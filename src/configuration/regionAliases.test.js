import { describe, expect, it } from "vitest";
import {
  legacyRegionKeys,
  currentRegionKey,
  migrateRegionKeys,
  searchRegionName,
  appRegionName,
} from "./regionAliases";

describe("region aliases", () => {
  it("maps legacy keys to their current labels", () => {
    expect(legacyRegionKeys).toEqual({
      "US Virgin Islands": "U.S. Virgin Islands",
      "Atlantic, Gulf of America, and Pacific Coasts": "North Atlantic",
    });
    expect(currentRegionKey("US Virgin Islands")).toBe("U.S. Virgin Islands");
    expect(
      currentRegionKey("Atlantic, Gulf of America, and Pacific Coasts"),
    ).toBe("North Atlantic");
    expect(currentRegionKey("Guam")).toBe("Guam");
    expect(currentRegionKey(undefined)).toBeUndefined();
  });

  it("migrates the selected region and drawn-area regions in persisted state", () => {
    const state = {
      selectedRegion: { value: "US Virgin Islands", userInitiated: false },
      mapProperties: {
        drawnLayers: {
          type: "FeatureCollection",
          features: [
            { type: "Feature", properties: { region: "US Virgin Islands" } },
            { type: "Feature", properties: { region: "Guam" } },
          ],
        },
      },
      navBar: { activeTab: "AnalyzeProjectSites" },
    };
    const migrated = migrateRegionKeys(state);
    expect(migrated).not.toBe(state);
    expect(migrated.selectedRegion.value).toBe("U.S. Virgin Islands");
    expect(
      migrated.mapProperties.drawnLayers.features.map(
        (f) => f.properties.region,
      ),
    ).toEqual(["U.S. Virgin Islands", "Guam"]);
    expect(migrated.navBar).toBe(state.navBar);
  });

  it("returns the same state object when nothing needs migrating", () => {
    const state = {
      selectedRegion: { value: "Guam" },
      mapProperties: { drawnLayers: { features: [] } },
    };
    expect(migrateRegionKeys(state)).toBe(state);
    expect(migrateRegionKeys(undefined)).toBeUndefined();
  });

  it("translates app labels to the search FeatureServer region values and back", () => {
    expect(searchRegionName("North Atlantic")).toBe(
      "Atlantic, Gulf of Mexico, and Pacific Coasts",
    );
    expect(searchRegionName("U.S. Virgin Islands")).toBe("US Virgin Islands");
    expect(searchRegionName("Hawai'i")).toBe("Hawai'i");
    expect(appRegionName("Atlantic, Gulf of Mexico, and Pacific Coasts")).toBe(
      "North Atlantic",
    );
    expect(appRegionName("US Virgin Islands")).toBe("U.S. Virgin Islands");
    expect(appRegionName("Puerto Rico")).toBe("Puerto Rico");
  });
});
