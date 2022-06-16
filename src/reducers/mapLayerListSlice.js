import { createSlice } from '@reduxjs/toolkit';

export const mapLayerListSlice = createSlice({
  name: 'mapLayerList',
  initialState: {
    visible: true,
    activeLayerList: {},
    expandedCharts: [],
    displayedLegends: {}
  },
  reducers: {
    toggleVisible: (state) => {
      state.visible = !state.visible;
    },
    toggleLayer: (state, action) => {
      const layer = action.payload;
      const layerId = layer.id;
      if (layerId in state.activeLayerList) {
        delete state.activeLayerList[layerId];
      } else {
        state.activeLayerList[layerId] = layer;
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
    }

  }
});

// Action creators are generated for each case reducer function
export const {
  toggleVisible, toggleLayer, toggleCollapsed, toggleLegend
} = mapLayerListSlice.actions;

export default mapLayerListSlice.reducer;
