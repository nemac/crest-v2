import React from 'react';
import { PropTypes } from 'prop-types';

import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';

import { StyledGrid } from '../All/StyledComponents';

export default function ResilienceHubScore(props) {
  const { coreHubScore } = props;

  return (
    <StyledGrid container spacing={0} p={0} mt={1} mb={1} sx={{ height: '350px' }}>
      <Grid xs={12}>
        <Typography variant="h4" component="div" justifyContent="center" alignItems="center" p={1} sx={{ display: 'flex' }} >
          Average Hub Core Score
        </Typography>
      </Grid>
      <Grid xs={12}>
        <Typography variant="h2" component="div" justifyContent="center" alignItems="center" p={1} sx={{ display: 'flex' }} >
          {coreHubScore}
        </Typography>
      </Grid>
    </StyledGrid>
  );
}

ResilienceHubScore.propTypes = {
  coreHubScore: PropTypes.number
};
