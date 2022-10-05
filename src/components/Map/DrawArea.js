/*
Purpose
  Draws an area on the map
  will also make the leaflet draw menu appear or we need to
  create a new one that mimics the figma designated
  this will be a custome component
  we may need to add child for the drawing actions which include:
    - finish
    - delete last point
    - cancel

  is a leaflet button so needs access to leaflet object can be a challenge in React

 handle errors:
    - Area is too big or too big to process
    - Area is not within any assessment
    - probably others

Child Components
  - map.js

Libs
  - leaflet
  - leaflet draw

API
  - New api create a saved state JSON object with a unique id to share

State needed
  - zonal stat GEOJSON returned from API

Props
  - Not sure yet
*/
import * as React from 'react';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import {
  PolylineOutlined
  // Polyline
} from '@mui/icons-material';

import { toggleSketchArea } from '../../reducers/mapPropertiesSlice';

const useStyles = makeStyles((theme) => ({
  actionButton: {
    height: theme.spacing(4.5),
    textTransform: 'none',
    justifyContent: 'start'
  }
}));

// just a place holder needs props passed in and image etc
export default function DrawArea(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSketchClick = () => {
    dispatch(toggleSketchArea());
  };

  return (
    <Box p={0.75} >
      <Button
        variant="contained"
        color="CRESTPrimary"
        fullWidth={true}
        aria-label={'Sketch an Area'}
        className={classes.actionButton}
        onClick={handleSketchClick}
        startIcon={<PolylineOutlined />}>
        Sketch an Area
      </Button>
    </Box>
  );
}
