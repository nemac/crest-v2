import React from 'react';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

import Layer from './Layer';

const useStyles = makeStyles((theme) => ({
  subHeading: {
    fontWeight: '500',
    fontSize: '1rem',
    letterSpacing: '0.02857em'
  }
}));

export default function SubGroup(props) {
  const { subHeading, subLayers } = props;
  const classes = useStyles();

  const buildSubListings = (value) => (
    subLayers.map((layer) => <Layer key={layer.id} layerData={layer} layerName={value}/>)
  );

  return (
    <Box component="div" pt={2}>
      <Box component="div" className={classes.subHeading}>
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
