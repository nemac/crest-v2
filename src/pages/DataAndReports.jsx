import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

import DataAndReportsCardHolder from '../components/DataAndReports/DataAndReportsCardHolder.jsx';
import DataAndReportsCardTargetWatershedsHolder from '../components/DataAndReports/DataAndReportsCardTargetWatershedsHolder.jsx';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  backgroundColor: theme.palette.CRESTGridBackground.main,
  color: theme.palette.CRESTGridBackground.contrastText,
  borderColor: theme.palette.CRESTBorderColor.main
}));

export default function DataAndReports() {
  return (
    <div>

      <Grid container spacing={2} justifyContent="center" alignItems="center" px={3} py={0.75}>
        <Grid item xs={12}>
          <Box>
            <StyledPaper square={false} elevation={0}>
              <Typography variant="h4" component="div" align="center" gutterBottom>
                Regional Coastal Resilience Assessment Data Downloads and Reports
              </Typography>
            </StyledPaper>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center" alignItems="center" px={1.5} py={0.75}>
        <Grid item xs={12}>
          <DataAndReportsCardHolder />
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center" alignItems="center" mt={4} px={3} pt={6} pb={0.75}>
        <Grid item xs={12}>
          <Box>
            <StyledPaper square={false} elevation={0}>
              <Typography variant="h4" component="div" align="center" gutterBottom>
                Targeted Watershed Assessment Data Downloads
              </Typography>
            </StyledPaper>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center" alignItems="center" px={1.5} py={0.75}>
        <Grid item xs={12}>
          <DataAndReportsCardTargetWatershedsHolder />
        </Grid>
      </Grid>

    </div>
  );
}
