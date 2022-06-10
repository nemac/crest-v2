/*
Purpose
  There are two types of groups the drivers and the main layers,
  for lack of not knowing what to call them.
  The main, in this case, is static

  this will change when regions change

  might be able to merge this with MapLayerList-LayerGroup have
  collapsible as true and as sub menue for background color change

  Community Exposure Index
    - Community Exposure Index

  Community Asset and Threat Indices
    - Community Asset Index
    - Threat Index

  we should probably use a config as we did in v1

Child Components
  - MapLayerList-Layer.js
  - MapLayerList-LayerLegend.js
  - MapLayerList-LayerDescription.js

Libs
  - Not sure yet

API
  - Not sure yet

State needed
  - list of layers in group
  - Not sure yet

Props
  - group name
  - list of layers in group
  - Not sure yet
*/

import React from 'react'
import PropTypes from 'prop-types';
import Accordion from '@mui/material/Accordion';
import Layer from './Layer'

export default function LayerGroup(props) {
  const {chartInputLabel, chartLayerList} = props ;

    return (
      <Accordion defaultExpanded>
        {chartLayerList.map(layer => <Layer key={layer.label} layerData={layer}/>)}
      </Accordion>
    );
  }

LayerGroup.propTypes = {
  chartInputLabel: PropTypes.string.isRequired,
  chartLayerList: PropTypes.array.isRequired
};
