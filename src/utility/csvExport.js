import FileSaver from "file-saver";
import { withoutHiddenStats } from "./hiddenStats";

export const CSV_HEADER = ["Area", "Index", "Values", "Range(s)"];

// Byte order mark so Excel opens the file as UTF-8 (place names such as Hawaiʻi).
const UTF8_BOM = "\uFEFF";

const PLAIN_NUMBER = /^-?\d+(\.\d+)?$/;
const FORMULA_START = /^[=+\-@\t\r]/;
const NEEDS_QUOTES = /[",\r\n]|^\s|\s$/;

const isNoData = (value) =>
  value === null ||
  value === undefined ||
  value === "" ||
  Number.isNaN(Number(value));

// Zonal statistics with three decimals; no data is an empty cell rather than a misleading 0.
export const formatValue = (value) =>
  isNoData(value) ? "" : Number(value).toFixed(3);

// Spreadsheets run text starting with = + - @ as a formula, so such text gets a leading apostrophe.
const guardFormula = (text) =>
  FORMULA_START.test(text) && !PLAIN_NUMBER.test(text) ? `'${text}` : text;

// Quotes a cell when it holds a comma, quote, line break or edge spaces (RFC 4180).
const quoteIfNeeded = (text) =>
  NEEDS_QUOTES.test(text) ? `"${text.replaceAll('"', '""')}"` : text;

export const csvCell = (value) =>
  quoteIfNeeded(
    guardFormula(value === null || value === undefined ? "" : String(value)),
  );

export const rowsToCsv = (rows) =>
  rows.map((row) => row.map(csvCell).join(",")).join("\n");

// One row per statistic for one area; label and range come from the caller so this stays free of config.
export const areaRows = ({ areaName, region, data, label, range }) =>
  Object.entries(withoutHiddenStats(data)).map(([key, value]) => [
    areaName,
    label(region, key),
    formatValue(value),
    range(region, key),
  ]);

const SEPARATORS = / |\/|,|:/g;
const REGION_SEPARATORS = / |\/|,|:|\./g;

export const csvFilename = (prefix, region, date = new Date()) =>
  `${prefix}-${region.replace(REGION_SEPARATORS, "-")}-${date
    .toLocaleString()
    .replace(SEPARATORS, "-")}.csv`;

export const downloadCsv = (csv, filename, save = FileSaver.saveAs) => {
  save(
    new Blob([UTF8_BOM + csv], { type: "text/csv;charset=utf-8" }),
    filename,
  );
};
