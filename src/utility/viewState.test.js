import { describe, expect, it, vi } from "vitest";
import {
  ZOOM_OFFSET,
  toMapZoom,
  fromMapZoom,
  toLngLat,
  toInitialViewState,
  readViewState,
  jumpToStored,
  flyToStored,
} from "./viewState";

const fakeMap = () => ({
  getCenter: () => ({ lat: 40.98, lng: -95.48 }),
  getZoom: () => 3,
  jumpTo: vi.fn(),
  flyTo: vi.fn(),
});

describe("viewState", () => {
  it("offsets stored Leaflet zooms by exactly one level", () => {
    expect(ZOOM_OFFSET).toBe(1);
    expect(toMapZoom(4)).toBe(3);
    expect(fromMapZoom(3)).toBe(4);
    expect(fromMapZoom(toMapZoom(12.5))).toBe(12.5);
  });

  it("swaps stored [lat, lng] to MapLibre [lng, lat]", () => {
    expect(toLngLat([18.02, -64.7])).toEqual([-64.7, 18.02]);
  });

  it("builds the initial view state from stored center and zoom", () => {
    expect(toInitialViewState({ center: [40.98, -95.48], zoom: 4 })).toEqual({
      longitude: -95.48,
      latitude: 40.98,
      zoom: 3,
    });
  });

  it("reads the stored shape back from a map", () => {
    expect(readViewState(fakeMap())).toEqual({
      center: [40.98, -95.48],
      zoom: 4,
    });
  });

  it("jumps and flies using converted values", () => {
    const map = fakeMap();
    jumpToStored(map, { center: [18.02, -64.7], zoom: 10 });
    expect(map.jumpTo).toHaveBeenCalledWith({
      center: [-64.7, 18.02],
      zoom: 9,
    });
    flyToStored(map, [34.239146, -77.949891], 13, { duration: 500 });
    expect(map.flyTo).toHaveBeenCalledWith({
      center: [-77.949891, 34.239146],
      zoom: 12,
      duration: 500,
    });
  });
});
