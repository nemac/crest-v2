export const legacyRegionKeys = {
  "US Virgin Islands": "U.S. Virgin Islands",
  "Atlantic, Gulf of America, and Pacific Coasts": "North Atlantic",
};

// The CREST_SEARCH FeatureServer still uses these region values.
const searchRegionNames = {
  "North Atlantic": "Atlantic, Gulf of Mexico, and Pacific Coasts",
  "U.S. Virgin Islands": "US Virgin Islands",
};

const appRegionNames = Object.fromEntries(
  Object.entries(searchRegionNames).map(([app, search]) => [search, app]),
);

export const currentRegionKey = (key) => legacyRegionKeys[key] ?? key;

export const searchRegionName = (label) => searchRegionNames[label] ?? label;

export const appRegionName = (searchRegion) =>
  appRegionNames[searchRegion] ?? searchRegion;

const migrateFeature = (feature) => {
  const region = feature?.properties?.region;
  if (!Object.hasOwn(legacyRegionKeys, region)) return feature;
  return {
    ...feature,
    properties: { ...feature.properties, region: legacyRegionKeys[region] },
  };
};

export const migrateRegionKeys = (state) => {
  if (!state) return state;
  let changed = false;
  let next = state;
  const selected = state.selectedRegion?.value;
  if (Object.hasOwn(legacyRegionKeys, selected)) {
    changed = true;
    next = {
      ...next,
      selectedRegion: {
        ...state.selectedRegion,
        value: legacyRegionKeys[selected],
      },
    };
  }
  const features = state.mapProperties?.drawnLayers?.features;
  if (Array.isArray(features)) {
    const migrated = features.map(migrateFeature);
    if (migrated.some((f, i) => f !== features[i])) {
      changed = true;
      next = {
        ...next,
        mapProperties: {
          ...state.mapProperties,
          drawnLayers: {
            ...state.mapProperties.drawnLayers,
            features: migrated,
          },
        },
      };
    }
  }
  return changed ? next : state;
};
