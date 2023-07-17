import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';

import { StyledGrid } from '../All/StyledComponents';
import ChartHeaderActionButtonsHolder from '../AnalyzeArea/GenericChartHeaderActionButtons';

const ContentHolderGrid = styled(Grid)(({ theme }) => ({
  height: 'calc(100% - 123px)',
  [theme.breakpoints.down('lg')]: {
    height: 'calc(100% - 56px)'
  }
}));

const ThreeColumnGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(0.2),
  height: '100%'
}));

const ContentMapBox = styled(Box)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(0),
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  borderColor: theme.palette.CRESTBorderColor.main,
  borderStyle: 'solid',
  borderWidth: '1px'
}));

export default function GenericMapHolder(props) {
  const { mapActionCardHeight, mapActionCard, isItAGraph,
    chartHeaderActionButtons, chartCard, tableData, mapCard } = props;
  const listVisibleSelector = (state) => state.mapLayerList.visible;
  const layerListVisible = useSelector(listVisibleSelector);

  return (
    <ContentHolderGrid container
      spacing={0}
      rowSpacing={{ xs: 1, sm: 1, md: 0 }}
      px={1}
      pb={{ xs: 1, sm: 1, md: 0 }}
      pt={{ xs: 0.5, sm: 0.5, md: 0 }}
      justifyContent="space-between"
      alignItems="stretch"
    >
      {/* LEFT COLUMN */}
      <ThreeColumnGrid item
        xs={12} sm={12} md={4} lg={3.75} xl={3}
        order={{ xs: 3, sm: 3, md: 1 }}
      >
        {mapActionCard}
        <Box sx={{ height: 'calc(100% - 258px)', marginTop: '8px' }}>
          <Grid container spacing={0} justifyContent="center" alignItems="center" px={0} pb={2} sx={{ height: '100%' }}>
            <Grid xs={12} >
              <ChartHeaderActionButtonsHolder
                title='Where Should I Do a Resilience Project'
                actionButtons={chartHeaderActionButtons}
              />
            </Grid>
            <Grid xs={12} sx={{ height: 'calc(100% - 112px)', paddingRight: (theme) => theme.spacing(1.5), overflowY: 'scroll' }}>
              <Box>
                {isItAGraph ? (
                  chartCard
                ) : (
                  tableData
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </ThreeColumnGrid>

      {/* MIDDLE COLUMN FOR MAP */}
      <ThreeColumnGrid item
        xs={12}
        sm={12}
        md={4.5}
        lg={layerListVisible ? 5.25 : 8.25}
        xl={layerListVisible ? 6.25 : 9}
        order={{ xs: 1, sm: 1, md: 2 }}
      >
        <ContentMapBox>
          {mapCard}
        </ContentMapBox>
      </ThreeColumnGrid>

      {/* RIGHT COLUMN FOR LAYER LIST */}
      <ThreeColumnGrid item
        xs={12} sm={12} md={3.5} lg={3} xl={2.75}
        sx={{ display: { xs: layerListVisible ? 'flex' : 'none' } }}
        order={{ xs: 2, sm: 2, md: 3 }}
      >
      </ThreeColumnGrid>
    </ContentHolderGrid>
  );
}

GenericMapHolder.propTypes = {
  mapActionCard: PropTypes.node,
  //ChartCard: PropTypes.node,
  mapCard: PropTypes.node,
  chartHeaderActionButtons: PropTypes.array
};