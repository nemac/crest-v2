import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { PictureAsPdf } from '@mui/icons-material';

import { StyledPaper } from '../All/StyledComponents';

// just a place holder needs props passed in and image etc
export default function DataAndReportsCardMethodology() {
  return (
    <Box>
      <StyledPaper variant="outlined" square={false}>
        <Typography variant="h5" component="div" gutterBottom>
          Methodology and Data Report for U.S. Caribbean and Pacific Islands
        </Typography>
        <Box sx={{
          justifyContent: 'start',
          alignItems: 'start',
          display: 'flex',
          width: '100%'
        }} >
          <Typography variant="body1" component="div" gutterBottom>
            Report provides a summary of overarching methods and data
            sources used for all U.S. Caribbean and Pacific Islands.
          </Typography>
        </Box>

        <Grid container justifyContent="start" alignItems="start" pt={1}>
          <Grid item xs={1} sm={0.5}>
            <PictureAsPdf sx={{ color: 'CRESTCta.main' }} />
          </Grid>
          <Grid item xs={11} sm={11.5} >
            <Link href="https://www.nfwf.org/sites/default/files/2022-04/methodology-data-report-us-caribbean-pacific-islands.pdf" target="_blank">Regional Methodology and Data Report</Link>
          </Grid>
        </Grid>

      </StyledPaper>
    </Box>
  );
}
