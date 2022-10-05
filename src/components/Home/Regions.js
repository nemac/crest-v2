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
import Grid from '@mui/material/Grid';
import { useDispatch } from 'react-redux';
import RegionCard from './RegionCard';
import { mapConfig } from '../../configuration/config';

import { changeRegion, regionUserInitiated } from '../../reducers/regionSelectSlice';
import { changeActiveTab } from '../../reducers/NavBarSlice';

import regionAlaskaImage from '../../assets/images/zoomregion-alaska.png';
import regionAmericanSamoaImage from '../../assets/images/zoomregion-as.png';
import regionContinentalUSImage from '../../assets/images/zoomregion-cus.png';
import regionGuamImage from '../../assets/images/zoomregion-guam.png';
import regionHawaiiImage from '../../assets/images/zoomregion-hawaii.png';
import regionNorthernMarianaIslandsImage from '../../assets/images/zoomregion-cnmi.png';
import regionPuertoRicoImage from '../../assets/images/zoomregion-pr.png';
import regionUSVirginIslandsImage from '../../assets/images/zoomregion-uvi.png';

// TODO: move this to config file?
const regionMenuItems = [
  {
    label: 'Alaska',
    image: regionAlaskaImage
  },
  {
    label: 'American Samoa',
    image: regionAmericanSamoaImage
  },
  {
    label: 'Continental U.S',
    image: regionContinentalUSImage
  },
  {
    label: 'Guam',
    image: regionGuamImage
  },
  {
    label: 'Hawai\'i',
    image: regionHawaiiImage
  },
  {
    label: 'Northern Mariana Islands',
    image: regionNorthernMarianaIslandsImage
  },
  {
    label: 'Puerto Rico',
    image: regionPuertoRicoImage
  },
  {
    label: 'US Virgin Islands',
    image: regionUSVirginIslandsImage
  }
];

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
    <Grid container spacing={6} justifyContent="center" alignItems="center" px={0.25} py={0.75}>

      { regionMenuItems.map((region) => (
        <Grid item xs={12} sm={12} md={6} lg={3} key={region.label}>
          <RegionCard
            regionName={region.label}
            regionImage={region.image}
            onClick={handleRegionButtonClick}/>
        </Grid>
      ))}

    </Grid>
  );
}
