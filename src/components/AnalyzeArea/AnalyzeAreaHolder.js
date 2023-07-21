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
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';

import EmptyState from './EmptyState';
import ChartsHolder from './ChartsHolder';

// selector named functions for lint rules makes it easier to re-use if needed.
const AnalyzeAreaSelector = (state) => state.AnalyzeArea;

export default function AnalyzeAreaHolder(props) {
  const {
    boxHeight,
    boxMarginTop,
    leafletFeatureGroupRef,
    map,
    listOfDrawnLayers,
    setListOfDrawnLayers,
    setBufferGeo,
    bufferGeo
  } = props;
  const analyzeAreaState = useSelector(AnalyzeAreaSelector);

  return (
    <Box style={{ height: boxHeight, marginTop: boxMarginTop }}>
      {analyzeAreaState.isEmptyState ? (
        <EmptyState />
      ) : (
        <ChartsHolder
          boxHeight={boxHeight}
          leafletFeatureGroupRef={leafletFeatureGroupRef}
          map={map}
          listOfDrawnLayers={listOfDrawnLayers}
          setListOfDrawnLayers={setListOfDrawnLayers}
          setBufferGeo={setBufferGeo}
          bufferGeo={bufferGeo}
        />
      )}
    </Box>
  );
}

AnalyzeAreaHolder.propTypes = {
  boxHeight: PropTypes.string.isRequired,
  boxMarginTop: PropTypes.string,
  leafletFeatureGroupRef: PropTypes.object,
  map: PropTypes.object,
  listOfDrawnLayers: PropTypes.array
};
