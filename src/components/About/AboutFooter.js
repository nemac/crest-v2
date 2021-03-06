/*
Purpose
  The About tabs, used in larger screens

Child Components
  - Not sure yet

Libs
  - Not sure yet

API
  - Not sure yets

State needed
  - Not sure yet

Props
  - Not sure yet
*/
import * as React from 'react';

import Grid from '@mui/material/Grid';

import { makeStyles } from '@mui/styles';

import NEMACAboutLogoImage from '../../assets/images/nemac_logo_white.png';
import NFWFAboutLogoImage from '../../assets/images/nfwf_logo_white.png';

const useStyles = makeStyles((theme) => ({
  AboutLogoImageStyle: {
    maxHeight: '80px',
    maxWidth: '100%',
    height: 'auto',
    padding: theme.spacing(1)
  }
}));

export default function AboutFooter(props) {
  const classes = useStyles();

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" px={{ xs: 2, md: 3 }} pt={2} pb={0.75} >
      <Grid item xs={12} sm={6} >
        <img src={NFWFAboutLogoImage} className={classes.AboutLogoImageStyle} px={1}/>
      </Grid>
      <Grid item xs={12} sm={6} >
        <img src={NEMACAboutLogoImage} className={classes.AboutLogoImageStyle} px={1}/>
      </Grid>
    </Grid>
  );
}
