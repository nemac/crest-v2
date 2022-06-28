import React from 'react';
import PropTypes from 'prop-types';
import Accordion from '@mui/material/Accordion';
import SubGroup from './SubGroup';

export default function LayerGroup(props) {
  const { chartLayerList } = props;
  const subListings = {};
  chartLayerList.forEach((layer) => {
    if (!(layer.ChartInputSubHeading in subListings)) {
      subListings[layer.ChartInputSubHeading] = [layer];
    } else {
      subListings[layer.ChartInputSubHeading].push(layer);
    }
  });

  return (
    <Accordion defaultExpanded>
      {/* eslint-disable-next-line max-len */}
      {Object.entries(subListings).map(([head, list]) => <SubGroup key={head} subHeading={head} subLayers={list} />)}
    </Accordion>
  );
}

LayerGroup.propTypes = {
  chartLayerList: PropTypes.array.isRequired
};
