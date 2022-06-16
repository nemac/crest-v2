/*
Purpose
  There are two types of groups the drivers and the main layers,
  for lack of not knowing what to call them.
  The drivers, in this case, will need to be collapsible

  This will change when regions change

  might be able to merge this with MapLayerList-LayerGroup
  have collapsible as true and as sub menue for background color change

  has only the layers that are grouped with the main layer
  such as which can change for different layers
  Community Asset Inputs
    - Critical Facilities
    - Critical Infrastructure
    - etc

  Threat Inputs
    - Areas of Low Slope
    - etc

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
  - Collapsed or not
  - list of layers in group
  - Not sure yet

Props
  - group name
  - collapsed or not
  - list of layers in group
  - Not sure yet
*/
import React from 'react';
import PropTypes from 'prop-types';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import Layer from './Layer';
import { toggleCollapsed } from '../../reducers/mapLayerListSlice';

export default function DriverGroup(props) {
  const dispatch = useDispatch();
  const { chartInputLabel, chartLayerList } = props;
  const expandedChartsSelector = (state) => state.mapLayerList.expandedCharts;
  const expandedCharts = useSelector(expandedChartsSelector);
  const isExpanded = expandedCharts.includes(chartInputLabel);

  const onClick = () => {
    dispatch(toggleCollapsed(chartInputLabel));
  };

  return (
    <Accordion expanded={isExpanded} onChange={onClick}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{chartInputLabel}</Typography>
        </AccordionSummary>
        {chartLayerList.map((layer) => <Layer key={layer.id} lData={layer}/>)}
      </Accordion>
  );
}

DriverGroup.propTypes = {
  chartInputLabel: PropTypes.string.isRequired,
  chartLayerList: PropTypes.array.isRequired
};
