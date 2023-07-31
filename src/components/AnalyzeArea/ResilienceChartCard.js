import React from 'react';
import { PropTypes } from 'prop-types';

import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

import ResiliencePieChart from './ResiliencePieChart';
import ResilienceHubScore from './ResilienceHubScore';
import ActionButtonsHolder from '../All/ActionButtonsHolder';

const StyledBackgroundBox = styled(Box)(({ theme }) => ({
  height: '100%'
}));

export default function ChartCard(props) {
  const { chartData, chartActionButtons, coreHubScore } = props;

  return (
    <StyledBackgroundBox mr={1}>
      <Grid
        container
        spacing={1}
        justifyContent="center"
        alignContent="start"
        p={0}
        m={0}
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'row'
        }} >
        <Grid xs={12} px={0} pb={0} sx={{ flexGrow: '1' }}>
          <Typography variant="h6" component="div" justifyContent="center" alignItems="center" p={1} sx={{ display: 'flex' }} >
            Resilience Hub Summary
          </Typography>
        </Grid>
        <Grid xs={12} px={0} pb={0} sx={{ flexGrow: '1' }}>
          <ResilienceHubScore sx={{ height: '150px' }} coreHubScore={coreHubScore}/>
        </Grid>
        <Grid xs={12} px={0} pb={0} sx={{ width: '100%', height: '375px' }} >
          <ResiliencePieChart coreHubScore={coreHubScore} data={chartData}/>
        </Grid>
        <Grid
          xs={12}
          px={0}
          sx={{
            width: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }} >
          <ActionButtonsHolder
            actionButtons={chartActionButtons}
            styledGridSx={{ width: 'fit-content', height: (theme) => theme.spacing(8), maxHeight: (theme) => theme.spacing(8) }}
            gridSx={ { width: 'fit-content' } }
          />
        </Grid>
      </Grid>
    </StyledBackgroundBox>
  );
}

ChartCard.propTypes = {
  chartData: PropTypes.array,
  chartActionButtons: PropTypes.array,
  coreHubScore: PropTypes.number
};
