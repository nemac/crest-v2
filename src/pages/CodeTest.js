/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewFeatureToDrawnLayers, removeFeatureByGeometry, updateDrawnLayers, incrementAreaNumber } from '../reducers/mapPropertiesSlice';
import { MapContainer, TileLayer, useMap, GeoJSON, Tooltip, FeatureGroup, useMapEvents, Circle } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import * as L from 'leaflet';
import { feature } from '@turf/turf';
import buffer from '@turf/buffer';
import * as turf from '@turf/turf';
import { StyledReactLeafletTooltip } from '../components/All/StyledComponents';

const drawnLayersSelector = (state) => state.mapProperties.drawnLayers;
const areaNumberSelector = (state) => state.mapProperties.areaNumber;

const bufferStyle = {
  color: '#99c3ff',
  '&:hover': {
    color: '#ffc107',
    'stroke-width': 5
  }
};

function EditControlFC(props) {
  const dispatch = useDispatch();
  const { setLayers, passedRef, geojson, setBufferGeo, handleChangeX, addBufferLayerY } = props;
  const areaNumber = useSelector(areaNumberSelector);

  const addBufferLayer = (geo) => {
    const buffGeo = buffer(geo, 5, { units: 'kilometers' });
    setBufferGeo((previous) => ({
      ...previous,
      features: [...previous.features, ...[buffGeo]]
    }));
  };

  const handleChange = (e) => {
    const geo = e.layer.toGeoJSON();
    addBufferLayer(geo);
    geo.properties = { areaName: `Area ${areaNumber}` };
    dispatch(incrementAreaNumber());
    dispatch(addNewFeatureToDrawnLayers(geo));
  };

  React.useEffect(() => {
    setLayers(passedRef?.current?.getLayers());
    if (passedRef?.current?.getLayers().length === 0 && geojson) {
      L.geoJSON(geojson).eachLayer((layer) => {
        if (
          layer instanceof L.Polyline ||
          layer instanceof L.Polygon ||
          layer instanceof L.Marker
        ) {
          if (layer?.feature?.properties.radius && passedRef.current) {
            new L.Circle(layer.feature.geometry.coordinates.slice().reverse(), {
              radius: layer.feature?.properties.radius
            }).addTo(passedRef.current);
          } else {
            passedRef.current?.addLayer(layer);
          }
          setLayers(passedRef?.current?.getLayers());
          addBufferLayer(layer.toGeoJSON());
        }
      });
    }
  }, [geojson]);

  return (
    <FeatureGroup ref={passedRef} eventHandlers={{  }}>
      <EditControl
        key={`edit-control-${areaNumber}`}
        position="topleft"
        onCreated={(e) => { handleChange(e); }}
        draw={{
          rectangle: false,
          circle: true,
          polyline: true,
          polygon: true,
          marker: false,
          circlemarker: false
        }}
      />
    </FeatureGroup>
  );
}

const App = () => {
  const ref = React.useRef();
  const dispatch = useDispatch();
  const drawnFromState = useSelector(drawnLayersSelector);
  const areaNumber = useSelector(areaNumberSelector);
  const [bufferGeo, setBufferGeo] = useState({ type: 'FeatureCollection', features: [] });
  const [layers, setLayers] = useState([]);

  const addBufferLayer = (geo) => {
    const buffGeo = buffer(geo, 5, { units: 'kilometers' });
    setBufferGeo((previous) => ({
      ...previous,
      features: [...previous.features, ...[buffGeo]]
    }));
  };

  const handleChange = (e) => {
    const geo = e.layer.toGeoJSON();
    addBufferLayer(geo);
    geo.properties = { areaName: `Area ${areaNumber}` };
    dispatch(incrementAreaNumber());
    dispatch(addNewFeatureToDrawnLayers(geo));
  };

  const removeLayer = (layer) => {
    ref.current?.removeLayer(layer);
    setLayers(ref.current?.getLayers());
    const geo = layer.toGeoJSON();
    const buffGeo = buffer(geo, 5, { units: 'kilometers' });
    dispatch(removeFeatureByGeometry(geo.geometry));
    const newBufferGeoFeatures = bufferGeo.features.filter(
      (item) => JSON.stringify(item.geometry) !== JSON.stringify(buffGeo.geometry)
    );
    setBufferGeo((previous) => ({ ...previous, features: newBufferGeoFeatures }));
  };

  return (
    <div style={{ height: '80%', width: '100%' }}>
      {areaNumber}
      {layers?.map((layer, index) => (
        <React.Fragment key={index} >
          { layer && <button type="button" onClick={() => removeLayer(layer)}>
            {`Remove ${layer._leaflet_id}`}
          </button> }
        </React.Fragment>
      ))}
      <MapContainer
        key={'balls'}
        center={[35.776787, -82.968467]}
        zoom={9}
        zoomControl={false}
        style={{ height: '80%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        // eslint-disable-next-line max-len
        <EditControlFC areaNumber={areaNumber} passedRef={ref} setLayers={setLayers} geojson={drawnFromState} handleChange={handleChange} addBufferLayer={addBufferLayer} setBufferGeo={setBufferGeo} areaNumber={areaNumber}/>
        {drawnFromState?.features?.map((item, index) => (
          <React.Fragment key={item.geometry.coordinates} >
            <GeoJSON data={item}>
              <StyledReactLeafletTooltip direction='center' permanent>
                {item.properties.areaName}
              </StyledReactLeafletTooltip>
            </GeoJSON>
          </React.Fragment>
        ))}
        {bufferGeo?.features?.map((item, index) => (
          <React.Fragment key={item.geometry.coordinates} >
            <GeoJSON data={item}/>
          </React.Fragment>
        ))}
        <link rel="stylesheet" href="https://unpkg.com/leaflet@latest/dist/leaflet.css" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet-draw@latest/dist/leaflet.draw-src.css" />
        <link rel="stylesheet" href="https://unpkg.com/esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css"/>
      </MapContainer>
    </div>
  );
};

// const App = () => {
//   const dispatch = useDispatch();
//   const areaNumber = useSelector(areaNumberSelector);
//   const ref = useRef();

//   const handleChange = () => {
//     console.log('jeff', areaNumber);
//     dispatch(incrementAreaNumber());
//   };

//   useEffect(() => {
//     console.log('jeff use effect', areaNumber);
//   }, [areaNumber]);

//   return (
//     <div style={{ height: '80%', width: '100%' }}>
//       <MapContainer
//         center={[35.776787, -82.968467]}
//         zoom={9}
//         zoomControl={false}
//         style={{ height: '80%', width: '100%' }}
//       >
//         <TileLayer
//           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//           url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
//         />
//         <FeatureGroup eventHandlers={{ layeradd: handleChange }}>
//           <EditControl
//             position="topleft"
//             onCreated={handleChange}
//             draw={{
//               rectangle: false,
//               circle: true,
//               polyline: true,
//               polygon: true,
//               marker: false,
//               circlemarker: false
//             }}
//           />
//         </FeatureGroup>
//         <link rel="stylesheet" href="https://unpkg.com/leaflet@latest/dist/leaflet.css" />
//         <link rel="stylesheet" href="https://unpkg.com/leaflet-draw@latest/dist/leaflet.draw-src.css" />
//         <link rel="stylesheet" href="https://unpkg.com/esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css"/>
//       </MapContainer>
//     </div>
//   );
// };

export default App;
