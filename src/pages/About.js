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
import { makeStyles } from '@mui/styles';


import NEMACAboutLogoImage from '../assets/images/nemac_logo_white.png';
import NFWFAboutLogoImage from '../assets/images/nfwf_logo_white.png';
import AboutComunityExposureImage from '../assets/images/about_comunity_exposure.png';
import AboutComunityFishAndWildlifeImage from '../assets/images/about_fish_and_wildlife.png';
import AboutComunityResilienceHubsImage from '../assets/images/about_resilience_hubs.png';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
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
  }
}));

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function AboutTabs (props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
      setValue(newValue);
  };

  const classes = useStyles();
  return (
    <Box  px={3} py={0.75} >
      <Paper variant="outlined" square={false}  >
        <Grid container spacing={2} justifyContent="center" alignItems="center" px={3} py={0.75} >
          <Grid item xs={12} >
            <Box className={classes.TabPanels}>
               <Box px={2}>
                 <Tabs value={value} onChange={handleChange} aria-label="about page tabs">
                   <Tab label="About CREST" {...a11yProps(0)} />
                   <Tab label="About Community Exposure" {...a11yProps(1)} />
                   <Tab label="About Fish and Wildlife" {...a11yProps(2)} />
                   <Tab label="About Resilience Hubs" {...a11yProps(3)} />
                 </Tabs>
               </Box>
               <TabPanel value={value} index={0}>
                 <Typography variant="h5" component="div" align="start" px={3} py={1} gutterBottom>
                   About CREST
                 </Typography>
                 <Divider variant="middle" />
                 <Typography variant="body" component="div" align="start" px={3} pt={3} pb={1}  gutterBottom>
                   The Regional Coastal Resilience Assessments were developed by the National Fish and Wildlife Foundation (NFWF), in partnership with the National Oceanic and Atmospheric Administration (NOAA) and UNC Asheville’s National Environmental Modeling and Analysis Center (NEMAC) and in consultation with the U.S. Army Corps of Engineers and NatureServe. The Coastal Resilience Evaluation and Siting Tool (CREST) provides an interactive platform to view, download, and interact with the results of the Regional Coastal Resilience Assessments.
                 </Typography>
                 <Typography variant="body" component="div" align="start" px={3} py={1} gutterBottom>
                   The Regional Assessments seek to identify areas on the landscape where the implementation of nature-based solutions have potential to maximize benefits for human community resilience to flooding threats and fish and wildlife habitat. In 2019, NFWF launched CREST to share results of the Regional Assessments for the U.S. Atlantic, Gulf of Mexico, and Pacific coastlines, which use a standardized methodology to combine information about flooding threats, human community assets, and fish and wildlife species to identify Resilience Hubs. The Regional Assessments have since expanded to include Puerto Rico, the U.S. Virgin Islands, the Northern Mariana Islands, Hawaii, Guam, American Samoa, and Alaska. Owing to the uniqueness of each region, the methods will continue to be refined and enhanced. CREST will be updated once the U.S. Great Lakes Regional Assessment is complete and as other Regional Assessments are updated.
                 </Typography>
                 <Typography variant="body" component="div" align="start" px={3} py={1} gutterBottom>
                   CREST provides an online, interactive environment to access Regional Assessment results. It allows users to:
                   <ol className={classes.crestList} >
                     <li>View and explore key Assessment inputs and results within their own areas of interest,</li>
                     <li>Analyze potential project sites and quantify results from the Assessment models,</li>
                     <li>Search Resilience Hubs to identify potential project sites, and</li>
                     <li>Provide advanced GIS users with the ability to download all of the final Regional Assessment datasets for use in their own GIS platform.</li>
                   </ol>
                 </Typography>
                 <Typography variant="body" component="div" align="start" px={3} py={1} gutterBottom>
                   CREST is intended to be used as a screening-level tool designed to help identify areas that may be well suited for nature-based solutions. As with all GIS analyses, site-level assessments are required to validate results and develop detailed design and engineering plans. The results are limited by those data available at the time of analysis and by the underlying accuracy and precision of the original data sources; therefore, the Regional Assessments may not capture all flood-related threats, community assets, fish and wildlife resources, or areas of open space. For instance, significant data gaps exist in many regions including limited coastal flood-related and soil datasets across Alaska, limited storm surge data for Pacific Island regions, and lack of data that incorporate recent land subsidence in American Samoa. Resilience Hubs are not intended to identify all potential opportunities for nature-based solutions, but rather are meant to help assess potential projects based on dual benefits for habitats and human communities.
                 </Typography>
                 <Typography variant="body" component="div" align="start" px={3} py={1} gutterBottom>
                   For additional information about the Regional Coastal Resilience Assessments and to access final reports, visit the NFWF <Link target="_blank" href="https://www.nfwf.org/programs/national-coastal-resilience-fund/regional-coastal-resilience-assessment">Regional Coastal Resilience Assessment page</Link>.  In addition to the Regional Coastal Resilience Assessments, NFWF and NOAA partnered with NatureServe to complete Targeted Watershed Assessments for eight watersheds throughout the U.S. CREST also features the results from each targeted watershed.
                 </Typography>
                 <Typography variant="body" component="div" align="start" px={3} py={1} gutterBottom>
                   Please send questions, comments, or issues to <Link href="mailto:gdobson@unca.edu">gdobson@unca.edu</Link>.
                 </Typography>
               </TabPanel>

               <TabPanel value={value} index={1}>
                 <Typography variant="h5" component="div" align="start" px={3} py={1} gutterBottom>
                   About Community Exposure
                 </Typography>
                 <Divider variant="middle" />
                 <Grid container justifyContent="center" alignItems="center" pt={1.5}>
                   <Grid item xs={12}>
                     <img src={AboutComunityExposureImage} className={classes.AboutImageStyle} />
                   </Grid>
                 </Grid>
                 <Typography variant="body" component="div" align="start" px={3} py={1} gutterBottom>
                   The Community Exposure Index explores the relationship between potential flooding threats and the presence of community assets by combining two composite indices: the Threat Index and the Community Asset Index. The Threat Index utilizes landscape characteristics and flood-related data. The Community Asset Index helps to understand where critical infrastructure, facilities, and population are concentrated on the landscape. Together, these indices combine to identify areas where community assets overlap with flood threats, also known as exposure.While individual data inputs vary regionally, the Regional Coastal Resilience Assessments utilize standardized methods to calculate the Community Exposure Index. For details, review the <Link value="DataAndReports" to='/DataAndReports' component={RouterLink} >final reports</Link>
                 </Typography>
               </TabPanel>

               <TabPanel value={value} index={2}>
                 <Typography variant="h5" component="div" align="start" px={3} py={1} gutterBottom>
                   About Fish and Wildlife
                 </Typography>
                 <Divider variant="middle" />
                 <Grid container justifyContent="center" alignItems="center" pt={1.5}>
                   <Grid item xs={12}>
                     <img src={AboutComunityFishAndWildlifeImage} className={classes.AboutImageStyle} />
                   </Grid>
                 </Grid>
                 <Typography variant="body" component="div" align="start" px={3} py={1} gutterBottom>
                   The Fish and Wildlife Index identifies areas on the landscape where species and their habitats are located, helping to understand areas where implementing nature-based solutions are likely to benefit federal- or state-designated species of concern. While the Regional Coastal Resilience Assessments consistently combine species data to create a single Fish and Wildlife Index, methods vary between the continental U.S. (CONUS) and other regional assessments. In CONUS, a Terrestrial and Aquatic Index are combined based principally on rarity-weighted richness. Importantly, in CONUS, the Aquatic Index includes both freshwater and marine species, but focuses almost exclusively on very shallow, nearshore areas.
                 </Typography>
                 <Typography variant="body" component="div" align="start" px={3} py={1} gutterBottom>
                   Implementing significant enhancements to the Fish and Wildlife Index methods, regional assessments in Puerto Rico, the U.S. Virgin Islands, and the Northern Mariana Islands combine Terrestrial and Marine Indices. Unlike CONUS, the Terrestrial Index attempts to identify suitable habitat based on the habitat preferences of major taxonomic groups  (e.g., birds, reptiles, mammals, amphibians, and freshwater fishes and invertebrates). The Marine Index considers habitat to a 30-meter depth contour, utilizing the best available data to identify marine habitat types capable of supporting significant biodiversity (e.g., coral reefs, mangroves, and seagrass beds). CREST automatically displays the results for each region based on the method applied. For details, review the <Link value="DataAndReports" to='/DataAndReports' component={RouterLink} >final reports</Link>.
                 </Typography>
               </TabPanel>

               <TabPanel value={value} index={3}>
                 <Typography variant="h5" component="div" align="start" px={3} py={1} gutterBottom>
                   About Resilience Hubs
                 </Typography>
                 <Divider variant="middle" />
                 <Grid container justifyContent="center" alignItems="center" pt={1.5}>
                   <Grid item xs={12}>
                     <img src={AboutComunityResilienceHubsImage} className={classes.AboutImageStyle} />
                   </Grid>
                 </Grid>
                 <Typography variant="body" component="div" align="start" px={3} py={1} gutterBottom>
                   Resilience Hubs are areas of open space or habitat where resilience projects may have the greatest potential to benefit both human community resilience and fish and wildlife. The Hubs combine information about natural open spaces, flooding threats, community assets, and fish and wildlife resources. As the primary output of the Regional Coastal Resilience Assessments, Resilience Hubs are common to all regions. However, the methods used to develop Resilience Hubs do vary regionally, with significant methodological enhancements made in Puerto Rico, the U.S. Virgin Islands, and the Northern Mariana Islands. For details, review the <Link value="DataAndReports" to='/DataAndReports' component={RouterLink} >final reports</Link>
                 </Typography>
               </TabPanel>
             </Box>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={2} justifyContent="center" alignItems="center" px={{ xs: 4, sm: 3 }} pt={2} pb={0.75} >
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
