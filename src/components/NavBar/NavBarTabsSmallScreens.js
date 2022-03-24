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
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';

import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { MenuOutlined, Menu, ArrowDropDownCircle } from '@mui/icons-material';

import {
  makeStyles,
  useTheme
} from '@mui/styles';

// style for pointer in menu headings
const useStyles = makeStyles({
  Pointer: {
    cursor: 'pointer',
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
  const [openMenu, setOpenMenu] = React.useState(true);
  const classes = useStyles();

  const handleMenuClick = () => {
    setOpenMenu(!openMenu);
  };

  return (
    < >
    <Grid item xs={12} >
      <Grid container spacing={0} justifyContent='center' alignItems='center' px={0} >

        <Grid item xs={12} onClick={handleMenuClick} className={classes.Pointer} sx={{backgroundColor: 'CRESTGridBackground.main'}}>
          <Grid container spacing={0} justifyContent='center' alignItems='center' px={0} pb={1} sx={{backgroundColor: 'CRESTDark.main'}}>
            <Grid item xs={11} sx={{backgroundColor: 'CRESTDark.main'}}>
              <Typography variant='h6' component='div' px={1} pt={1} align="left" gutterBottom>
                Coastal Resilience Evaluation and Siting Tool
              </Typography>
            </Grid>
            <Grid item xs={1} sx={{backgroundColor: 'CRESTDark.main'}}>
              <Typography variant='h6' component='div' px={1} pt={1} mb={0} align="left" gutterBottom>
                <MenuOutlined fontSize='medium' />
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Collapse in={openMenu} timeout="auto" unmountOnExit sx={{backgroundColor: 'CRESTGridBackground.main'}}>

            <Grid container spacing={0} justifyContent='center' alignItems='center' px={0.75} pt={1} pb={0} onClick={handleMenuClick} className={classes.Pointer} sx={{backgroundColor: 'CRESTGridBackground.main'}}>
              <Grid item xs={11} sx={{backgroundColor: 'CRESTDark.main'}}>
                <Typography variant='h7' component='div' px={3} pt={1} align="left" gutterBottom>
                  Navigation menu
                </Typography>
              </Grid>
              <Grid item xs={1} sx={{backgroundColor: 'CRESTDark.main'}}>
                <Box mr={1} >
                  <Typography variant='h7' component='div' m={0} pt={1} align="left" gutterBottom>
                    <ArrowDropDownCircle fontSize='medium' sx={{transform: 'rotate(-180deg)'}}  />
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sx={{backgroundColor: 'CRESTDark.main'}}>
                <Typography variant='h7' component='div' pb={0} mb={0} align="left" gutterBottom>
                  <Divider sx={{borderColor: 'CRESTPrimary.main'}}/>
                </Typography>
              </Grid>
            </Grid>

            <List
              value={currentTab}
              aria-label="CREST Nabigation Tabs"
              sx={{paddingTop: '0px'}} >

              <Paper square={false} elevation={0} sx={{padding: '6px 6px 3px 6px', backgroundColor: 'CRESTGridBackground.main'}} >
                <ListItem
                  sx={{ boxShadow: 3, padding: '12px' }}
                  selected={currentTab === "Home"}
                  onClick={(event) => handleClickNavTab(event, "Home" )}
                  to='/' {...a11yProps(0)}
                  component={RouterLink}>Home
                </ListItem>
              </Paper>

              <Paper square={false} elevation={0} sx={{padding: '3px 6px 3px 6px', backgroundColor: 'CRESTGridBackground.main'}} >
                <ListItem
                  sx={{ boxShadow: 3, padding: '12px' }}
                  selected={currentTab === "ResilienceProject"}
                  onClick={(event) => handleClickNavTab(event, "ResilienceProject" )}
                  to='/ResilienceProject'
                  {...a11yProps(1)}
                  component={RouterLink}>Where Should I do a Resilience Project?
                </ListItem>
              </Paper>

              <Paper square={false} elevation={0} sx={{padding: '3px 6px 3px 6px', backgroundColor: 'CRESTGridBackground.main'}} >
                <ListItem
                  sx={{ boxShadow: 3, padding: '12px' }}
                  selected={currentTab === "AnalyzeProjectSites"}
                  onClick={(event) => handleClickNavTab(event, "AnalyzeProjectSites" )}
                  to='/AnalyzeProjectSites' {...a11yProps(2)}
                  component={RouterLink}>Analyze Project Sites
                </ListItem>
              </Paper>

              <Paper square={false} elevation={0} sx={{padding: '3px 6px 3px 6px', backgroundColor: 'CRESTGridBackground.main'}} >
                <ListItem
                  sx={{ boxShadow: 3, padding: '12px' }}
                  selected={currentTab === "Examples"}
                  onClick={(event) => handleClickNavTab(event, "Examples" )}
                  to='/Examples'
                  {...a11yProps(3)}
                  component={RouterLink}
                  state={{ data }}>Examples
                </ListItem>
              </Paper>

              <Paper square={false} elevation={0} sx={{padding: '3px 6px 3px 6px', backgroundColor: 'CRESTGridBackground.main'}} >
                <ListItem
                  sx={{ boxShadow: 3, padding: '12px' }}
                  selected={currentTab === "DataAndReports"}
                  onClick={(event) => handleClickNavTab(event, "DataAndReports" )}
                  to='/DataAndReports'
                  {...a11yProps(0)}
                  component={RouterLink}
                  label="Data & Reports" >Data & Reports
                </ListItem>
              </Paper>

              <Paper square={false} elevation={0} sx={{padding: '3px 6px 3px 6px', backgroundColor: 'CRESTGridBackground.main'}} >
                <ListItem
                  sx={{ boxShadow: 3, padding: '12px' }}
                  selected={currentTab === "About"}
                  onClick={(event) => handleClickNavTab(event, "About" )}
                  to='/About'
                  {...a11yProps(4)}
                  component={RouterLink} l
                  abel="About" >About
                </ListItem>
              </Paper>

              <Paper square={false} elevation={0} sx={{padding: '3px 6px 3px 6px', backgroundColor: 'CRESTGridBackground.main'}} >
                <ListItem
                  sx={{ boxShadow: 3, padding: '12px' }}
                  selected={currentTab === "StyleGuide"}
                  onClick={(event) => handleClickNavTab(event, "StyleGuide" )}
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
  )
}