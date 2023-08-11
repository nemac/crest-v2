import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import PropTypes from 'prop-types';
import * as L from 'leaflet';
import { Box, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { download } from '@crmackey/shp-write';

import BasemapLayer from './BasemapLayer';
import LeafletMapContainer from './LeafletMapContainer';
import { calculateAreaOfPolygon, validPolygon } from '../../utility/utilityFunctions';
import GenericMapHolder from './GenericMapHolder';
import { uploadedShapeFileGeoJSON } from '../../reducers/mapPropertiesSlice';

const selectedZoomSelector = (state) => state.mapProperties.zoom;
const selectedCenterSelector = (state) => state.mapProperties.center;

function EditControlFC(props) {
  const {
    localGeo,
    setLocalGeo,
    setSelectedLayer,
    invalidLayers,
    setInvalidLayers
  } = props;
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (ref.current?.getLayers().length === 0 && localGeo) {
      let count = 1;
      L.geoJSON(localGeo).eachLayer((layer) => {
        const cloneLayer = layer;
        const feature = layer.feature || {};
        feature.type = feature.type || 'Feature';
        const properties = feature.properties || {};
        properties.id = count;
        count += 1;
        cloneLayer.feature = feature;
        if (!validPolygon(cloneLayer.toGeoJSON())) {
          ref.current?.addLayer(cloneLayer.setStyle({ color: 'red' }));
          setInvalidLayers((prev) => [...prev, cloneLayer.toGeoJSON()]);
        } else {
          ref.current?.addLayer(cloneLayer.setStyle({ color: 'blue' }));
        }
      });
    }
  }, [localGeo, setInvalidLayers]);

  const handleChange = () => {
    const geo = ref.current?.toGeoJSON();
    if (geo?.type === 'FeatureCollection') {
      setLocalGeo(geo);
    }
  };

  const handleEditVertex = (e) => {
    const layer = e.poly;
    const geo = layer.toGeoJSON();
    setSelectedLayer(structuredClone(geo));
    if (validPolygon(geo)) {
      layer.setStyle({ color: 'blue' });
      setInvalidLayers((previous) => previous.filter(
        (feature) => feature.properties.id !== geo.properties.id
      ));
    } else {
      // only set new invalid layer if it is not already in the array
      // stinks that we have to dig into layer but that seems to be the only way
      if (layer.options.color !== 'red') {
        setInvalidLayers((prev) => [...prev, geo]);
      }
      layer.setStyle({ color: 'red' });
    }
  };

  const handleEditStop = (e) => {
    ref.current.eachLayer((layer) => {
      const geo = layer.toGeoJSON();
      if (validPolygon(geo)) {
        layer.setStyle({ color: 'blue' });
        setInvalidLayers((previous) => previous.filter(
          (feature) => feature.properties.id !== geo.properties.id
        ));
      } else {
        console.log('bing');
        // only set new invalid layer if it is not already in the array
        // stinks that we have to dig into layer but that seems to be the only way
        if (layer.options.color !== 'red') {
          setInvalidLayers((prev) => [...prev, geo]);
        }
        layer.setStyle({ color: 'red' });
      }
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
  invalidLayers: PropTypes.array,
  setSelectedLayer: PropTypes.func,
  setInvalidLayers: PropTypes.func
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
  const [invalidLayers, setInvalidLayers] = React.useState([]);

  useEffect(() => {
    console.log('invalidLayers', invalidLayers);
  }, [invalidLayers]);

  return (
    <GenericMapHolder
      leftColumn={
        <Box sx={{ height: '100%', width: '100%' }}>
          <Grid container>
            <Grid xs={12}>
              Welcome to the shape file fixer. This tool will allow
              you to fix any invalid shapes in your shape file.
            </Grid>
            <Grid xs={12}>
              Number of invalid layers: {invalidLayers.length}
              { selectedLayer &&
                <ul>
                  <li>{(calculateAreaOfPolygon(selectedLayer) / 1000000).toFixed(0)}</li>

                </ul>
              }
            </Grid>
            <Grid xs={12}>
              <Button
                onClick={() => {
                  setGeoToRedraw(null);
                  dispatch(uploadedShapeFileGeoJSON(localGeo));
                }}
              >
                Send shapes back to map
              </Button>
            </Grid>
            <Grid xs={12}>
              <Button
                onClick={() => {
                  setGeoToRedraw(null);
                  download(localGeo);
                }}
              >
                Download shapes to a new shapefile
              </Button>
            </Grid>
          </Grid>
        </Box>
      }
      mapCard={
        <LeafletMapContainer center={center} zoom={zoom} innerRef={setMap}>
          <EditControlFC
            position='topleft'
            localGeo={localGeo}
            setLocalGeo={setLocalGeo}
            setSelectedLayer={setSelectedLayer}
            invalidLayers={selectedLayer}
            setInvalidLayers={setInvalidLayers}
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
