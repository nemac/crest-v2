import React from 'react';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { PropTypes } from 'prop-types';

const StyledBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  border: `1px solid ${theme.palette.CRESTBorderColor.main}`,
  display: 'flex',
  flexDirection: 'row',
  overflowY: 'scroll',
  overflowX: 'clip',
  width: '100%',
  height: 'calc(100% - 88px)'
}));

export default function ResilienceLeftColumn(props) {
  const {
    mapActionCard, noDataState, chartCard
  } = props;

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      {mapActionCard}
      <StyledBox>
        {!chartCard.props.chartData ? (
          noDataState
        ) : (
          <Grid container spacing={0} justifyContent="center" alignItems="center" px={0} pb={0} sx={{ height: '100%' }} >
            <Grid xs={12} sx={{ height: '100%', width: '100%' }} >
              {chartCard}
            </Grid>
          </Grid>
        )}
      </StyledBox>
    </Box>
  );
}

ResilienceLeftColumn.propTypes = {
  mapActionCard: PropTypes.node,
  chartCard: PropTypes.node,
  noDataState: PropTypes.any
};
