import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import regionSelectReducer from "./reducers/regionSelectSlice";
import mapPropertiesReducer from "./reducers/mapPropertiesSlice";
import mapLayerListReducer from "./reducers/mapLayerListSlice";
import NavBarReducer from "./reducers/NavBarSlice";
import AnalyzeAreaReducer from "./reducers/analyzeAreaSlice";
import { zonalStatsApi } from "./services/zonalstats";
import { identifyApi } from "./services/identify";
import { shareMapApi } from "./services/shareMap";
import { loadState, saveState } from "./localStorage";
import { mapConfig } from "./configuration/config";

const reducers = combineReducers({
  selectedRegion: regionSelectReducer,
  mapProperties: mapPropertiesReducer,
  analyzeArea: AnalyzeAreaReducer,
  mapLayerList: mapLayerListReducer,
  navBar: NavBarReducer,
  [zonalStatsApi.reducerPath]: zonalStatsApi.reducer,
  [identifyApi.reducerPath]: identifyApi.reducer,
  [shareMapApi.reducerPath]: shareMapApi.reducer,
});

// Helper function to verify if selected region is the same as regions in config. This is necessary since we changed
// name to Gulf of America
const isValidState = (state) =>
  state.selectedRegion.value ===
  mapConfig.regions[state.selectedRegion.value]?.label;

// Get persisted state safely
const getPersistedState = () => {
  try {
    const persistedState = loadState();

    // Validate the loaded state
    if (persistedState && isValidState(persistedState)) {
      return persistedState;
    }
    // If state is invalid, clear localStorage
    localStorage.clear();
    // eslint-disable-next-line no-console
    console.warn(
      "Invalid state structure detected. Local storage has been cleared.",
    );
    return undefined; // Will use default state
  } catch (error) {
    // If there's any error, clear localStorage
    localStorage.clear();
    // eslint-disable-next-line no-console
    console.error(
      "Error loading state, local storage has been cleared:",
      error,
    );
    return undefined;
  }
};

export const setupStore = (preloadedState) =>
  configureStore({
    reducer: reducers,
    preloadedState,
  });

export const store = configureStore({
  devTools: true, // prob should turn off in prod
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(zonalStatsApi.middleware)
      .concat(identifyApi.middleware)
      .concat(shareMapApi.middleware),
  reducer: reducers,
  preloadedState: getPersistedState(),
});

// Optional: Save the initial state to localStorage after clearing
// This will immediately populate localStorage with the default state
store.subscribe(() => {
  saveState(store.getState());
});
