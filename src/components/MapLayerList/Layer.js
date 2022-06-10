import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { addLayer, removeLayer } from '../../reducers/mapLayerListSlice';
import { map } from 'leaflet';




export default function Layer(props) {

  const { layerData } = props ;
  const dispatch = useDispatch() ;

  const activeLayerList = useSelector((state) => state.mapLayerList.activeLayerList).map(layer => layer.label)
  const defaultChecked = activeLayerList.includes(layerData.label)
  const [checked, setChecked] = useState(defaultChecked) ;

  const handleClick = (checked) => {
    if (!checked) {
      dispatch(addLayer(layerData)) ;
    } else {
      dispatch(removeLayer(layerData)) ;
    }
    setChecked(!checked) ;   
  }

  return (
      <AccordionDetails>
        <Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox checked={checked} onClick={() => handleClick(checked)} />} label={layerData.label} />
          </FormGroup>
        </Typography>
      </AccordionDetails>
  )
}

Layer.propTypes = {
  layerData: PropTypes.array.isRequired,
};