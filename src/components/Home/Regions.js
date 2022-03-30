/*
Purpose
  On the home page a place to hold all the region cards

  may want this driven by a config too it will already be there mostly

Child Components
  - HomePage-RegionCard.js

Libs
  - Not sure yet

API
  - Not sure yet

State needed
  - Region

Props
  - config?
  - Not sure yet
*/
import * as React from 'react';
import Grid from '@mui/material/Grid';
import RegionCard from "./RegionCard";

export default function Regions() {
  return (
    <Grid container spacing={6} justifyContent="center" alignItems="center" px={0.25} py={0.75}>

    <Grid item xs={12} sm={12} md={6} lg={3}>
        <RegionCard />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <RegionCard />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <RegionCard />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <RegionCard />
      </Grid>

      <Grid item xs={12} sm={12} md={6} lg={3}>
        <RegionCard />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <RegionCard />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <RegionCard />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <RegionCard />
      </Grid>
      
    </Grid>
  )
}