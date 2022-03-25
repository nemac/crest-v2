import * as React from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { InfoOutlined, Info } from '@mui/icons-material';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import DataAndReportsCardHolder from '../components/DataAndReports/DataAndReportsCardHolder';

export default function DataAndReports() {
  return (
    <div>

      <Grid container spacing={2} justifyContent="center" alignItems="center" px={3} py={0.75}>
        <Grid item xs={12}>
          <Box>
            <Paper square={false} elevation={0} sx={{ backgroundColor: 'CRESTGridBackground.main', color: 'CRESTGridBackground.contrastText', borderColor: 'CRESTBorderColor.main'}} >
              <Typography variant="h4" component="div" align="center" gutterBottom>
                Regional Coastal Resilience Assessment Data Downloads and Reports
              </Typography>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center" alignItems="center" px={1.5} py={0.75}>
        <Grid item xs={12}>
          <DataAndReportsCardHolder />
        </Grid>
      </Grid>

    </div>
  )
}