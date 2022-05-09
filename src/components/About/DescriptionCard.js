/*
Purpose
  The About page has a series of cards for descriptions of selected layers.
  The descriptions provide information about how different layers were created used in the
  NFWF assessment. e.g., Resilience Hubs, Community Exposure Index, Fish, and Wildlife

  The is component handles all the content needed for individual descriptions

Child Components
  - Not sure yet

Libs
  - Not sure yet

API
  - Not sure yets

State needed
  - Not sure yet

Props
  - the title
  - an image used as an example true all false
  - text description (needs to be able to handle HTML (e.g., links, lists, emailto)
*/
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  AboutImageStyle: {
    maxWidth: '100%',
    height: 'auto'
  }
}));

export default function DescriptionCard(props) {
  // get props
  const { descriptionTitle, children, descriptionImage } = props;

  const classes = useStyles();

  return (
    <Box  py={0.75} >
      <Paper variant="outlined" square={false} sx={{minHeight: '800px'}}>
        <Typography variant="h5" component="div" align="start" px={3} py={1} gutterBottom>
          {descriptionTitle}
        </Typography>
        <Divider variant="middle" />
        <Grid container justifyContent="center" alignItems="center" pt={1.5}>
          <Grid item xs={12}>
            <img src={descriptionImage} className={classes.AboutImageStyle} />
          </Grid>
        </Grid>
        <Grid container justifyContent="center" alignItems="center" pt={1.5}>
          <Grid item xs={12}>
            <Typography variant="body" component="div" align="center" gutterBottom>
              {children}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}
