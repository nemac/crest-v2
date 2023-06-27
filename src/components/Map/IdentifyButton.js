import React, { useEffect, useRef } from 'react';
import * as ReactDOM from 'react-dom';
import * as L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';
import { Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useDispatch } from 'react-redux';
import { changeIdentifyCoordinates } from '../../reducers/mapPropertiesSlice';

const createIdentifyButonControl = (props) => {
  const { handler } = props;

  const identifyButtonStyle = {
    minHeight: '30px',
    minWidth: '30px',
    width: '30px',
    height: '30px',
    color: '#000000',
    backgroundColor: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#F4F4F4'
    }
  };

  const control = L.control({ position: 'topleft' });

  control.onAdd = () => {
    const container = L.DomUtil.create('div', '');

    ReactDOM.render(
      <Button
        variant="contained"
        onClick={handler}
        style={identifyButtonStyle}
      >
        <InfoIcon/>
      </Button>,
      container
    );

    return container;
  };

  return control;
};

const IdentifyButton = createControlComponent(createIdentifyButonControl);

export default function IdentifyButtonWrapper(props) {
  const { map } = props;
  const stateMap = useRef(map);
  const dispatch = useDispatch();

  const identifyClickHandler = (e) => {
    e.stopPropagation();
    map.getContainer().style.cursor = 'crosshair';
    map.once('click', (event) => {
      const coordinates = event.latlng;
      dispatch(changeIdentifyCoordinates({ lat: coordinates.lat, lng: coordinates.lng }));
      map.getContainer().style.cursor = 'grab';
    });
  };

  // useEffect to wait for map to not be null and then attach it to the ref
  useEffect(() => {
    if (map) {
      stateMap.current = map;
    }
  }, [map]);

  if (!map) {
    return (null);
  }

  return (
    <IdentifyButton handler={identifyClickHandler}/>
  );
}
