import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import regionSelectReducer from "./reducers/regionSelectSlice"
import mapPropertiesReducer from "./reducers/mapPropertiesSlice";
import mapLayerListReducer from "./reducers/mapLayerListSlice";
import { loadState } from './localStorage'

const reducers = combineReducers({
  selectedRegion: regionSelectReducer,
  mapProperties: mapPropertiesReducer,
  mapLayerList: mapLayerListReducer
});

export const store = configureStore({
  devTools: true, // prob should turn off in prod
  reducer: reducers,
  // here we restore previously persisted state
  preloadedState: loadState()
});
