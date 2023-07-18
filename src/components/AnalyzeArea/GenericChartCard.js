import React from 'react';
import { PropTypes } from 'prop-types';

import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

import ResiliencePieChart from './ResiliencePieChart';
import ActionButtonsHolder from '../All/ActionButtonsHolder';

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '350px',
  maxHeight: '350px',
  padding: theme.spacing(0),
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  borderColor: theme.palette.CRESTBorderColor.main,
  borderStyle: 'solid',
  borderWidth: '1px',
  justifyContent: 'center',
  alignItems: 'center'
}));

export default function ChartCard(props) {
  const { chartData, chartActionButtons } = props;

  return (
    <Grid container spacing={0} justifyContent="center" alignItems="center" px={0} pb={4} >
        <div style={{ width: '100%' }}>
          <Grid xs={12} >
            <ContentBox>
              <ResiliencePieChart data={chartData}/>
            </ContentBox>
          </Grid>
          <Grid xs={12} >
            <ActionButtonsHolder actionButtons={chartActionButtons}/>
          </Grid>
        </div>
    </Grid>
  );
}

ChartCard.propTypes = {
  chartData: PropTypes.array,
  chartActionButtons: PropTypes.array
};
