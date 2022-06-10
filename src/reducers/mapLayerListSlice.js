import { createSlice } from "@reduxjs/toolkit";

export const mapLayerListSlice = createSlice({
  name: 'mapLayerList',
  initialState: {
    visible: true,
    activeLayerList: [],
    expandedCharts: []
  },
  reducers: {
    toggleVisible: (state) => {
      state.visible = !state.visible
    },
    addLayer: (state, action) => {
      state.activeLayerList.push(action.payload) ;

    },
    removeLayer: (state, action) => {
      const activeLayerLabels = state.activeLayerList.map(layer => layer.label)
      let i = activeLayerLabels.indexOf(action.payload.label) ;
      state.activeLayerList.splice(i, 1) ;
    },
    toggleCollapsed: (state, action) => {
      if (state.expandedCharts.includes(action.payload)) {
        let i = state.expandedCharts.indexOf(action.payload) ;
        state.expandedCharts.splice(i,1) ;
      }else {
        state.expandedCharts.push(action.payload) ;
      }
    }
  },
});

// Action creators are generated for each case reducer function
export const { toggleVisible, addLayer, removeLayer, toggleCollapsed } = mapLayerListSlice.actions

export default mapLayerListSlice.reducer