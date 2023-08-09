import React, {
  useEffect, useRef, useState
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AnalyzeProjectSiteLeftColumn from '../components/AnalyzeArea/AnalyzeProjectSitesLeftColumn';
import GenericMapHolder from '../components/Map/GenericMapHolder';
import MapActionCard from '../components/Map/MapActionCard';
import EmptyState from '../components/AnalyzeArea/EmptyStateAnalyzeProject';
import ChartsHolder from '../components/AnalyzeArea/AnalyzeProjectSitesChartsHolder';
import MapCard from '../components/Map/AnalyzeProjectSitesMapCard';
import ModelErrors from '../components/All/ModelErrors';
import ShapeFileCorrectionMap from '../components/Map/ShapeFIleCorrectionMap';
import { UpdateRedux } from '../components/Map/ShareMap';
import { useGetShareMapQuery } from '../services/shareMap';

const analyzeAreaSelector = (state) => state.analyzeArea;
const drawnLayersSelector = (state) => state.mapProperties.drawnLayers;
const bufferLayersSelector = (state) => state.mapProperties.bufferLayers;
const selectedRegionSelector = (state) => state.selectedRegion.value;

export default function AnalyzeProjectSite() {
  const analyzeAreaState = useSelector(analyzeAreaSelector);
  const drawnLayersFromState = useSelector(drawnLayersSelector);
  const bufferLayersFromState = useSelector(bufferLayersSelector);
  const region = useSelector(selectedRegionSelector);

  const dispatch = useDispatch();
  const [shareUrlComplete, setShareUrlComplete] = useState(false);
  const [querySearchParams, setQuerySearchParams] = useSearchParams();
  const leafletFeatureGroupRef = useRef();
  const [map, setMap] = useState(null);
  const [bufferCheckbox, setBufferCheckbox] = useState(true);
  const [drawAreaDisabled, setDrawAreaDisabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [errorState, setErrorState] = useState({
    error: false,
    errorType: 'error', // error, warning, info, success (https://mui.com/material-ui/react-alert/)
    errorTitle: 'Error',
    errorMessage: 'An error as occurred.',
    errorButtonText: 'Dismiss',
    acceptButtonText: null,
    errorClose: () => setErrorState((previous) => ({ ...previous, error: false })),
    acceptButtonClose: () => setErrorState((previous) => ({ ...previous, error: false }))
  });

  const [geoToRedraw, setGeoToRedraw] = useState(null);

  const featuresForCurrentRegion = drawnLayersFromState.features.filter(
    (feature) => JSON.stringify(feature.properties.region) === JSON.stringify(region)
  );

  const queryParams = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop)
  });
  const shareUrl = queryParams.shareUrl;

  const { data, error, isFetching } = useGetShareMapQuery({
    shareUrl
  }, { skip: !shareUrl });

  if (isFetching) {
    // eslint-disable-next-line no-console
    console.log('fetching');
  }

  useEffect(() => {
    if (error) {
      if (querySearchParams.has('shareUrl')) {
        querySearchParams.delete('shareUrl');
        setQuerySearchParams(querySearchParams);
      }
      setErrorState((previous) => ({
        ...previous,
        error: true,
        errorTitle: 'Share Link Error',
        errorMessage: `The following error occured with the share link: ${error.data}`
      }));
    }
  }, [error, querySearchParams, setQuerySearchParams]);

  useEffect(() => {
    if (data) {
      UpdateRedux(data, dispatch, setShareUrlComplete);
      if (querySearchParams.has('shareUrl')) {
        querySearchParams.delete('shareUrl');
        setQuerySearchParams(querySearchParams);
      }
    }
  }, [data, querySearchParams, setQuerySearchParams, dispatch]);

  if (geoToRedraw?.features?.length > 0) {
    return (
      <ShapeFileCorrectionMap
        geoToRedraw={geoToRedraw}
        setGeoToRedraw={setGeoToRedraw}
        setMap={setMap}
      />
    );
  }

  if (shareUrl && !shareUrlComplete) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <>
      <ModelErrors
        contentTitle={errorState.errorTitle}
        contentMessage={errorState.errorMessage}
        buttonMessage={errorState.errorButtonText}
        errorType={errorState.errorType}
        onClose={errorState.errorClose}
        open={errorState.error}
        acceptButtonText={errorState.acceptButtonText}
        acceptButtonClose={errorState.acceptButtonClose}
      />
      <GenericMapHolder
        isItAGraph={analyzeAreaState.isItAGraph}
        leftColumn={
          <AnalyzeProjectSiteLeftColumn
            mapActionCard={
              <MapActionCard
                map={map}
                bufferCheckbox={bufferCheckbox}
                setBufferCheckbox={setBufferCheckbox}
                drawAreaDisabled={drawAreaDisabled}
                setGeoToRedraw={setGeoToRedraw}
                setErrorState={setErrorState}
              />
            }
            chartCard={
              <ChartsHolder
                map={map}
                featureGroupRef={leafletFeatureGroupRef}
                setHover={setHover}
                chartData={
                  featuresForCurrentRegion.length > 0 ? featuresForCurrentRegion : null
                }
              />
            }
            noDataState={<EmptyState/>}
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
              bufferFromState={bufferLayersFromState}
              hover={hover}
              setGeoToRedraw={setGeoToRedraw}
              setErrorState={setErrorState}
            />
          </React.Fragment>
        }
      />
    </>
  );
}
