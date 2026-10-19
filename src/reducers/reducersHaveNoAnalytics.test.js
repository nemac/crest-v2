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

// Payloads that fit the slice's own starting state, such as the id of a layer that starts active.
const payloadsFor = (initialState) => {
  const activeLayerId = Object.keys(initialState.activeLayerList ?? {})[0];
  return activeLayerId
    ? [...SAMPLE_PAYLOADS, { layerId: activeLayerId, opacity: 0.5 }]
    : SAMPLE_PAYLOADS;
};

const findSlices = () =>
  Object.entries(sliceModules).flatMap(([file, module]) =>
    Object.values(module)
      .filter((value) => value?.reducer && value?.actions)
      .map((slice) => ({ file, slice })),
  );

// Runs every action with every payload and returns the actions that threw for all of them.
const runEveryAction = (slice) => {
  const initialState = slice.getInitialState();
  return Object.entries(slice.actions)
    .filter(([, actionCreator]) => {
      const results = payloadsFor(initialState).map((payload) => {
        try {
          slice.reducer(initialState, actionCreator(payload));
          return true;
        } catch {
          return false;
        }
      });
      return !results.some(Boolean);
    })
    .map(([name]) => name);
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
      const neverRan = runEveryAction(slice);
      expect(neverRan, "actions that threw for every sample payload").toEqual(
        [],
      );
      expect(ReactGA.event).not.toHaveBeenCalled();
      expect(ReactGA.send).not.toHaveBeenCalled();
    },
  );
});
