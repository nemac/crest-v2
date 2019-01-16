import { saveCsv } from './fileExporter';
import {
  getIndexes,
  getAssetDrivers,
  getThreatDrivers
} from './zonalStats';
import { Store } from './store';
const store = new Store({});

/**
 * The code in this file provides the specific implementation of retrieving, formatting and
 * exporting zonal and hub data to a csv file.
 */

// Takes the flat data results as given by the API and reformats it as an array with metadata
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
// @param content | Array - Contents of the file
// @param name | String - Some sort of human readable identifier. Ex: Area-2 || Hub-13723
function csvExportHandler(data, name) {
  const exportData = makeExportFileContent(data);
  saveCsv(exportData, name);
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
function getHubDataFromState(key) {
  const hubData = store.getStateItem('HubIntersectionJson');
  let i, l, data;
  for (i = 0, l = hubData.length; i < l; i += 1) {
    data = hubData[i].properties.mean;
    if (data.TARGET_FID === key) {
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
function makeHubNameFromKey(key) {
  return `Hub-${key}`;
}

// Handles the export of zonal / hub data to a csv file.
//
// @param name | String - result of makeHTMLName from zonalStats.js
function getDataFromName(name) {
  const key = getZonalKeyFromName(name);
  const [data, label] = (store.getStateItem('activeNav') === 'main-nav-map-searchhubs') ?
    [getHubDataFromState(key), makeHubNameFromKey(key)] :
    [getZonalDataFromState(key), makeZonalNameFromKey(key)];
  csvExportHandler(data, label);
}

// Binds the export handler to the download button
function bindZonalExportHandler(name) {
  const button = document.querySelector(`#download-name--${name}`);
  button.addEventListener('click', getDataFromName.bind(null, name));
}

export { bindZonalExportHandler };
