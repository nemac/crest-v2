/*
Purpose
  Holds all the About-DescriptionCard.js and the About-DescriptionMainAboutCard.js
  we may want to use a config file to control this.

Child Components
  - About-DescriptionCard.js
  - About-DescriptionMainAboutCard.js

Libs
  - Not sure yet

API
  - Not sure yet

State needed
  - More or less?

Props
  - Not sure yet
*/
import * as React from 'react';
import { Routes, Route, Link as RouterLink } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

import DescriptionCard from "./DescriptionCard";
import AboutComunityExposureImage from '../../assets/images/about_comunity_exposure.png';
import AboutComunityFishAndWildlifeImage from '../../assets/images/about_fish_and_wildlife.png';
import AboutComunityResilienceHubsImage from '../../assets/images/about_resilience_hubs.png';

const useStyles = makeStyles((theme) => ({
  item: {
    item: { display: "flex", flexDirection: "column" }
  }
}));


export default function Descriptions() {
  const classes = useStyles();

  return (
    <Grid container spacing={2} justify="space-between" alignItems="stretch" px={3} py={0.75} >


      <Grid item xs={12} sm={12} md={6} lg={4} className={classes.item}>
        <DescriptionCard
          descriptionImage={AboutComunityExposureImage}
          descriptionTitle={'About Community Exposure'}
          descriptionText={'Description text 1'} >
          <Typography variant="body" component="div" align="start" px={3} py={1} gutterBottom>
            The Community Exposure Index explores the relationship between potential flooding threats and the presence of community assets by combining two composite indices: the Threat Index and the Community Asset Index. The Threat Index utilizes landscape characteristics and flood-related data. The Community Asset Index helps to understand where critical infrastructure, facilities, and population are concentrated on the landscape. Together, these indices combine to identify areas where community assets overlap with flood threats, also known as exposure.While individual data inputs vary regionally, the Regional Coastal Resilience Assessments utilize standardized methods to calculate the Community Exposure Index. For details, review the <Link value="DataAndReports" to='/DataAndReports' component={RouterLink} >final reports</Link>
          </Typography>
        </DescriptionCard>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={4} className={classes.item}>
        <DescriptionCard
          descriptionImage={AboutComunityFishAndWildlifeImage}
          descriptionTitle={'About Fish and Wildlife'}
          descriptionText={'Description text <a href="https://google.com" >2</a>'} >
          <Typography variant="body" component="div" align="start" px={3} py={1} gutterBottom>
            The Fish and Wildlife Index identifies areas on the landscape where species and their habitats are located, helping to understand areas where implementing nature-based solutions are likely to benefit federal- or state-designated species of concern. While the Regional Coastal Resilience Assessments consistently combine species data to create a single Fish and Wildlife Index, methods vary between the continental U.S. (CONUS) and other regional assessments. In CONUS, a Terrestrial and Aquatic Index are combined based principally on rarity-weighted richness. Importantly, in CONUS, the Aquatic Index includes both freshwater and marine species, but focuses almost exclusively on very shallow, nearshore areas.
          </Typography>
          <Typography variant="body" component="div" align="start" px={3} py={1} gutterBottom>
            Implementing significant enhancements to the Fish and Wildlife Index methods, regional assessments in Puerto Rico, the U.S. Virgin Islands, and the Northern Mariana Islands combine Terrestrial and Marine Indices. Unlike CONUS, the Terrestrial Index attempts to identify suitable habitat based on the habitat preferences of major taxonomic groups  (e.g., birds, reptiles, mammals, amphibians, and freshwater fishes and invertebrates). The Marine Index considers habitat to a 30-meter depth contour, utilizing the best available data to identify marine habitat types capable of supporting significant biodiversity (e.g., coral reefs, mangroves, and seagrass beds). CREST automatically displays the results for each region based on the method applied. For details, review the <Link value="DataAndReports" to='/DataAndReports' component={RouterLink} >final reports</Link>.
          </Typography>
        </DescriptionCard>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={4} className={classes.item}>
        <DescriptionCard
          descriptionImage={AboutComunityResilienceHubsImage}
          descriptionTitle={'About Resilience Hubs'}
          descriptionText={'Description text 3'}>
          <Typography variant="body" component="div" align="start" px={3} py={1} gutterBottom>
            Resilience Hubs are areas of open space or habitat where resilience projects may have the greatest potential to benefit both human community resilience and fish and wildlife. The Hubs combine information about natural open spaces, flooding threats, community assets, and fish and wildlife resources. As the primary output of the Regional Coastal Resilience Assessments, Resilience Hubs are common to all regions. However, the methods used to develop Resilience Hubs do vary regionally, with significant methodological enhancements made in Puerto Rico, the U.S. Virgin Islands, and the Northern Mariana Islands. For details, review the <Link value="DataAndReports" to='/DataAndReports' component={RouterLink} >final reports</Link>
          </Typography>
        </DescriptionCard>
      </Grid>


    </Grid>
  )
}
