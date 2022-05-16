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

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles, useTheme } from '@mui/styles';

import NavBarTabsSmallScreens from './NavBarTabsSmallScreens';
import NavBarTabsBigScreens from './NavBarTabsBigScreens';

import NFWFLogoImage from '../../assets/images/NFWF_logo_navbar.png';

const useStyles = makeStyles((theme) => ({
  CardBackground: {
    padding: '20px',
    backgroundColor: theme.palette.CRESTGridBackground.dark,
    color: theme.palette.CRESTGridBackground.contrastText,
    borderColor: theme.palette.CRESTBorderColor.main
  }
}));

export default function NavBar(props) {
  // current active tag
  // TODO: needs persist in redux
  const [currentTab, setCurrentTab] = React.useState('Home');

  // change state for tab TODO needs persist
  const handleClickNavTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  // get breakpoint for small screens so we can make menu appear on side
  // also add show or hide the tabs
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const classes = useStyles();

  return (
      <Paper square={false} elevation={3} className={classes.CardBackground} >
        <Grid container spacing={0} justifyContent='center' alignItems='center'>

              {isSmallScreen ? (
                <NavBarTabsSmallScreens
                  handleClickNavTab={handleClickNavTab}
                  currentTab={currentTab}
                  logo={NFWFLogoImage}
                />
              ) : (
                <NavBarTabsBigScreens
                  handleClickNavTab={handleClickNavTab}
                  currentTab={currentTab}
                  logo={NFWFLogoImage}
                />
              )}
        </Grid>
      </Paper>
  );
}
