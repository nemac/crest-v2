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
import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { useDispatch } from 'react-redux';
import RegionCard from './RegionCard';
import { mapConfig } from '../../configuration/config';

import { changeRegion, regionUserInitiated } from '../../reducers/regionSelectSlice';
import { changeActiveTab } from '../../reducers/NavBarSlice';

const regions = mapConfig.regions;

export default function Regions() {
  const dispatch = useDispatch();

  const handleRegionButtonClick = (regionName) => {
    dispatch(changeActiveTab('AnalyzeProjectSites'));

    dispatch(changeRegion(regions[regionName].label));
    dispatch(regionUserInitiated(true));

    return null;
  };

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center" px={0.25} py={0.75}>

      { Object.keys(regions).map((region) => (
        <Grid xs={12} sm={12} md={6} lg={3} xxl={2} key={regions[region].label}>
          <RegionCard
            regionName={regions[region].label}
            regionImage={regions[region].image}
            onClick={handleRegionButtonClick}/>
        </Grid>
      ))}

    </Grid>
  );
}
