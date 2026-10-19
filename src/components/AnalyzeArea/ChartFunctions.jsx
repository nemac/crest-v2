import FileSaver from "file-saver";
import html2canvas from "html2canvas";
import * as turf from "@turf/turf";
import {
  changeCenter,
  changeZoom,
  removeAllFeaturesFromDrawnLayers,
  removeFeatureByGeometry,
  resetAreaNumber,
} from "../../reducers/mapPropertiesSlice";
import { changeEmptyState, changeMore } from "../../reducers/analyzeAreaSlice";
import { mapConfig } from "../../configuration/config";
import { fromMapZoom } from "../../utility/viewState";
import { landcoverLabel } from "../../configuration/landcover";
import {
  CSV_HEADER,
  areaRows,
  csvFilename,
  downloadCsv,
  rowsToCsv,
} from "../../utility/csvExport";

export const handleMoreOnClick = (dispatch, areaName) => {
  dispatch(changeMore(areaName));
};

export const handleExportImage = async (chartType) => {
  const elId = `${chartType}-container`;
  await html2canvas(document.getElementById(elId), {
    logging: false,
    backgroundColor: null,
    useCORS: true, // Enable CORS to avoid cross-origin issues
    allowTaint: true, // Allow images from other domains
    useUnsafeCSS: true, // Allow unsafe CSS (if needed)
  }).then((canvas) => {
    const today = new Date().toISOString().slice(0, 10);
    const png = canvas.toDataURL("image/png", 1.0);
    const fileName = `${chartType}-${today}.png`;
    FileSaver.saveAs(png, fileName);
  });
};

// This feels poorly done and should be refactored
// Not great that the chart types are hardcoded and each called individually
export const exportAllImages = (event, chartData, isMore) => {
  event.stopPropagation();
  chartData.forEach((feature) => {
    const areaName = feature.properties.areaName;
    handleExportImage(`Summary Chart-${areaName}`);
    if (isMore[areaName]) {
      handleExportImage(`Fish and Wildlife Inputs-${areaName}`);
      handleExportImage(`Threats Inputs-${areaName}`);
      handleExportImage(`Community Assets Inputs-${areaName}`);
      handleExportImage(`Landcover-${areaName}`);
    }
  });
};

export const getLabel = (region, name) => {
  if (name.startsWith("lc_")) {
    return landcoverLabel(region, name);
  }
  const thisLabelOBJ = mapConfig.regions[region].layerList.find(
    (layer) => layer.chartCSSSelector === name,
  );
  // A key with no layer (legacy saved data) keeps its raw name so the row stays identifiable.
  return thisLabelOBJ ? thisLabelOBJ.label : name;
};

export const getRange = (region, name) => {
  const selectedColorChartOBJ = mapConfig.regions[region].layerList.find(
    (layer) => layer.chartCSSSelector === name,
  );
  const selectedColorChart = selectedColorChartOBJ
    ? selectedColorChartOBJ.chartCSSColor
    : null;
  const classes = selectedColorChart
    ? Object.keys(selectedColorChart)
        .map(Number)
        .filter((value) => value !== 0)
    : [];
  return classes.length
    ? `${Math.min(...classes)}-${Math.max(...classes)}`
    : "";
};

export const handleZoomClick = (event, layerToZoomTo, map, dispatch) => {
  event.stopPropagation();
  const camera = map.cameraForBounds(turf.bbox(layerToZoomTo));
  if (!camera) return;
  dispatch(changeCenter([camera.center.lat, camera.center.lng]));
  dispatch(changeZoom(fromMapZoom(camera.zoom)));
  map.flyTo(camera);
};

const extractMatchingZonalStats = (layersList, zonalStatsData) => {
  // Create an object to store matching key/value pairs
  const matchingPairs = {};

  // Loop through each layer to get the chartCSSSelector
  layersList.forEach((layer) => {
    const selector = layer.chartCSSSelector;

    // Check if this selector exists as a key in zonalStatsData
    // eslint-disable-next-line no-prototype-builtins
    if (zonalStatsData.hasOwnProperty(selector)) {
      // Add this key/value pair to our result
      matchingPairs[selector] = zonalStatsData[selector];
    }
  });

  return matchingPairs;
};

// .replace("of America","of Mexico") // temp fix for region in json data on AOGL
// This function digs through the feature and explicitly exports to csv based on what is requested
export const exportFeatureToCSV = (feature, type) => {
  const region = feature.properties.region;
  let featureDataToExport = []; // initialize so we can use it in switch statement
  let layerDataFromConfig = []; // initialize so we can use it in switch statement
  let exportName = "CSV";
  switch (type) {
    case "Summary Chart":
      exportName = "Summary Chart";
      layerDataFromConfig = mapConfig.regions[region].layerList.filter(
        (layer) => layer.chartInputName === "summary",
      );
      featureDataToExport = extractMatchingZonalStats(
        layerDataFromConfig,
        feature.properties.zonalStatsData,
      );
      break;
    case "Fish and Wildlife Inputs":
      exportName = "Fish and Wildlife Inputs";
      layerDataFromConfig = mapConfig.regions[region].layerList.filter(
        (layer) => layer.chartInputName === "fishandwildlife",
      );
      featureDataToExport = extractMatchingZonalStats(
        layerDataFromConfig,
        feature.properties.zonalStatsData,
      );
      break;
    case "Threats Inputs":
      exportName = "Threats Inputs";
      layerDataFromConfig = mapConfig.regions[region].layerList.filter(
        (layer) => layer.chartInputName === "threat",
      );
      featureDataToExport = extractMatchingZonalStats(
        layerDataFromConfig,
        feature.properties.zonalStatsData,
      );
      break;
    case "Community Assets Inputs":
      exportName = "Community Assets Inputs";
      layerDataFromConfig = mapConfig.regions[region].layerList.filter(
        (layer) => layer.chartInputName === "asset",
      );
      featureDataToExport = extractMatchingZonalStats(
        layerDataFromConfig,
        feature.properties.zonalStatsData,
      );
      break;
    case "Landcover":
      exportName = "Landcover";
      Object.entries(feature.properties.zonalStatsData).forEach(
        ([key, value]) => {
          if (key.startsWith("lc_")) {
            featureDataToExport[key] = value;
          }
        },
      );
      break;
    case "All":
      exportName = "All Data";
      featureDataToExport = feature.properties.zonalStatsData;
      break;
    default:
      // eslint-disable-next-line no-console
      console.log("Unknown Export");
  }
  const rows = [
    CSV_HEADER,
    ...areaRows({
      areaName: feature.properties.areaName,
      region,
      data: featureDataToExport,
      label: getLabel,
      range: getRange,
    }),
  ];
  downloadCsv(rowsToCsv(rows), csvFilename(exportName, region));
};

export const handleExportAllCSV = (event, chartData) => {
  event.stopPropagation();
  const region = chartData[0].properties.region;
  const rows = [
    CSV_HEADER,
    ...chartData.flatMap((feature) =>
      areaRows({
        areaName: feature.properties.areaName,
        region: feature.properties.region,
        data: feature.properties.zonalStatsData,
        label: getLabel,
        range: getRange,
      }),
    ),
  ];
  downloadCsv(rowsToCsv(rows), csvFilename("ALL-DATA", region));
};

export const HandleRemoveAllClick = (e, dispatch) => {
  e.stopPropagation();
  dispatch(removeAllFeaturesFromDrawnLayers());
  dispatch(resetAreaNumber());
  dispatch(changeEmptyState());
};

export const removeLayer = (e, layer, dispatch) => {
  e.stopPropagation();
  dispatch(removeFeatureByGeometry(layer.geometry));
};
