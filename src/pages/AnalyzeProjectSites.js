import React, {
  createRef, useEffect, useRef, useState
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CameraAlt } from '@mui/icons-material';
import FadeLoader from 'react-spinners/FadeLoader';
import * as L from 'leaflet';

import GenericMapHolder from '../components/Map/GenericMapHolder';
import MapActionCard from '../components/Map/MapActionCard';
import EmptyState from '../components/AnalyzeArea/EmptyState';
import ChartsHolder from '../components/AnalyzeArea/ChartsHolder';
import MapCard from '../components/Map/MapCard';
import { handleExportImage } from '../components/AnalyzeArea/ChartFunctions';
import { HaveShareUrlAndUpdateRedux } from '../components/Map/ShareMap';
import { setEmptyState } from '../reducers/analyzeAreaSlice';
import { addNewFeatureToDrawnLayers, incrementAreaNumber } from '../reducers/mapPropertiesSlice';

import { useGetZonalStatsQuery } from '../services/zonalstats';
import { mapConfig } from '../configuration/config';

const AnalyzeAreaSelector = (state) => state.AnalyzeArea;
const drawnLayersSelector = (state) => state.mapProperties.drawnLayers;
const bufferLayersSelector = (state) => state.mapProperties.bufferLayers;
const selectedRegionSelector = (state) => state.selectedRegion.value;

export default function AnalyzeProjectSite() {
  const dispatch = useDispatch();
  const analyzeAreaState = useSelector(AnalyzeAreaSelector);
  const drawnLayersFromState = useSelector(drawnLayersSelector);
  const bufferLayersFromState = useSelector(bufferLayersSelector);
  const selectedRegion = useSelector(selectedRegionSelector);

  const [shareUrlComplete, setShareUrlComplete] = useState(false);
  const [querySearchParams, setQuerySearchParams] = useSearchParams();
  const leafletFeatureGroupRef = useRef();
  const [map, setMap] = useState(null);
  const [bufferCheckbox, setBufferCheckbox] = useState(true);
  const [drawAreaDisabled, setDrawAreaDisabled] = useState(false);
  const [tooLargeLayerOpen, setTooLargeLayerOpen] = useState(false);
  const [hover, setHover] = useState(false);

  // This is a great way to make a ref list of refs that let us manipulate
  // things later down the line in a known way
  const geoRef = React.useRef([]);
  geoRef.current = drawnLayersFromState.features.map((_, i) => geoRef.current[i] ?? createRef());
  const bufferGeoRef = React.useRef([]);
  bufferGeoRef.current = bufferLayersFromState.features.map(
    (_, i) => bufferGeoRef.current[i] ?? createRef()
  );
  // const [currentDrawn, setCurrentDrawn] = useState({
  //   drawnGeo: null,
  //   bufferGeo: null,
  //   featureGroupZonalStats: null, // this is the featureGroup that gets sent to zonalStats
  //   skip: true // this tells the query not to run unless set to false
  // });

  // This block uses RTK Query to catch the call to zonal stats and do something at each point
  // const { data, error, isLoading } = useGetZonalStatsQuery({
  //   region: mapConfig.regions[selectedRegion].regionName,
  //   queryData: currentDrawn.featureGroupZonalStats
  // }, { skip: currentDrawn.skip });
  // if (isLoading) {
  //   console.log('loading');
  // }
  // if (error) {
  //   console.log(error);
  // }
  // if (data) {
  //   // dispatch(setEmptyState(false));
  //   const geo = structuredClone(currentDrawn.drawnGeo);
  //   geo.properties.zonalStatsData = data.features[0].properties.mean;
  //   dispatch(addNewFeatureToDrawnLayers(geo));
  //   dispatch(incrementAreaNumber());
  //   setDrawAreaDisabled(false);
  //   setCurrentDrawn((previous) => ({ ...previous, skip: true }));
  //   // data.features.forEach((feature) => { // Should only be 1 feature
  //   //   console.log(feature);
  //   //   geo.properties.zonalStatsData = feature.properties.mean;
  //   //   dispatch(addNewFeatureToDrawnLayers(geo));
  //   //   dispatch(incrementAreaNumber());
  //   //   setDrawAreaDisabled(false);
  //   //   //setCurrentDrawn((previous) => ({ ...previous, skip: false }));
  //   // });
  // }

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
      buttonLabel: 'BIG OL PLACEHOLDER',
      buttonName: 'BIG OL PLACEHOLDER',
      onClick: () => { handleExportImage('resilience-pie'); },
      icon: <CameraAlt />
    }
  ];

  return (
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
      chartCard={
        <ChartsHolder
          map={map}
          leafletFeatureGroupRef={leafletFeatureGroupRef}
          chartData={drawnLayersFromState.features}
          geoRef={geoRef}
          bufferGeoRef={bufferGeoRef}
          setHover={setHover}
        />
      }
      tableData='Insert Table Data Here'
      mapCard={
        <React.Fragment>
          <MapCard
            map={map}
            setMap={setMap}
            bufferCheckbox={bufferCheckbox}
            leafletFeatureGroupRef={leafletFeatureGroupRef}
            setDrawAreaDisabled={setDrawAreaDisabled}
            tooLargeLayerOpen={tooLargeLayerOpen}
            setTooLargeLayerOpen={setTooLargeLayerOpen}
            geoRef={geoRef}
            bufferGeoRef={bufferGeoRef}
            //setCurrentDrawn={setCurrentDrawn}
            drawnFromState={drawnLayersFromState}
            bufferFromState={bufferLayersFromState}
            hover={hover}
          />
        </React.Fragment>
      }
      noDataState={<EmptyState/>}
      // optionalComponent={<ResilienceHubScore coreHubScore={averageHubScore}/>}
      optionalComponent={null}
    />
  );
}
