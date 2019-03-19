import { saveCsv } from './fileExporter';
import { Store } from './store';
import {
  googleAnalyticsEvent,
  getIndexes,
  getAssetDrivers,
  getThreatDrivers
} from './utilitys';

const store = new Store({});


// rename field
function getCSVName(name) {
  switch (name) {
    case 'hubs':
      return 'Resilience Hubs - data range (1 to 10)';
    case 'aquatic':
      return 'Aquatic Index - data range (0 to 5)';
    case 'terrestrial':
      return 'Terrestrial Index - data range (0 to 5)';
    case 'asset':
      return 'Community Asset Index - data range (1 to 10)';
    case 'threat':
      return 'Threat Index - data range (1 to 10)';
    case 'exposure':
      return 'Community Exposure Index - data range ( 1 to 10)';
    case 'pop_density':
      return 'Population Density - data range ( 0 to 5)';
    case 'social_vuln':
      return 'Social Vulnerability - data range ( 0 to 3)';
    case 'crit_facilities':
      return 'Critical Facilities - data range ( 0 or 5)';
    case 'crit_infra':
      return 'Critical Infrastructure - data range ( 0 to 6)';
    case 'drainage':
      return 'Impermeable Soils - data range ( 0 to 5)';
    case 'erosion':
      return 'Soil Erodibility - data range ( 0 to 5)';
    case 'floodprone_areas':
      return 'Flood-Prone Areas - data range ( 0 to 5)';
    case 'sea_level_rise':
      return 'Sea Level Rise - data range ( 0 to 5)';
    case 'storm_surge':
      return 'Storm Surge - data range ( 0 to 5)';
    case 'stormsurge':
      return 'Storm Surge - data range ( 0 to 5)';
    case 'geostress':
      return 'Geological Stressors - data range ( 0 to 3)';
    case 'slope':
      return 'Areas of Low Slope - data range ( 0 to 5)';
    case 'TARGET_FID':
      return 'name';
    default:
      return name;
  }
}

/**
 * The code in this file provides the specific implementation of retrieving, formatting and
 * exporting zonal and hub data to a csv file.
 */

// Takes the flat data results as given by the API and reformats it as an array with metadata
// NOTE/TODO: This function is the reason why there is a 'Dependency cycle', but it is invoked by an
//   async function so it should be fine.
//
// @param data | Object
// @return Array
function getExportData(data) {
  return getIndexes(data).concat(getAssetDrivers(data)).concat(getThreatDrivers(data));
}

// Implements a toString handler for each item in the array provided by getExportData to convert
// them into a line in a csv file.
//
// @param item | Object
// @return String
function exportDataToString(item) {
  return `${item.label},${item.value},${item.range}`;
}

// Converts the data provided by getExportData into the string based data of a csv file. Does not
// add the headers or neccesary extras for file-saver
//
// @param exportData | Array
// @return String
function formatExportData(exportData) {
  return `${exportData.map(exportDataToString).join('\r\n')}\r\n`;
}

// Creates the content of the file to be exported. Adds the header row and the array wrapper
// needed by file-saver.
//
// @param data | Object - Data from API
// @return Array
function makeExportFileContent(data) {
  const csvString = formatExportData(getExportData(data));
  return [`Index,Value,Range(s)\r\n${csvString}`];
}

// Triggers the save to CSV.
//
// @param fileContent | Array - Contents of the file
// @param name | String - Some sort of human readable identifier. Ex: Area-2 || Hub-13723
function triggerCsvExport(fileContent, name) {
  saveCsv(fileContent, name);
}

// The available name has extra text added for a unique id. This trims the name to the neccesary
// information.
//
// @param name | String
// @return String
function getZonalKeyFromName(name) {
  return name.replace('-USERAREA-', '').replace('Area_', '');
}

// Mines the state object for the data about a user defined zone from the API
//
// @param key | String - Will likely be an integer
// @return Object
function getZonalDataFromState(key) {
  return store.getStateItem('userareas')[`userarea${key}`][3]
    .zonalstatsjson.features[0].properties.mean;
}

// Mines the state object for the data about a hub from the API
//
// @param key | String - Will likely be a 5 digit integer
// @return Object
function getNatureServeHubDataFromState(key) {
  const NatureServehubData = store.getStateItem('NatureServeHubIntersectionJson');
  let i;
  let l;
  let data = {};
  for (i = 0, l = NatureServehubData.length; i < l; i += 1) {
    if (NatureServehubData[i].properties.mean.TARGET_FID.toString() === key) {
      data = NatureServehubData[i].properties.mean;
      break;
    }
  }

  return data;
}

// Mines the state object for the data about a hub from the API
//
// @param key | String - Will likely be a 5 digit integer
// @return Object
function getHubDataFromState(key) {
  const hubData = store.getStateItem('HubIntersectionJson');
  let i;
  let l;
  let data = {};
  for (i = 0, l = hubData.length; i < l; i += 1) {
    if (hubData[i].properties.mean.TARGET_FID.toString() === key) {
      data = hubData[i].properties.mean;
      break;
    }
  }

  return data;
}

// Formats the key information about a zone into the format needed for the filename
//
// @param key | String
// @return String
function makeZonalNameFromKey(key) {
  return `Area-${key}`;
}

