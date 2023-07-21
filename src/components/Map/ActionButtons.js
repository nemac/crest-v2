/*
Purpose
  Holds all the Action button for the maps

  the actions are one of the following:
    - add area (open or expands the add area menu)
    - export exports the map to png/svg
    - map layers opens the map layer list

Child Components
  - ActionButton.js

Libs
  - Not sure yet

API
  - Not sure yet

State needed
  - map layer list open or not
  - add area open or not NEW state item
  - Not sure yet

Props
  - Not sure yet
*/
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import html2canvas from 'html2canvas';
import FileSaver from 'file-saver';

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
  const handleExportClick = useCallback(async () => {
    const elId = 'map-container';
    console.log('export clicked!');
    await html2canvas(document.getElementById(elId), {
      logging: false,
      backgroundColor: null,
      useCORS: true, // Enable CORS to avoid cross-origin issues
      allowTaint: true, // Allow images from other domains
      useUnsafeCSS: true // Allow unsafe CSS (if needed)
    }).then((canvas) => {
      const png = canvas.toDataURL('image/png', 1.0);
      const fileName = 'map.png';
      FileSaver.saveAs(png, fileName);
    });
  }, []);
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
          onClick={handleExportClick}>
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
