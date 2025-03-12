import React, { useEffect, useState } from "react";

import * as L from "leaflet";
import { FeatureGroup, useMap } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import buffer from "@turf/buffer";
import * as turf from "@turf/turf";
import { CircularProgress } from "@mui/material";

import {
  toggleSketchArea,
  addNewFeatureToDrawnLayers,
  uploadedShapeFileGeoJSON,
  addSearchPlacesGeoJSON,
  incrementAreaNumber,
  changeZoom,
} from "../../reducers/mapPropertiesSlice";
import {
  validPolygon,
  calculateAreaOfPolygon,
  findCenterOfCenters,
} from "../../utility/utilityFunctions";
import { useGetZonalStatsQuery } from "../../services/zonalstats";
import ModelErrors from "../All/ModelErrors.jsx";
import { setEmptyState } from "../../reducers/analyzeAreaSlice";
import { mapConfig, sketchShapeThresholds } from "../../configuration/config";

// this not good practice but not time to resolve it and its not that important
//    but following this:
//     React Hook useEffect has missing dependencies: 'currentDrawn.featureGroup.features',
//        'currentDrawn.geo', 'leafletFeatureGroupRef', and 'setDrawAreaDisabled'
//     cause redraw and other errors

/* eslint-disable react-hooks/exhaustive-deps */

const sketchAreaSelector = (state) => state.mapProperties.sketchArea;
const selectedRegionSelector = (state) => state.selectedRegion.value;
const uploadedShapeFileSelector = (state) =>
  state.mapProperties.uploadedShapeFileGeoJSON;
const searchPlacesFileSelector = (state) =>
  state.mapProperties.searchPlacesFileGeoJSON;

const areaNumberSelector = (state) => state.mapProperties.areaNumber;

