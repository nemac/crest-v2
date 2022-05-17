/*
Purpose
  The About tabs, used in larger screens

Child Components
  - AboutCrest.js
  - AboutCommunityExposure.js
  - AboutFishAndWildlife.js
  - AboutResilienceHubs.js

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

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import AboutCrest from './AboutCrest';
import AboutCommunityExposure from './AboutCommunityExposure';
import AboutFishAndWildlife from './AboutFishAndWildlife';
import AboutResilienceHubs from './AboutResilienceHubs';

export default function AboutTabs(props) {
  return (
    <div>
      <Grid container spacing={2} justifyContent="center" alignItems="center" px={2} py={1} >
        <Grid item xs={12} >
          <Box py={0.75} >
            <Paper variant="outlined" square={false} sx={{ minHeight: '800px', height: '100%' }}>
              <AboutCrest />
            </Paper>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center" alignItems="center" px={2} py={1} >
        <Grid item xs={12} >
          <Box py={0.75} >
            <Paper variant="outlined" square={false} sx={{ minHeight: '800px', height: '100%' }}>
              <AboutCommunityExposure />
            </Paper>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center" alignItems="center" px={2} pt={1} >
        <Grid item xs={12} >
          <Box py={0.75} >
            <Paper variant="outlined" square={false} sx={{ minHeight: '800px', height: '100%' }}>
              <AboutFishAndWildlife />
            </Paper>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center" alignItems="center" px={2} py={1} >
        <Grid item xs={12} >
          <Box py={0.75} >
            <Paper variant="outlined" square={false} sx={{ minHeight: '800px', height: '100%' }}>
              <AboutResilienceHubs />
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
