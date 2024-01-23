import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';

import ActionButtons from './ActionButtons';
import MapLayerList from '../MapLayerList/MapLayerList';
import { ThreeColumnGrid } from '../All/StyledComponents';

const ContentHolderGrid = styled(Grid)(({ theme }) => ({
  height: 'calc(100% - 123px)',
  [theme.breakpoints.down('lg')]: {
    height: 'calc(100% - 123px)'
  },
  [theme.breakpoints.down('md')]: {
    height: 'calc(60% - 80px)'
  }
}));

const ContentMapBox = styled(Box)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(0),
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  borderColor: theme.palette.CRESTBorderColor.main,
  borderStyle: 'solid',
  borderWidth: '1px'
}));

const listVisibleSelector = (state) => state.mapLayerList.visible;

export default function GenericMapHolder(props) {
  const { leftColumn, mapCard, map } = props;
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
      <ThreeColumnGrid
        xs={12} sm={12} md={4} lg={3.75} xl={3}
        sx={{ display: { xs: 'flex' } }}
        order={{ xs: 3, sm: 3, md: 1 }}
      >
        {leftColumn}
      </ThreeColumnGrid>

      {/* MIDDLE COLUMN FOR MAP */}
      <ThreeColumnGrid
        xs={12}
        sm={12}
        md={4.5}
        lg={layerListVisible ? 5.25 : 8.25}
        xl={layerListVisible ? 6.25 : 9}

        order={{ xs: 1, sm: 1, md: 2 }}
      >
        <ContentMapBox>
          {mapCard}
          <ActionButtons map={map} />
        </ContentMapBox>
      </ThreeColumnGrid>

      {/* RIGHT COLUMN FOR LAYER LIST */}
      <ThreeColumnGrid
        xs={12} sm={12} md={3.5} lg={3} xl={2.75}
        sx={{ display: { xs: layerListVisible ? 'flex' : 'none' } }}
        order={{ xs: 2, sm: 2, md: 3 }}
      >
        <MapLayerList/>
      </ThreeColumnGrid>
    </ContentHolderGrid>
  );
}

GenericMapHolder.propTypes = {
  leftColumn: PropTypes.node,
  mapCard: PropTypes.node,
  map: PropTypes.object
};
