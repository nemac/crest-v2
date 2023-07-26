import FileSaver from 'file-saver';
import html2canvas from 'html2canvas';
import { removeAllFeaturesFromDrawnLayers, resetAreaNumber } from '../../reducers/mapPropertiesSlice';
import { changeEmptyState } from '../../reducers/analyzeAreaSlice';
import { mapConfig } from '../../configuration/config';

export const handleExportImage = async (chartType) => {
  const elId = `${chartType}-container`;
  await html2canvas(document.getElementById(elId), {
    logging: false,
    backgroundColor: null,
    useCORS: true, // Enable CORS to avoid cross-origin issues
    allowTaint: true, // Allow images from other domains
    useUnsafeCSS: true // Allow unsafe CSS (if needed)
  }).then((canvas) => {
    const png = canvas.toDataURL('image/png', 1.0);
    const fileName = `${chartType}.png`;
    FileSaver.saveAs(png, fileName);
  });
};

const getRange = (area, name) => {
  const selectedColorChart = mapConfig.regions[area.region].layerList.find(
    ((layer) => layer.chartCSSSelector === name)
  ).chartCSSColor;
  const allValues = Object.keys(selectedColorChart);
  const thisRange = `${allValues[0]}-${allValues[allValues.length - 1]}`;
  return thisRange;
};

const getLabel = (area, name) => {
  const thisLabel = mapConfig.regions[area.region].layerList.find(
    ((layer) => layer.chartCSSSelector === name)
  ).label;
  return thisLabel;
};

// This exports all data for all areas
// TODO: THIS IS BROKEN AT THE MOMENT. FIX IT.
export const handleExportCSV = (event, chartData, selectedRegion) => {
  event.stopPropagation();
  const dataRows = [];
  chartData.map((area) => {
    Object.entries(area.zonalStatsData).map(([index, value]) => {
      const thisRow = [];
      if (area.region === selectedRegion) {
        thisRow.push(area.areaName);
        thisRow.push(getLabel(area, index)); // need to get label here
        thisRow.push(Number.isNaN(Number(value)) ? '0.0' : value.toFixed(3)); // need to get value here
        thisRow.push(getRange(area, index)); // need to get range here
        dataRows.push(thisRow);
      }
      return thisRow;
    });
    return dataRows;
  });
  const rows = [['Area', 'Index', 'Values', 'Range(s)']];
  dataRows.map((row) => {
    rows.push(row);
    return rows;
  });
  // Get date and time, replace all special characters with '-'
  const dateString = new Date().toLocaleString().replace(/ |\/|,|:/g, '-');
  // concatenate type, area name, and date-time for filename
  const filename = `ALL-DATA-${selectedRegion.replace(/ |\/|,|:|\./g, '-')}-${dateString}.csv`;
  const csvData = rows.map((e) => e.join(',')).join('\n');
  const csvContent = `data:text/csv;charset=utf-8,${csvData}`;
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
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