export default function LeafletDrawTools(props) {
  const {
    bufferCheckbox,
    leafletFeatureGroupRef,
    setDrawAreaDisabled,
    setErrorState,
  } = props;
  const dispatch = useDispatch();

  const bufferSize = 1;
  const bufferUnits = "kilometers";

  const drawToolsEnabled = useSelector(sketchAreaSelector);
  const selectedRegion = useSelector(selectedRegionSelector);
  const shapeFileGeoJSON = useSelector(uploadedShapeFileSelector);
  const searchPlacesGeoJSON = useSelector(searchPlacesFileSelector);
  const areaNumber = useSelector(areaNumberSelector);
  const [currentDrawn, setCurrentDrawn] = useState({
    geo: null, // this is the originally drawn geo with enriched properties
    featureGroup: null, // this is the featureGroup that gets sent to zonalStats
    skip: true, // this tells the query not to run unless set to false
  });
  const map = useMap();

  const { data, error, isFetching } = useGetZonalStatsQuery(
    {
      region: mapConfig.regions[selectedRegion].regionName,
      queryData: currentDrawn.featureGroup,
    },
    { skip: currentDrawn.skip },
  );

  useEffect(() => {
    if (data) {
      dispatch(setEmptyState(false));
      currentDrawn.featureGroup.features.forEach((feature, index) => {
        // TODO: Clarify what is happening here better.
        // We are actually using geo and not the feature because otherwise
        // we would just be saving the buffer geo to state with the featuregroup
        // as opposed to the whole geojson with the bufferGeo property

        /* doing this crazy || because when you draw just one polygon
        currentDrawn.geo exists and we need that one. However, shape files
        can contain many many features and in that case we need to process them all
        */
        const geo =
          structuredClone(currentDrawn.geo) || structuredClone(feature);

        const obj = data.features[index].properties.mean;
        // one NaN is kicking out some good data so checking when they match out of region is all Nan's
        const testForBadDataObj = Object.fromEntries(
          Object.entries(obj).filter(([key]) => Number.isNaN(Number(obj[key]))),
        );
        const areaValid =
          Object.entries(testForBadDataObj).length !==
          Object.entries(obj).length;

        if (areaValid) {
          geo.properties.zonalStatsData = data.features[index].properties.mean;
          dispatch(addNewFeatureToDrawnLayers(geo));
        } else {
          setErrorState((previous) => ({
            ...previous,
            error: true,
            errorTitle: "Sketch an Area Error",
            errorMessage: `The sketched area returned no data and is most likely outside the 
              specified region (${selectedRegion}). Also, CREST 
              currently includes areas near coastal areas, and the sketched area
              may not fit within the coastal area assessed`,
          }));
        }
      });
      // TODO: This looks weird still on rendering. FIX!!!
      // Clear all ref layers because we do not need them. Layers are tracked
      // in geojson components
      leafletFeatureGroupRef?.current?.clearLayers();
      setDrawAreaDisabled(false);
      setCurrentDrawn((previous) => ({ ...previous, skip: true }));
    }
  }, [data, dispatch, setErrorState]);

  if (isFetching) {
    // console.log('loading');
  }

  if (error) {
    // TODO: Remove ModelErrors component and just use setErrorState
    return (
      <ModelErrors
        contentTitle={"Sketch an Area Error "}
        contentMessage={`The sketched area returned no data and is most likely outside the 
          specified region (${selectedRegion}). Also, CREST 
          currently includes areas near coastal areas, and the sketched area
          may not fit within the coastal area assessed`}
        buttonMessage="Dismiss"
        errorType={"error"} // error, warning, info, success (https://mui.com/material-ui/react-alert/)
        onClose={() => {
          setDrawAreaDisabled(false);
          setCurrentDrawn((previous) => ({ ...previous, skip: true }));
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
      lng: turfCenter.geometry.coordinates[0],
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

    // error thresholds
    const areaThreshold = sketchShapeThresholds.areaThreshold;
    const geoJ = e.layer.toGeoJSON();

    const areaSize = calculateAreaOfPolygon(geoJ) / 1000000; // SQ KM

    // Check size of polygon and remove it and return if it is too large
    if (!validPolygon(geoJ)) {
      setErrorState((previous) => ({
        ...previous,
        error: true,
        errorTitle: "Draw Error",
        errorMessage: `Sketched areas need to have an area less than ${areaThreshold} (sq km). The size of the current sketched area is ${areaSize.toFixed(0)} (sq km). Please sketch an area less than ${areaThreshold} (sq km) `,
      }));
      leafletFeatureGroupRef.current.removeLayer(e.layer);
      return;
    }

    // disable draw until zonal stats done
    setDrawAreaDisabled(true);
    const geo = processGeojson(e.layer.toGeoJSON(), areaNumber);
    dispatch(incrementAreaNumber());
    const layerToAnalyze = geo.properties.buffGeo
      ? L.geoJSON(geo.properties.buffGeo)
      : e.layer;
    const featureGroup = L.featureGroup().addLayer(layerToAnalyze).toGeoJSON();
    setCurrentDrawn({
      geo,
      featureGroup,
      skip: false,
    });
  }

  if (shapeFileGeoJSON) {
    const featureGroup = L.featureGroup();
    const shapeFileFeatures = structuredClone(shapeFileGeoJSON.features);
    let areaNum = areaNumber; // need an independent counter here since dispatch is batched
    shapeFileFeatures.forEach((feature, index) => {
      const geo = processGeojson(feature, areaNum);
      areaNum += 1;
      dispatch(incrementAreaNumber());
      const layer = geo.properties.buffGeo
        ? L.geoJSON(geo.properties.buffGeo)
        : L.geoJSON(geo);
      featureGroup.addLayer(layer);
    });
    dispatch(uploadedShapeFileGeoJSON(null));
    setCurrentDrawn({
      featureGroup: featureGroup.toGeoJSON(),
      skip: false,
    });

    // Get the center of centers for all features
    const centerOfCenters = findCenterOfCenters(shapeFileGeoJSON.features);

    // Calculate an appropriate zoom level
    // This is trickier with multiple features
    const allFeaturesLayer = L.geoJSON(shapeFileGeoJSON);
    const bounds = allFeaturesLayer.getBounds();
    const zoom = map.getBoundsZoom(bounds, false, [50, 50]);

    // Fly to the center of centers with appropriate zoom
    if (centerOfCenters) {
      map.flyTo([centerOfCenters.lat, centerOfCenters.lng], zoom, {
        animate: true,
        duration: 1,
      });
    }
  }

  if (searchPlacesGeoJSON) {
    const searchPlacesCopy = structuredClone(searchPlacesGeoJSON);
    const geo = processGeojson(searchPlacesCopy, areaNumber);
    dispatch(incrementAreaNumber());
    const layer = geo.properties.buffGeo
      ? L.geoJSON(geo.properties.buffGeo)
      : L.geoJSON(geo);
    const featureGroup = L.featureGroup().addLayer(layer);
    setCurrentDrawn({
      featureGroup: featureGroup.toGeoJSON(),
      skip: false,
    });
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
              circlemarker: false,
            }}
            edit={{
              edit: false,
              remove: false,
            }}
          />
        )}
        {isFetching && (
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255, 255, 255, 0.7)", // Use any desired background color with transparency
              zIndex: 9999, // Set the overlay on top of everything
            }}
          >
            <CircularProgress
              size={80}
              sx={{ position: "absolute", top: "50%", left: "50%" }}
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
  setErrorState: PropTypes.func,
};
