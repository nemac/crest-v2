import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLayer } from '../../reducers/mapLayerListSlice';
import LayerDescription from './LayerDescription';
import LayerLegend from './LayerLegend';

export default function Layer(props) {
  const { layerData } = props;
  const dispatch = useDispatch();
  const layerListSelector = (state) => state.mapLayerList.activeLayerList;
  const activeLayerList = useSelector(layerListSelector);
  const checked = layerData.id in activeLayerList;

  const handleClick = () => {
    dispatch(toggleLayer(layerData));
  };

  return (
    <AccordionDetails>
      <Checkbox checked={checked} onClick={() => handleClick()} />
      {layerData.label}
      <LayerLegend layer={layerData} />
      <LayerDescription layerName={layerData.label} layerDescription={layerData.description} />
    </AccordionDetails>
  );
}

Layer.propTypes = {
  layerData: PropTypes.object.isRequired
};
