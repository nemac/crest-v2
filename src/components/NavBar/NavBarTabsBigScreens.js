/*
Purpose
  The main menu (to the tabs) in big screens => laptops and big displays

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
import LinkTab from '@mui/material/Tab';
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

export default function NavBarTabs(props) {
  const { currentTab, data, handleClickNavTab, logo } = props;  // just here for testing decrement/increment
  const classes = useStyles();

  return (
    < >
    <Grid item xs={0} sm={0.75} sx={{ display: { xs: 'none', lg: 'flex' } }}>
      <Box p={1} justifyContent='center' alignItems='center'>
        <img src={logo} className={classes.NFWFLogoImageStyle} />
      </Box>
    </Grid>
    <Grid item xs={12} sm={11.25}>
      <Grid container spacing={0} justifyContent='center' alignItems='center' px={0} py={0.75}>
        <Grid item xs={12}>
          <Typography variant='h5' component='div' px={1} gutterBottom>
            Coastal Resilience Evaluation and Siting Tool (CREST)
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Tabs
            orientation="horizontal"
            variant="scrollable"
            allowScrollButtonsMobile={true}
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