// Formats the key information about a hub into the format needed for the filename
//
// @param key | String
// @return String
function makeNatureServeHubNameFromKey(key) {
  return `NatureServeHub-${key}`;
}

// Formats the key information about a hub into the format needed for the filename
//
// @param key | String
// @return String
function makeHubNameFromKey(key) {
  return `Hub-${key}`;
}

// Handles the export of zonal / hub data to a csv file.
//
// @param name | String - result of makeHTMLName from zonalStats.js
function handleZonalCsvExport(name) {
  const key = getZonalKeyFromName(name);
  const activeNav = store.getStateItem('activeNav');

  switch (activeNav) {
    case 'main-nav-map-searchhubs': {
      const data = getHubDataFromState(key);
      const label = makeHubNameFromKey(key);
      const fileContent = makeExportFileContent(data);
      triggerCsvExport(fileContent, label);
      break;
    }
    case 'main-nav-map-examples': {
      break;
    }
    case 'main-nav-map-searchNShubs': {
      const data = getNatureServeHubDataFromState(key);
      const label = makeNatureServeHubNameFromKey(key);
      const fileContent = makeExportFileContent(data);
      triggerCsvExport(fileContent, label);
      break;
    }
    case 'main-nav-map': {
      const data = getZonalDataFromState(key);
      const label = makeZonalNameFromKey(key);
      const fileContent = makeExportFileContent(data);
      triggerCsvExport(fileContent, label);
      break;
    }
    default: {
      const data = getZonalDataFromState(key);
      const label = makeZonalNameFromKey(key);
      const fileContent = makeExportFileContent(data);
      triggerCsvExport(fileContent, label);
      break;
    }
  }

  // ga event action, category, label
  googleAnalyticsEvent('click', 'download', `${name}`);
}

// converts the the multple record object to csv and renames headers (field names)
//
// @param name | String - data object from state that is properties.mean
function convertDataToCSV(data) {
  const items = data;
  const replacer = (key, value) => (value === null ? '' : value);
  const header = Object.keys(items[0]);
  const downloadHeader = header.map(name => getCSVName(name));
  let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer).replace(/\\"/g, '""')).join(','));
  csv.unshift(downloadHeader.join(','));
  csv = csv.join('\r\n');
  return csv;
}

// Mines the state object for the data about all user defined zonse from the API
//
// @param none
// @return Object
function getAllZonesFromState() {
  const zonaldata = [];
  const userareas = store.getStateItem('userareas');
  Object.keys(userareas).forEach((key) => {
    const { name } = userareas[key][0];
    const data = { name, ...userareas[key][3].zonalstatsjson.features[0].properties.mean };
    zonaldata.push(data);
  });
  return convertDataToCSV(zonaldata);
}

//  Mines the state object for the data about a hub from the API
//
// @param none
// @return Object
function getAllNatureServeHubsFromState() {
  const NatureServeHubData = store.getStateItem('NatureServeHubIntersectionJson');
  const data = [];
  NatureServeHubData.forEach((NatureServeHub) => {
    data.push(NatureServeHub.properties.mean);
  });
  return convertDataToCSV(data);
}

//  Mines the state object for the data about a hub from the API
//
// @param none
// @return Object
function getAllHubsFromState() {
  const hubData = store.getStateItem('HubIntersectionJson');
  const data = [];
  hubData.forEach((hub) => {
    data.push(hub.properties.mean);
  });
  return convertDataToCSV(data);
}

// Handles the export of zonal / hub data to a csv file when user downloads all
//
// @param name | String - result of makeHTMLName from zonalStats.js
function handleZonalAllCsvExport(name) {
  const activeNav = store.getStateItem('activeNav');

  switch (activeNav) {
    case 'main-nav-map-searchhubs': {
      const fileContent = [getAllHubsFromState()];
      triggerCsvExport(fileContent, 'All Data');
      break;
    }
    case 'main-nav-map-examples': {
      break;
    }
    case 'main-nav-map-searchNShubs': {
      const fileContent = [getAllNatureServeHubsFromState()];
      triggerCsvExport(fileContent, 'All Data');
      break;
    }
    case 'main-nav-map': {
      const fileContent = [getAllZonesFromState()];
      triggerCsvExport(fileContent, 'All Data');
      break;
    }
    default: {
      const fileContent = [getAllZonesFromState()];
      triggerCsvExport(fileContent, 'All Data');
      break;
    }
  }

  // ga event action, category, label
  googleAnalyticsEvent('click', 'download', 'all');
}

// Binds the export handler to the download button
//
// @param name | String - result of makeHTMLName from zonalStats.js
function bindZonalExportHandler(name) {
  const button = document.querySelector(`#download-name--${name}`);
  button.addEventListener('click', handleZonalCsvExport.bind(null, name));
}

// btn-download-all-zonal-stats
// Binds the export handler to the download button
//
// @param name | String - result of makeHTMLName from zonalStats.js
function bindZonalAllExportHandler() {
  const button = document.querySelector('#btn-download-all-zonal-stats');
  button.addEventListener('click', handleZonalAllCsvExport.bind(null));
}

export { bindZonalExportHandler, bindZonalAllExportHandler };
