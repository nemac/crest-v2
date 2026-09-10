import ReactGA from "react-ga4";
import { createSlice } from "@reduxjs/toolkit";
import { mapConfig } from "../configuration/config";

const regions = mapConfig.regions;
const startingState = {
  // TODO add defaults for Resilience hubs
  visible: true,
  // Every region starts with its first layer on.
  activeLayerList: Object.fromEntries(
    Object.values(regions).map((region) => [
      region.layerList[0].id,
      region.layerList[0],
    ]),
  ),
  expandedCharts: [],
  displayedLegends: {},
};

export const mapLayerListSlice = createSlice({
  name: "mapLayerList",
  initialState: startingState,
  reducers: {
    updateAllMapLayerList: (state, action) => ({ ...action.payload }),
    toggleVisible: (state) => {
      state.visible = !state.visible;
    },
    toggleLayer: (state, action) => {
      const layer = action.payload;
      const layerId = layer.id;
      if (layerId in state.activeLayerList) {
        delete state.activeLayerList[layerId];
        ReactGA.event({
          category: "engagement",
          action: "map_layer_toggle",
          label: `${layerId} off`,
        });
      } else {
        state.activeLayerList[layerId] = layer;
        ReactGA.event({
          category: "engagement",
          action: "map_layer_toggle",
          label: `${layerId} on`,
        });
      }
    },
    toggleCollapsed: (state, action) => {
      if (state.expandedCharts.includes(action.payload)) {
        const i = state.expandedCharts.indexOf(action.payload);
        state.expandedCharts.splice(i, 1);
      } else {
        state.expandedCharts.push(action.payload);
      }
    },
    toggleLegend: (state, action) => {
      const layer = action.payload;
      const layerId = layer.id;
      if (layerId in state.displayedLegends) {
        delete state.displayedLegends[layerId];
      } else {
        state.displayedLegends[layerId] = layer;
      }
    },
    // This is used for loading share links and completely loading active layers from that
    replaceActiveLayerList: (state, action) => {
      const layerList = action.payload;
      state.activeLayerList = layerList;
    },
    initializeState: (state) => {
      state.visible = startingState.visible;
      state.activeLayerList = startingState.activeLayerList;
      state.expandedCharts = startingState.expandedCharts;
      state.displayedLegends = startingState.displayedLegends;
    },
    resetMapLayerList: () => startingState,
    setOpacity: (state, action) => {
      const layerId = action.payload.layerId;
      state.activeLayerList[layerId].opacity = action.payload.opacity;
      ReactGA.event({
        category: "engagement",
        action: "map_layer_opacity",
        label: `${layerId} off`,
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateAllMapLayerList,
  toggleVisible,
  toggleLayer,
  toggleCollapsed,
  toggleLegend,
  replaceActiveLayerList,
  initializeState,
  resetMapLayerList,
  setOpacity,
} = mapLayerListSlice.actions;

export default mapLayerListSlice.reducer;
