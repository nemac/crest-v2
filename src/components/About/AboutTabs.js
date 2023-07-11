/*
Purpose
  The About tabs, used in larger screens

Child Components
  - AboutCrest.js
  - AboutCommunityExposure.js
  - AboutFishAndWildlife.js
  - AboutResilienceHubs.js

Libs
  - Not sure yet

API
  - Not sure yets

State needed
  - Not sure yet

Props
  - Not sure yet
*/
import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';

import AboutTabPanel from './AboutTabPanel';
import AboutCrest from './AboutCrest';
import AboutCommunityExposure from './AboutCommunityExposure';
import AboutFishAndWildlife from './AboutFishAndWildlife';
import AboutResilienceHubs from './AboutResilienceHubs';
import a11yProps from '../../utility/a11yProps';

const AboutTab = styled(Tab)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  borderTopLeftRadius: '4px',
  borderTopRightRadius: '4px',
  backgroundColor: theme.palette.CRESTDarkAlt.main,
  '&:hover': {
    backgroundColor: theme.palette.CRESTGridBackground.dark
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.CRESTGridBackground.dark,
    borderColor: theme.palette.CRESTBorderColor.main,
    border: 1,
    borderStyle: 'solid',
    '&:hover': {
      backgroundColor: theme.palette.CRESTDarkAlt.main
    },
    item: {
      item: { display: 'flex', flexDirection: 'column' }
    }
  }
}));

const useStyles = makeStyles((theme) => ({
  AboutTabPanel: {
    backgroundColor: theme.palette.CRESTGridBackground.dark,
    borderColor: theme.palette.CRESTBorderColor.main,
    border: 1,
    borderStyle: 'solid'
  }
}));

export default function AboutTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" px={3} py={0.75} >
      <Grid item xs={12} >
        <Box sx= {{ width: '100%', backgroundColor: (theme) => theme.palette.CRESTDark.main }}>
           <Box px={2} sx={{ backgroundColor: (theme) => theme.palette.CRESTGridBackground.main }}>
             <Tabs
                value={value}
                onChange={handleChange}
                aria-label="about page tabs"
                sx={{ backgroundColor: (theme) => theme.palette.CRESTGridBackground.main }}
              >
               <AboutTab label="About CREST" {...a11yProps(0, 'about-tab')} />
               <AboutTab label="About Community Exposure" {...a11yProps(1, 'about-tab')} />
               <AboutTab label="About Fish and Wildlife" {...a11yProps(2, 'about-tab')} />
               <AboutTab label="About Resilience Hubs" {...a11yProps(3, 'about-tab')} />
             </Tabs>
           </Box>
           <AboutTabPanel value={value} index={0} className={classes.AboutTabPanel}>
             <AboutCrest />
           </AboutTabPanel>

           <AboutTabPanel value={value} index={1} className={classes.AboutTabPanel}>
             <AboutCommunityExposure />
           </AboutTabPanel>

           <AboutTabPanel value={value} index={2} className={classes.AboutTabPanel}>
             <AboutFishAndWildlife />
           </AboutTabPanel>

           <AboutTabPanel value={value} index={3} className={classes.AboutTabPanel}>
             <AboutResilienceHubs />
           </AboutTabPanel>
         </Box>
      </Grid>
    </Grid>
  );
}
