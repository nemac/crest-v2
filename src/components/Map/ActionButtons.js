import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Grid from '@mui/material/Unstable_Grid2';
import {
  CameraAlt,
  LayersOutlined,
  Layers,
  // LibraryAddOutlined,
  LibraryAdd
} from '@mui/icons-material';
import { StyledGrid } from '../All/StyledComponents';
import ActionButton from '../All/ActionButton';
import { toggleVisible as toggleMapLayerVisibility } from '../../reducers/mapLayerListSlice';

const listVisibleSelector = (state) => state.mapLayerList.visible;

// just a place holder needs props passed in and image etc
export default function ActionButtons() {
  const dispatch = useDispatch();
  const layerListVisible = useSelector(listVisibleSelector);

  const mapLayerVisiblityOnClick = () => {
    dispatch(toggleMapLayerVisibility());
  };

  // place holder for later wanted to add a click handler for graph or Table
  // TODO add addarea toggle
  // TODO export
  const handleGenericClick = (event) => {
    event.stopPropagation();
    console.log('clicked'); // eslint-disable-line no-console
  };

  return (
    <StyledGrid
      container
      spacing={0}
      justifyContent="center"
      alignItems="center"
      sx={{ height: (theme) => theme.spacing(8) }}
    >

      <Grid xs={4}>
        <ActionButton
          buttonLabel={'Add Area'}
          buttonName={'Add Area'}
          onClick={handleGenericClick}>
          <LibraryAdd />
        </ActionButton>
      </Grid>
      <Grid xs={4}>
        <ActionButton
          buttonLabel={'Export'}
          buttonName={'Export'}
          onClick={handleGenericClick}>
          <CameraAlt />
        </ActionButton>
      </Grid>
      <Grid xs={4}>
        <ActionButton
          buttonLabel={'Map Layers'}
          buttonName={'Map Layers'}
          onClick={mapLayerVisiblityOnClick}>
          {layerListVisible ? <Layers /> : <LayersOutlined /> }
        </ActionButton>
      </Grid>

    </StyledGrid>
  );
}
