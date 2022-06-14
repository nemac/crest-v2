/*
Purpose
  use or don't use buffer in the search zonal stats or hubs intersection
  not sure what else to include yet

Child Components
  - Map.js ?

Libs
  - leaflet

API
  - Not sure yet

State needed
  - None

Props
  - Not sure yet
*/
import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import {
  // CheckBoxOutlineBlank,
  CheckBox
} from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  actionButton: {
    height: theme.spacing(4.5),
    textTransform: 'none',
    justifyContent: 'start'
  }
}));

// just a place holder needs props passed in and image etc
export default function Buffer(props) {
  const classes = useStyles();

  return (
    <Box p={0.75} >
      <Button
        variant="text"
        color="CRESTPrimary"
        fullWidth={true}
        aria-label={'Include a Buffer to Understand Nearby Impacts'}
        className={classes.actionButton}
        startIcon={<CheckBox />}>
        Include a Buffer to Understand Nearby Impacts
      </Button>
    </Box>
  );
}
