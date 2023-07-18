import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

import DataAndReportsCardHolder from '../components/DataAndReports/DataAndReportsCardHolder';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  backgroundColor: theme.palette.CRESTGridBackground.main,
  color: theme.palette.CRESTGridBackground.contrastText,
  borderColor: theme.palette.CRESTBorderColor.main
}));

// sample configs to create all the cards
// TODO config should be imported from config directory
const sampleRegionConfig = [
  {
    regionName: 'American Somoa',
    dataFileSize: '100 MB',
    dataLink: 'https://www.google.com/',
    NativeLanguageText: 'Amerika Samoa Su’esu’ega o Malosi Gafataulima i Nofoaga Tumatāfaga',
    NativeLanguageLink: 'https://www.google.com/',
    EnglishLink: 'https://www.google.com/'
  },
  {
    regionName: 'Continental United States (CONUS)',
    dataFileSize: '15 GB',
    dataLink: 'https://www.google.com/',
    EnglishLink: 'https://www.google.com/'
  },
  {
    regionName: 'Guam',
    dataFileSize: '10 MB',
    dataLink: 'https://www.google.com/',
    EnglishLink: 'https://www.google.com/'
  },
  {
    regionName: 'Hawai\'i',
    dataFileSize: '25 MB',
    dataLink: 'https://www.google.com/',
    EnglishLink: 'https://www.google.com/'
  }
];

const sampleTargetedWatershedConfig = [
  {
    regionName: 'Cape Fear Watershed',
    dataFileSize: '122 MB',
    dataLink: 'https://www.google.com/',
    NativeLanguageLink: 'https://www.google.com/',
    EnglishLink: 'https://www.google.com/'
  }
];

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
          <DataAndReportsCardHolder cardConfig={sampleRegionConfig} />
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center" alignItems="center" px={3} pt={6} pb={0.75}>
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
          <DataAndReportsCardHolder cardConfig={sampleTargetedWatershedConfig} />
        </Grid>
      </Grid>

    </div>
  );
}
