/*
Purpose
  Shows chart when the user does analyze project site. Type of chart

  - format data for the chart from Zonal stats API JSON / GEOJSON
  - handle all the charts
    - details, inputs, and summary chart

  TODO needs menu for sort and export
        needs charts added

Child Components
  - AnalyzeArea-ChartActionButtons.js

Libs
  - chart.js
  - Not sure yet

API
  - Zonal stats API JSON / GEOJSON
  - Not sure yet

State needed
  - More or less?
  - table or graph
  - Not sure yet

Props
  - GEOJSON data (to get properies aka attributes)
  - if details add export button
  - Not sure yet
*/
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';

import {
  changeEmptyState,
  changeGraphTable,
  changeSortDirection
} from '../../reducers/analyzeAreaSlice';
import {
  removeAllFeaturesFromDrawnLayers
} from '../../reducers/mapPropertiesSlice';
import ChartCard from './ChartCard';
import ChartHeaderActionButtons from './ChartHeaderActionButtons';
import TableData from './TableData';
import { mapConfig } from '../../configuration/config';

const useStyles = makeStyles((theme) => ({
  gridHolder: {
    height: '100%'
  },
  contentBox: {
    height: 'calc(100% - 112px)',
    paddingRight: theme.spacing(1.5),
    overflowY: 'scroll'
  }
}));

// sample configs to create the charts should come from state/redux later
// TODO config should be imported from config directory

// selector named functions for lint rules makes it easier to re-use if needed.
const regions = mapConfig.regions;
const AnalyzeAreaSelector = (state) => state.AnalyzeArea;
const drawnLayerSelector = (state) => state.mapProperties.drawnLayers;
const selectedRegionSelector = (state) => state.selectedRegion.value;

export default function ChartsHolder(props) {
  const { leafletFeatureGroupRef, map } = props;
  const drawnLayerAreas = useSelector(drawnLayerSelector);
  const selectedRegion = useSelector(selectedRegionSelector);
  // console.log('drawn layer');
  // console.log(drawnLayerAreas);
  // console.log('zonalstatsareas');
  // console.log(zonalStatsAreas);
  // console.log(leafletFeatureGroupRef);
  const featureList = drawnLayerAreas.features;
  // const drawnLayerFeatures = drawnLayerAreas.features;
  // console.log('feature list original');
  // console.log(featureList);
  // console.log('new feature list:');
  // console.log(drawnLayerFeatures);
  const [chartData, setChartData] = useState([]);
  const classes = useStyles();
  const getLabel = (area, name) => {
    const thisLabel = regions[area.region].layerList.find(
      ((layer) => layer.chartCSSSelector === name)
    ).label;
    return thisLabel;
  };
  const getRange = (area, name) => {
    const selectedColorChart = regions[area.region].layerList.find(
      ((layer) => layer.chartCSSSelector === name)
    ).chartCSSColor;
    const allValues = Object.keys(selectedColorChart);
    const thisRange = `${allValues[0]}-${allValues[allValues.length - 1]}`;
    return thisRange;
  };
  const handleFeatureUpdate = useCallback((features) => {
    if (features) {
      const tempData = [];
      features.forEach((entry, index) => {
        tempData.push({
          areaName: entry.properties.areaName,
          areaIndex: index,
          leafletIds: entry.properties.leafletIds,
          region: entry.properties.region,
          zonalStatsData: entry.properties.zonalStatsData
        });
      });
      setChartData(tempData);
    }
  }, []);
  useEffect(() => {
    handleFeatureUpdate(featureList);
  }, [featureList, handleFeatureUpdate]);
  const dispatch = useDispatch();
  const analyzeAreaState = useSelector(AnalyzeAreaSelector);

  // handle state change Graph/Table
  const handleGraphOrTableClick = (newValue) => {
    dispatch(changeGraphTable());
  };

  // handle state change sort
  const handleSortClick = (newValue) => {
    // TODO will need to change this to add a menu to pick index
    //   aka Community Exposure, Resilience Hubs to sort by
    //   will need to keep the user generated areas together as a group
    dispatch(changeSortDirection());
  };

  // TODO this will also need to clear all the save results
  // from the store (from add areas) when its completed
  const HandleRemoveAllClick = (event) => {
    event.stopPropagation();
    // clear all layers from leaflet draw featureGroup and from state/redux
    leafletFeatureGroupRef.current.clearLayers();
    dispatch(removeAllFeaturesFromDrawnLayers());
    dispatch(changeEmptyState());
  };
  // This exports all data for all areas
  const handleExportClick = (event) => {
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

  return (
    <Grid container spacing={0} justifyContent="center" alignItems="center" px={0} pb={2} className={classes.gridHolder}>

      <Grid item xs={12} >
        <ChartHeaderActionButtons
          handleSortClick={handleSortClick}
          handleGraphOrTableClick={handleGraphOrTableClick}
          HandleRemoveAllClick={HandleRemoveAllClick}
          handleGenericClick={handleExportClick} />
      </Grid>

      {analyzeAreaState.isItAGraph ? (
        <Grid item xs={12} className={classes.contentBox}>
          <Box>
            {chartData.map((dataRow) => {
              const name = dataRow.areaName;
              const index = dataRow.areaIndex;
              const leafletIds = dataRow.leafletIds;
              const zonalStatsData = dataRow.zonalStatsData;
              const thisRegion = dataRow.region;

              return (
                <ChartCard
                  key={name}
                  areaName={name}
                  areaIndex={index}
                  leafletIds={leafletIds}
                  region={thisRegion}
                  zonalStatsData={zonalStatsData}
                  leafletFeatureGroupRef={leafletFeatureGroupRef}
                  map={map}
                />
              );
            })}
          </Box>
        </Grid>
      ) : (
        <Grid item xs={12} className={classes.contentBox}>
          <Box>
            <TableData data={chartData} />
          </Box>
        </Grid>
      )}

    </Grid>
  );
}

ChartsHolder.propTypes = {
  leafletFeatureGroupRef: PropTypes.object,
  map: PropTypes.object
};
