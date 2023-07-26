import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as esri from 'esri-leaflet';
import { CameraAlt } from '@mui/icons-material';

import GenericMapHolder from '../components/Map/GenericMapHolder';
import ResilienceMapActionCard from '../components/Map/ResilienceMapActionCard';
import ResilienceChartCard from '../components/AnalyzeArea/GenericChartCard';
import ResilienceMapCard from '../components/Map/ResilienceMapCard';
import EmptyStateResilience from '../components/AnalyzeArea/EmptyStateResilience';
import { handleExportImage } from '../components/AnalyzeArea/ChartFunctions';

import { mapConfig } from '../configuration/config';

const selectedRegionSelector = (state) => state.selectedRegion.value;
const AnalyzeAreaSelector = (state) => state.AnalyzeArea;
const selectedResilienceHub = (state) => state.mapProperties.resilienceHub;

export default function ResilienceProject() {
  const [chartData, setChartData] = useState(null);
  const [averageHubScore, setAverageHubScore] = useState(0);
  const selectedRegion = useSelector(selectedRegionSelector);
  const analyzeAreaState = useSelector(AnalyzeAreaSelector);
  const resilienceHub = useSelector(selectedResilienceHub);
  const hubsHexesUrl = mapConfig.regions[selectedRegion].hubsHexServer;
  const rankProperty = mapConfig.regions[selectedRegion].rankProperty;
  const isItAGraph = analyzeAreaState.isItAGraphResilience;

  // there currently isn't a hub core for every region
  let featureLayerHex;
  if (hubsHexesUrl) {
    featureLayerHex = esri.featureLayer({
      url: hubsHexesUrl
    });
  }

  const chartActionButtons = [
    {
      buttonLabel: 'Export',
      buttonName: 'Export',
      onClick: () => { handleExportImage('resilience-pie'); },
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
        calculatedData[i] = { name: `Hub Score = ${parseInt((i + 1), 10)}`, value: 0 };
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resilienceHub]);

  return (
    <GenericMapHolder
      mapActionCard={<ResilienceMapActionCard/>}
      isItAGraph={isItAGraph}
      chartCard={
        <ResilienceChartCard
          chartData={chartData}
          chartActionButtons={chartActionButtons}
          noDataState={EmptyStateResilience}
          coreHubScore={averageHubScore}
        />
      }
      tableData='Insert Table Data Here'
      mapCard={<ResilienceMapCard/>}
      noDataState={(resilienceHub === null) ? <EmptyStateResilience /> : null}
    />
  );
}
