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

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Accordion from '@mui/material/Accordion';
import Layer from './Layer';

export default function LayerGroup(props) {
  const { chartLayerList } = props;
  const subHeadings = [];
  const subListings = {};
  chartLayerList.forEach((layer) => {
    if (!subHeadings.includes(layer.ChartInputSubHeading)) {
      subHeadings.push(layer.ChartInputSubHeading);
      subListings[layer.ChartInputSubHeading] = [layer];
    } else {
      subListings[layer.ChartInputSubHeading].push(layer);
    }
  });
  const buildSubListings = (subHeading) => (
    subListings[subHeading].map((layer) => <Layer key={layer.id} lData={layer} />)
  );
  const buildSubGroup = (subHeading) => (
    <Fragment>
    <h4>{subHeading}</h4>
    {buildSubListings(subHeading)}
    </Fragment>
  );

  return (
    <Accordion defaultExpanded>
      {subHeadings.map((subHeading) => buildSubGroup(subHeading))}
    </Accordion>
  );
}

LayerGroup.propTypes = {
  chartLayerList: PropTypes.array.isRequired
};
