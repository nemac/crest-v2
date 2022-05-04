import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import counterReducer from "./reducers/counterSlice"
import regionSelectReducer from "./reducers/regionSelectSlice"
import mapPropertiesReducer from "./reducers/mapPropertiesSlice";
import { loadState } from './localStorage'

const reducers = combineReducers({
  counter: counterReducer,
  selectedRegion: regionSelectReducer,
  mapProperties: mapPropertiesReducer,
});

export const store = configureStore({
  devTools: true, // prob should turn off in prod
  reducer: reducers,
  // here we restore previously persisted state
  preloadedState: loadState(),
})