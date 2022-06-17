/*
Purpose
  HOLDS all the map layers and change basemap/region
  this will change when regions change

Child Components
  - MapLayerList-ChangeItemMenu.js
  - MapLayerList-ChangeItemButton.js
  - MapLayerList-Layer.js
  - MapLayerList-LayerLegend.js
  - MapLayerList-LayerDescription.js
  - MapLayerList-DriverGroup.js
  - MapLayerList-LayerGroup.js

Libs
  - leaflet

API
  - None

State needed
  - map layer list visible/open

Props
  - map layer list visible/open
  - probably missing things and not sure we want props passsed down form here
*/
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton } from '@mui/material/';
import Grid from '@mui/material/Grid';
import { ArrowDropDownCircle } from '@mui/icons-material';
import { mapConfig } from '../../configuration/config';
import { toggleVisible } from '../../reducers/mapLayerListSlice';
import LayerGroup from './LayerGroup';
import DriverGroup from './DriverGroup';

const regions = mapConfig.regions;

export default function MapLayerList() {
  // Read in Selected region and separate layers and charts
  const dispatch = useDispatch();
  const regionSelector = (state) => state.selectedRegion.value;
  const listVisibleSelector = (state) => state.mapLayerList.visible;
  const selectedRegion = useSelector(regionSelector);
  const regionLayers = regions[selectedRegion].layerList;
  const chartsInputs = regions[selectedRegion].chartInputs;
  // Create state for layer list visibility
  const layerListVisible = useSelector(listVisibleSelector);

  /* Iterate through every label containing target chart and create an array of labels
  This logic could be moved into LayerGroup.js
  */
  const getChartLayers = (targetChartLabel) => {
    const chartLayers = [];
    regionLayers.map((layer) => {
      if (layer.ChartInputLabel === targetChartLabel) {
        chartLayers.push(layer);
        return true;
      }
      return false;
    });

    if (chartLayers.length > 0) {
      return chartLayers;
    }
    return [];
  };

  /* build an accordion for target chart input. If chart is summary,
  no typography is used.  Then render an entry for each label in the chart.
  This logic could be moved to LayerGroup.js
  */
  const renderAccordion = (chInLabel) => {
    const chartLayerList = getChartLayers(chInLabel);
    const isSummary = (chInLabel === 'Summary');
    if (isSummary) {
      return (
        <LayerGroup key={chInLabel} chartInputLabel={chInLabel} chartLayerList={chartLayerList} />
      );
    }
    return (
        <DriverGroup key={chInLabel} chartInputLabel={chInLabel} chartLayerList={chartLayerList} />
    );
  };
  // Rendered Map Layer List
  if (layerListVisible) {
    return (
            <Grid>
              Map Layers
            <IconButton onClick={() => { dispatch(toggleVisible()); }} >
            <ArrowDropDownCircle />
            </IconButton>
            <br />{chartsInputs.map((item) => renderAccordion(item.ChartInputLabel))}
            </Grid>
    );
  }
  return (
            <Grid>
              Map Layers
              <IconButton onClick={() => { dispatch(toggleVisible()); }} >
            <ArrowDropDownCircle sx={ { transform: 'rotate(-180deg)' } } />
            </IconButton>
            </Grid>
  );
}
