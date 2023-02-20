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
import { removeAllFeaturesFromAnalyzedAreas } from '../../reducers/mapPropertiesSlice';
import ChartCard from './ChartCard';
import ChartHeaderActionButtons from './ChartHeaderActionButtons';
import TableData from './TableData';

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
const AnalyzeAreaSelector = (state) => state.AnalyzeArea;
const zonalStatsAnalyzedAreasSelector = (state) => state.mapProperties.analyzedAreas;

export default function ChartsHolder(props) {
  const { leafletDrawFeatureGroupRef, chartRemoveButtonId } = props;
  const zonalStatsAnalyzedAreas = useSelector(zonalStatsAnalyzedAreasSelector);
  const featureList = zonalStatsAnalyzedAreas.features;
  const [chartData, setChartData] = useState([]);
  const classes = useStyles();
  const handleFeatureUpdate = useCallback((features) => {
    if (features) {
      const tempData = [];
      features.forEach((entry, index) => {
        tempData.push({
          areaName: entry.properties.areaName,
          areaIndex: index,
          zonalStatsData: entry.properties.mean
        });
      });
      setChartData(tempData);
    }
  }, []);
  useEffect(() => {
    handleFeatureUpdate(featureList);
    // console.log(chartData.current);
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
    leafletDrawFeatureGroupRef.current.clearLayers();
    dispatch(removeAllFeaturesFromAnalyzedAreas());
    dispatch(changeEmptyState());
  };

  // place holder for adding specfic click events
  const handleGenericClick = (event) => {
    event.stopPropagation();
    console.log('clicked'); // eslint-disable-line no-console
  };

  return (
    <Grid container spacing={0} justifyContent="center" alignItems="center" px={0} pb={2} className={classes.gridHolder}>

      <Grid item xs={12} >
        <ChartHeaderActionButtons
          handleSortClick={handleSortClick}
          handleGraphOrTableClick={handleGraphOrTableClick}
          HandleRemoveAllClick={HandleRemoveAllClick}
          handleGenericClick={handleGenericClick} />
      </Grid>

      {analyzeAreaState.isItAGraph ? (
        <Grid item xs={12} className={classes.contentBox}>
          <Box>
            {chartData.map((dataRow) => {
              const name = dataRow.areaName;
              const index = dataRow.areaIndex;
              const zonalStatsData = dataRow.zonalStatsData;
              return (
                <ChartCard
                  key={name}
                  areaName={name}
                  index={index}
                  zonalStatsData={zonalStatsData}
                  leafletDrawFeatureGroupRef={leafletDrawFeatureGroupRef}
                  chartRemoveButtonId={chartRemoveButtonId}
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
  leafletDrawFeatureGroupRef: PropTypes.object,
  chartRemoveButtonId: PropTypes.array
};
