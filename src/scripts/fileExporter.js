// Required for downloading the data as a CSV
var FileSaver = require('file-saver');

/**
 * The code in this file provides general code to export preformatted data using the npm package
 * file-saver. It expects other code to do the heavy lifting of gathering and properly formatting
 * the data, since it is just a small wrapper. As of this writing the only file that uses it is in
 * zonalFileExporter.js.
 *
 * https://www.npmjs.com/package/file-saver
 */

// Adds leading '0's to date/time numbers that need them. Ex: Seconds less than 10.
//
// @param val | Number
// @return String || Number
function padDate(val) {
  return val < 10 ? `0${val}` : val;
}

// Creates a timestamp formatted as YYYY-MM-DD--at--HH-MM-SS--[AM||PM]
//
// @return String
function makeTimestamp() {
  const now = new Date();
  const date = `${now.getFullYear()}-${padDate(now.getMonth() + 1)}-${padDate(now.getDate())}`;
  const time = `${padDate((now.getHours() + 1) % 12)}-${padDate(now.getMinutes() + 1)}-${padDate(now.getSeconds() + 1)}`;
  const meridiem = now.getHours() >= 12 ? 'PM' : 'AM';
  return `${date}--at--${time}--${meridiem}`;
}

// Creates a filename with a standardized format.
//
// @param name | String - Some sort of human readable identifier. Ex: Area-2 || Hub-13723
// @param ext | String - The file extension
// @return String
function makeFileName(name, ext) {
  return `${name.replace(/\s/g, '-')}--NFWF--${makeTimestamp()}.${ext}`;
}

// This is what actually creates and saves the file.
//
// @param content | Array - Contents of the file.
// @param filename | String
// @param filetype | String - Metadata about the file.
function saveFile(content, filename, filetype) {
  var blob = new Blob(content, {type: filetype});
  FileSaver.saveAs(blob, filename);
}

// Exports a csv file to the user
//
// @param content | Array - Contents of the file
// @param name | String - Some sort of human readable identifier. Ex: Area-2 || Hub-13723
function saveCsv(content, name) {
  const filetype = 'text/csv;charset=utf-8';
  const ext = 'csv';
  saveFile(content, makeFileName(name, ext), filetype);
}

export { saveCsv };
