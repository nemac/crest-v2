import { mapConfig } from "./config";

// Legacy regions classified with NLCD; every other region uses NOAA C-CAP classes.
const NLCD_REGION_NAMES = ["continental_us", "alaska", "great_lakes"];

export const landcoverClassesFor = (regionLabel) =>
  NLCD_REGION_NAMES.includes(mapConfig.regions[regionLabel]?.regionName)
    ? mapConfig.nlcdLandcover
    : mapConfig.ccapLandcover;

// "lc_bare_land" becomes "Bare Land" for classes that have no configured name.
const labelFromKey = (key) =>
  key
    .replace(/^lc_/, "")
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const landcoverLabel = (regionLabel, key) =>
  landcoverClassesFor(regionLabel).find((landClass) => landClass.value === key)
    ?.name ?? labelFromKey(key);
