import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: true,
  isEmptyState: true,
  isMore: {},
  isItAGraph: true,
  isItAGraphResilience: true,
  isSortASC: true,
  isSortExpanded: false,
  chartSortAsc: false,
  // {
  //   'Summary Chart': false,
  //   'Fish and Wildlife Inputs': false,
  //   'Threats Inputs': false,
  //   'Community Assets Inputs': false
  // },
  sortBy: null,
};

export const AnalyzeAreaSlice = createSlice({
  name: "analyzeArea",
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
    changeSortExpanded: (state, action) => {
      state.isSortExpanded = !state.isSortExpanded;
    },
    changeSortDirection: (state, action) => {
      state.isSortASC = !state.isSortASC;
    },
    changeChartSortDirection: (state, action) => {
      state.chartSortASC = !state.chartSortASC;
    },
    changeSortBy: (state, action) => {
      state.sortBy = (action.payload !== state.sortBy) ? action.payload : null;
    },
    toggleAreaVisible: (state, action) => {
      state.visible = !state.visible;
    },
    resetAnalyzeArea: () => initialState,
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
  changeSortExpanded,
  changeSortDirection,
  changeSortBy,
  changeChartSortDirection,
  toggleAreaVisible,
  resetAnalyzeArea,
} = AnalyzeAreaSlice.actions;

export default AnalyzeAreaSlice.reducer;
