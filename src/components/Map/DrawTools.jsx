import React, { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import buffer from "@turf/buffer";
import * as turf from "@turf/turf";
import { Box, CircularProgress } from "@mui/material";

import {
  toggleSketchArea,
  addNewFeatureToDrawnLayers,
  uploadedShapeFileGeoJSON,
  addSearchPlacesGeoJSON,
  incrementAreaNumber,
} from "../../reducers/mapPropertiesSlice";
import {
  validPolygon,
  calculateAreaOfPolygon,
} from "../../utility/utilityFunctions";
import { useGetZonalStatsQuery } from "../../services/zonalstats";
import ModelErrors from "../All/ModelErrors.jsx";
import { setEmptyState } from "../../reducers/analyzeAreaSlice";
import { mapConfig, sketchShapeThresholds } from "../../configuration/config";

// The ported zonal-stats flow keeps its original effect dependencies on purpose.
/* eslint-disable react-hooks/exhaustive-deps */

const sketchAreaSelector = (state) => state.mapProperties.sketchArea;
const selectedRegionSelector = (state) => state.selectedRegion.value;
const uploadedShapeFileSelector = (state) =>
  state.mapProperties.uploadedShapeFileGeoJSON;
const searchPlacesFileSelector = (state) =>
  state.mapProperties.searchPlacesFileGeoJSON;
const areaNumberSelector = (state) => state.mapProperties.areaNumber;

const bufferSize = 1;
const bufferUnits = "kilometers";

const toPlainFeature = (feature) => ({
  type: "Feature",
  geometry: feature.geometry,
  properties: {},
});

export default function DrawTools(props) {
  const { map, draw, bufferCheckbox, setDrawAreaDisabled, setErrorState } =
    props;
  const dispatch = useDispatch();

  const drawToolsEnabled = useSelector(sketchAreaSelector);
  const selectedRegion = useSelector(selectedRegionSelector);
  const shapeFileGeoJSON = useSelector(uploadedShapeFileSelector);
  const searchPlacesGeoJSON = useSelector(searchPlacesFileSelector);
  const areaNumber = useSelector(areaNumberSelector);
  const [currentDrawn, setCurrentDrawn] = useState({
    geo: null,
    featureGroup: null,
    skip: true,
  });

  const { data, error, isFetching } = useGetZonalStatsQuery(
    {
      region: mapConfig.regions[selectedRegion].regionName,
      queryData: currentDrawn.featureGroup,
    },
    { skip: currentDrawn.skip },
  );

  useEffect(() => {
    if (!draw) return;
    draw.setMode(drawToolsEnabled ? "polygon" : "static");
  }, [draw, drawToolsEnabled]);

  useEffect(() => {
    if (data) {
      dispatch(setEmptyState(false));
      currentDrawn.featureGroup.features.forEach((feature, index) => {
        const geo =
          structuredClone(currentDrawn.geo) || structuredClone(feature);
        const obj = data.features[index].properties.mean;
        const allNaN = Object.values(obj).every((value) =>
          Number.isNaN(Number(value)),
        );
        if (!allNaN) {
          geo.properties.zonalStatsData = data.features[index].properties.mean;
          dispatch(addNewFeatureToDrawnLayers(geo));
          ReactGA.event({
            category: "engagement",
            action: "add_area_sketch_area",
            label: "sketch_area",
          });
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
      setDrawAreaDisabled(false);
      setCurrentDrawn((previous) => ({ ...previous, skip: true }));
    }
  }, [data, dispatch, setErrorState]);

  const addBufferLayer = (geo) =>
    buffer(structuredClone(geo), bufferSize, { units: bufferUnits });

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
    if (bufferCheckbox) {
      geoCopy.properties.buffGeo = addBufferLayer(geoCopy);
    }
    return geoCopy;
  }

  const analyzeTarget = (geo, original) => geo.properties.buffGeo ?? original;

  function handleFinishedPolygon(drawnFeature) {
    dispatch(toggleSketchArea());
    const areaThreshold = sketchShapeThresholds.areaThreshold;
    const geoJ = toPlainFeature(drawnFeature);
    const areaSize = calculateAreaOfPolygon(geoJ) / 1000000;

    if (!validPolygon(geoJ)) {
      setErrorState((previous) => ({
        ...previous,
        error: true,
        errorTitle: "Draw Error",
        errorMessage: `Sketched areas need to have an area less than ${areaThreshold} (sq km). The size of the current sketched area is ${areaSize.toFixed(0)} (sq km). Please sketch an area less than ${areaThreshold} (sq km) `,
      }));
      return;
    }

    setDrawAreaDisabled(true);
    const geo = processGeojson(geoJ, areaNumber);
    dispatch(incrementAreaNumber());
    setCurrentDrawn({
      geo,
      featureGroup: turf.featureCollection([analyzeTarget(geo, geoJ)]),
      skip: false,
    });
  }

  useEffect(() => {
    if (!draw) return undefined;
    const onFinish = (id, context) => {
      if (context.action !== "draw") return;
      const feature = draw.getSnapshotFeature(id);
      draw.clear();
      if (feature) handleFinishedPolygon(feature);
    };
    draw.on("finish", onFinish);
    return () => draw.off("finish", onFinish);
  }, [draw, areaNumber, bufferCheckbox, selectedRegion]);

  if (error) {
    return (
      <ModelErrors
        contentTitle={"Sketch an Area Error "}
        contentMessage={`The sketched area returned no data and is most likely outside the
          specified region (${selectedRegion}). Also, CREST
          currently includes areas near coastal areas, and the sketched area
          may not fit within the coastal area assessed`}
        buttonMessage="Dismiss"
        errorType={"error"}
        onClose={() => {
          setDrawAreaDisabled(false);
          setCurrentDrawn((previous) => ({ ...previous, skip: true }));
        }}
        open={Boolean(error)}
      />
    );
  }

  if (shapeFileGeoJSON) {
    const shapeFileFeatures = structuredClone(shapeFileGeoJSON.features);
    let areaNum = areaNumber;
    const targets = shapeFileFeatures.map((feature) => {
      const geo = processGeojson(feature, areaNum);
      areaNum += 1;
      dispatch(incrementAreaNumber());
      return analyzeTarget(geo, geo);
    });
    dispatch(uploadedShapeFileGeoJSON(null));
    setCurrentDrawn({
      featureGroup: turf.featureCollection(targets),
      skip: false,
    });
    if (map) {
      map.fitBounds(turf.bbox(shapeFileGeoJSON), {
        padding: 50,
        duration: 1000,
      });
    }
  }

  if (searchPlacesGeoJSON) {
    const geo = processGeojson(
      structuredClone(searchPlacesGeoJSON),
      areaNumber,
    );
    dispatch(incrementAreaNumber());
    setCurrentDrawn({
      featureGroup: turf.featureCollection([analyzeTarget(geo, geo)]),
      skip: false,
    });
    dispatch(addSearchPlacesGeoJSON(null));
  }

  if (!isFetching) return null;

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255, 255, 255, 0.7)",
        zIndex: 3,
      }}
    >
      <CircularProgress size={80} />
    </Box>
  );
}

DrawTools.propTypes = {
  map: PropTypes.object,
  draw: PropTypes.object,
  bufferCheckbox: PropTypes.bool,
  setDrawAreaDisabled: PropTypes.func,
  setErrorState: PropTypes.func,
};
