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
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import L from 'leaflet';
import 'leaflet-easyprint';

import Grid from '@mui/material/Unstable_Grid2';
import {
  CameraAlt,
  LayersOutlined,
  Layers,
  LibraryAdd
} from '@mui/icons-material';
import { StyledGrid } from '../All/StyledComponents';
import ActionButton from '../All/ActionButton';
import { toggleVisible as toggleMapLayerVisibility } from '../../reducers/mapLayerListSlice';

const listVisibleSelector = (state) => state.mapLayerList.visible;

// just a place holder needs props passed in and image etc
export default function ActionButtons(props) {
  const { map } = props;
  const dispatch = useDispatch();

  const control = L.easyPrint({
    sizeModes: ['A4Portrait'], // Default to add something, updated on export
    hidden: true,
    exportOnly: true,
    position: 'topleft',
    title: 'My Map'
  });

  // wire up map print for exporting map to png
  if (map) {
    map.addControl(control);
  }

  // const mapContainer = document.getElementById('map-container');

  const layerListVisible = useSelector(listVisibleSelector);
  const mapLayerVisiblityOnClick = () => {
    dispatch(toggleMapLayerVisibility());
  };

  const handleExportClick = () => {
    // Trigger the print method on the control
    const { x, y } = map.getSize();

    // view Size is collected when button is pushed.
    // a resize needs to be triggered to get the basemap layer
    // 2 pixels are added to width and height to trigger resize
    const viewSize = {
      width: x + 2,
      height: y + 2,
      className: 'viewSize',
      tooltip: 'user view size'
    };
    control.options.sizeModes = [viewSize];
    control.printMap(viewSize.className, 'CREST Map');
  };

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
          onClick={handleGenericClick}
        >
          <LibraryAdd />
        </ActionButton>
      </Grid>
      <Grid xs={4}>
        <ActionButton
          buttonLabel={'Export'}
          buttonName={'Export'}
          onClick={handleExportClick}
        >
          <CameraAlt />
        </ActionButton>
      </Grid>
      <Grid xs={4}>
        <ActionButton
          buttonLabel={'Map Layers'}
          buttonName={'Map Layers'}
          onClick={mapLayerVisiblityOnClick}
        >
          {layerListVisible ? <Layers /> : <LayersOutlined />}
        </ActionButton>
      </Grid>
    </StyledGrid>
  );
}

ActionButtons.propTypes = {
  map: PropTypes.object
};
