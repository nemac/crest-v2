import FileSaver from "file-saver";
import html2canvas from "html2canvas";
import * as L from "leaflet";
import {
  changeCenter,
  changeZoom,
  removeAllFeaturesFromDrawnLayers,
  removeFeatureByGeometry,
  resetAreaNumber,
} from "../../reducers/mapPropertiesSlice";
import { changeEmptyState, changeMore } from "../../reducers/analyzeAreaSlice";
import { mapConfig } from "../../configuration/config";

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

const landcoverLabels = {
  lc_open_water: "Open Water",
  lc_perennial_icesnow: "Perennial Ice/Snow",
  lc_developed_open_space: "Developed Open Space",
  lc_developed_low_intensity: "Developed Low Intensity",
  lc_developed_medium_intensity: "Developed Medium Intensity",
  lc_developed_high_intensity: "Developed High Intensity",
  lc_barren_land: "Barren Land (Rock/Sand/Clay)",
  lc_deciduous_forest: "Deciduous Forest",
  lc_evergreen_forest: "Evergreen Forest",
  lc_mixed_forest: "Mixed Forest",
  lc_dwarf_scrub: "Dwarf Scrub",
  lc_shrub_scrub: "Shrub/Scrub",
  lc_grassland_herbaceous: "Grassland/Herbaceous",
  lc_sedge_herbaceous: "Sedge/Herbaceous",
  lc_lichens: "Lichens",
  lc_moss: "Moss",
  lc_pasture_hay_areas: "Pasture/Hay",
  lc_cultivated_crops: "Cultivated Crops",
  lc_woody_wetlands: "Woody Wetlands",
  lc_emerg_herbaceous_wetlands: "Emergent Herbacious Wetlands",
};

export const getLabel = (region, name) => {
  if (name.startsWith("lc_")) {
    return landcoverLabels[name];
  }
  const thisLabelOBJ = mapConfig.regions[region].layerList.find(
    (layer) => layer.chartCSSSelector === name,
  );
  const thisLabel = thisLabelOBJ ? thisLabelOBJ.label : "";
  return thisLabel;
};

export const getRange = (region, name) => {
  const selectedColorChartOBJ = mapConfig.regions[region].layerList.find(
    (layer) => layer.chartCSSSelector === name,
  );
  const selectedColorChart = selectedColorChartOBJ
    ? selectedColorChartOBJ.chartCSSColor
    : null;
  const allValues = selectedColorChart ? Object.keys(selectedColorChart) : null;
  const thisRange = allValues
    ? `${allValues[0]}-${allValues[allValues.length - 1]}`
    : "0";
  return thisRange;
};

export const handleZoomClick = (event, layerToZoomTo, map, dispatch) => {
  event.stopPropagation();
  const bounds = L.geoJSON(layerToZoomTo).getBounds();
  const newCenter = bounds.getCenter();
  const newZoom = map.getBoundsZoom(bounds);
  const newCenterArray = [newCenter.lat, newCenter.lng];
  dispatch(changeCenter(newCenterArray));
  dispatch(changeZoom(newZoom));
  map.flyTo(newCenter, newZoom);
};

const extractMatchingZonalStats = (layersList, zonalStatsData) => {
  // Create an object to store matching key/value pairs
  const matchingPairs = {};

  // Loop through each layer to get the chartCSSSelector
  layersList.forEach((layer) => {
    const selector = layer.chartCSSSelector;

    // Check if this selector exists as a key in zonalStatsData
    if (zonalStatsData.hasOwnProperty(selector)) {
      // Add this key/value pair to our result
      matchingPairs[selector] = zonalStatsData[selector];
    }
  });

  return matchingPairs;
};

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
      console.log("Unknown Export");
  }
  const dataRows = [];
  Object.entries(featureDataToExport).map(([key, value]) => {
    const thisRow = [];
    thisRow.push(feature.properties.areaName);
    thisRow.push(getLabel(region, key)); // need to get label here
    thisRow.push(Number.isNaN(Number(value)) ? 0.0 : value.toFixed(3)); // need to get value here
    thisRow.push(getRange(region, key)); // need to get range here
    dataRows.push(thisRow);
    return thisRow;
  });
  const rows = [["Area", "Index", "Values", "Range(s)"]];
  dataRows.map((row) => {
    rows.push(row);
    return rows;
  });
  // Get date and time, replace all special characters with '-'
  const dateString = new Date().toLocaleString().replace(/ |\/|,|:/g, "-");
  // concatenate type, area name, and date-time for filename
  const filename = `${exportName}-${region.replace(/ |\/|,|:|\./g, "-")}-${dateString}.csv`;
  const csvData = rows.map((e) => e.join(",")).join("\n");
  const csvContent = `data:text/csv;charset=utf-8,${csvData}`;
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link); // invisible link for download
  link.click(); // This will download the data file using invisible link
};

export const handleExportAllCSV = (event, chartData) => {
  const region = chartData[0].properties.region;
  event.stopPropagation();
  const dataRows = [];
  chartData.map((feature) => {
    Object.entries(feature.properties.zonalStatsData).map(([key, value]) => {
      const thisRow = [];
      thisRow.push(feature.properties.areaName);
      thisRow.push(getLabel(feature.properties.region, key)); // need to get label here
      thisRow.push(Number.isNaN(Number(value)) ? 0.0 : value.toFixed(3)); // need to get value here
      thisRow.push(getRange(feature.properties.region, key)); // need to get range here
      dataRows.push(thisRow);
      return thisRow;
    });
    return dataRows;
  });
  const rows = [["Area", "Index", "Values", "Range(s)"]];
  dataRows.map((row) => {
    rows.push(row);
    return rows;
  });
  // Get date and time, replace all special characters with '-'
  const dateString = new Date().toLocaleString().replace(/ |\/|,|:/g, "-");
  // concatenate type, area name, and date-time for filename
  const filename = `ALL-DATA-${region.replace(/ |\/|,|:|\./g, "-")}-${dateString}.csv`;
  const csvData = rows.map((e) => e.join(",")).join("\n");
  const csvContent = `data:text/csv;charset=utf-8,${csvData}`;
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link); // invisible link for download
  link.click(); // This will download the data file using invisible link
};

export const HandleRemoveAllClick = (e, dispatch, featureGroupRef) => {
  e.stopPropagation();
  dispatch(removeAllFeaturesFromDrawnLayers());
  dispatch(resetAreaNumber());
  dispatch(changeEmptyState());
  // Get rid of all layers from the feature group.
  // the only reason we have a feature group is because React Leaflet Draw requires it
  featureGroupRef.current.clearLayers();
};

export const removeLayer = (e, layer, dispatch, featureGroupRef) => {
  e.stopPropagation();
  dispatch(removeFeatureByGeometry(layer.geometry));
  // dispatch(removeFeatureByGeometryBufferLayers(bufferLayerToRemove.geometry));
  // Get rid of all layers from the feature group.
  // the only reason we have a feature group is because React Leaflet Draw requires it
  featureGroupRef.current.clearLayers();
};
