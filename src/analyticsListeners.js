import ReactGA from "react-ga4";
import { createListenerMiddleware } from "@reduxjs/toolkit";

import { toggleLayer } from "./reducers/mapLayerListSlice";
import {
  changeAreaName,
  uploadedShapeFileGeoJSON,
} from "./reducers/mapPropertiesSlice";
import { changeActiveTab } from "./reducers/NavBarSlice";

// Sends the analytics events that used to live inside reducers; reducers must stay free of side effects.
export const analyticsListener = createListenerMiddleware();

const trackEngagement = (action, label) => {
  ReactGA.event({ category: "engagement", action, label });
};

analyticsListener.startListening({
  actionCreator: toggleLayer,
  effect: (action, listenerApi) => {
    const layerId = action.payload.id;
    const isOn = layerId in listenerApi.getState().mapLayerList.activeLayerList;
    trackEngagement("map_layer_toggle", `${layerId} ${isOn ? "on" : "off"}`);
  },
});

analyticsListener.startListening({
  actionCreator: changeActiveTab,
  // Reads the tab from state after the reducer so the "" -> "Home" rule lives only in NavBarSlice.
  effect: (action, listenerApi) => {
    trackEngagement("change_tab", listenerApi.getState().navBar.activeTab);
  },
});

// DrawTools clears the upload to null once its areas are added; only the upload itself counts.
analyticsListener.startListening({
  actionCreator: uploadedShapeFileGeoJSON,
  effect: (action) => {
    if (!action.payload) {
      return;
    }
    trackEngagement("add_area_upload", "upload shapefile");
  },
});

analyticsListener.startListening({
  actionCreator: changeAreaName,
  // The new name is left out: area names are typed by users and can identify people or places.
  effect: () => {
    trackEngagement("add_area_change_name");
  },
});
