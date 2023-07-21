import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import {
  changeEmptyState,
  changeGraphTable,
  changeSortDirection
} from '../../reducers/analyzeAreaSlice';
import {
  removeAllFeaturesFromZonalStatsAreas,
  removeAllFeaturesFromDrawnLayers
} from '../../reducers/mapPropertiesSlice';
import ChartCard from './ChartCard';
import ChartHeaderActionButtons from './ChartHeaderActionButtons';
import TableData from './TableData';
import { mapConfig } from '../../configuration/config';
import { handleExportCSV, HandleRemoveAllClick } from './ChartFunctions';

// sample configs to create the charts should come from state/redux later
// TODO config should be imported from config directory

// selector named functions for lint rules makes it easier to re-use if needed.
const regions = mapConfig.regions;
const AnalyzeAreaSelector = (state) => state.AnalyzeArea;
const drawnLayerSelector = (state) => state.mapProperties.drawnLayers;
const selectedRegionSelector = (state) => state.selectedRegion.value;
const drawnLayersSelector = (state) => state.mapProperties.drawnLayers;
const bufferLayersListSelector = (state) => state.mapProperties.bufferLayers;

export default function ChartsHolder(props) {
  const { leafletFeatureGroupRef, map, listOfDrawnLayers, setListOfDrawnLayers, setBufferGeo, bufferGeo, setBufferLayersList } = props;
  const drawnLayerAreas = useSelector(drawnLayerSelector);
  const selectedRegion = useSelector(selectedRegionSelector);
  const drawnLayersFromState = useSelector(drawnLayersSelector);
  const bufferLayersList = useSelector(bufferLayersListSelector);
  const featureList = drawnLayerAreas.features;
  const [chartData, setChartData] = useState([]);
  const getLabel = (area, name) => {
    const thisLabel = regions[area.region].layerList.find(
      ((layer) => layer.chartCSSSelector === name)
    ).label;
    return thisLabel;
  };
  const getRange = (area, name) => {
    const selectedColorChart = regions[area.region].layerList.find(
      ((layer) => layer.chartCSSSelector === name)
    ).chartCSSColor;
    const allValues = Object.keys(selectedColorChart);
    const thisRange = `${allValues[0]}-${allValues[allValues.length - 1]}`;
    return thisRange;
  };
  // const handleFeatureUpdate = useCallback((features) => {
  //   if (features) {
  //     const tempData = [];
  //     features.forEach((entry, index) => {
  //       tempData.push({
  //         areaName: entry.properties.areaName,
  //         areaIndex: index,
  //         region: entry.properties.region,
  //         zonalStatsData: entry.properties.zonalStatsData
  //       });
  //     });
  //     setChartData(tempData);
  //   }
  // }, []);
  // useEffect(() => {
  //   handleFeatureUpdate(featureList);
  // }, [featureList, handleFeatureUpdate]);
  const dispatch = useDispatch();
  const analyzeAreaState = useSelector(AnalyzeAreaSelector);

  // handle state change Graph/Table
  const handleGraphOrTableClick = (newValue) => {
    dispatch(changeGraphTable());
  };

  // handle state change sort
  const handleSortClick = (newValue) => {
    // TODO will need to change this to add a menu to pick index
    //   aka Community Exposure, Resilience Hubs to sort by
    //   will need to keep the user generated areas together as a group
    dispatch(changeSortDirection());
  };

  return (
    <Grid container spacing={0} justifyContent="center" alignItems="center" px={0} pb={2} sx={{ height: '100%' }}>
      <Grid xs={12} >
        <ChartHeaderActionButtons
          handleSortClick={handleSortClick}
          handleGraphOrTableClick={handleGraphOrTableClick}
          HandleRemoveAllClick={
            (e) => { HandleRemoveAllClick(e, leafletFeatureGroupRef, dispatch, setBufferGeo); }
          }
          handleGenericClick={handleExportCSV} />
      </Grid>

      {analyzeAreaState.isItAGraph ? (
        <Grid xs={12} sx={{ height: 'calc(100% - 112px)', paddingRight: (theme) => theme.spacing(1.5), overflowY: 'scroll' }}>
          <Box>
            {drawnLayersFromState.features.map((feature, index) => (
              <ChartCard
                key={feature.properties.areaName}
                areaName={feature.properties.areaName}
                areaIndex={index}
                region={feature.properties.region}
                zonalStatsData={feature.properties.zonalStatsData}
                leafletFeatureGroupRef={leafletFeatureGroupRef}
                layerToRemove={listOfDrawnLayers[index]}
                // bufferLayerToRemove={JSON.parse(bufferLayersList[index])}
                map={map}
                setListOfDrawnLayers={setListOfDrawnLayers}
                setBufferGeo={setBufferGeo}
                bufferGeo={bufferGeo}
                bufferLayersList={bufferLayersList}
                setBufferLayersList={setBufferLayersList}
              />
            ))}
          </Box>
        </Grid>
      ) : (
        <Grid xs={12}
          sx={{ height: 'calc(100% - 112px)', paddingRight: (theme) => theme.spacing(1.5), overflowY: 'scroll' }}
        >
          <Box>
            {/* <TableData data={chartData} /> TODO: COME BACK TO THIS IT NEEDS UPDATING TOO */}
          </Box>
        </Grid>
      )}

    </Grid>
  );
}

ChartsHolder.propTypes = {
  leafletFeatureGroupRef: PropTypes.object,
  map: PropTypes.object
};
