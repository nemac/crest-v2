/*
Purpose
  The main menu (to the tabs) in small screen/mobile

Child Components
  - Not sure yet

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

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import LinkTab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import {
  makeStyles,
  useTheme
} from '@mui/styles';

// fix this can get the reference right I think I am special
import NFWFLogoImage from '/Users/daveism/GitHub/crest-v2/src/assets/images/NFWF_logo_navbar.png';

// style for logo image
const useStyles = makeStyles({
  NFWFLogoImageStyle: {
    height: 'auto',
    width: '100%',
    maxWidth: '65px',
    minWidth: '45px',
  }
});

// add assability
function a11yProps(index) {
  return {
    id: `crest-tab-${index}`,
    'aria-controls': `crest-tabpanel-${index}`,
  };
}

export default function NavBarTabsSmallScreens(props) {
  const { currentTab, data, handleClickNavTab } = props;  // just here for testing decrement/increment

  return (
    < >
    <Grid item xs={12}>
      <Grid container spacing={0} justifyContent='center' alignItems='center' px={0} py={0.75}>
        <Grid item xs={12}>
          <Typography variant='body' component='div' px={1} align="center" gutterBottom>
            Coastal Resilience Evaluation and Siting Tool
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Tabs
            orientation="vertical"
            variant="fullWidth"
            value={currentTab}
            onChange={handleClickNavTab}
            aria-label="CREST Nabigation Tabs"
            >
            <LinkTab value="Home" to='/' {...a11yProps(0)} component={RouterLink}  label="Home" />
            <LinkTab value="ResilienceProject" to='/ResilienceProject' {...a11yProps(1)} component={RouterLink} label="Where Should I do a Resilience Project?" />
            <LinkTab value="AnalyzeProjectSites" to='/AnalyzeProjectSites' {...a11yProps(2)} component={RouterLink}label="Analyze Project Sites" />
            <LinkTab value="Examples" to='/Examples' {...a11yProps(3)} component={RouterLink} state={{ data }} label="Examples" />
            <LinkTab value="DataAndReports" to='/DataAndReports' {...a11yProps(0)} component={RouterLink}label="Data & Reports" />
            <LinkTab value="About" to='/About' {...a11yProps(4)} component={RouterLink} label="About" />
            <LinkTab value="StyleGuide" to='/StyleGuide' {...a11yProps(5)} component={RouterLink}label="Style Guide" />
          </Tabs>
        </Grid>
      </Grid>
    </Grid>
    < />
  )
}