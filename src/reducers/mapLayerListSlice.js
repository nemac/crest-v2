import { createSlice } from "@reduxjs/toolkit";

export const mapLayerListSlice = createSlice({
  name: 'mapLayerList',
  initialState: {
    visible: true,
    activeLayerList: []
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
    }
  },
});

// Action creators are generated for each case reducer function
export const { toggleVisible, addLayer, removeLayer } = mapLayerListSlice.actions

export default mapLayerListSlice.reducer