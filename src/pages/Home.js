import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { InfoOutlined } from '@mui/icons-material';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Regions from '../components/Home/Regions';
import TabCallToActions from '../components/Home/TabCallToActions';

export default function Home() {
  return (
    <div>

      <Grid container spacing={2} justifyContent="center" alignItems="center" px={3} py={0.75}>
        <Grid item xs={12}>
          <Box>
            <Paper
              square={false}
              elevation={0}
              sx={{
                backgroundColor: 'CRESTGridBackground.main',
                color: 'CRESTGridBackground.contrastText',
                borderColor: 'CRESTBorderColor.main'
              }} >
              <Typography variant="h4" component="div" align="center" gutterBottom>
                Coastal Resilience Evaluation and Siting Tool (CREST)
              </Typography>
              <Typography variant="body" component="div" align="center" gutterBottom>
                CREST is used to make informed decisions about the siting of coastal restoration
                and resilience projects. The tool identifies Resilience Hubs, which are areas
                of open space where projects may have the greatest potential to benefit both
                human community resilience and fish and wildlife. Resilience Hubs incorporate
                multiple indices, all of which are available in CREST.
              </Typography>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center" alignItems="center" px={3} pt={4} pb={0}>
        <Grid item xs={12}>
          <Box>
            <Paper
              square={false}
              elevation={0}
              sx={{
                backgroundColor: 'CRESTGridBackground.main',
                color: 'CRESTGridBackground.contrastText',
                borderColor: 'CRESTBorderColor.main'
              }} >
              <Typography variant="h4" component="div" align="center" gutterBottom>
                Select a region to start using CREST
              </Typography>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center" alignItems="center" px={1.5} py={0.75}>
        <Grid item xs={12}>
          <Regions />
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center" alignItems="center" px={1.5} py={0.75}>
        <Grid item xs={12}>
          <Box>
            <Paper
              variant="outlined"
              square={false}
              sx={{
                padding: '20px',
                backgroundColor: 'CRESTGridBackground.dark',
                color: 'CRESTGridBackground.contrastText',
                borderColor: 'CRESTBorderColor.main'
              }} >
              <List >

                  <ListItem component="div" disablePadding>
                    <ListItemIcon>
                       <InfoOutlined />
                     </ListItemIcon>
                     <Typography variant="body" component="div" px={1.5} gutterBottom>
                       Not sure how to get started? Step through a few&nbsp;
                       <Link to="/Examples" component={RouterLink} >examples</Link> to learn how to use CREST.
                     </Typography>
                  </ListItem>

                  <ListItem component="div" disablePadding>
                    <ListItemIcon>
                       <InfoOutlined />
                     </ListItemIcon>
                     <Typography variant="body" component="div" px={1.5} gutterBottom>
                      Methods and data sources vary by region, but all assessments allow you to
                      view and interact with all model inputs and results. Assessment for all
                      other US regions are underway and will be added to CREST once available.
                     </Typography>
                  </ListItem>

                  <ListItem component="div" disablePadding>
                    <ListItemIcon>
                       <InfoOutlined />
                     </ListItemIcon>
                     <Typography variant="body" component="div" px={1.5} gutterBottom>
                      CREST is intended to be used as a screening-level tool designed to help
                      identify areas that may be well suited for nature-based solutions. As with
                      all GIS analyses, site-level assessments are required to validate results
                      and develop detailed design and engineering plans.
                     </Typography>
                  </ListItem>
              </List>

            </Paper>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center" alignItems="center" px={1.5} py={0.75}>
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center" alignItems="center" px={3} pt={4} pb={3}>
        <Grid item xs={12}>
          <Typography variant="h4" component="div" align="center" gutterBottom>
            Or choose a topic to start using CREST
          </Typography>
          <TabCallToActions />
        </Grid>
      </Grid>

    </div>
  );
}
