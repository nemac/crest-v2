import { createSlice } from "@reduxjs/toolkit";
import { mapConfig } from "../configuration/config";

const regions = mapConfig.regions;
const knownLayerIds = new Set(
  Object.values(regions).flatMap((region) =>
    region.layerList.map((layer) => layer.id),
  ),
);

// Saved and shared state keeps only layer ids and opacity; everything else comes from the region configs.
const activeEntry = (opacity) => ({ opacity });

const validOpacity = (value) =>
  typeof value === "number" && value >= 0 && value <= 1 ? value : undefined;

const startingState = {
  // TODO add defaults for Resilience hubs
  visible: true,
  // Every region starts with its first layer on.
  activeLayerList: Object.fromEntries(
    Object.values(regions).map((region) => [
      region.layerList[0].id,
      activeEntry(region.layerList[0].opacity),
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
      } else {
        state.activeLayerList[layerId] = activeEntry(layer.opacity);
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
        state.displayedLegends[layerId] = true;
      }
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
  initializeState,
  resetMapLayerList,
  setOpacity,
} = mapLayerListSlice.actions;

// Converts saved or shared state to ids plus opacity: older state kept whole layer objects, tile urls included.
export const migrateMapLayerList = (mapLayerList) => {
  if (!mapLayerList) {
    return mapLayerList;
  }
  const activeLayerList = Object.fromEntries(
    Object.entries(mapLayerList.activeLayerList ?? {})
      .filter(([layerId]) => knownLayerIds.has(layerId))
      .map(([layerId, entry]) => [
        layerId,
        activeEntry(validOpacity(entry?.opacity)),
      ]),
  );
  const displayedLegends = Object.fromEntries(
    Object.keys(mapLayerList.displayedLegends ?? {})
      .filter((layerId) => knownLayerIds.has(layerId))
      .map((layerId) => [layerId, true]),
  );
  return { ...mapLayerList, activeLayerList, displayedLegends };
};

export default mapLayerListSlice.reducer;
