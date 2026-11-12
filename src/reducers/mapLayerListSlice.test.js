import { describe, expect, it } from "vitest";
import reducer, {
  migrateMapLayerList,
  setOpacity,
  toggleLayer,
  toggleLegend,
} from "./mapLayerListSlice";
import { mapConfig } from "../configuration/config";

const firstLayers = Object.values(mapConfig.regions).map(
  (region) => region.layerList[0],
);
const sampleLayer = firstLayers[0];

describe("mapLayerList starting state", () => {
  it("turns on the first layer of every region, keyed by layer id with only its opacity", () => {
    const state = reducer(undefined, { type: "@@INIT" });
    expect(Object.keys(state.activeLayerList)).toEqual(
      firstLayers.map((layer) => layer.id),
    );
    firstLayers.forEach((layer) => {
      expect(state.activeLayerList[layer.id]).toEqual({
        opacity: layer.opacity,
      });
    });
  });

  it("keeps the nine legacy hub layer ids without the dev flag", () => {
    const state = reducer(undefined, { type: "@@INIT" });
    expect(Object.keys(state.activeLayerList).sort()).toEqual(
      [
        "AK_HubsTMS",
        "AS_HubsTMS",
        "CNMI_HubsTMS",
        "CONUS_HubsTMS",
        "GL_HubsTMS",
        "GU_HubsTMS",
        "HI_HubsTMS",
        "PR_HubsTMS",
        "USVI_HubsTMS",
      ].sort(),
    );
  });
});

describe("mapLayerList actions", () => {
  const empty = { activeLayerList: {}, displayedLegends: {} };

  it("stores only the opacity when a layer is turned on, and removes it when turned off", () => {
    const on = reducer(empty, toggleLayer(sampleLayer));
    expect(on.activeLayerList).toEqual({
      [sampleLayer.id]: { opacity: sampleLayer.opacity },
    });
    expect(reducer(on, toggleLayer(sampleLayer)).activeLayerList).toEqual({});
  });

  it("stores a legend as a flag, not the layer", () => {
    const shown = reducer(empty, toggleLegend(sampleLayer));
    expect(shown.displayedLegends).toEqual({ [sampleLayer.id]: true });
    expect(reducer(shown, toggleLegend(sampleLayer)).displayedLegends).toEqual(
      {},
    );
  });

  it("updates the opacity of an active layer", () => {
    const on = reducer(empty, toggleLayer(sampleLayer));
    const faded = reducer(
      on,
      setOpacity({ layerId: sampleLayer.id, opacity: 0.2 }),
    );
    expect(faded.activeLayerList[sampleLayer.id]).toEqual({ opacity: 0.2 });
  });
});

describe("migrateMapLayerList", () => {
  it("reduces saved layer objects to ids plus opacity and drops their urls", () => {
    const saved = {
      visible: true,
      expandedCharts: ["Threats"],
      activeLayerList: {
        [sampleLayer.id]: {
          ...sampleLayer,
          url: "https://attacker.example/{z}/{x}/{y}.png",
          opacity: 0.4,
        },
      },
      displayedLegends: { [sampleLayer.id]: sampleLayer },
    };
    expect(migrateMapLayerList(saved)).toEqual({
      visible: true,
      expandedCharts: ["Threats"],
      activeLayerList: { [sampleLayer.id]: { opacity: 0.4 } },
      displayedLegends: { [sampleLayer.id]: true },
    });
  });

  it("drops ids no region config knows and opacities outside 0 to 1", () => {
    const migrated = migrateMapLayerList({
      activeLayerList: {
        not_a_layer: { opacity: 1 },
        [sampleLayer.id]: { opacity: 7 },
      },
      displayedLegends: { not_a_layer: {} },
    });
    expect(migrated.activeLayerList).toEqual({
      [sampleLayer.id]: { opacity: undefined },
    });
    expect(migrated.displayedLegends).toEqual({});
  });

  it("leaves state already in the new shape unchanged", () => {
    const current = {
      activeLayerList: { [sampleLayer.id]: { opacity: 0.5 } },
      displayedLegends: { [sampleLayer.id]: true },
    };
    expect(migrateMapLayerList(current)).toEqual(current);
    expect(migrateMapLayerList(undefined)).toBeUndefined();
  });
});
