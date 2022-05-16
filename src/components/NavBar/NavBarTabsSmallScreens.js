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
import * as React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { MenuOutlined, ArrowDropDownCircle } from '@mui/icons-material';

import { makeStyles } from '@mui/styles';

import a11yProps from '../../utility/a11yProps';

// style for menu
const useStyles = makeStyles((theme) => ({
  appTitle: {
    fontSize: '1rem',
    paddingLeft: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(0)
  },
  navTitle: {
    fontSize: '1rem',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  navControlIcon: {
    fontSize: '1.20rem'
  },
  navItemClick: {
    cursor: 'pointer',
    backgroundColor: theme.palette.CRESTGridBackground.main
  },
  navItemDark: {
    backgroundColor: theme.palette.CRESTDark.main
  },
  navPaperFirst: {
    padding: '6px 6px 3px 6px',
    backgroundColor: theme.palette.CRESTGridBackground.main
  },
  navPaper: {
    padding: '3px 6px 3px 6px',
    backgroundColor: theme.palette.CRESTGridBackground.main
  },
  navMenuListItem: {
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
  }
}));

export default function NavBarTabsSmallScreens(props) {
  const { currentTab, handleClickNavTab } = props;

  // react state for open menu
  const [openMenu, setOpenMenu] = React.useState(false);
  const classes = useStyles();

  // handles click of hamburger menu and collapse icon
  // actually collapses the menu -
  const handleMenuClick = () => {
    setOpenMenu(!openMenu);
  };

  return (
    < >
    <Grid item xs={12} >
      <Grid container spacing={0} justifyContent='center' alignItems='center' px={0} >

        <Grid item xs={12} onClick={handleMenuClick} className={classes.navItemClick} >
          <Grid container spacing={0} justifyContent='center' alignItems='center' px={0} pb={1} className={classes.navItemDark}>
            <Grid item xs={11} className={classes.navItemDark}>
              <Typography variant='h6' component='div' px={1} pt={1} align="left" gutterBottom className={classes.appTitle}>
                Coastal Resilience Evaluation and Siting Tool
              </Typography>
            </Grid>
            <Grid item xs={1} className={classes.navItemDark}>
              <Typography variant='h6' component='div' px={0} pt={2} mb={0} align="left" gutterBottom>
                <MenuOutlined fontSize='medium' />
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Collapse in={openMenu} timeout="auto" unmountOnExit sx={{ backgroundColor: 'CRESTGridBackground.main' }}>

            <Grid container spacing={0} justifyContent='center' alignItems='center' px={0.75} pt={1} pb={0} onClick={handleMenuClick} className={classes.navItemClick}>
              <Grid item xs={11} className={classes.navItemDark}>
                <Typography variant='h6' component='div' px={1} align="left" className={classes.navTitle}>
                  Navigation menu
                </Typography>
              </Grid>
              <Grid item xs={1} className={classes.navItemDark}>
                <Typography variant='h6' component='div' px={1} align="left" className={classes.navTitle}>
                  <ArrowDropDownCircle sx={{ transform: 'rotate(-180deg)' }} className={classes.navControlIcon} />
                </Typography>
              </Grid>
              <Grid item xs={12} className={classes.navItemDark}>
                <Typography variant='h7' component='div' px={0} pb={0} mb={0} align="left" gutterBottom>
                  <Divider sx={{ borderColor: 'CRESTPrimary.main' }}/>
                </Typography>
              </Grid>
            </Grid>

            <List
              value={currentTab}
              aria-label="CREST Nabigation Tabs"
              sx={{ paddingTop: '0px' }} >

              <Paper square={false} elevation={0} className={classes.navPaperFirst} >
                <ListItem
                  className={classes.navMenuListItem}
                  selected={currentTab === 'Home'}
                  onClick={(event) => handleClickNavTab(event, 'Home')}
                  to='/' {...a11yProps(0)}
                  component={RouterLink}>Home
                </ListItem>
              </Paper>

              <Paper square={false} elevation={0} className={classes.navPaper} >
                <ListItem
                  className={classes.navMenuListItem}
                  selected={currentTab === 'ResilienceProject'}
                  onClick={(event) => handleClickNavTab(event, 'ResilienceProject')}
                  to='/ResilienceProject'
                  {...a11yProps(1)}
                  component={RouterLink}>Where Should I do a Resilience Project?
                </ListItem>
              </Paper>

              <Paper square={false} elevation={0} className={classes.navPaper} >
                <ListItem
                  className={classes.navMenuListItem}
                  selected={currentTab === 'AnalyzeProjectSites'}
                  onClick={(event) => handleClickNavTab(event, 'AnalyzeProjectSites')}
                  to='/AnalyzeProjectSites' {...a11yProps(2)}
                  component={RouterLink}>Analyze Project Sites
                </ListItem>
              </Paper>

              <Paper square={false} elevation={0} className={classes.navPaper} >
                <ListItem
                  className={classes.navMenuListItem}
                  selected={currentTab === 'Examples'}
                  onClick={(event) => handleClickNavTab(event, 'Examples')}
                  to='/Examples'
                  {...a11yProps(3)}
                  component={RouterLink}>
                  Examples
                </ListItem>
              </Paper>

              <Paper square={false} elevation={0} className={classes.navPaper} >
                <ListItem
                  className={classes.navMenuListItem}
                  selected={currentTab === 'DataAndReports'}
                  onClick={(event) => handleClickNavTab(event, 'DataAndReports')}
                  to='/DataAndReports'
                  {...a11yProps(0)}
                  component={RouterLink}
                  label="Data & Reports" >Data & Reports
                </ListItem>
              </Paper>

              <Paper square={false} elevation={0} className={classes.navPaper} >
                <ListItem
                  className={classes.navMenuListItem}
                  selected={currentTab === 'About'}
                  onClick={(event) => handleClickNavTab(event, 'About')}
                  to='/About'
                  {...a11yProps(4)}
                  component={RouterLink}
                  abel="About" >About
                </ListItem>
              </Paper>

              <Paper square={false} elevation={0} className={classes.navPaper} >
                <ListItem
                  className={classes.navMenuListItem}
                  selected={currentTab === 'StyleGuide'}
                  onClick={(event) => handleClickNavTab(event, 'StyleGuide')}
                  to='/StyleGuide'
                  {...a11yProps(5)}
                  component={RouterLink}
                  label="Style Guide" >Style Guide
                </ListItem>
              </Paper>

            </List>
          </Collapse>
        </Grid>
      </Grid>
    </Grid>
    < />
  );
}

NavBarTabsSmallScreens.propTypes = {
  currentTab: PropTypes.string.isRequired,
  handleClickNavTab: PropTypes.func.isRequired,
  logo: PropTypes.string.isRequired
};
