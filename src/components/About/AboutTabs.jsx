import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { styled } from '@mui/system';

import AboutTabPanel from './AboutTabPanel.jsx';
import AboutCrest from './AboutCrest.jsx';
import AboutCommunityExposure from './AboutCommunityExposure.jsx';
import AboutFishAndWildlife from './AboutFishAndWildlife.jsx';
import AboutResilienceHubs from './AboutResilienceHubs.jsx';
import a11yProps from '../../utility/a11yProps';

const StyledAboutTab = styled(Tab)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  borderTopLeftRadius: '4px',
  borderTopRightRadius: '4px',
  backgroundColor: theme.palette.CRESTDarkAlt.main,
  '&:hover': {
    backgroundColor: theme.palette.CRESTGridBackground.dark
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.CRESTGridBackground.dark,
    border: `1px solid ${theme.palette.CRESTBorderColor.main}`,
    '&:hover': {
      backgroundColor: theme.palette.CRESTDarkAlt.main
    },
    item: {
      item: { display: 'flex', flexDirection: 'column' }
    }
  }
}));

export default function AboutTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" px={3} py={0.75} >
      <Grid xs={12} >
        <Box sx= {{ width: '100%', backgroundColor: (theme) => theme.palette.CRESTDark.main }}>
           <Box px={2} sx={{ backgroundColor: (theme) => theme.palette.CRESTGridBackground.main }}>
             <Tabs
                value={value}
                onChange={handleChange}
                aria-label="about page tabs"
                sx={{ backgroundColor: (theme) => theme.palette.CRESTGridBackground.main }}
              >
               <StyledAboutTab label="About CREST" {...a11yProps(0, 'about-tab')} />
               <StyledAboutTab label="About Community Exposure" {...a11yProps(1, 'about-tab')} />
               <StyledAboutTab label="About Fish and Wildlife" {...a11yProps(2, 'about-tab')} />
               <StyledAboutTab label="About Resilience Hubs" {...a11yProps(3, 'about-tab')} />
             </Tabs>
           </Box>
           <AboutTabPanel value={value} index={0}>
             <AboutCrest />
           </AboutTabPanel>

           <AboutTabPanel value={value} index={1}>
             <AboutCommunityExposure />
           </AboutTabPanel>

           <AboutTabPanel value={value} index={2}>
             <AboutFishAndWildlife />
           </AboutTabPanel>

           <AboutTabPanel value={value} index={3}>
             <AboutResilienceHubs />
           </AboutTabPanel>
         </Box>
      </Grid>
    </Grid>
  );
}
