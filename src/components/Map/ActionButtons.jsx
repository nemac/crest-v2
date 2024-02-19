import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import L from 'leaflet';
import 'leaflet-easyprint';
import { styled } from '@mui/system';

import Grid from '@mui/material/Unstable_Grid2';
import {
  CameraAlt,
  LayersOutlined,
  Layers,
  LibraryAdd,
  LibraryAddOutlined
} from '@mui/icons-material';
import ActionButton from '../All/ActionButton.jsx';
import { toggleAreaVisible } from '../../reducers/analyzeAreaSlice';
import { toggleVisible as toggleMapLayerVisibility } from '../../reducers/mapLayerListSlice';

const areaVisibleSelector = (state) => state.analyzeArea.visible;
const listVisibleSelector = (state) => state.mapLayerList.visible;

export const StyledGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(0),
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  borderTopColor: theme.palette.CRESTBorderColor.main,
  borderTopStyle: 'solid',
  borderTopWidth: '1px',
  borderRightColor: 'transparent',
  borderRightStyle: 'none',
  borderRightWidth: '0px',
  borderLeftColor: 'transparent',
  borderLeftStyle: 'none',
  borderLeftWidth: '0px',
  borderBottomColor: 'transparent',
  borderBottomStyle: 'none',
  borderBottomWidth: '0px'
}));

// just a place holder needs props passed in and image etc
export default function ActionButtons(props) {
  const { map } = props;
  const dispatch = useDispatch();

  // I had to open cors to all sources on the s3 bucket to get this to work.
  //    We will need to re-look at this later.
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

  const areaVisible = useSelector(areaVisibleSelector);
  const layerListVisible = useSelector(listVisibleSelector);

  const areaVisiblityOnClick = () => {
    dispatch(toggleAreaVisible());
  };
  const mapLayerVisiblityOnClick = () => {
    dispatch(toggleMapLayerVisibility());
  };

  const handleExportClick = () => {
    // Trigger the print method on the control
    if (map) {
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
    }
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
          onClick={areaVisiblityOnClick}
          fullWidth={true}
        >
          {areaVisible ? <LibraryAdd /> : <LibraryAddOutlined />}
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
