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
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Layer from './Layer'

export default function LayerGroup(props) {
  const {isSummary, chartInputLabel, chartLayerList} = props ;
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
        {/* {chartLayerList.map(layer => render_layer(layer))} */}
        {chartLayerList.map(layer => <Layer layerLabel={layer}/>)}
      </Accordion>
    );
  }
  else {
    return (
      <Accordion defaultExpanded>
        {chartLayerList.map(layer => <Layer layerLabel={layer}/>)}
      </Accordion>
    );
  }

}
LayerGroup.propTypes = {
  isSummary: PropTypes.bool.isRequired,
  chartInputLabel: PropTypes.string.isRequired,
  chartLayerList: PropTypes.array.isRequired
};
//   return (
//     <div>LayerGroup
      
//     </div>
//   )
// }
