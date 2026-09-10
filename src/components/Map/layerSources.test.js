import { describe, expect, it } from "vitest";
import {
  OVERLAY_ANCHOR_LAYER,
  layerSourceSpec,
  layerSpec,
} from "./layerSources";

const legacy = {
  id: "USVI_HubsTMS",
  url: "https://tiles.resilientcoasts.org/USVI_HubsIndexTiles/{z}/{x}/{y}.png",
  opacity: 0.75,
  maxNativeZoom: 14,
};

const pmtilesRaster = {
  id: "CONUS_dev_storm_surge",
  url: "pmtiles://https://tiles.resilientcoasts.org/dev/conus/storm_surge.pmtiles",
  opacity: 0.75,
  maxzoom: 13,
};

const boundary = {
  id: "CONUS_dev_north_atlantic_boundary",
  type: "vector",
  url: "pmtiles://https://tiles.resilientcoasts.org/dev/conus/north_atlantic_boundary.pmtiles",
  sourceLayer: "boundary",
  color: "#ffffff",
  lineWidth: 2,
  opacity: 1,
};

describe("layerSourceSpec", () => {
  it("turns a legacy PNG folder into an xyz raster source with its own maxzoom", () => {
    expect(layerSourceSpec(legacy)).toEqual({
      type: "raster",
      tiles: [legacy.url],
      tileSize: 256,
      maxzoom: 14,
    });
  });

  it("defaults maxzoom to 14 when a legacy layer has no maxNativeZoom", () => {
    // eslint-disable-next-line no-unused-vars
    const { maxNativeZoom, ...noZoom } = legacy;
    expect(layerSourceSpec(noZoom).maxzoom).toBe(14);
  });

  it("uses the pmtiles url directly for raster archives", () => {
    expect(layerSourceSpec(pmtilesRaster)).toEqual({
      type: "raster",
      url: pmtilesRaster.url,
      tileSize: 256,
      maxzoom: 13,
    });
  });

  it("builds a vector source for vector archives", () => {
    expect(layerSourceSpec(boundary)).toEqual({
      type: "vector",
      url: boundary.url,
    });
  });
});

describe("layerSpec", () => {
  it("renders raster layers with the config opacity beneath the overlay anchor", () => {
    expect(layerSpec(legacy)).toEqual({
      id: "layer-USVI_HubsTMS",
      type: "raster",
      paint: { "raster-opacity": 0.75 },
      beforeId: OVERLAY_ANCHOR_LAYER,
    });
  });

  it("renders vector layers as lines from the named source layer", () => {
    expect(layerSpec(boundary)).toEqual({
      id: "layer-CONUS_dev_north_atlantic_boundary",
      type: "line",
      "source-layer": "boundary",
      paint: { "line-color": "#ffffff", "line-width": 2, "line-opacity": 1 },
      beforeId: OVERLAY_ANCHOR_LAYER,
    });
  });
});
