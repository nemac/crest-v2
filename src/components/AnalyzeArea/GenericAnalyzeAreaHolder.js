import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';

import EmptyState from './EmptyState';
import ChartsHolder from './ChartsHolder';

// selector named functions for lint rules makes it easier to re-use if needed.
const AnalyzeAreaSelector = (state) => state.AnalyzeArea;

export default function GenericAnalyzeAreaHolder(props) {
  const {
    boxHeight,
    boxMarginTop,
    leafletFeatureGroupRef,
    map
  } = props;
  const analyzeAreaState = useSelector(AnalyzeAreaSelector);


  const getChildByDisplayName = (displayName) => {
    const foundChild = React.Children.map(props.children, ((child) => {
      // you can access displayName property by child.type.displayName
      if (child.type.displayName === displayName) return child;
      return null;
    }));
    return foundChild;
  };

  // Set the boundary of the charts holder
  // generic empty state for both resilience and analyze
  // generic chart and table for both resilience and analyze
  return (
    <Box sx={{ height: 'calc(100% - 258px)', marginTop: '8px' }}>
      <ChartsHolder
        boxHeight={boxHeight}
        leafletFeatureGroupRef={leafletFeatureGroupRef}
        map={map}
      />
      {getChildByDisplayName('ChartCard')}
    </Box>
  );
}

GenericAnalyzeAreaHolder.propTypes = {
  leafletFeatureGroupRef: PropTypes.object,
  map: PropTypes.object
};
