/*
Purpose
  The component holds buttons for chart actions on each detailed chart for now its just export

Child Components
  - Not sure yet

Libs
  - Not sure yet

API
  - Not sure yet

State needed
  - Not sure yet

Props
  - Not sure yet
*/
import React from 'react';

import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

import { CameraAlt } from '@mui/icons-material';

import ChartActionButton from './ChartActionButton';

const useStyles = makeStyles((theme) => ({
  contentBox: {
    display: 'flex',
    height: theme.spacing(8),
    backgroundColor: theme.palette.CRESTGridBackground.dark,
    borderColor: theme.palette.CRESTBorderColor.main,
    borderStyle: 'solid',
    borderWidth: '1px',
    borderTop: '0px !important',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    display: 'flex'
  }
}));

export default function ChartDetailsActionButtons(props) {
  const classes = useStyles();

  // place holder for later
  const handleGenericClick = (event) => {
    event.stopPropagation();
    console.log('clicked'); // eslint-disable-line no-console
  };

  return (
    <Grid container spacing={0} p={0} mt={0} mb={0} className={classes.contentBox}>
      <Grid item xs={4.5}>
      </Grid>
      <Grid item xs={3}>
        <ChartActionButton
          buttonLabel={'Export'}
          buttonName={'Export'}
          onClick={handleGenericClick}>
          <CameraAlt />
        </ChartActionButton>
      </Grid>
      <Grid item xs={4.5}>
      </Grid>
    </Grid>
  );
}
