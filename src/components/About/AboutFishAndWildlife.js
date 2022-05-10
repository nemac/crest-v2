/*
Purpose
  The About card/tab text htmnl for about fish and wildlife

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
import { Routes, Route, Link as RouterLink } from 'react-router-dom';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Link from '@mui/material/Link';

import AboutFishAndWildlifeImage from '../../assets/images/about_fish_and_wildlife.png';

const useStyles = makeStyles((theme) => ({
  crestList: {
    marginTop: theme.spacing(0.5),
  },
  AboutImageStyle: {
    maxWidth: '100%',
    height: 'auto'
  }
}));

export default function AboutFishAndWildlife(props) {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h5" component="div" px={3} py={1} gutterBottom>
        About Fish and Wildlife
      </Typography>
      <Divider variant="middle" />
      <Grid container justifyContent="center" alignItems="center" pt={1.5}>
        <Grid item xs={12}>
          <img src={AboutFishAndWildlifeImage} className={classes.AboutImageStyle} />
        </Grid>
      </Grid>
      <Typography variant="body" component="div" px={3} py={1} gutterBottom>
        The Fish and Wildlife Index identifies areas on the landscape where species and their habitats are located, helping to understand areas where implementing nature-based solutions are likely to benefit federal- or state-designated species of concern. While the Regional Coastal Resilience Assessments consistently combine species data to create a single Fish and Wildlife Index, methods vary between the continental U.S. (CONUS) and other regional assessments. In CONUS, a Terrestrial and Aquatic Index are combined based principally on rarity-weighted richness. Importantly, in CONUS, the Aquatic Index includes both freshwater and marine species, but focuses almost exclusively on very shallow, nearshore areas.
      </Typography>
      <Typography variant="body" component="div" px={3} py={1} gutterBottom>
        Implementing significant enhancements to the Fish and Wildlife Index methods, regional assessments in Puerto Rico, the U.S. Virgin Islands, and the Northern Mariana Islands combine Terrestrial and Marine Indices. Unlike CONUS, the Terrestrial Index attempts to identify suitable habitat based on the habitat preferences of major taxonomic groups  (e.g., birds, reptiles, mammals, amphibians, and freshwater fishes and invertebrates). The Marine Index considers habitat to a 30-meter depth contour, utilizing the best available data to identify marine habitat types capable of supporting significant biodiversity (e.g., coral reefs, mangroves, and seagrass beds). CREST automatically displays the results for each region based on the method applied. For details, review the <Link value="DataAndReports" to='/DataAndReports' component={RouterLink} >final reports</Link>.
      </Typography>
    </div>
  )
}
