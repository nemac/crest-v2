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
import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { useDispatch } from 'react-redux';
import { changeActiveTab } from '../../reducers/NavBarSlice';
import TabCallToActionCard from './TabCallToActionCard.jsx';

export default function TabCallToActions() {
  const dispatch = useDispatch();

  const handleActionClick = (actionLocation) => {
    dispatch(changeActiveTab(actionLocation));
    return null;
  };

  return (
    <Grid
      container
      flexDirection='row'
      spacing={3}
      justifyContent='center'
      alignContent='stretch'
      px={0.25}
      py={0.75}>
      <Grid xs={12} sm={12} md={6} lg={3}>
        <TabCallToActionCard
          tabLabel={'Analyze Project Sites'}
          tabLocation={'AnalyzeProjectSites'}
          tabText={
            'Examine and compare your project site(s) by proximity to \
            Resilience Hubs while exploring the Community Exposure and \
            Fish and Wildlife Indices in the surrounding area.'
          }
          onClick={handleActionClick}/>
      </Grid>
      <Grid xs={12} sm={12} md={6} lg={3}>
        <TabCallToActionCard
          tabLabel={'Explore Resilience Hubs'}
          tabLocation={'ResilienceProject'}
          tabText={
            'Identify all Resilience Hubs in your study area to find \
            locations for potential projects that may deliver both human \
            community and fish and wildlife benefits.'
          }
          onClick={handleActionClick}/>
      </Grid>
      <Grid xs={12} sm={12} md={6} lg={3}>
        <TabCallToActionCard
          tabLabel={'Download Data and Access Reports'}
          tabLocation={'DataAndReports'}
          tabText={
            'Download results for each Regional Assessment to use in your \
            own GIS application. Review the regional reports for detailed descriptions \
            of methods, data sources, and results.'
          }
          onClick={handleActionClick}/>
      </Grid>
      <Grid xs={12} sm={12} md={6} lg={3}>
        <TabCallToActionCard
          tabLabel={'Learn About the Assessment'}
          tabLocation={'About'}
          tabText={
            'Learn how the National Coastal Resilience Assessment was created, \
            including descriptions of the Resilience Hubs, Community Exposure Index, \
            and Fish and Wildlife Index.'
          }
          onClick={handleActionClick}/>
      </Grid>

    </Grid>
  );
}
