import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLayer } from '../../reducers/mapLayerListSlice';
import LayerDescription from './LayerDescription';
import LayerLegend from './LayerLegend';

export default function Layer(props) {
  const { lData } = props;
  const dispatch = useDispatch();
  const layerListSelector = (state) => state.mapLayerList.activeLayerList;
  const activeLayerList = useSelector(layerListSelector);
  const checked = lData.id in activeLayerList;

  const handleClick = () => {
    dispatch(toggleLayer(lData));
  };

  return (
    <AccordionDetails>
      <Checkbox checked={checked} onClick={() => handleClick()} />
      {lData.label}
      <LayerDescription layerName={lData.label} layerDescription={lData.description} />
      <LayerLegend layer={lData} />
      {/* <FormGroup>
        <FormControlLabel control={
        <Checkbox checked={checked} onClick={() => handleClick(checked)} />} label={lData.label} />
        <LayerDescription layerName={lData.label} layerDescription={lData.description} />
        <LayerLegend layer={lData} />
      </FormGroup> */}
    </AccordionDetails>
  );
}

Layer.propTypes = {
  lData: PropTypes.object.isRequired
};
