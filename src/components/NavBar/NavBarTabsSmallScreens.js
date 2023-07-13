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
  openMenu state for if menu is open or not.
  what menu is currently selected
  - Not sure yet

Props
- Not sure yet
*/
import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { MenuOutlined, ArrowDropDownCircle } from '@mui/icons-material';

import { styled } from '@mui/system';

import { changeMenuOpen } from '../../reducers/NavBarSlice';
import a11yProps from '../../utility/a11yProps';

const StyledNavPaper = styled(Paper)(({ theme }) => ({
  padding: '3px 6px 3px 6px',
  backgroundColor: theme.palette.CRESTGridBackground.main
}));

const StyledTypographyTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1)
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  color: '#FFFFFF',
  backgroundColor: '#000000',
  textTransform: 'capitalize',
  boxShadow: 3,
  padding: '12px',
  '&:hover': {
    backgroundColor: '#444444',
    color: '#FFFFFF',
    textTransform: 'capitalize'
  },
  '&.Mui-selected': {
    color: '#FFFFFF',
    backgroundColor: '#444444',
    textTransform: 'capitalize'
  }
}));

// selector named functions for lint rules makes it easier to re-use if needed.
const NavBarSelector = (state) => state.navBar;

export default function NavBarTabsSmallScreens(props) {
  const { handleClickNavTab } = props;
  const navBar = useSelector(NavBarSelector);
  const dispatch = useDispatch();

  // handles click of hamburger menu and collapse icon
  // actually collapses the menu -
  const handleMenuClick = () => {
    dispatch(changeMenuOpen());
  };

  return (
    <>
    <Grid item xs={12} >
      <Grid container spacing={0} justifyContent='center' alignItems='center' px={0} >

        <Grid item xs={12} onClick={handleMenuClick} sx={{ cursor: 'pointer', backgroundColor: 'CRESTGridBackground.main' }}>
          <Grid container spacing={0} justifyContent='center' alignItems='center' px={0} pb={1} sx={{ backgroundColor: 'CRESTDark.main' }}>
            <Grid item xs={11} sx={{ backgroundColor: 'CRESTDark.main' }}>
              <Typography variant='h6' component='div' px={1} pt={1} align="left" gutterBottom
                sx={{
                  '&': (theme) => ({
                    fontSize: '1rem',
                    paddingLeft: theme.spacing(1),
                    paddingTop: theme.spacing(2),
                    paddingBottom: theme.spacing(0)
                  })
                }}
              >
                Coastal Resilience Evaluation and Siting Tool (CREST) MATERIAL UI 5
              </Typography>
            </Grid>
            <Grid item xs={1} sx={{ backgroundColor: 'CRESTDark.main' }}>
              <Typography variant='h6' component='div' px={0} pt={2} mb={0} align="left" gutterBottom>
                <MenuOutlined fontSize='medium' />
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Collapse in={navBar.menuOpen} timeout="auto" unmountOnExit sx={{ backgroundColor: 'CRESTGridBackground.main' }}>

            <Grid container spacing={0} justifyContent='center' alignItems='center' px={0.75} pt={1} pb={0}
              onClick={handleMenuClick} sx={{ cursor: 'pointer', backgroundColor: 'CRESTGridBackground.main' }}
            >
              <Grid item xs={11} sx={{ backgroundColor: 'CRESTDark.main' }}>
                <StyledTypographyTitle variant='h6' component='div' px={1} align="left">
                  Navigation menu
                </StyledTypographyTitle>
              </Grid>
              <Grid xs={1} sx={{ backgroundColor: 'CRESTDark.main' }}>
                <StyledTypographyTitle variant='h6' component='div' px={1} align="left">
                  <ArrowDropDownCircle sx={{ transform: 'rotate(-180deg)', fontSize: '1.20rem' }}/>
                </StyledTypographyTitle>
              </Grid>
              <Grid item xs={12} sx={{ backgroundColor: 'CRESTDark.main' }}>
                <Typography variant='h7' component='div' px={0} pb={0} mb={0} align="left" gutterBottom>
                  <Divider sx={{ borderColor: 'CRESTPrimary.main' }}/>
                </Typography>
              </Grid>
            </Grid>

            <List
              value={navBar.activeTab}
              aria-label="CREST Nabigation Tabs"
              sx={{ paddingTop: '0px' }} >

              <Paper square={false} elevation={0} sx={{ padding: '6px 6px 3px 6px', backgroundColor: 'CRESTGridBackground.main' }}>
                <StyledListItem
                  selected={navBar.activeTab === 'Home'}
                  onClick={(event) => handleClickNavTab(event, 'Home')}
                  to='/' {...a11yProps(0)}
                  component={RouterLink}>Home
                </StyledListItem>
              </Paper>

              <StyledNavPaper square={false} elevation={0}>
                <StyledListItem
                  selected={navBar.activeTab === 'ResilienceProject'}
                  onClick={(event) => handleClickNavTab(event, 'ResilienceProject')}
                  to='/ResilienceProject'
                  {...a11yProps(1)}
                  component={RouterLink}>Where Should I do a Resilience Project?
                </StyledListItem>
              </StyledNavPaper>

              <StyledNavPaper square={false} elevation={0}>
                <StyledListItem
                  selected={navBar.activeTab === 'AnalyzeProjectSites'}
                  onClick={(event) => handleClickNavTab(event, 'AnalyzeProjectSites')}
                  to='/AnalyzeProjectSites' {...a11yProps(2)}
                  component={RouterLink}>Analyze Project Sites
                </StyledListItem>
              </StyledNavPaper>

              <StyledNavPaper square={false} elevation={0}>
                <StyledListItem
                  selected={navBar.activeTab === 'Examples'}
                  onClick={(event) => handleClickNavTab(event, 'Examples')}
                  to='/Examples'
                  {...a11yProps(3)}
                  component={RouterLink}>
                  Examples
                </StyledListItem>
              </StyledNavPaper>

              <StyledNavPaper square={false} elevation={0}>
                <StyledListItem
                  selected={navBar.activeTab === 'DataAndReports'}
                  onClick={(event) => handleClickNavTab(event, 'DataAndReports')}
                  to='/DataAndReports'
                  {...a11yProps(0)}
                  component={RouterLink}
                  label="Data & Reports" >Data & Reports
                </StyledListItem>
              </StyledNavPaper>

              <StyledNavPaper square={false} elevation={0}>
                <StyledListItem
                  selected={navBar.activeTab === 'About'}
                  onClick={(event) => handleClickNavTab(event, 'About')}
                  to='/About'
                  {...a11yProps(4)}
                  component={RouterLink}
                  label="About" >About
                </StyledListItem>
              </StyledNavPaper>

              <StyledNavPaper square={false} elevation={0}>
                <StyledListItem
                  selected={navBar.activeTab === 'StyleGuide'}
                  onClick={(event) => handleClickNavTab(event, 'StyleGuide')}
                  to='/StyleGuide'
                  {...a11yProps(5)}
                  component={RouterLink}
                  label="Style Guide" >Style Guide
                </StyledListItem>
              </StyledNavPaper>
            </List>
          </Collapse>
        </Grid>
      </Grid>
    </Grid>
    </>
  );
}

NavBarTabsSmallScreens.propTypes = {
  handleClickNavTab: PropTypes.func.isRequired,
  logo: PropTypes.string.isRequired
};
