/*
Purpose
  The component holds all the action buttons for each chart/area. Each chart are the zonal
  set of statistics for an Area the user-designated on the map.

  The button is one of the following:
   - more/less (more provides all the detailed charts, less and the default is the summary map)
   - export (the map to png/svg)
   - zoom (zoom/pan the map to the area)
   - Remove Area (removes the area from the map)

   Do we need to decide of the button action happens here?

Child Components
- AnalyzeArea-ChartActionButton.js

Libs
  - Not sure yet

API
  - Not sure yets

State needed
  - More or less?

Props
  - Not sure yet
*/
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import L from 'leaflet';
import Grid from '@mui/material/Unstable_Grid2';
import buffer from '@turf/buffer';

import {
  CameraAlt,
  DeleteForever,
  MoreHorizOutlined,
  CenterFocusStrong
} from '@mui/icons-material';

import { changeMore } from '../../reducers/analyzeAreaSlice';
import {
  changeCenter, changeZoom, removeFeatureByGeometry
} from '../../reducers/mapPropertiesSlice';
import ActionButton from '../All/ActionButton';
import { StyledGrid } from '../All/StyledComponents';
import { mapConfig } from '../../configuration/config';

// selector named functions for lint rules makes it easier to re-use if needed.
const regions = mapConfig.regions;
const selectedRegionSelector = (state) => state.selectedRegion.value;
const AnalyzeAreaSelector = (state) => state.AnalyzeArea;
const drawnLayersSelector = (state) => state.mapProperties.drawnLayers;

export default function ChartActionButtons(props) {
  const {
    areaName,
    areaIndex,
    data,
    leafletFeatureGroupRef,
    map,
    layerToRemove,
    setBufferGeo,
    setListOfDrawnLayers,
    bufferGeo
  } = props;
  const dispatch = useDispatch();
  const analyzeAreaState = useSelector(AnalyzeAreaSelector);
  const selectedRegion = useSelector(selectedRegionSelector);
  const drawnLayers = useSelector(drawnLayersSelector);

  const handleZoomClick = (event, layerToZoomTo) => {
    event.stopPropagation();
    const bounds = layerToZoomTo.getBounds();
    const newCenter = bounds.getCenter();
    const newZoom = map.getBoundsZoom(bounds);
    const newCenterArray = [newCenter.lat, newCenter.lng];
    dispatch(changeCenter(newCenterArray));
    dispatch(changeZoom(newZoom));
    map.setView(newCenter, newZoom);
  };

  const getLabel = (name) => {
    const thisLabel = regions[selectedRegion].layerList.find(
      ((layer) => layer.chartCSSSelector === name)
    ).label;
    return thisLabel;
  };
  const getRange = (name) => {
    const selectedColorChart = regions[selectedRegion].layerList.find(
      ((layer) => layer.chartCSSSelector === name)
    ).chartCSSColor;
    const allValues = Object.keys(selectedColorChart);
    const thisRange = `${allValues[0]}-${allValues[allValues.length - 1]}`;
    return thisRange;
  };

  // handle state change more charts or more details charts
  const handleMoreOnClick = () => {
    dispatch(changeMore(areaName));
  };

  // TODO add removeOnClick
  // TODO removeOnClick will also have to remove redux state for more/less
  // TODO this will also need to clear all the save results
  //      from the store (from add areas) when its completed

  const handleExportClick = (event) => {
    event.stopPropagation();
    // Parse out data by chartIndices
    const dataRows = [];
    Object.entries(data).map(([index, value]) => {
      const thisRow = [];
      thisRow.push(getLabel(index)); // need to get label here
      thisRow.push(Number.isNaN(Number(value)) ? '0.0' : value.toFixed(3)); // need to get value here
      thisRow.push(getRange(index)); // need to get range here
      dataRows.push(thisRow);
      return thisRow;
    });

    const rows = [['Index', 'Values', 'Range(s)']];
    dataRows.map((row) => {
      rows.push(row);
      return rows;
    });

    // Get date and time, replace all special characters with '-'
    const dateString = new Date().toLocaleString().replace(/ |\/|,|:/g, '-');
    // concatenate type, area name, and date-time for filename
    const filename = `ALL-DATA-Area-${areaIndex + 1}-${dateString}.csv`;
    const csvData = rows.map((e) => e.join(',')).join('\n');
    const csvContent = `data:text/csv;charset=utf-8,${csvData}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link); // invisible link for download
    link.click(); // This will download the data file using invisible link
  };

  const removeLayer = (layer) => {
    leafletFeatureGroupRef.current?.removeLayer(layerToRemove);
    setListOfDrawnLayers(leafletFeatureGroupRef.current?.getLayers());
    const geo = layerToRemove.toGeoJSON();
    const buffGeo = buffer(geo, 1, { units: 'kilometers' });
    dispatch(removeFeatureByGeometry(geo.geometry));
    const newBufferGeoFeatures = bufferGeo.features.filter(
      (item) => JSON.stringify(item.geometry) !== JSON.stringify(buffGeo.geometry)
    );
    setBufferGeo((previous) => ({ ...previous, features: newBufferGeoFeatures }));
  };

  return (
    <StyledGrid
      container
      spacing={0}
      justifyContent="center"
      alignItems="center"
      p={0}
      sx={{ height: (theme) => theme.spacing(8), maxHeight: (theme) => theme.spacing(8) }}
    >
      <Grid xs={3} >
        <ActionButton
          buttonLabel={analyzeAreaState.isMore[areaName] ? 'Less' : 'More'}
          buttonName={analyzeAreaState.isMore[areaName] ? 'Less' : 'More'}
          onClick={handleMoreOnClick}>
          <MoreHorizOutlined />
        </ActionButton>
      </Grid>
      <Grid xs={3}>
        <ActionButton
          buttonLabel={'Export'}
          buttonName={'Export'}
          onClick={handleExportClick}>
          <CameraAlt />
        </ActionButton>
      </Grid>
      <Grid xs={3}>
        <ActionButton
          buttonLabel={'Zoom'}
          buttonName={'Zoom'}
          onClick={(e) => { handleZoomClick(e, layerToRemove); }}>
          <CenterFocusStrong />
        </ActionButton>
      </Grid>
      <Grid xs={3}>
        <ActionButton
          buttonLabel={'Remove'}
          buttonName={'Remove'}
          onClick={removeLayer}>
          <DeleteForever />
        </ActionButton>
      </Grid>
    </StyledGrid>
  );
}

ChartActionButtons.defaultProps = {
  data: null
};
ChartActionButtons.propTypes = {
  areaName: PropTypes.string.isRequired,
  areaIndex: PropTypes.number.isRequired,
  data: PropTypes.object,
  leafletFeatureGroupRef: PropTypes.object,
  map: PropTypes.object
};
