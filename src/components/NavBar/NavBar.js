/*
Purpose
  The main menu tabs

Child Components
  - NabBarTabs.js
  - NavBarTabsSmallScreens.js
  - Not sure yet

Libs
  - Not sure yet

API
  - Not sure yet

State needed
  - Current or active tab TODO: move to redux
  - Not sure yet

Props
  - Current or active tab
  - collapsed (boolean) (to handle collapsing menu for small screen size)
  - Not sure yet
*/
import * as React from 'react';
import { Routes, Route, Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import LinkTab from '@mui/material/Tab';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/styles';
import Typography from '@mui/material/Typography';

import NavBarTabsSmallScreens from './NavBarTabsSmallScreens';
import NavBarTabsBigScreens from './NavBarTabsBigScreens';

// fix this can get the reference right I think I am special
import NFWFLogoImage from '../../assets/images/NFWF_logo_navbar.png';

export default function NavBar(props) {
  const { data } = props;  // just here for testing decrement/increment
  // current active tag
  // TODO: needs persist in redux
  const [ currentTab, setCurrentTab] = React.useState('Home');

  // change state for tab TODO needs persist
  const handleClickNavTab= (event, newValue) => {
    setCurrentTab(newValue);
  };

  // get breakpoint for small screens so we can make menu appear on side
  // also add show or hide the tabs
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  // define the nav bar tabs
  const tabs = {};

  return (
      <Paper square={false} elevation={3} sx={{backgroundColor: 'CRESTGridBackground.dark', color: 'CRESTGridBackground.contrastText', borderColor: 'CRESTBorderColor.main'}} >
        <Grid container spacing={0} justifyContent='center' alignItems='center'>

              {isSmallScreen ? (
                <NavBarTabsSmallScreens
                  handleClickNavTab={handleClickNavTab}
                  currentTab={currentTab}
                  data={data}
                  logo={NFWFLogoImage}
                />
              ) : (
                <NavBarTabsBigScreens
                  handleClickNavTab={handleClickNavTab}
                  currentTab={currentTab}
                  data={data}
                  logo={NFWFLogoImage}
                />
              )}
        </Grid>
      </Paper>
  )
}
