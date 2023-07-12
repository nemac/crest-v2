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
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Grid from '@mui/material/Unstable_Grid2';

import ChartSummary from './ChartSummary';
import ChartDetails from './ChartDetails';
import ChartActionButtons from './ChartActionButtons';

// selector named functions for lint rules makes it easier to re-use if needed.
const AnalyzeAreaSelector = (state) => state.AnalyzeArea;
const selectedRegionSelector = (state) => state.selectedRegion.value;

export default function ChartCard(props) {
  const {
    areaName,
    areaIndex,
    leafletIds,
    zonalStatsData,
    region,
    leafletFeatureGroupRef,
    map
  } = props;
  const summaryIndices = ['hubs', 'exposure', 'asset', 'threat', 'wildlife'];
  const analyzeAreaState = useSelector(AnalyzeAreaSelector);
  const selectedRegion = useSelector(selectedRegionSelector);
  if (region === selectedRegion) {
    return (
      <Grid container spacing={0} justifyContent="center" alignItems="center" px={0} pb={4} >
        {analyzeAreaState.isMore[areaName] ? (

          <div style={{ width: '100%' }}>
            <Grid xs={12} >
              <ChartDetails areaName={areaName}
                areaIndex={areaIndex}
                region={region}
                map={map}
                zonalStatsData={zonalStatsData} />
            </Grid>

            <Grid xs={12} >
              <ChartActionButtons
                areaName={areaName}
                areaIndex={areaIndex}
                data={zonalStatsData}
                leafletFeatureGroupRef={leafletFeatureGroupRef}
                map={map}
              />
            </Grid>
          </div>

        ) : (

          <div style={{ width: '100%' }}>
            <Grid xs={12} >
              <ChartSummary
                areaName={areaName}
                areaIndex={areaIndex}
                zonalStatsData={zonalStatsData}
                chartRegion={region}
                chartIndices={summaryIndices}
                chartType={'Summary Chart'}
                map={map}
              />
            </Grid>

            <Grid xs={12} >
              <ChartActionButtons
                areaName={areaName}
                areaIndex={areaIndex}
                data={zonalStatsData} // need to pick out the Summary
                leafletFeatureGroupRef={leafletFeatureGroupRef}
                leafletIds={leafletIds}
                map={map}
              />
            </Grid>
          </div>
        )}

      </Grid>
    );
  }
}

ChartCard.propTypes = {
  areaName: PropTypes.string.isRequired,
  areaIndex: PropTypes.number.isRequired,
  leafletIds: PropTypes.array,
  zonalStatsData: PropTypes.object,
  region: PropTypes.string,
  leafletFeatureGroupRef: PropTypes.object,
  map: PropTypes.object
};
