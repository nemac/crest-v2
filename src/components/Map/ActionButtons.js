/*
Purpose
  Holds all the Action button for the maps

  the actions are one of the following:
    - add area (open or expands the add area menu)
    - export exports the map to png/svg
    - map layers opens the map layer list

Child Components
  - ActionButton.js

Libs
  - Not sure yet

API
  - Not sure yet

State needed
  - map layer list open or not
  - add area open or not NEW state item
  - Not sure yet

Props
  - Not sure yet
*/
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Grid from '@mui/material/Grid';
import {
  CameraAlt,
  LayersOutlined,
  Layers,
  // LibraryAddOutlined,
  LibraryAdd
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import ActionButton from './ActionButton';
import { toggleVisible as toggleMapLayerVisibility } from '../../reducers/mapLayerListSlice';

const listVisibleSelector = (state) => state.mapLayerList.visible;

const useStyles = makeStyles((theme) => ({
  contentGrid: {
    height: theme.spacing(8),
    padding: theme.spacing(0),
    backgroundColor: theme.palette.CRESTGridBackground.dark,
    borderColor: theme.palette.CRESTBorderColor.main,
    borderStyle: 'solid',
    borderWidth: '1px'
  }
}));

// just a place holder needs props passed in and image etc
export default function ActionButtons() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const layerListVisible = useSelector(listVisibleSelector);

  const mapLayerVisiblityOnClick = () => {
    dispatch(toggleMapLayerVisibility());
  };

  // place holder for later wanted to add a click handler for graph or Table
  // TODO add addarea toggle
  // TODO export
  const handleGenericClick = (event) => {
    event.stopPropagation();
    console.log('clicked'); // eslint-disable-line no-console
  };

  return (
    <Grid container spacing={0} justifyContent="center" alignItems="center" className={classes.contentGrid}>

      <Grid item xs={4}>
        <ActionButton
          buttonLabel={'Add Area'}
          buttonName={'Add Area'}
          onClick={handleGenericClick}>
          <LibraryAdd />
        </ActionButton>
      </Grid>
      <Grid item xs={4}>
        <ActionButton
          buttonLabel={'Export'}
          buttonName={'Export'}
          onClick={handleGenericClick}>
          <CameraAlt />
        </ActionButton>
      </Grid>
      <Grid item xs={4}>
        <ActionButton
          buttonLabel={'Map Layers'}
          buttonName={'Map Layers'}
          onClick={mapLayerVisiblityOnClick}>
          {layerListVisible ? <Layers /> : <LayersOutlined /> }
        </ActionButton>
      </Grid>

    </Grid>
  );
}
