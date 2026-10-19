import { describe, expect, it, vi } from "vitest";
import { UpdateRedux, shareErrorText, shareProblem } from "./ShareMap.jsx";
import { updateAllRegion } from "../../reducers/regionSelectSlice";
import { updateAllAnalyze } from "../../reducers/analyzeAreaSlice";

const share = (overrides) => ({
  selectedRegion: { value: "North Atlantic", userInitiated: false },
  mapProperties: { drawnLayers: { type: "FeatureCollection", features: [] } },
  analyzeArea: {},
  mapLayerList: { activeLayerList: {}, displayedLegends: {} },
  navBar: { activeTab: "AnalyzeProjectSites", menuOpen: false },
  ...overrides,
});

describe("shareProblem", () => {
  it("accepts a share for a region CREST has", () => {
    expect(shareProblem(share())).toBeNull();
  });

  it("rejects a share without map data or for an unknown region", () => {
    expect(shareProblem(share({ mapProperties: undefined }))).toMatch(
      /no map data/,
    );
    expect(
      shareProblem(share({ selectedRegion: { value: "Atlantis" } })),
    ).toMatch(/region CREST no longer has/);
    expect(shareProblem(undefined)).toMatch(/no map data/);
  });
});

describe("UpdateRedux", () => {
  it("opens a share saved before the Gulf of America rename", () => {
    const dispatch = vi.fn();
    const setShareUrlComplete = vi.fn();
    const problem = UpdateRedux(
      share({
        selectedRegion: {
          value: "Atlantic, Gulf of Mexico, and Pacific Coasts",
          userInitiated: false,
        },
      }),
      dispatch,
      setShareUrlComplete,
    );
    expect(problem).toBeNull();
    expect(dispatch).toHaveBeenCalledWith(
      updateAllRegion({ value: "North Atlantic", userInitiated: false }),
    );
    expect(setShareUrlComplete).toHaveBeenCalledWith(true);
  });

  it("changes nothing and reports the problem for an unknown region", () => {
    const dispatch = vi.fn();
    const setShareUrlComplete = vi.fn();
    const problem = UpdateRedux(
      share({ selectedRegion: { value: "Atlantis" } }),
      dispatch,
      setShareUrlComplete,
    );
    expect(problem).toMatch(/region CREST no longer has/);
    expect(dispatch).not.toHaveBeenCalled();
    expect(setShareUrlComplete).not.toHaveBeenCalled();
  });

  it("leaves a slice alone when the share does not include it", () => {
    const dispatch = vi.fn();
    UpdateRedux(share({ analyzeArea: undefined }), dispatch, vi.fn());
    expect(dispatch).not.toHaveBeenCalledWith(updateAllAnalyze(undefined));
    expect(dispatch).toHaveBeenCalledTimes(4);
  });
});

describe("shareErrorText", () => {
  it("shows the backend message, the fetch error, or a fallback", () => {
    expect(
      shareErrorText({
        status: 404,
        data: { message: "share link not found" },
      }),
    ).toBe("share link not found");
    expect(
      shareErrorText({
        status: "FETCH_ERROR",
        error: "TypeError: Failed to fetch",
      }),
    ).toBe("TypeError: Failed to fetch");
    expect(shareErrorText({ status: 500 })).toBe("unknown error");
  });
});
