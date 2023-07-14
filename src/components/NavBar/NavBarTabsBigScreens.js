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
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
  },
  TitleHolder: {
    marginLeft: theme.spacing(0.5),
    [theme.breakpoints.between('md', 'lg')]: {
      marginLeft: theme.spacing(2)
    }
  }
}));

// selector named functions for lint rules makes it easier to re-use if needed.
const NavBarSelector = (state) => state.navBar;

export default function NavBarTabsBigScreens(props) {
  const { handleClickNavTab, logo } = props;
  const classes = useStyles();

  const navBar = useSelector(NavBarSelector);

  return (
    <>
    <Grid item xs={0} sm={0.75} sx={{ display: { xs: 'none', md: 'flex' } }}>
      <Box p={1} justifyContent='center' alignItems='center'>
        <RouterLink to="/">
          <img src={logo} className={classes.NFWFLogoImageStyle} />
        </RouterLink>
      </Box>
    </Grid>
    <Grid item xs={12} sm={11.25}>
      <Grid container spacing={0} justifyContent='center' alignItems='center' px={0} py={0.75}>
        <Grid item xs={12}>
          <Typography variant='h5' component='div' px={1} gutterBottom className={classes.TitleHolder}>
            Coastal Resilience Evaluation and Siting Tool (CREST)
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Tabs
            orientation="horizontal"
            variant="scrollable"
            allowScrollButtonsMobile={true}
            value={navBar.activeTab}
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
            <LinkTab value="CodeTest" to='/CodeTest' {...a11yProps(6, 'crest-tab')} component={RouterLink}label="Code Test" />
          </Tabs>
        </Grid>
        <Grid item xs={2} px={5}>
          <Button variant="contained" color="CRESTPrimary" onClick={() => { localStorage.clear(); } }>Clear Local Storage</Button>
        </Grid>
      </Grid>
    </Grid>
    </>
  );
}

NavBarTabsBigScreens.propTypes = {
  handleClickNavTab: PropTypes.func.isRequired,
  logo: PropTypes.string.isRequired
};
