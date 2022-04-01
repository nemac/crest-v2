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
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import LayersIcon from '@mui/icons-material/Layers';
import { mapConfig } from '../../configuration/config';



const regions = mapConfig.regions;

export default function MapLayerList() {
  const selectedRegion = useSelector((state) => state.selectedRegion.value)
  const regionLayers = regions[selectedRegion].layerList
  const chartsInputs = regions[selectedRegion].chartInputs
  const [layerListVisible, toggleVisible] = useState(true)

  const get_chart_layers = (targetChartLabel) => {
    var chartLayers = Array();
    regionLayers.map((layer) => {
      if (layer.ChartInputLabel == targetChartLabel) {
        chartLayers.push(layer.label);
      }
    })

    if (chartLayers.length > 0) {
      return chartLayers;
    }
    else {
      return [];
    }
  }

  const render_layer = (layerLabel) => {
    return (
      <AccordionDetails>
        <Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultUnchecked />} label={layerLabel} />
          </FormGroup>
        </Typography>
      </AccordionDetails>
    )
  }

  const render_accordion = (chartInputLabel) => {
    var chartLayerList = get_chart_layers(chartInputLabel);
    var isSummary = (chartInputLabel == "Summary");
    if (!isSummary) {
      return (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{chartInputLabel}</Typography>
          </AccordionSummary>
          {chartLayerList.map(layer => render_layer(layer))}
        </Accordion>
      );
    }
    else {
      return (
        <Accordion defaultExpanded>
          {chartLayerList.map(layer => render_layer(layer))}
        </Accordion>
      );
    }

  }
  if (layerListVisible) {
    return (
      <div>
        <Box>
          <Paper variant="outlined" square={false} sx={
            {
              width: 350, padding: '20px',
              backgroundColor: 'CRESTGridBackground.main',
              color: 'CRESTGridBackground.contrastText',
              borderColor: 'CRESTBorderColor.main'
            }} >
            Map Layers
            <Button variant='outlined' endIcon={<LayersIcon />} onClick={() => { toggleVisible(!layerListVisible); }} />
            <br />{chartsInputs.map(item => render_accordion(item['ChartInputLabel']))}
          </Paper>
        </Box>
      </div>
    )
  }
  else {
    return (
      <div>
        <Box >
          <Paper variant="outlined" square={false} sx={
            {
              width: 350,
              padding: '20px',
              backgroundColor: 'CRESTGridBackground.main',
              color: 'CRESTGridBackground.contrastText',
              borderColor: 'CRESTBorderColor.main'
            }} >
              Map Layers
            <Button variant='outlined' endIcon={<LayersIcon />} onClick={() => { toggleVisible(!layerListVisible); }}/>

          </Paper>
        </Box>
      </div>
    )
  }
}
