import React, { useEffect, useState } from 'react';
import * as L from 'leaflet';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import buffer from '@turf/buffer';
import * as turf from '@turf/turf';
import { CircularProgress } from '@mui/material';

import { TurnSharpLeftOutlined } from '@mui/icons-material';
import {
  toggleSketchArea,
  addNewFeatureToDrawnLayers,
  shiftUploadedShapeFileGeoJSON,
  addSearchPlacesGeoJSON,
  incrementAreaNumber
} from '../../reducers/mapPropertiesSlice';
import { validPolygon } from '../../utility/utilityFunctions';
import { useZonalStatsMutation } from '../../services/zonalstats';
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
    setErrorState
  } = props;
  const dispatch = useDispatch();

  const bufferSize = 1;
  const bufferUnits = 'kilometers';

  const drawToolsEnabled = useSelector(sketchAreaSelector);
  const selectedRegion = useSelector(selectedRegionSelector);
  const shapeFileGeoJSONArray = useSelector(uploadedShapeFileSelector);
  const searchPlacesGeoJSON = useSelector(searchPlacesFileSelector);
  const areaNumber = useSelector(areaNumberSelector);
  // currentDrawn is no longer used, except to trigger the useEffect!
  // Otherwise drawin shapes and searching locations will not trigger
  // This could probably be done more intelligently
  const [currentDrawn, setCurrentDrawn] = useState(0);
  const [currentDrawnArray, setCurrentDrawnArray] = useState([]);
  // console.log('ok, triggering the zonalstats call now...');
  // console.log('sending to zonalstats: ', currentDrawn.featureGroup);
  // console.log('inside of currentDrawnArray: ', currentDrawnArray);
  const [data, setData] = useState(null);
  const mutateZonalStats = useZonalStatsMutation(setData);
  const isFetching = null;
  const error = null;

  useEffect(() => {
    // console.log('sending zonal stats request');
    mutateZonalStats(currentDrawnArray);
  }, [currentDrawn]);

  // useEffect(() => {
  //   console.log('sending currentDrawn to zonal stats');
  //   mutateZonalStats(currentDrawn);
  // }, []);

  useEffect(() => {
    if (data) {
      dispatch(setEmptyState(false));
      // console.log('use effect triggered...');
      // console.log('data we got: ', data);
      // console.log('index is: ', data.index);
      // console.log('array is: ', currentDrawnArray);
      // console.log('currentDrawn is: ', currentDrawn);
      const thisCurrentDrawn = currentDrawnArray.find((drawn) => drawn.index === data.index);
      // console.log('drawing: ', currentDrawnArray.find((drawn) => drawn.index === data.index).featureGroup);
      // setCurrentDrawn({ featureGroup: currentDrawnArray[data.index].post, skip: false });
      // console.log('ok, just set currentDrawn to: ', thisCurrentDrawn);
      thisCurrentDrawn.featureGroup.features.forEach((feature, index) => {
        // TODO: Clarify what is happening here better.
        // We are actually using geo and not the feature because otherwise
        // we would just be saving the buffer geo to state with the featuregroup
        // as opposed to the whole geojson with the bufferGeo property

        /* doing this crazy || because when you draw just one polygon
        currentDrawn.geo exists and we need that one. However, shape files
        can contain many many features and in that case we need to process them all
        */
        const geo =
          structuredClone(thisCurrentDrawn.geo) || structuredClone(feature);
        // console.log('geo: ', geo);
        // console.log('in currentDrawn, geo would be: ', structuredClone(currentDrawn.geo) || structuredClone(feature));
        // console.log('checking validity of: ', data);
        const areaValid = !Object.values(
          data.features[index].properties.mean
        ).includes('NaN');
        if (areaValid) {
          geo.properties.zonalStatsData = data.features[index].properties.mean;
          // console.log('adding geo: ', geo);
          dispatch(addNewFeatureToDrawnLayers(geo));
        } else {
          // console.log('bad area for data: ', data);
          // console.log('geo is: ', geo);
          setErrorState((previous) => ({
            ...previous,
            error: true,
            errorTitle: 'Draw Error',
            errorMessage:
              'The area of the drawn layer returned no data, and is most likely outside of the specified region.'
          }));
        }
      });
      // TODO: This looks weird still on rendering. FIX!!!
      // Clear all ref layers because we do not need them. Layers are tracked
      // in geojson components
      leafletFeatureGroupRef?.current?.clearLayers();
      setDrawAreaDisabled(false);
      // setCurrentDrawn((previous) => ({ ...previous, skip: true }));
      // setCurrentDrawn([{ featureGroup: thisCurrentDrawn.featureGroup, skip: false }]);
      const indexToRemove = currentDrawnArray.findIndex((current) => current.index === data.index);
      const newArray = currentDrawnArray.slice(); // make a copy of the currentDrawn array
      // console.log('removing ', indexToRemove);
      // console.log('newArray: ', newArray);
      newArray.splice(indexToRemove, 1); // remove the index we processed
      setCurrentDrawnArray(newArray);
    }
  }, [data]);

  if (isFetching) {
    // console.log('loading');
  }

  if (error) {
    // TODO: Remove ModelErrors component and just use setErrorState
    return (
      <ModelErrors
        contentTitle={'Sketch an Area Error '}
        contentMessage={
          'There was an error in the area you sketched. Please try again.'
        }
        buttonMessage="Dismiss"
        errorType={'error'} // error, warning, info, success (https://mui.com/material-ui/react-alert/)
        onClose={() => {
          setDrawAreaDisabled(false);
          setCurrentDrawn([(previous) => ({ ...previous, skip: true })]);
        }}
        open={Boolean(error)}
      />
    );
  }

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
      lat: turfCenter.geometry.coordinates[1],
      lng: turfCenter.geometry.coordinates[0]
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

    // Check size of polygon and remove it and return if it is too large
    if (!validPolygon(e.layer.toGeoJSON())) {
      setErrorState((previous) => ({
        ...previous,
        error: true,
        errorTitle: 'Draw Error',
        errorMessage:
          'The area of the drawn layer is too large. Please try again.'
      }));
      leafletFeatureGroupRef.current.removeLayer(e.layer);
      return;
    }

    // disable draw until zonal stats done
    setDrawAreaDisabled(true);
    // console.log('calling processGeojson');
    const geo = processGeojson(e.layer.toGeoJSON(), areaNumber);
    dispatch(incrementAreaNumber());
    const layerToAnalyze = geo.properties.buffGeo ?
      L.geoJSON(geo.properties.buffGeo) :
      e.layer;
    // console.log('layerToAnalyze: ', layerToAnalyze);
    const featureGroup = L.featureGroup().addLayer(layerToAnalyze).toGeoJSON();
    setCurrentDrawn([{
      geo,
      featureGroup,
      skip: false
    }]);
    setCurrentDrawnArray(
      [...currentDrawnArray,
        {
          geo,
          featureGroup,
          region: mapConfig.regions[selectedRegion].regionName,
          index: currentDrawnArray.length
        }]
    );
  }

  // console.log('shapefileGeoJSONArray: ', shapeFileGeoJSONArray);
  if (shapeFileGeoJSONArray.length) {
    const arrayIndex = currentDrawnArray.length;
    const shapeFileGeoJSON = shapeFileGeoJSONArray[0];
    // console.log('found array: ', shapeFileGeoJSONArray);
    // console.log('before entering loop: ', L.featureGroup());
    const featureGroup = L.featureGroup();
    // console.log('before processing: ', featureGroup);
    // console.log('processing batch: ', shapeFileGeoJSON);
    const shapeFileFeatures = structuredClone(shapeFileGeoJSON.features);
    let areaNum = areaNumber; // need an independent counter here since dispatch is batched
    shapeFileFeatures.forEach((feature, index) => {
      const geo = processGeojson(feature, areaNum);
      areaNum += 1;
      dispatch(incrementAreaNumber());
      const layer = geo.properties.buffGeo ?
        L.geoJSON(geo.properties.buffGeo) :
        L.geoJSON(geo);
      featureGroup.addLayer(layer);
    });
    // console.log('feature group: ', featureGroup);
    dispatch(shiftUploadedShapeFileGeoJSON());
    setCurrentDrawnArray(
      [...currentDrawnArray,
        {
          featureGroup: featureGroup.toGeoJSON(),
          region: mapConfig.regions[selectedRegion].regionName,
          index: arrayIndex
        }]
    );
    // console.log('currentDrawnArray: ', currentDrawnArray);
  }
  if (searchPlacesGeoJSON) {
    const searchPlacesCopy = structuredClone(searchPlacesGeoJSON);
    const geo = processGeojson(searchPlacesCopy, areaNumber);
    dispatch(incrementAreaNumber());
    const layer = geo.properties.buffGeo ?
      L.geoJSON(geo.properties.buffGeo) :
      L.geoJSON(geo);
    const featureGroup = L.featureGroup().addLayer(layer);
    setCurrentDrawn([{
      featureGroup: featureGroup.toGeoJSON(),
      skip: false
    }]);
    setCurrentDrawnArray(
      [...currentDrawnArray,
        {
          featureGroup: featureGroup.toGeoJSON(),
          region: mapConfig.regions[selectedRegion].regionName,
          index: currentDrawnArray.length
        }]
    );
    dispatch(addSearchPlacesGeoJSON(null));
  }

  return (
    <React.Fragment>
      <FeatureGroup ref={leafletFeatureGroupRef}>
        {drawToolsEnabled && (
          <EditControl
            key={`edit-control-${areaNumber}`}
            position="topleft"
            onCreated={(e) => {
              handleOnCreate(e);
            }}
            draw={{
              polyline: false,
              polygon: false,
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
        {isFetching && (
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
            <CircularProgress
              size={80}
              sx={{ position: 'absolute', top: '50%', left: '50%' }}
            />
          </div>
        )}
      </FeatureGroup>
    </React.Fragment>
  );
}

LeafletDrawTools.propTypes = {
  bufferCheckbox: PropTypes.bool,
  leafletFeatureGroupRef: PropTypes.object,
  setDrawAreaDisabled: PropTypes.func,
  setErrorState: PropTypes.func
};
