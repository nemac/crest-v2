import React from 'react';
import { IconButton } from '@mui/material/';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowDropDownCircle } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { toggleLegend } from '../../reducers/mapLayerListSlice';

export default function LayerLegend(props) {
  const { layer } = props;
  const layerLegendsSelector = (state) => state.mapLayerList.displayedLegends;
  const displayedLegends = useSelector(layerLegendsSelector);
  const dispatch = useDispatch();

  if (layer.id in displayedLegends) {
    return (
      <div>
      <IconButton onClick={() => { dispatch(toggleLegend(layer)); }} >
        <ArrowDropDownCircle />
      </IconButton>
      <h3>I am LEGENDs placeholder.</h3>
      </div>
    );
  }
  return (
    <div>
    <IconButton onClick={() => { dispatch(toggleLegend(layer)); }} >
      <ArrowDropDownCircle sx={{ transform: 'rotate(-180deg)' }} />
    </IconButton>
    </div>
  );
}

LayerLegend.propTypes = {
  layer: PropTypes.object.isRequired
};
