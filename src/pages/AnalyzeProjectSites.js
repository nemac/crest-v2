import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CameraAlt } from '@mui/icons-material';

import GenericMapHolder from '../components/Map/GenericMapHolder';
import MapActionCard from '../components/Map/MapActionCard';
import EmptyState from '../components/AnalyzeArea/EmptyState';
import ChartsHolder from '../components/AnalyzeArea/ChartsHolder';
import MapCard from '../components/Map/MapCard';
import { handleExportImage } from '../components/AnalyzeArea/ChartFunctions';
import { HaveShareUrlAndUpdateRedux } from '../components/Map/ShareMap';

const AnalyzeAreaSelector = (state) => state.AnalyzeArea;
const drawnLayersSelector = (state) => state.mapProperties.drawnLayers;

export default function AnalyzeProjectSite() {
  const analyzeAreaState = useSelector(AnalyzeAreaSelector);
  const drawnLayersFromState = useSelector(drawnLayersSelector);

  const [shareUrlComplete, setShareUrlComplete] = useState(false);
  const [querySearchParams, setQuerySearchParams] = useSearchParams();
  const leafletFeatureGroupRef = useRef();
  const [map, setMap] = useState(null);
  const [bufferCheckbox, setBufferCheckbox] = useState(true);
  const [drawAreaDisabled, setDrawAreaDisabled] = useState(false);
  const [tooLargeLayerOpen, setTooLargeLayerOpen] = useState(false);
  const [listOfDrawnLayers, setListOfDrawnLayers] = useState([]);
  const [bufferLayersList, setBufferLayersList] = useState([]);
  const [bufferGeo, setBufferGeo] = useState({ type: 'FeatureCollection', features: [] });
  useEffect(() => {
    // Delete share url params from url when it's complete
    if (shareUrlComplete) {
      if (querySearchParams.has('shareUrl')) {
        querySearchParams.delete('shareUrl');
        setQuerySearchParams(querySearchParams);
      }
    }
  }, [shareUrlComplete, querySearchParams, setQuerySearchParams]);

  const queryParams = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop)
  });
  const shareUrl = queryParams.shareUrl;
  if (shareUrl) {
    HaveShareUrlAndUpdateRedux(shareUrl, setShareUrlComplete);
  }
  if (shareUrl && !shareUrlComplete) {
    return (
      <div>
        Loading Share Link. We need to eventually style this.
      </div>
    );
  }

  const chartHeaderActionButtons = [
    {
      buttonLabel: 'Export',
      buttonName: 'Export',
      onClick: () => { handleExportImage('resilience-pie'); },
      icon: <CameraAlt />
    }
  ];

  return (
    // <MapHolder
    //   listOfDrawnLayers={listOfDrawnLayers}
    //   setListOfDrawnLayers={setListOfDrawnLayers}
    //   bufferGeo={bufferGeo}
    //   setBufferGeo={setBufferGeo}
    //   leafletFeatureGroupRef={leafletFeatureGroupRef}
    // />
    <GenericMapHolder
      mapActionCard={
        <MapActionCard
          map={map}
          bufferCheckbox={bufferCheckbox}
          setBufferCheckbox={setBufferCheckbox}
          drawAreaDisabled={drawAreaDisabled}
          setTooLargeLayerOpen={setTooLargeLayerOpen}
        />
      }
      chartHeaderActionButtons={chartHeaderActionButtons}
      isItAGraph={analyzeAreaState.isItAGraph}
      // chartCard={
      //   <ResilienceChartCard chartData={chartData} chartActionButtons={chartActionButtons}/>
      // }
      chartCard={
        <ChartsHolder
          map={map}
          leafletFeatureGroupRef={leafletFeatureGroupRef}
          listOfDrawnLayers={listOfDrawnLayers}
          setListOfDrawnLayers={setListOfDrawnLayers}
          setBufferGeo={setBufferGeo}
          bufferGeo={bufferGeo}
          bufferLayersList={bufferLayersList}
          setBufferLayersList={setBufferLayersList}
          chartData={drawnLayersFromState.features}
        />
      }
      tableData='Insert Table Data Here'
      mapCard={
        <MapCard
          map={map}
          setMap={setMap}
          bufferCheckbox={bufferCheckbox}
          leafletFeatureGroupRef={leafletFeatureGroupRef}
          setListOfDrawnLayers={setListOfDrawnLayers}
          setDrawAreaDisabled={setDrawAreaDisabled}
          tooLargeLayerOpen={tooLargeLayerOpen}
          setTooLargeLayerOpen={setTooLargeLayerOpen}
          bufferGeo={bufferGeo}
          setBufferGeo={setBufferGeo}
          bufferLayersList={bufferLayersList}
          setBufferLayersList={setBufferLayersList}
        />
      }
      noDataState={<EmptyState/>}
      // optionalComponent={<ResilienceHubScore coreHubScore={averageHubScore}/>}
      optionalComponent={null}
    />
  );
}
