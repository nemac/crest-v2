import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import counterReducer from "./components/counter/counterSlice"
import regionSelectReducer from "./components/map/regionSelectSlice"
import mapPropertiesReducer from "./components/map/mapPropertiesSlice";
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