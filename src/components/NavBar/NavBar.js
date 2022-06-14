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
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles, useTheme } from '@mui/styles';

import { changeActiveTab } from '../../reducers/NavBarSlice';
import NavBarTabsSmallScreens from './NavBarTabsSmallScreens';
import NavBarTabsBigScreens from './NavBarTabsBigScreens';

import NFWFLogoImage from '../../assets/images/NFWF_logo_navbar.png';

const useStyles = makeStyles((theme) => ({
  CardBackground: {
    backgroundColor: theme.palette.CRESTGridBackground.dark,
    color: theme.palette.CRESTGridBackground.contrastText,
    borderColor: theme.palette.CRESTBorderColor.main,
    minHeight: '115px',
    [theme.breakpoints.down('md')]: {
      minHeight: '56px'
    }
  }
}));

// selector named functions for lint rules makes it easier to re-use if needed.
const NavBarSelector = (state) => state.navBar;

export default function NavBar(props) {
  // redux store for the active tab
  const dispatch = useDispatch();
  const navBar = useSelector(NavBarSelector);

  // set active tab for page refreshes and copy past of url
  useEffect(() => {
    // get patch to check if path is different from state.
    // this will happen when a user copy and pastes or uses a shareurl
    // the tool will need to change the the tab accordingly
    const locationPath = window.location.pathname.replace('/', '');

    if (!navBar || navBar !== locationPath) {
      dispatch(changeActiveTab(locationPath));
    }
  }, [dispatch, navBar]);

  // change state for tab TODO needs persist
  const handleClickNavTab = (event, newValue) => {
    // update redux store with tab
    dispatch(changeActiveTab(newValue));
  };

  // get breakpoint for small screens so we can make menu appear on side
  // also add show or hide the tabs
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const classes = useStyles();

  return (
      <Paper square={false} elevation={3} className={classes.CardBackground} px={0} pb={0.75} >
        <Grid container spacing={0} justifyContent='center' alignItems='center'>

              {isSmallScreen ? (
                <NavBarTabsSmallScreens
                  handleClickNavTab={handleClickNavTab}
                  logo={NFWFLogoImage}
                />
              ) : (
                <NavBarTabsBigScreens
                  handleClickNavTab={handleClickNavTab}
                  logo={NFWFLogoImage}
                />
              )}
        </Grid>
      </Paper>
  );
}
