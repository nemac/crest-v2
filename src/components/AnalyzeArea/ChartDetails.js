/*
Purpose
  Shows all the detailed charts when the user does analyze project site.
  and also clicks more.

  - format data for the chart from Zonal stats API JSON / GEOJSON
  - handle all the charts
    - details, inputs, and summary chart

Child Components
  - AnalyzeArea-ChartActionButtons.js

Libs
  - chart.js
  - Not sure yet

API
  - Zonal stats API JSON / GEOJSON
  - Not sure yet

State needed
  - More or less?
  - table or graph
  - Not sure yet

Props
  - GEOJSON data (to get properies aka attributes)
  - if details add export button
  - Not sure yet
*/
import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';

import ChartDetailsActionButtons from './ChartDetailsActionButtons';
import ChartSummary from './ChartSummary';

const useStyles = makeStyles((theme) => ({
  contentBox: {
    display: 'flex',
    width: '100%',
    height: '350px',
    maxHeight: '350px',
    padding: theme.spacing(0),
    backgroundColor: theme.palette.CRESTGridBackground.dark,
    borderColor: theme.palette.CRESTBorderColor.main,
    borderStyle: 'solid',
    borderWidth: '1px',
    borderBottom: '0px !important',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ChartDetailsButton: {
    display: 'flex',
    width: '100%'
  }
}));

export default function ChartDetails(props) {
  const classes = useStyles();
  const { areaName,
    areaIndex,
    zonalStatsData
  } = props;

  return (
    <div>
      <Box className={classes.contentBox} >
        <ChartSummary
          areaName={areaName}
          areaIndex={areaIndex}
          zonalStatsData={zonalStatsData}
          chartType={'Summary Chart'}
        />
      </Box>
      <ChartDetailsActionButtons areaIndex={areaIndex} />

      <Box className={classes.contentBox} >
      <ChartSummary
          areaName={areaName}
          areaIndex={areaIndex}
          zonalStatsData={zonalStatsData}
          chartType={'Fish and Wildlife Inputs'}
        />
      </Box>
      <ChartDetailsActionButtons areaIndex={areaIndex}/>

      <Box className={classes.contentBox} >
      <ChartSummary
          areaName={areaName}
          areaIndex={areaIndex}
          zonalStatsData={zonalStatsData}
          chartType={'Threats Inputs'}
        />
      </Box>
      <ChartDetailsActionButtons areaIndex={areaIndex}/>

      <Box className={classes.contentBox} >
      <ChartSummary
          areaName={areaName}
          areaIndex={areaIndex}
          zonalStatsData={zonalStatsData}
          chartType={'Community Assets Inputs'}
        />
      </Box>
      <ChartDetailsActionButtons areaIndex={areaIndex}/>

      <Box className={classes.contentBox} >
        Landcover Chart {areaName}
      </Box>
      <ChartDetailsActionButtons areaIndex={areaIndex}/>
    </div>
  );
}

ChartDetails.propTypes = {
  areaName: PropTypes.string.isRequired
};
