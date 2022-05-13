/*
Purpose
  The About page has a series of cards for descriptions of selected layers.
  The descriptions provide information about how different layers were created used in the
  NFWF assessment. e.g., Resilience Hubs, Community Exposure Index, Fish, and Wildlife

  The is component handles all the content needed for individual descriptions

Child Components
  - Not sure yet

Libs
  - Not sure yet

API
  - Not sure yets

State needed
  - Not sure yet

Props
  - the title
  - an image used as an example true all false
  - text description (needs to be able to handle HTML (e.g., links, lists, emailto)
*/
import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

export default function AboutTabPannel (props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`about-tab-index-${index}`}
      aria-labelledby={`about-tab-index-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

AboutTabPannel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
