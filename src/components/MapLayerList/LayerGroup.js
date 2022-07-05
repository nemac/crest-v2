import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
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
    <Box px={0.5}>
      {/* eslint-disable-next-line max-len */}
      {Object.entries(subListings).map(([head, list]) => <SubGroup key={head} subHeading={head} subLayers={list} />)}
    </Box>
  );
}

LayerGroup.propTypes = {
  chartLayerList: PropTypes.array.isRequired
};
