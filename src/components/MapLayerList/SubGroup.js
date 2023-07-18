import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

import Layer from './Layer';

export default function SubGroup(props) {
  const { subHeading, subLayers } = props;

  const buildSubListings = (value) => (
    subLayers.map((layer) => <Layer key={layer.id} layerData={layer} layerName={value}/>)
  );

  return (
    <Box component="div" pt={2}>
      <Box component="div" sx={{ fontWeight: '500', fontSize: '1rem', letterSpacing: '0.02857em' }}>
        {subHeading}
      </Box>
      {buildSubListings(subHeading)}
    </Box>
  );
}

SubGroup.propTypes = {
  subLayers: PropTypes.array.isRequired,
  subHeading: PropTypes.string.isRequired
};
