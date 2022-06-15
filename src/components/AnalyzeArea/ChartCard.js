/*
Purpose
  The component holds the summary chart and action buttons. This should be the summary chart only
  when user hovers overs will need to highlight the shape on the map

Child Components
  - AnalyzeArea-ChartActionButtons.js
  - AnalyzeArea-Chart.js

Libs
  - Not sure yet

API
  - Not sure yet

State needed
  - More or less?
  - Not sure yet

Props
  - Not sure yet
*/
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Grid from '@mui/material/Grid';

import ChartSummary from './ChartSummary';
import ChartDetails from './ChartDetails';
import ChartActionButtons from './ChartActionButtons';

export default function ChartCard(props) {
  const { areaName } = props;
  const [isMore, setisMore] = useState(false);

  // handle state change Graph/Table
  const handleSummaryChartMoreClick = (newValue) => {
    setisMore(!isMore);
    console.log(`clicked more ${isMore}`); // eslint-disable-line no-console
  };

  // place holder for later wanted to add a click handler for graph or tqble
  const handleGenericClick = (event) => {
    event.stopPropagation();
    console.log('clicked'); // eslint-disable-line no-console
  };

  return (
    <Grid container spacing={0} justifyContent="center" alignItems="center" px={0} pb={4} >
        {isMore ? (

          <div style={{ width: '100%' }}>
            <Grid item xs={12} >
              <ChartDetails areaName={areaName}/>
            </Grid>

            <Grid item xs={12} >
              <ChartActionButtons
                isMore={isMore}
                moreOnClick={handleSummaryChartMoreClick}
                exportOnClick={handleGenericClick}
                zoomOnClick={handleGenericClick}
                removeOnClick={handleGenericClick}
                />
            </Grid>
          </div>

        ) : (

          <div style={{ width: '100%' }}>
            <Grid item xs={12} >
              <ChartSummary areaName={areaName}/>
            </Grid>

            <Grid item xs={12} >
              <ChartActionButtons
                isMore={isMore}
                moreOnClick={handleSummaryChartMoreClick}
                exportOnClick={handleGenericClick}
                zoomOnClick={handleGenericClick}
                removeOnClick={handleGenericClick}
                />
            </Grid>
          </div>
        )}

    </Grid>
  );
}

ChartCard.propTypes = {
  areaName: PropTypes.string.isRequired
};
