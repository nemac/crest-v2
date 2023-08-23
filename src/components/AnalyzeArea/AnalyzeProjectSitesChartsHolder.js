import React, { useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import {
  changeGraphTable,
  changeSortExpanded
} from '../../reducers/analyzeAreaSlice';
import ChartCard from './AnalyzeProjectSitesChartCard';
import ChartHeaderActionButtons from './ChartHeaderActionButtons';
import TableData from './AnalyzeProjectSitesTableData';
import { ChartSortHolder } from './ChartSortHolder';
import { handleExportAllCSV, HandleRemoveAllClick } from './ChartFunctions';

// selector named functions for lint rules makes it easier to re-use if needed.
const analyzeAreaSelector = (state) => state.analyzeArea;

export default function ChartsHolder(props) {
  const {
    map, setHover, featureGroupRef, chartData
  } = props;

  const dispatch = useDispatch();
  const analyzeAreaState = useSelector(analyzeAreaSelector);
  const sortedChartData = useRef([...chartData]);

  const sortCharts = useCallback((chartIndex) => {
    sortedChartData.current = [...chartData];
    if (analyzeAreaState.isSortASC) {
      sortedChartData.current.sort(
        (a, b) => b.properties.zonalStatsData[chartIndex] -
          a.properties.zonalStatsData[chartIndex]
      ); // Asending sort
    } else {
      sortedChartData.current.sort(
        (a, b) => a.properties.zonalStatsData[chartIndex] -
          b.properties.zonalStatsData[chartIndex]
      ); // Descending sort
    }
  }, [analyzeAreaState.isSortASC, sortedChartData, chartData]);

  sortCharts(analyzeAreaState.sortBy);

  // handle state change Graph/Table
  const handleGraphOrTableClick = (newValue) => {
    dispatch(changeGraphTable());
  };

  // handle state change sort
  const handleSortClick = (newValue) => {
    dispatch(changeSortExpanded());
    // dispatch(changeChartSortDirection()); // Sort an individual chart ascending or not
  };

  return (
    <Grid
      container
      spacing={0}
      justifyContent="center"
      alignItems="center"
      px={0}
      pb={2}
      sx={{ height: '100%' }}
    >
      <Grid xs={12}>
        <ChartHeaderActionButtons
          handleSortClick={handleSortClick}
          handleGraphOrTableClick={handleGraphOrTableClick}
          HandleRemoveAllClick={(e) => {
            HandleRemoveAllClick(e, dispatch, featureGroupRef);
          }}
          handleExportClick={(e) => {
            handleExportAllCSV(e, chartData);
          }}
        />
        {analyzeAreaState.isSortExpanded ? <ChartSortHolder /> : null}
      </Grid>

      {analyzeAreaState.isItAGraph ? (
        <Grid
          xs={12}
          sx={{
            height: 'calc(100% - 112px)',
            paddingRight: (theme) => theme.spacing(1.5),
            overflowY: 'scroll'
          }}
        >
          <Box>
            {analyzeAreaState.sortBy ?
              sortedChartData.current.map((feature, index) => (
                  <ChartCard
                    key={feature.properties.areaName}
                    feature={feature}
                    region={feature.properties.region}
                    zonalStatsData={feature.properties.zonalStatsData}
                    featureGroupRef={featureGroupRef}
                    map={map}
                    setHover={setHover}
                  />
              )) :
              chartData
                .reverse()
                .map((feature, index) => (
                    <ChartCard
                      key={feature.properties.areaName}
                      feature={feature}
                      region={feature.properties.region}
                      zonalStatsData={feature.properties.zonalStatsData}
                      featureGroupRef={featureGroupRef}
                      map={map}
                      setHover={setHover}
                    />
                ))}
          </Box>
        </Grid>
      ) : (
        <Grid
          xs={12}
          sx={{
            height: 'calc(100% - 112px)',
            paddingRight: (theme) => theme.spacing(1.5),
            overflowY: 'scroll'
          }}
        >
          <Box>
            {chartData.reverse().map((feature, index) => (
              <TableData
                key={`${feature.properties.areaName} + table`}
                data={feature}
              />
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
