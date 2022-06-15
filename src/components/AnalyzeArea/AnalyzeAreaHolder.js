/*
Purpose
  shows empty state if user has not completed an analyze area yet,
  otherwise shows a chart/table/detailed chart

    TODO still needs logic for checking state
          if a user has not completed an analyze area yet

Child Components
  - EmptyState.js
  - Chart.js
  - Table.js

Libs
  - Not sure yet

API
  - Not sure yet

State needed
  - More or less?

Props
  - Not sure yet
*/
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import EmptyState from './EmptyState';
import ChartsHolder from './ChartsHolder';

export default function AnalyzeAreaHolder(props) {
  const { boxHeight, boxMarginTop } = props;
  const [isEmptyState, setIsEmptyState] = useState(true);

  // place holder for adding specfic click events
  const handleEmptyStateClick = (event) => {
    event.stopPropagation();
    setIsEmptyState(!isEmptyState);
    console.log('clicked'); // eslint-disable-line no-console
  };

  return (
    <Box style={{ height: boxHeight, marginTop: boxMarginTop }}>
      {isEmptyState ? (
        <EmptyState onClick={handleEmptyStateClick}å/>
      ) : (
        <ChartsHolder onClick={handleEmptyStateClick} boxHeight={boxHeight}/>
      )}
    </Box>
  );
}

AnalyzeAreaHolder.propTypes = {
  boxHeight: PropTypes.string.isRequired,
  boxMarginTop: PropTypes.string
};
