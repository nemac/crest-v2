/*
Purpose
  This will hold all the tab call to action cards

Child Components
  - HomePage-TabCallToActionCard.js

Libs
  - None

API
  - None

State needed
  - Not sure yet

Props
  - Tab Name
  - Tab description
  - Tab CTA Label
  - Not sure yet
  - config?
*/
import * as React from 'react';
import Grid from '@mui/material/Grid';
import TabCallToActionCard from './TabCallToActionCard';

export default function TabCallToActions() {
  return (
    <Grid container spacing={6} justifyContent="center" alignItems="center" px={0.25} py={0.75}>

      <Grid item xs={12} sm={12} md={6} lg={3}>
        <TabCallToActionCard />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <TabCallToActionCard />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <TabCallToActionCard />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={3}>
        <TabCallToActionCard />
      </Grid>

    </Grid>
  );
}
