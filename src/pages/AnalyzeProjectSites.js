import React, {
  useEffect, useRef, useState
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { CameraAlt } from '@mui/icons-material';

import GenericMapHolder from '../components/Map/GenericMapHolder';
import MapActionCard from '../components/Map/MapActionCard';
import EmptyState from '../components/AnalyzeArea/EmptyState';
import ChartsHolder from '../components/AnalyzeArea/ChartsHolder';
import MapCard from '../components/Map/MapCard';
// import { handleExportImage } from '../components/AnalyzeArea/ChartFunctions';
import { HaveShareUrlAndUpdateRedux } from '../components/Map/ShareMap';

const AnalyzeAreaSelector = (state) => state.AnalyzeArea;
const drawnLayersSelector = (state) => state.mapProperties.drawnLayers;
const bufferLayersSelector = (state) => state.mapProperties.bufferLayers;

export default function AnalyzeProjectSite() {
  const analyzeAreaState = useSelector(AnalyzeAreaSelector);
  const drawnLayersFromState = useSelector(drawnLayersSelector);
  const bufferLayersFromState = useSelector(bufferLayersSelector);

  const [shareUrlComplete, setShareUrlComplete] = useState(false);
  const [querySearchParams, setQuerySearchParams] = useSearchParams();
  const leafletFeatureGroupRef = useRef();
  const [map, setMap] = useState(null);
  const [bufferCheckbox, setBufferCheckbox] = useState(true);
  const [drawAreaDisabled, setDrawAreaDisabled] = useState(false);
  const [tooLargeLayerOpen, setTooLargeLayerOpen] = useState(false);
  const [hover, setHover] = useState(false);

  // // This is a great way to make a ref list of refs that let us manipulate
  // // things later down the line in a known way
  // const geoRef = React.useRef([]);
  // geoRef.current = drawnLayersFromState.features.map((_, i) => geoRef.current[i] ?? createRef());
  // const bufferGeoRef = React.useRef([]);
  // bufferGeoRef.current = bufferLayersFromState.features.map(
  //   (_, i) => bufferGeoRef.current[i] ?? createRef()
  // );

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

  // const chartHeaderActionButtons = [
  //   {
  //     buttonLabel: 'BIG OL PLACEHOLDER',
  //     buttonName: 'BIG OL PLACEHOLDER',
  //     onClick: () => { handleExportImage('resilience-pie'); },
  //     icon: <CameraAlt />
  //   }
  // ];

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
      // chartHeaderActionButtons={chartHeaderActionButtons}
      isItAGraph={analyzeAreaState.isItAGraph}
      styledBoxSX={{ height: 'calc(100% - 258px)', marginTop: '8px' }}
      chartCard={
        <ChartsHolder
          map={map}
          featureGroupRef={leafletFeatureGroupRef}
          setHover={setHover}
          chartData={
            drawnLayersFromState.features.length > 0 ? drawnLayersFromState.features : null
          }
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
            bufferFromState={bufferLayersFromState}
            hover={hover}
          />
        </React.Fragment>
      }
      noDataState={<EmptyState/>}
    />
  );
}
