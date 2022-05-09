import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

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
             About CREST
           </TabPanel>
           <TabPanel value={value} index={1}>
             About the Community Exposure Index
           </TabPanel>
           <TabPanel value={value} index={2}>
             About the Fish and Wildlife Index
           </TabPanel>
           <TabPanel value={value} index={3}>
             About the Resilience Hubs
           </TabPanel>
         </Box>
      </Grid>
    </Grid>
  )
}
