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
    map
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
        />
      )}
    </Box>
  );
}

AnalyzeAreaHolder.propTypes = {
  boxHeight: PropTypes.string.isRequired,
  boxMarginTop: PropTypes.string,
  leafletFeatureGroupRef: PropTypes.object,
  map: PropTypes.object
};
