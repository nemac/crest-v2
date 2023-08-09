import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visible: true,
  isEmptyState: true,
  isMore: {},
  isItAGraph: true,
  isItAGraphResilience: true,
  isSortASC: true,
  sortBy: 'Resilience Hubs'
};

export const AnalyzeAreaSlice = createSlice({
  name: 'analyzeArea',
  initialState,
  reducers: {
    updateAllAnalyze: (state, action) => ({ ...action.payload }),
    changeEmptyState: (state, action) => {
      state.isEmptyState = !state.isEmptyState;
    },
    setEmptyState: (state, action) => {
      state.isEmptyState = action.payload;
    },
    changeMore: (state, action) => {
      state.isMore[action.payload] = !state.isMore[action.payload];
    },
    changeGraphTable: (state, action) => {
      state.isItAGraph = !state.isItAGraph;
    },
    changeGraphTableResilience: (state, action) => {
      state.isItAGraphResilience = !state.isItAGraphResilience;
    },
    changeSortDirection: (state, action) => {
      state.isSortASC = !state.isSortASC;
    },
    changeSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    toggleAreaVisible: (state, action) => {
      state.visible = !state.visible;
    },
    resetAnalyzeArea: () => initialState
  }
});

// Action creators are generated for each case reducer function
export const {
  updateAllAnalyze,
  setEmptyState,
  changeEmptyState,
  changeMore,
  changeGraphTable,
  changeGraphTableResilience,
  changeSortDirection,
  changeSortBy,
  toggleAreaVisible,
  resetAnalyzeArea
} = AnalyzeAreaSlice.actions;

export default AnalyzeAreaSlice.reducer;
