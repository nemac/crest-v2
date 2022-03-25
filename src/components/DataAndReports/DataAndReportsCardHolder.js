/*
Purpose
    The component holds all the region cards on the data and reports page.

    we may want to use a config to pass down props and create an arrray of region cards

Child Components
  - DataAndReports-RegionCard.js

Libs
  - Not sure yet

API
  - Not sure yet

State needed
  No need to for state here.
  - Not sure yet

Props
  - maybe config file
  - Not sure yet
*/
import * as React from 'react';
import Grid from '@mui/material/Grid';
import DataAndReportsCard from "./DataAndReportsCard";

// sample config to create all the cards
// TODO add config file to store all links and names
const sampleRegionConfig = {
  sampleName: 'Name 1'
}

export default function DataAndReportsCardHolder(props) {
  return (
    <Grid container spacing={1} justifyContent="center" alignItems="center" px={0.25} py={0.75}>

      <Grid item xs={12}>
        <DataAndReportsCard
          regionName={'American Somoa'}
          datFileSize={'100 MB'}
          dataLink={'https://www.google.com/'}
          NativeLanguageText={'Amerika Samoa Su’esu’ega o Malosi Gafataulima i Nofoaga Tumatāfaga'}
          NativeLanguageLink={'https://www.google.com/'}
          EnglishLink={'https://www.google.com/'}/>
      </Grid>
      <Grid item xs={12}>
        <DataAndReportsCard
          regionName={'Continental United States (CONUS)'}
          datFileSize={'15 GB'}
          dataLink={'https://www.google.com/'}
          EnglishLink={'https://www.google.com/'}/>
      </Grid>
      <Grid item xs={12}>
        <DataAndReportsCard
          regionName={'Guam'}
          datFileSize={'10 MB'}
          dataLink={'https://www.google.com/'}
          EnglishLink={'https://www.google.com/'}/>
      </Grid>
      <Grid item xs={12}>
        <DataAndReportsCard
          regionName={'Hawai\'i'}
          datFileSize={'25 MB'}
          dataLink={'https://www.google.com/'}
          EnglishLink={'https://www.google.com/'}/>
      </Grid>

    </Grid>
  )
}