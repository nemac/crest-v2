import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as L from 'leaflet';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import {
  PolylineOutlined
  // Polyline
} from '@mui/icons-material';

import { toggleSketchArea } from '../../reducers/mapPropertiesSlice';

const StyledButton = styled(Button)(({ theme }) => ({
  height: theme.spacing(4.5),
  textTransform: 'none',
  justifyContent: 'start'
}));

// just a place holder needs props passed in and image etc
export default function DrawArea(props) {
  const { map, disabled } = props;
  const [leafletDraw, setLeafletDraw] = React.useState();
  // have to wrap in use effect because map comes in null at first
  React.useEffect(() => {
    if (map) {
      setLeafletDraw(new L.Draw.Polygon(map, { allowIntersection: false }));
    }
  }, [map]);
  const dispatch = useDispatch();
  const sketchAreaSelector = (state) => state.mapProperties.sketchArea;
  const drawToolsEnabled = useSelector(sketchAreaSelector);
  // make draw tools false if for some reason its enabled from before
  // if (drawToolsEnabled) {
  //  dispatch(toggleSketchArea());
  // }

  const handleSketchClick = () => {
    dispatch(toggleSketchArea());
    if (!drawToolsEnabled) {
      leafletDraw.enable();
    } else {
      leafletDraw.disable();
    }
  };

  if (!disabled) {
    return (
      <Box p={0.75} >
        <StyledButton
          variant="contained"
          color="CRESTPrimary"
          fullWidth={true}
          aria-label={'Sketch an Area'}
          onClick={handleSketchClick}
          startIcon={<PolylineOutlined />}
        >
          Sketch an Area
        </StyledButton>
      </Box>
    );
  }
  return (
    <Box p={0.75} >
      <StyledButton
        variant="contained"
        color="CRESTPrimary"
        fullWidth={true}
        aria-label={'Sketch an Area'}
        onClick={handleSketchClick}
        startIcon={<PolylineOutlined />}
      disabled>
        Sketch an Area
      </StyledButton>
    </Box>
  );
}

DrawArea.propTypes = {
  map: PropTypes.object,
  disabled: PropTypes.bool
};
