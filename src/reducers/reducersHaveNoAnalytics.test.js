import { beforeEach, describe, expect, it, vi } from "vitest";
import ReactGA from "react-ga4";

vi.mock("react-ga4", () => ({
  default: { event: vi.fn(), send: vi.fn(), initialize: vi.fn() },
}));

// Every *Slice.js in this folder, so a slice added later is checked too.
const sliceModules = import.meta.glob("./*Slice.js", { eager: true });

const SAMPLE_PAYLOADS = [
  undefined,
  "Home",
  0,
  { id: "sample-layer", layerId: "sample-layer", opacity: 0.5 },
  { oldAreaName: "Area 1", newAreaName: "Renamed area" },
  { type: "FeatureCollection", features: [] },
];

const findSlices = () =>
  Object.entries(sliceModules).flatMap(([file, module]) =>
    Object.values(module)
      .filter((value) => value?.reducer && value?.actions)
      .map((slice) => ({ file, slice })),
  );

const runEveryAction = (slice) => {
  const initialState = slice.getInitialState();
  Object.values(slice.actions).forEach((actionCreator) => {
    SAMPLE_PAYLOADS.forEach((payload) => {
      try {
        slice.reducer(initialState, actionCreator(payload));
      } catch {
        // Some payloads do not fit some actions; only side effects matter here.
      }
    });
  });
};

describe("reducers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("finds the slices in this folder", () => {
    expect(findSlices().length).toBeGreaterThanOrEqual(5);
  });

  it.each(findSlices().map(({ file, slice }) => [file, slice]))(
    "%s sends no analytics from its reducers",
    (file, slice) => {
      runEveryAction(slice);
      expect(ReactGA.event).not.toHaveBeenCalled();
      expect(ReactGA.send).not.toHaveBeenCalled();
    },
  );
});
