import React from 'react';
import { useSelector } from 'react-redux';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { PropTypes } from 'prop-types';

const analyzeAreaVisibleSelector = (state) => state.analyzeArea.visible;
const analyzeAreaSortExpanded = (state) => state.analyzeArea.isSortExpanded;

const StyledBox = styled(Box)(({ theme }) => ({
  marginTop: '8px',
  backgroundColor: theme.palette.background.default,
  border: 'none',
  display: 'flex',
  flexDirection: 'row',
  overflowY: 'visible',
  overflowX: 'clip',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(0.5)
  }
}));

export default function AnalyzeProjectSiteLeftColumn(props) {
  const {
    mapActionCard, noDataState, chartCard
  } = props;

  const analyzeAreaVisible = useSelector(analyzeAreaVisibleSelector);
  const isSortExpanded = useSelector(analyzeAreaSortExpanded);
  const extraSpace = isSortExpanded ? '64px' : '0px';

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      {mapActionCard}
      <StyledBox style={{ height: analyzeAreaVisible ? ` calc(100% - (258px + ${extraSpace}))` : ` calc(100% - (58px + ${extraSpace})` }}>
        {!chartCard.props.chartData ? (
          noDataState
        ) : (
          <Grid container spacing={0} justifyContent="center" alignItems="center" px={0.5} pb={0} sx={{ height: '100%' }} >
            <Grid xs={12} sx={{ height: '100%', width: '100%' }} >
              {chartCard}
            </Grid>
          </Grid>
        )}
      </StyledBox>
    </Box>
  );
}

AnalyzeProjectSiteLeftColumn.propTypes = {
  mapActionCard: PropTypes.node,
  chartCard: PropTypes.node,
  noDataState: PropTypes.any
};
