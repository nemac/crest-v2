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
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { makeStyles } from '@mui/styles';
import Checkbox from '@mui/material/Checkbox';

const useStyles = makeStyles((theme) => ({
  actionButton: {
    height: theme.spacing(4.5),
    textTransform: 'none',
    justifyContent: 'start'
  }
}));

// just a place holder needs props passed in and image etc
export default function Buffer(props) {
  const { bufferCheckbox, setBufferCheckbox } = props;
  const classes = useStyles();

  return (
    <Box p={0.75} >
      <FormGroup>
        <FormControlLabel
          control={<Checkbox defaultChecked/>}
          variant="text"
          color="CRESTPrimary"
          aria-label={'Include a Buffer for Nearby Impacts'}
          label='Include a Buffer for Nearby Impacts'
          className={classes.actionButton}
          onClick={ () => { setBufferCheckbox(!bufferCheckbox); }}
        />
      </FormGroup>
    </Box>
  );
}

Buffer.propTypes = {
  bufferCheckbox: PropTypes.bool,
  setBufferCheckbox: PropTypes.func
};
