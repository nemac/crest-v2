import { migrateRegionKeys } from "./configuration/regionAliases";

// UI slices only; RTK Query cache state must never be persisted
const persistedSlices = [
  "selectedRegion",
  "mapProperties",
  "analyzeArea",
  "mapLayerList",
  "navBar",
];

const pickPersistedSlices = (state) =>
  Object.fromEntries(
    persistedSlices
      .filter((key) => key in state)
      .map((key) => [key, state[key]]),
  );

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return migrateRegionKeys(pickPersistedSlices(JSON.parse(serializedState)));
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(pickPersistedSlices(state));
    localStorage.setItem("state", serializedState);
  } catch (err) {
    console.log(`Failed to write ${state} to local storage`); // eslint-disable-line no-console
  }
};
