import { describe, expect, it } from "vitest";
import {
  areaAddedEvent,
  exportAllChartsEvent,
  opacityChangedEvent,
} from "./analyticsEvents";

const engagement = (action, label) => ({
  category: "engagement",
  action,
  label,
});

describe("opacityChangedEvent", () => {
  it("labels the event with the layer id only", () => {
    expect(opacityChangedEvent("CONUS_dev_threat_index")).toEqual(
      engagement("map_layer_opacity", "CONUS_dev_threat_index"),
    );
  });

  it("never says the layer is off", () => {
    expect(opacityChangedEvent("any_layer").label).not.toMatch(/\boff\b/);
  });
});

describe("exportAllChartsEvent", () => {
  it("tells image exports and CSV exports apart", () => {
    expect(exportAllChartsEvent("image")).toEqual(
      engagement("export_chart", "image all"),
    );
    expect(exportAllChartsEvent("csv")).toEqual(
      engagement("export_chart", "csv all"),
    );
  });
});

describe("areaAddedEvent", () => {
  it("keeps the original event for sketched areas", () => {
    expect(areaAddedEvent("sketch")).toEqual(
      engagement("add_area_sketch_area", "sketch_area"),
    );
  });

  it("gives uploaded and place-search areas their own events", () => {
    expect(areaAddedEvent("upload")).toEqual(
      engagement("add_area_upload_area", "upload"),
    );
    expect(areaAddedEvent("search")).toEqual(
      engagement("add_area_place_search_area", "place_search"),
    );
  });

  it("never reports an upload or a search as a sketch", () => {
    ["upload", "search"].forEach((source) => {
      expect(areaAddedEvent(source).action).not.toBe("add_area_sketch_area");
    });
  });

  it("reports an unexpected source under its own name", () => {
    expect(areaAddedEvent("other")).toEqual(
      engagement("add_area_unknown_source", "other"),
    );
  });
});
