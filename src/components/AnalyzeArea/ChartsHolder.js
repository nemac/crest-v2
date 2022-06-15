/*
Purpose
  Shows chart when the user does analyze project site. Type of chart

  - format data for the chart from Zonal stats API JSON / GEOJSON
  - handle all the charts
    - details, inputs, and summary chart

  TODO needs menu for sort and export
        needs charts added

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
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';

import ChartCard from './ChartCard';
import ChartHeaderActionButtons from './ChartHeaderActionButtons';
import TableData from './TableData';

const useStyles = makeStyles((theme) => ({
  gridHolder: {
    height: '100%'
  },
  contentBox: {
    height: 'calc(100% - 112px)',
    paddingRight: theme.spacing(1.5),
    overflowY: 'scroll'
  }
}));

// sample configs to create the charts should come from state/redux later
// TODO config should be imported from config directory
const ResilienceRange = '1-10';
const CommunityExposureRange = '1-10';
const FishandWildlifeRange = '1-5';
const chartData = [
  {
    areaName: 'Area 1',
    indexes: [
      {
        name: 'Resilience Hubs',
        value: 8,
        range: ResilienceRange
      },
      {
        name: 'Community Exposure',
        value: 9,
        range: CommunityExposureRange
      },
      {
        name: 'Fish and Wildlife',
        value: 5,
        range: FishandWildlifeRange
      }
    ]
  },
  {
    areaName: 'Area 2',
    indexes: [
      {
        name: 'Resilience Hubs',
        value: 5,
        range: ResilienceRange
      },
      {
        name: 'Community Exposure',
        value: 4,
        range: CommunityExposureRange
      },
      {
        name: 'Fish and Wildlife',
        value: 2,
        range: FishandWildlifeRange
      }
    ]
  },
  {
    areaName: 'Area 3',
    indexes: [
      {
        name: 'Resilience Hubs',
        value: 2,
        range: ResilienceRange
      },
      {
        name: 'Community Exposure',
        value: 1,
        range: CommunityExposureRange
      },
      {
        name: 'Fish and Wildlife',
        value: 5,
        range: FishandWildlifeRange
      }
    ]
  },
  {
    areaName: 'Area 4',
    indexes: [
      {
        name: 'Resilience Hubs',
        value: 10,
        range: ResilienceRange
      },
      {
        name: 'Community Exposure',
        value: 10,
        range: CommunityExposureRange
      },
      {
        name: 'Fish and Wildlife',
        value: 5,
        range: FishandWildlifeRange
      }
    ]
  }
];

export default function ChartsHolder(props) {
  const classes = useStyles();
  const [isItAGraph, setisItAGraph] = useState(true);
  const [isSortASC, setisSortASC] = useState(true);
  const { onClick } = props;

  // handle state change Graph/Table
  const handleGraphOrTableClick = (newValue) => {
    setisItAGraph(!isItAGraph);
  };

  // handle state change sort
  const handleSortClick = (newValue) => {
    // TODO will need to change this to add a menu to pick index
    //   aka Community Exposure, Resilience Hubs to sort by
    //   will need to keep the user generated areas together as a group
    setisSortASC(!isSortASC);
  };

  // place holder for adding specfic click events
  const handleGenericClick = (event) => {
    event.stopPropagation();
    console.log('clicked'); // eslint-disable-line no-console
  };

  return (
    <Grid container spacing={0} justifyContent="center" alignItems="center" px={0} pb={2} className={classes.gridHolder}>

      <Grid item xs={12} >
        <ChartHeaderActionButtons
          handleSortClick={handleSortClick}
          handleGraphOrTableClick={handleGraphOrTableClick}
          HandleRemoveAllClick={onClick}
          handleGenericClick={handleGenericClick}
          isItAGraph={isItAGraph}
          isSortASC={isSortASC} />
      </Grid>

      {isItAGraph ? (
        <Grid item xs={12} className={classes.contentBox}>
          <Box>
            {chartData.map((dataRow) => {
              const name = dataRow.areaName;
              return <ChartCard key={name} areaName={name}/>;
            })}
          </Box>
        </Grid>
      ) : (
        <Grid item xs={12} className={classes.contentBox}>
          <Box>
            <TableData data={chartData} />
          </Box>
        </Grid>
      )}

    </Grid>
  );
}

ChartsHolder.propTypes = {
  onClick: PropTypes.func.isRequired
};
