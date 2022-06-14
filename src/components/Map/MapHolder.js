/*
Purpose
  holds map and map layer list and graphs/charts

Child Components
  - Map.js  ——— the map
  - MapLayerList.js ——— the list of map layers
  - not sure yet something to hold all the analyze area and chart interactions

Libs
  - Not sure yet

API
  - Not sure yet

State needed
  - Not sure yet
Props
  - Not sure yet

*/
import * as React from 'react';
// import PropTypes from 'prop-types';

import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import MapCard from './MapCard';
import MapActionCard from './MapActionCard';
import Boxforlayout from './BoxForLayouts';

const useStyles = makeStyles((theme) => ({
  threeColumnHolder: {
    padding: theme.spacing(0.2),
    height: '100%'
  },
  contentHolder: {
    height: 'calc(100% - 115px)',
    [theme.breakpoints.down('md')]: {
      height: 'calc(100% - 56px)'
    }
  },
  contentBox: {
    // height: '100%',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.CRESTGridBackground.dark,
    borderColor: theme.palette.CRESTBorderColor.main,
    borderStyle: 'solid',
    borderWidth: '1px'
  },
  contentmapBox: {
    // height: '100%',
    padding: theme.spacing(0),
    backgroundColor: theme.palette.CRESTGridBackground.dark,
    borderColor: theme.palette.CRESTBorderColor.main,
    borderStyle: 'solid',
    borderWidth: '1px'
  },
  guttter: {
    padding: `${theme.spacing(0)} !important`,
    height: theme.spacing(0),
    [theme.breakpoints.down('md')]: {
      height: theme.spacing(1)
    }
  }
}));

export default function MapHolder(props) {
  const classes = useStyles();

  return (
    <Grid container
      spacing={0}
      rowSpacing={{ xs: 1, sm: 1, md: 0 }}
      px={1}
      pb={{ xs: 1, sm: 1, md: 0 }}
      pt={{ xs: 0.5, sm: 0.5, md: 0 }}
      justify="space-between"
      alignItems="stretch"
      className={classes.contentHolder}>

       {/* Data (graph/chart/table, action buttons) */}
      <Grid item
        xs={12} sm={12} md={4} lg={3}
        order={{ xs: 3, sm: 3, md: 1 }}
        className={classes.threeColumnHolder}>
        <MapActionCard />
        <Boxforlayout
          boxHeight={'calc(100% - 258px)'}
          boxMarginTop={'8px'}>
          Graphs/Data/Messages, this is a place holder for the actual component
        </Boxforlayout>
      </Grid>

      {/* Map */}
     <Grid item
       xs={12} sm={12} md={5} lg={7}
       order={{ xs: 1, sm: 1, md: 2 }}
       className={classes.threeColumnHolder}>
       <Box className={classes.contentmapBox} style={{ height: '100%' }}>
         <MapCard />
       </Box>
     </Grid>

     {/* Layer List */}
      <Grid item
        xs={12} sm={12} md={3} lg={2}
        order={{ xs: 2, sm: 2, md: 3 }}
        className={classes.threeColumnHolder}>
        <Boxforlayout
          boxHeight={'100%'} >
          Map Layer List, this is a place holder for the actual component
        </Boxforlayout>
      </Grid>

      {/* Adds bottom padding for small screens this is hacky need another way to handle this */}
       <Grid item xs={12} order={4} className={classes.guttter} />

    </Grid>
  );
}
