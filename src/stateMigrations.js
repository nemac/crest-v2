import { migrateRegionKeys } from "./configuration/regionAliases";
import { migrateMapLayerList } from "./reducers/mapLayerListSlice";

const migrateLayerState = (state) => {
  if (!state?.mapLayerList) {
    return state;
  }
  return { ...state, mapLayerList: migrateMapLayerList(state.mapLayerList) };
};

// Every migration that saved (localStorage) and shared (share link) state goes through before it is used.
export const migrateSavedState = (state) =>
  migrateLayerState(migrateRegionKeys(state));
