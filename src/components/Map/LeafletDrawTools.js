import React, { useEffect, useState } from 'react';
import * as L from 'leaflet';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import buffer from '@turf/buffer';
import * as turf from '@turf/turf';
import { CircularProgress } from '@mui/material';

import {
  toggleSketchArea,
  addNewFeatureToDrawnLayers,
  uploadedShapeFileGeoJSON,
  addSearchPlacesGeoJSON,
  incrementAreaNumber
} from '../../reducers/mapPropertiesSlice';
import { useGetZonalStatsQuery } from '../../services/zonalstats';
import ModelErrors from '../All/ModelErrors';
import { setEmptyState } from '../../reducers/analyzeAreaSlice';
import { mapConfig } from '../../configuration/config';

const sketchAreaSelector = (state) => state.mapProperties.sketchArea;
const selectedRegionSelector = (state) => state.selectedRegion.value;
const uploadedShapeFileSelector = (state) => state.mapProperties.uploadedShapeFileGeoJSON;
const searchPlacesFileSelector = (state) => state.mapProperties.searchPlacesFileGeoJSON;

const areaNumberSelector = (state) => state.mapProperties.areaNumber;

export default function LeafletDrawTools(props) {
  const {
    bufferCheckbox,
    leafletFeatureGroupRef,
    setDrawAreaDisabled,
    setTooLargeLayerOpen
  } = props;
  const dispatch = useDispatch();

  const bufferSize = 1;
  const bufferUnits = 'kilometers';
  const maxPolygonAreaSize = 100000000; // 1000 sq km

  const drawToolsEnabled = useSelector(sketchAreaSelector);
  const selectedRegion = useSelector(selectedRegionSelector);
  const shapeFileGeoJSON = useSelector(uploadedShapeFileSelector);
  const searchPlacesGeoJSON = useSelector(searchPlacesFileSelector);
  const areaNumber = useSelector(areaNumberSelector);

  const [currentDrawn, setCurrentDrawn] = useState({
    geo: null, // this is the originally drawn geo with enriched properties
    featureGroup: null, // this is the featureGroup that gets sent to zonalStats
    skip: true // this tells the query not to run unless set to false
  });

  const { data, error, isFetching } = useGetZonalStatsQuery({
    region: mapConfig.regions[selectedRegion].regionName,
    queryData: currentDrawn.featureGroup
  }, { skip: currentDrawn.skip });

  useEffect(() => {
    if (data) {
      dispatch(setEmptyState(false));
      currentDrawn.featureGroup.features.forEach((feature, index) => {
        /* doing this crazy || because when you draw just one polygon
        currentDrawn.geo exists and we need that one. However, shape files
        can contain many many features and in that case we need to process them all
        */
        const geo = structuredClone(currentDrawn.geo) || structuredClone(feature);
        geo.properties.zonalStatsData = data.features[index].properties.mean;
        dispatch(addNewFeatureToDrawnLayers(geo));
      });
      setDrawAreaDisabled(false);
      setCurrentDrawn((previous) => ({ ...previous, skip: true }));
    }
  }, [data]);

  if (isFetching) {
    // console.log('loading');
  }

  if (error) {
    return (
      <ModelErrors
        contentTitle={'Sketch an Area Error '}
        contentMessage={'There was an error in the area you sketched. Please try again.'}
        buttonMessage='Dismiss'
        errorType={'error'} // error, warning, info, success (https://mui.com/material-ui/react-alert/)
        onClose={() => {
          setDrawAreaDisabled(false);
          setCurrentDrawn((previous) => ({ ...previous, skip: true }));
        }}
        open={Boolean(error)}
      />
    );
  }

  const calculateAreaOfPolygon = ((geojson) => {
    const coordinates = geojson.geometry.coordinates;
    const polygon = turf.polygon(coordinates);
    const area = turf.area(polygon);
    return area;
  });

  const addBufferLayer = (geo) => {
    const geoCopy = structuredClone(geo);
    const buffGeo = buffer(geoCopy, bufferSize, { units: bufferUnits });
    return buffGeo;
  };

  function processGeojson(geo, areaNum) {
    const geoCopy = structuredClone(geo);
    geoCopy.properties = geo.properties || {};
    geoCopy.properties.areaName = `Area ${areaNum}`;
    geoCopy.properties.areaNumber = areaNum;
    geoCopy.properties.region = selectedRegion;
    const turfCenter = turf.center(geoCopy.geometry);
    geoCopy.properties.center = {
      lat: turfCenter.geometry.coordinates[1], lng: turfCenter.geometry.coordinates[0]
    };

    let buffGeo;
    if (bufferCheckbox) {
      buffGeo = addBufferLayer(geoCopy);
      geoCopy.properties.buffGeo = buffGeo;
    }
    return geoCopy;
  }

  function handleOnCreate(e) {
    // Toggle sketch area off since new area was just created
    dispatch(toggleSketchArea());
    let geo = e.layer.toGeoJSON();

    // Check size of polygon and remove it and return if it is too large
    if (calculateAreaOfPolygon(geo) > maxPolygonAreaSize) {
      setTooLargeLayerOpen(true);
      leafletFeatureGroupRef.current.removeLayer(e.layer);
      return;
    }

    // disable draw until zonal stats done
    setDrawAreaDisabled(true);

    geo = processGeojson(e.layer.toGeoJSON(), areaNumber);
    dispatch(incrementAreaNumber());
    const layerToAnalyze = geo.properties.buffGeo ? L.geoJSON(geo.properties.buffGeo) : e.layer;
    const featureGroup = L.featureGroup().addLayer(layerToAnalyze).toGeoJSON();
    setCurrentDrawn({
      geo,
      featureGroup,
      skip: false
    });
  }

  if (shapeFileGeoJSON) {
    const featureGroup = L.featureGroup();
    let areaNum = areaNumber; // need an independent counter here since dispatch is batched
    const shapeFileFeatures = structuredClone(shapeFileGeoJSON.features);
    shapeFileFeatures.forEach((feature, index) => {
      if (calculateAreaOfPolygon(feature) > maxPolygonAreaSize) {
        // console.log('too big!!!');
        // TODO: DO SOMETHING WITH THE DRAWN SHAPE FILES THAT ARE TOO LARGE
        return;
      }
      const geo = processGeojson(feature, areaNum);
      areaNum += 1;
      dispatch(incrementAreaNumber());
      const layer = geo.properties.buffGeo ? L.geoJSON(geo.properties.buffGeo) : L.geoJSON(geo);
      featureGroup.addLayer(layer);
    });
    dispatch(uploadedShapeFileGeoJSON(null));
    setCurrentDrawn({
      featureGroup: featureGroup.toGeoJSON(),
      skip: false
    });
  }

  if (searchPlacesGeoJSON) {
    const searchPlacesCopy = structuredClone(searchPlacesGeoJSON);
    const geo = processGeojson(searchPlacesCopy, areaNumber);
    dispatch(incrementAreaNumber());
    const layer = geo.properties.buffGeo ? L.geoJSON(geo.properties.buffGeo) : L.geoJSON(geo);
    const featureGroup = L.featureGroup().addLayer(layer);
    setCurrentDrawn({
      featureGroup: featureGroup.toGeoJSON(),
      skip: false
    });
    dispatch(addSearchPlacesGeoJSON(null));
  }

  return (
    <React.Fragment>
      <FeatureGroup ref={leafletFeatureGroupRef}>
        {drawToolsEnabled && (
          <EditControl
            key={`edit-control-${areaNumber}`}
            position='topleft'
            onCreated={(e) => { handleOnCreate(e); }}
            draw={{
              polyline: false,
              polygon: true,
              rectangle: false,
              circle: false,
              marker: false,
              circlemarker: false
            }}
            edit={{
              edit: false,
              remove: false
            }}
          />
        )}
        { isFetching &&
            <div
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.7)', // Use any desired background color with transparency
                zIndex: 9999 // Set the overlay on top of everything
              }}
            >
              <CircularProgress size={80} sx={{ position: 'absolute', top: '50%', left: '50%' }} />
            </div>
          }
      </FeatureGroup>
    </React.Fragment>
  );
}

LeafletDrawTools.propTypes = {
  bufferCheckbox: PropTypes.bool,
  leafletFeatureGroupRef: PropTypes.object,
  setDrawAreaDisabled: PropTypes.func,
  setTooLargeLayerOpen: PropTypes.func
};
