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
import PropTypes from 'prop-types';

import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LinkTab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

import a11yProps from '../../utility/a11yProps';

// style for logo image
const useStyles = makeStyles((theme) => ({
  NFWFLogoImageStyle: {
    marginLeft: theme.spacing(1),
    height: 'auto',
    width: '100%',
    maxWidth: '65px',
    minWidth: '45px'
  }
}));

export default function NavBarTabs(props) {
  const { currentTab, handleClickNavTab, logo } = props;
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
            <LinkTab value="Home" to='/' {...a11yProps(0, 'crest-tab')} component={RouterLink} label="Home" />
            <LinkTab value="ResilienceProject" to='/ResilienceProject' {...a11yProps(1, 'crest-tab')} component={RouterLink} label="Where Should I do a Resilience Project?" />
            <LinkTab value="AnalyzeProjectSites" to='/AnalyzeProjectSites' {...a11yProps(2, 'crest-tab')} component={RouterLink}label="Analyze Project Sites" />
            <LinkTab value="Examples" to='/Examples' {...a11yProps(3, 'crest-tab')} component={RouterLink} label="Examples" />
            <LinkTab value="DataAndReports" to='/DataAndReports' {...a11yProps(0, 'crest-tab')} component={RouterLink}label="Data & Reports" />
            <LinkTab value="About" to='/About' {...a11yProps(4, 'crest-tab')} component={RouterLink} label="About" />
            <LinkTab value="StyleGuide" to='/StyleGuide' {...a11yProps(5, 'crest-tab')} component={RouterLink}label="Style Guide" />
          </Tabs>
        </Grid>
      </Grid>
    </Grid>
    < />
  );
}

NavBarTabs.propTypes = {
  currentTab: PropTypes.string.isRequired,
  handleClickNavTab: PropTypes.func.isRequired,
  logo: PropTypes.string.isRequired
};
