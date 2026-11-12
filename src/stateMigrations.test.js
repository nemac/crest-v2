import { describe, expect, it } from "vitest";
import { migrateSavedState } from "./stateMigrations";
import { mapConfig } from "./configuration/config";

const sampleLayer = mapConfig.regions["North Atlantic"].layerList[0];

describe("migrateSavedState", () => {
  it("migrates the region name and the layer list together", () => {
    const migrated = migrateSavedState({
      selectedRegion: {
        value: "Atlantic, Gulf of Mexico, and Pacific Coasts",
      },
      mapProperties: { drawnLayers: { features: [] } },
      mapLayerList: {
        activeLayerList: { [sampleLayer.id]: { ...sampleLayer } },
        displayedLegends: {},
      },
    });
    expect(migrated.selectedRegion.value).toBe("North Atlantic");
    expect(migrated.mapLayerList.activeLayerList).toEqual({
      [sampleLayer.id]: { opacity: sampleLayer.opacity },
    });
  });

  it("passes through state without a layer list", () => {
    const state = {
      selectedRegion: { value: "Guam" },
      mapProperties: { drawnLayers: { features: [] } },
    };
    expect(migrateSavedState(state)).toBe(state);
    expect(migrateSavedState(undefined)).toBeUndefined();
  });
});
