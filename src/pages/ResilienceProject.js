import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as esri from 'esri-leaflet';
import { TableChart, BarChart, CameraAlt } from '@mui/icons-material';

import { changeGraphTableResilience } from '../reducers/analyzeAreaSlice';
import GenericMapHolder from '../components/Map/GenericMapHolder';
import ResilienceMapActionCard from '../components/Map/ResilienceMapActionCard';
import ResilienceChartCard from '../components/AnalyzeArea/GenericChartCard';
import ResilienceMapCard from '../components/Map/ResilienceMapCard';
import { mapConfig } from '../configuration/config';

const selectedRegionSelector = (state) => state.selectedRegion.value;
const AnalyzeAreaSelector = (state) => state.AnalyzeArea;
const selectedResilienceHub = (state) => state.mapProperties.resilienceHub;

export default function ResilienceProject() {
  const dispatch = useDispatch();
  const [chartData, setChartData] = useState(null);
  const [averageHubScore, setAverageHubScore] = useState(0);
  const selectedRegion = useSelector(selectedRegionSelector);
  const analyzeAreaState = useSelector(AnalyzeAreaSelector);
  const resilienceHub = useSelector(selectedResilienceHub);
  const hubsHexesUrl = mapConfig.regions[selectedRegion].hubsHexServer;
  const rankProperty = mapConfig.regions[selectedRegion].rankProperty;

  // there currently isn't a hub core for every region
  let featureLayerHex;
  if (hubsHexesUrl) {
    featureLayerHex = esri.featureLayer({
      url: hubsHexesUrl
    });
  }

  // handle state change Graph/Table
  const handleGraphOrTableClick = () => {
    dispatch(changeGraphTableResilience());
  };

  const chartHeaderActionButtons = [
    {
      buttonLabel: analyzeAreaState.isItAGraphResilience ? 'Table' : 'Chart',
      buttonName: analyzeAreaState.isItAGraphResilience ? 'Table' : 'Chart',
      onClick: handleGraphOrTableClick,
      icon: analyzeAreaState.isItAGraphResilience ? (<TableChart />) : (<BarChart />)
    }
  ];

  const handleExportClick = () => {
    console.log('click');
  };

  const chartActionButtons = [
    {
      buttonLabel: 'Export',
      buttonName: 'Export',
      onClick: handleExportClick,
      icon: <CameraAlt />
    }
  ];

  // Run query on hex server if it exists after feature clicked on
  React.useEffect(() => {
    if (!featureLayerHex) { return; } // return if no hex layer to query
    if (resilienceHub) {
      const calculatedData = [];
      let runningTotalScore = 0; // using this increment the hub core scores
      for (let i = 0; i < 10; i += 1) {
        calculatedData[i] = { name: 'Hub Score = ' + parseInt((i + 1), 10), value: 0 };
      }
      const query = featureLayerHex.query().within(resilienceHub);
      query.run((error, featureCollection, response) => {
        if (error) {
          return;
        }
        if (featureCollection.features.length === 0) {
          return;
        }
        // Count occurrences of each rank
        featureCollection.features.forEach((obj) => {
          // Subtracting 1 because rankProperty 1 goes into 0th element etc
          calculatedData[parseInt(obj.properties[rankProperty] - 1, 10)].value += 1;
          runningTotalScore += parseInt(obj.properties[rankProperty], 10);
        });
        const round = Math.round((runningTotalScore / featureCollection.features.length) * 10) / 10;
        setAverageHubScore(round);
        setChartData(calculatedData);
      });
    }
  }, [resilienceHub]);

  return (
    <GenericMapHolder
      mapActionCard={<ResilienceMapActionCard/>}
      chartHeaderActionButtons={chartHeaderActionButtons}
      isItAGraph={analyzeAreaState.isItAGraphResilience}
      chartCard={
        <ResilienceChartCard chartData={chartData} chartActionButtons={chartActionButtons}/>
      }
      tableData={<ResilienceMapActionCard/>}
      mapCard={<ResilienceMapCard/>}
    />
  );
}
