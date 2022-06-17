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
