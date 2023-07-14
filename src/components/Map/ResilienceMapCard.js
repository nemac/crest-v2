import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMapEvents } from 'react-leaflet';
import LeafletMapContainer from './LeafletMapContainer';
import ActiveTileLayers from './ActiveTileLayers';
import BasemapLayer from './BasemapLayer';
import { changeZoom, changeCenter } from '../../reducers/mapPropertiesSlice';

const selectedCenterSelector = (state) => state.mapProperties.center;
const selectedZoomSelector = (state) => state.mapProperties.zoom;

export default function ResilienceMapCard() {
  const dispatch = useDispatch();
  const [map, setMap] = useState(null);
  const center = useSelector(selectedCenterSelector, () => true);
  const zoom = useSelector(selectedZoomSelector, () => true);

  // This component exists solely for the useMapEvents hook
  const MapEventsComponent = () => {
    useMapEvents({
      moveend: () => { // Send updated zoom and center to redux when moveend event occurs.
        dispatch(changeZoom(map.getZoom()));
        dispatch(
          changeCenter(
            [map.getCenter().lat, map.getCenter().lng]
          )
        );
      }
    });
    return null;
  };

  return (
    <LeafletMapContainer center={center} zoom={zoom} innerRef={setMap}>
      <ActiveTileLayers />
      <BasemapLayer map={map}/>
      <MapEventsComponent/>
    </LeafletMapContainer>
  );
}
