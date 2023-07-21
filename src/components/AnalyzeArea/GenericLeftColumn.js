import React from 'react';
import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { PropTypes } from 'prop-types';

import ChartHeaderActionButtonsHolder from './GenericChartHeaderActionButtons';

export default function GenericLeftColumn(props) {
  const {
    mapActionCard, chartHeaderActionButtons, chartCard, tableData,
    isItAGraph, noDataState, optionalComponent
  } = props;

  return (
    <Box>
      {mapActionCard}
      <Box sx={{ height: 'calc(100% - 258px)', marginTop: '8px' }}>
        {chartCard?.props?.chartData === undefined || chartCard?.props?.chartData.length === 0 ? (
          noDataState
        ) : (
          <Grid container spacing={0} justifyContent="center" alignItems="center" px={0} pb={2} sx={{ height: '100%' }}>
            <Grid xs={12} >
              {optionalComponent}
            </Grid>
            <Grid xs={12}>
              <ChartHeaderActionButtonsHolder
                title='Where Should I Do a Resilience Project'
                actionButtons={chartHeaderActionButtons}
              />
            </Grid>
            <Grid xs={12} sx={{ height: 'calc(100% - 112px)', paddingRight: (theme) => theme.spacing(1.5), overflowY: 'scroll' }}>
              <Box>
                {isItAGraph ? (
                  chartCard
                ) : (
                  tableData
                )}
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
}

GenericLeftColumn.propTypes = {
  mapActionCard: PropTypes.node,
  isItAGraph: PropTypes.bool,
  chartCard: PropTypes.node,
  tableData: PropTypes.node,
  chartHeaderActionButtons: PropTypes.array,
  noDataState: PropTypes.any,
  optionalComponent: PropTypes.node
};
