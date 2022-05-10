import * as React from 'react';
import { Routes, Route, Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles, useTheme } from '@mui/styles';

import AboutTabPannel from '../components/About/AboutTabPannel';
import AboutCrest from '../components/About/AboutCrest';
import AboutCommunityExposure from '../components/About/AboutCommunityExposure';
import AboutFishAndWildlife from '../components/About/AboutFishAndWildlife';
import AboutResilienceHubs from '../components/About/AboutResilienceHubs';

import NEMACAboutLogoImage from '../assets/images/nemac_logo_white.png';
import NFWFAboutLogoImage from '../assets/images/nfwf_logo_white.png';

function a11yProps(index) {
  return {
    id: `about-tab-index-${index}`,
    'aria-controls': `about-tab-index-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(2.5),
    backgroundColor: theme.palette.CRESTGridBackground.main,
    color: theme.palette.CRESTGridBackground.contrastText,
    borderColor: theme.palette.CRESTBorderColor.main
  },
  TabPanels: {
    width: '100%',
    backgroundColor: theme.palette.CRESTDark.main,
  },
  AboutLogoImageStyle: {
    maxHeight: '64px',
  },
  AboutImageStyle: {
    maxWidth: '100%',
    height: 'auto'
  },
  crestList: {
    marginTop: theme.spacing(0.5),
  },
  TabHeading: {
    backgroundColor: theme.palette.CRESTGridBackground.main,
  },
  Tabs: {
    marginLeft: theme.spacing(1),
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
    backgroundColor: theme.palette.CRESTDarkAlt.main,
    "&:hover": {
      backgroundColor: theme.palette.CRESTGridBackground.dark,
    },
    '&.Mui-selected': {
      backgroundColor: theme.palette.CRESTGridBackground.dark,
      backgroundColor: theme.palette.CRESTGridBackground.dark,
      borderColor: theme.palette.CRESTBorderColor.main,
      border: 1,
      borderStyle: 'solid',
      "&:hover": {
        backgroundColor: theme.palette.CRESTDarkAlt.main,
      }
    },
    item: {
      item: { display: "flex", flexDirection: "column" }
    }
  },
  TabPannels: {
    backgroundColor: theme.palette.CRESTGridBackground.dark,
    borderColor: theme.palette.CRESTBorderColor.main,
    border: 1,
    borderStyle: 'solid',
  }
}));

export default function AboutTabs (props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
      setValue(newValue);
  };

  // get breakpoint for small screens so we can force cards on small screen and tabs on larger screens
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const classes = useStyles();
  return (
    <Box px={{ xs: 0, md: 3}} py={0.75} >
      {isSmallScreen ? (
        <div>
        <Grid container spacing={2} justifyContent="center" alignItems="center" px={2} py={1} >
          <Grid item xs={12} className={classes.item}>
            <Box  py={0.75} className={classes.descriptionBox} >
              <Paper variant="outlined" square={false} sx={{minHeight: '800px', height: '100%'}}>
                <AboutCrest />
              </Paper>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="center" alignItems="center" px={2} py={1}  >
          <Grid item xs={12} className={classes.item}>
            <Box  py={0.75} className={classes.descriptionBox} >
              <Paper variant="outlined" square={false} sx={{minHeight: '800px', height: '100%'}}>
                <AboutCommunityExposure />
              </Paper>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="center" alignItems="center" px={2} pt={1} >
          <Grid item xs={12} className={classes.item}>
            <Box  py={0.75} className={classes.descriptionBox} >
              <Paper variant="outlined" square={false} sx={{minHeight: '800px', height: '100%'}}>
                <AboutFishAndWildlife />
              </Paper>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="center" alignItems="center" px={2} py={1} >
          <Grid item xs={12} className={classes.item}>
            <Box  py={0.75} className={classes.descriptionBox} >
              <Paper variant="outlined" square={false} sx={{minHeight: '800px', height: '100%'}}>
                <AboutResilienceHubs />
              </Paper>
            </Box>
          </Grid>
        </Grid>
        </div>
      ) : (
        <Grid container spacing={2} justifyContent="center" alignItems="center" px={3} py={0.75} >
          <Grid item xs={12} >
            <Box className={classes.TabPanels}>
               <Box px={2} className={classes.TabHeading}>
                 <Tabs value={value} onChange={handleChange} aria-label="about page tabs" className={classes.TabHeading}>
                   <Tab label="About CREST" {...a11yProps(0)} className={classes.Tabs}/>
                   <Tab label="About Community Exposure" {...a11yProps(1)} className={classes.Tabs}/>
                   <Tab label="About Fish and Wildlife" {...a11yProps(2)} className={classes.Tabs}/>
                   <Tab label="About Resilience Hubs" {...a11yProps(3)} className={classes.Tabs}/>
                 </Tabs>
               </Box>
               <AboutTabPannel value={value} index={0} className={classes.TabPannels}>
                 <AboutCrest />
               </AboutTabPannel>

               <AboutTabPannel value={value} index={1} className={classes.TabPannels}>
                 <AboutCommunityExposure />
               </AboutTabPannel>

               <AboutTabPannel value={value} index={2} className={classes.TabPannels}>
                 <AboutFishAndWildlife />
               </AboutTabPannel>

               <AboutTabPannel value={value} index={3} className={classes.TabPannels}>
                 <AboutResilienceHubs />
               </AboutTabPannel>
             </Box>
          </Grid>
        </Grid>
      )
      }

      <Grid container spacing={2} justifyContent="center" alignItems="center" px={{ xs: 2, md: 3 }} pt={2} pb={0.75} >
        <Grid item xs={12} sm={6} >
          <img src={NFWFAboutLogoImage} className={classes.AboutLogoImageStyle} />
        </Grid>
        <Grid item xs={12} sm={6} >
          <img src={NEMACAboutLogoImage} className={classes.AboutLogoImageStyle} />
        </Grid>
      </Grid>
    </Box>
  )
}
