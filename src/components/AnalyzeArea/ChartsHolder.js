import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import {
  changeGraphTable,
  changeSortDirection
} from '../../reducers/analyzeAreaSlice';
import ChartCard from './ChartCard';
import ChartHeaderActionButtons from './ChartHeaderActionButtons';
import TableData from './TableData';
import { handleExportCSV, HandleRemoveAllClick } from './ChartFunctions';

// selector named functions for lint rules makes it easier to re-use if needed.
const AnalyzeAreaSelector = (state) => state.AnalyzeArea;

export default function ChartsHolder(props) {
  const {
    map, setHover, featureGroupRef, chartData
  } = props;

  const dispatch = useDispatch();
  const analyzeAreaState = useSelector(AnalyzeAreaSelector);

  // handle state change Graph/Table
  const handleGraphOrTableClick = (newValue) => {
    dispatch(changeGraphTable());
  };

  // handle state change sort
  const handleSortClick = (newValue) => {
    // TODO will need to change this to add a menu to pick index
    //   aka Community Exposure, Resilience Hubs to sort by
    //   will need to keep the user generated areas together as a group
    dispatch(changeSortDirection());
  };

  return (
    <Grid container spacing={0} justifyContent="center" alignItems="center" px={0} pb={2} sx={{ height: '100%' }}>
      <Grid xs={12} >
        <ChartHeaderActionButtons
          handleSortClick={handleSortClick}
          handleGraphOrTableClick={handleGraphOrTableClick}
          HandleRemoveAllClick={
            (e) => { HandleRemoveAllClick(e, dispatch, featureGroupRef); }
          }
          handleGenericClick={handleExportCSV} />
      </Grid>

      {analyzeAreaState.isItAGraph ? (
        <Grid xs={12} sx={{ height: 'calc(100% - 112px)', paddingRight: (theme) => theme.spacing(1.5), overflowY: 'scroll' }}>
          <Box>
            {chartData.map((feature, index) => (
              <ChartCard
                key={feature.properties.areaName}
                feature={feature}
                areaName={feature.properties.areaName}
                areaIndex={index}
                region={feature.properties.region}
                zonalStatsData={feature.properties.zonalStatsData}
                layerToRemove={feature}
                featureGroupRef={featureGroupRef}
                map={map}
                setHover={setHover}
              />
            ))}
          </Box>
        </Grid>
      ) : (
        <Grid xs={12}
          sx={{ height: 'calc(100% - 112px)', paddingRight: (theme) => theme.spacing(1.5), overflowY: 'scroll' }}
        >
          <Box>
            {chartData.map((feature, index) => (
              <TableData key={`${feature.properties.areaName} + table`} data={feature} />
            ))}
          </Box>
        </Grid>
      )}

    </Grid>
  );
}

ChartsHolder.propTypes = {
  map: PropTypes.object,
  setHover: PropTypes.func,
  featureGroupRef: PropTypes.object,
  chartData: PropTypes.array
};
