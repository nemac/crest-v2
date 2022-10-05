import { createSlice } from '@reduxjs/toolkit';

export const AnalyzeAreaSlice = createSlice({
  name: 'analyzeArea',
  initialState: {
    isEmptyState: true,
    isMore: {},
    isItAGraph: true,
    isSortASC: true,
    sortBy: 'Resilience Hubs'
  },
  reducers: {
    changeEmptyState: (state, action) => {
      state.isEmptyState = !state.isEmptyState;
    },
    changeMore: (state, action) => {
      state.isMore[action.payload] = !state.isMore[action.payload];
    },
    changeGraphTable: (state, action) => {
      state.isItAGraph = !state.isItAGraph;
    },
    changeSortDirection: (state, action) => {
      state.isSortASC = !state.isSortASC;
    },
    changeSortBy: (state, action) => {
      state.sortBy = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  changeEmptyState,
  changeMore,
  changeGraphTable,
  changeSortDirection,
  changeSortBy
} = AnalyzeAreaSlice.actions;

export default AnalyzeAreaSlice.reducer;
