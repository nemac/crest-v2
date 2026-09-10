import { describe, expect, it } from "vitest";
import reducer from "./mapLayerListSlice";
import { mapConfig } from "../configuration/config";

describe("mapLayerList starting state", () => {
  it("turns on the first layer of every region, keyed by layer id", () => {
    const state = reducer(undefined, { type: "@@INIT" });
    const expected = Object.values(mapConfig.regions).map(
      (region) => region.layerList[0].id,
    );
    expect(Object.keys(state.activeLayerList)).toEqual(expected);
    expected.forEach((id) => {
      expect(state.activeLayerList[id].id).toBe(id);
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
