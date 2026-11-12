import { beforeEach, describe, expect, it, vi } from "vitest";
import ReactGA from "react-ga4";
import { configureStore } from "@reduxjs/toolkit";

import mapLayerList, {
  setOpacity,
  toggleLayer,
} from "./reducers/mapLayerListSlice";
import mapProperties, {
  changeAreaName,
  uploadedShapeFileGeoJSON,
} from "./reducers/mapPropertiesSlice";
import navBar, { changeActiveTab } from "./reducers/NavBarSlice";
import { analyticsListener } from "./analyticsListeners";

vi.mock("react-ga4", () => ({
  default: { event: vi.fn(), send: vi.fn(), initialize: vi.fn() },
}));

const makeStore = () =>
  configureStore({
    reducer: { mapLayerList, mapProperties, navBar },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(analyticsListener.middleware),
  });

const engagement = (action, label) => ({
  category: "engagement",
  action,
  label,
});

describe("analytics listeners", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("reports a layer turned on and then off", () => {
    const store = makeStore();
    const layer = { id: "sample-layer" };
    store.dispatch(toggleLayer(layer));
    store.dispatch(toggleLayer(layer));
    expect(ReactGA.event.mock.calls).toEqual([
      [engagement("map_layer_toggle", "sample-layer on")],
      [engagement("map_layer_toggle", "sample-layer off")],
    ]);
  });

  it("sends nothing while the opacity slider moves", () => {
    const store = makeStore();
    store.dispatch(toggleLayer({ id: "sample-layer" }));
    vi.clearAllMocks();
    store.dispatch(setOpacity({ layerId: "sample-layer", opacity: 0.4 }));
    store.dispatch(setOpacity({ layerId: "sample-layer", opacity: 0.5 }));
    expect(ReactGA.event).not.toHaveBeenCalled();
  });

  it("counts an upload once, not again when it is cleared afterwards", () => {
    const store = makeStore();
    store.dispatch(uploadedShapeFileGeoJSON({ type: "FeatureCollection" }));
    store.dispatch(uploadedShapeFileGeoJSON(null));
    expect(ReactGA.event.mock.calls).toEqual([
      [engagement("add_area_upload", "upload shapefile")],
    ]);
  });

  it("reports tab changes, with an empty tab as Home", () => {
    const store = makeStore();
    store.dispatch(changeActiveTab("Examples"));
    store.dispatch(changeActiveTab(""));
    expect(ReactGA.event.mock.calls).toEqual([
      [engagement("change_tab", "Examples")],
      [engagement("change_tab", "Home")],
    ]);
  });

  it("reports shapefile uploads and area renames without the typed name", () => {
    const store = makeStore();
    store.dispatch(uploadedShapeFileGeoJSON({ type: "FeatureCollection" }));
    store.dispatch(
      changeAreaName({ oldAreaName: "Area 1", newAreaName: "Marsh" }),
    );
    expect(ReactGA.event.mock.calls).toEqual([
      [engagement("add_area_upload", "upload shapefile")],
      [engagement("add_area_change_name", undefined)],
    ]);
  });
});
