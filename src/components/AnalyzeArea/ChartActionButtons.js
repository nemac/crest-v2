/*
Purpose
  The component holds all the action buttons for each chart/area. Each chart are the zonal
  set of statistics for an Area the user-designated on the map.

  The button is one of the following:
   - more/less (more provides all the detailed charts, less and the default is the summary map)
   - export (the map to png/svg)
   - zoom (zoom/pan the map to the area)
   - Remove Area (removes the area from the map)

   Do we need to decide of the button action happens here?

Child Components
- AnalyzeArea-ChartActionButton.js

Libs
  - Not sure yet

API
  - Not sure yets

State needed
  - More or less?

Props
  - Not sure yet
*/
import * as React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

import {
  CameraAlt,
  DeleteForever,
  MoreHorizOutlined,
  CenterFocusStrong
} from '@mui/icons-material';

import ChartActionButton from './ChartActionButton';

const useStyles = makeStyles((theme) => ({
  contentBox: {
    height: theme.spacing(8),
    maxHeight: theme.spacing(8),
    backgroundColor: theme.palette.CRESTGridBackground.dark,
    borderColor: theme.palette.CRESTBorderColor.main,
    borderStyle: 'solid',
    borderWidth: '1px'
  }
}));

export default function ChartActionButtons(props) {
  const classes = useStyles();

  const {
    moreOnClick,
    exportOnClick,
    zoomOnClick,
    removeOnClick,
    isMore
  } = props;

  return (
    <Grid container spacing={0} justifyContent="center" alignItems="center" p={0} className={classes.contentBox}>
      <Grid item xs={3} >
        <ChartActionButton
          buttonLabel={isMore ? 'Less' : 'More'}
          buttonName={isMore ? 'Less' : 'More'}
          onClick={moreOnClick}>
          <MoreHorizOutlined />
        </ChartActionButton>
      </Grid>
      <Grid item xs={3}>
        <ChartActionButton
          buttonLabel={'Export'}
          buttonName={'Export'}
          onClick={exportOnClick}>
          <CameraAlt />
        </ChartActionButton>
      </Grid>
      <Grid item xs={3}>
        <ChartActionButton
          buttonLabel={'Zoom'}
          buttonName={'Zoom'}
          onClick={zoomOnClick}>
          <CenterFocusStrong />
        </ChartActionButton>
      </Grid>
      <Grid item xs={3}>
        <ChartActionButton
          buttonLabel={'Remove'}
          buttonName={'Remove'}
          onClick={removeOnClick}>
          <DeleteForever />
        </ChartActionButton>
      </Grid>
    </Grid>
  );
}

ChartActionButtons.propTypes = {
  moreOnClick: PropTypes.func.isRequired,
  exportOnClick: PropTypes.func.isRequired,
  zoomOnClick: PropTypes.func.isRequired,
  removeOnClick: PropTypes.func.isRequired,
  isMore: PropTypes.bool.isRequired
};
