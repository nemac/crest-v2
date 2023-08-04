import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import PropTypes from 'prop-types';
import * as L from 'leaflet';
import { Box, Button } from '@mui/material';
import { download } from '@crmackey/shp-write';

import BasemapLayer from './BasemapLayer';
import LeafletMapContainer from './LeafletMapContainer';
import { calculateAreaOfPolygon, validPolygon } from '../../utility/utilityFunctions';
import GenericMapHolder from './GenericMapHolder';
import { uploadedShapeFileGeoJSON } from '../../reducers/mapPropertiesSlice';

const selectedZoomSelector = (state) => state.mapProperties.zoom;
const selectedCenterSelector = (state) => state.mapProperties.center;

function EditControlFC(props) {
  const { localGeo, setLocalGeo, setSelectedLayer, setNumInvalid } = props;
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (ref.current?.getLayers().length === 0 && localGeo) {
      L.geoJSON(localGeo).eachLayer((layer) => {
        // if (!validPolygon(layer.toGeoJSON())) {
        //   setNumInvalid((prev) => prev + 1);
        //   ref.current?.addLayer(layer.setStyle({ color: 'red' }));
        // } else {
        //   ref.current?.addLayer(layer.setStyle({ color: 'blue' }));
        // }
        ref.current?.addLayer(layer.setStyle({ color: 'blue' }));
      });
    }
  }, [localGeo, setNumInvalid]);

  const handleChange = () => {
    const geo = ref.current?.toGeoJSON();
    if (geo?.type === 'FeatureCollection') {
      setLocalGeo(geo);
    }
  };

  const handleEditVertex = (e) => {
    const layer = e.poly;
    setSelectedLayer(structuredClone(layer.toGeoJSON()));
    // if (validPolygon(layer.toGeoJSON())) {
    //   layer.setStyle({ color: 'blue' });
    // } else {
    //   layer.setStyle({ color: 'red' });
    // }
  };

  const handleEditStop = () => {
    ref.current.eachLayer((layer) => {
      // if (validPolygon(layer.toGeoJSON())) {
      //   layer.setStyle({ color: 'blue' });
      // } else {
      //   layer.setStyle({ color: 'red' });
      // }
    });
    const geo = ref.current?.toGeoJSON();
    if (geo?.type === 'FeatureCollection') {
      setLocalGeo(geo);
    }
  };

  return (
    <FeatureGroup ref={ref}>
      <EditControl
        position="topleft"
        // onCreated={handleChange}
        onDeleted={handleChange}
        onEditVertex={handleEditVertex}
        onEditStop={handleEditStop}
        draw={{
          rectangle: false,
          circle: false,
          polyline: false,
          polygon: false,
          marker: false,
          circlemarker: false
        }}
        edit= {{ poly: { allowIntersection: false } }}
      />
    </FeatureGroup>
  );
}

EditControlFC.propTypes = {
  localGeo: PropTypes.object,
  setLocalGeo: PropTypes.func,
  setSelectedLayer: PropTypes.func,
  setNumInvalid: PropTypes.func
};

export default function ShapeFileCorrectionMap(props) {
  const {
    setMap,
    geoToRedraw,
    setGeoToRedraw
  } = props;

  const dispatch = useDispatch();
  const center = useSelector(selectedCenterSelector, () => true);
  const zoom = useSelector(selectedZoomSelector, () => true);
  const [localGeo, setLocalGeo] = React.useState(geoToRedraw);
  const [selectedLayer, setSelectedLayer] = React.useState(null);
  const [numInvalid, setNumInvalid] = React.useState(0);

  return (
    <GenericMapHolder
      leftColumn={
        <Box sx={{ height: '100%', width: '100%' }}>
          Number of invalid layers: {numInvalid}
          { selectedLayer &&
            <ul>
              <li>{(calculateAreaOfPolygon(selectedLayer) / 1000000).toFixed(0)}</li>

            </ul>
          }
          <Button
            onClick={() => {
              setGeoToRedraw(null);
              download(localGeo);
              // dispatch(uploadedShapeFileGeoJSON(localGeo));
            }}
          >
            Send Shapes
          </Button>
        </Box>
      }
      mapCard={
        <LeafletMapContainer center={center} zoom={zoom} innerRef={setMap}>
          <EditControlFC
            position='topleft'
            localGeo={localGeo}
            setLocalGeo={setLocalGeo}
            setSelectedLayer={setSelectedLayer}
            setNumInvalid={setNumInvalid}
          />
        <BasemapLayer/>
        </LeafletMapContainer>
      }
    />
  );
}

ShapeFileCorrectionMap.propTypes = {
  setMap: PropTypes.func,
  geoToRedraw: PropTypes.object,
  setGeoToRedraw: PropTypes.func
};
