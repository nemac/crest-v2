import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PropTypes } from "prop-types";

import AnalyzeProjectSiteLeftColumn from "../components/AnalyzeArea/AnalyzeProjectSitesLeftColumn.jsx";
import GenericMapHolder from "../components/Map/GenericMapHolder.jsx";
import MapActionCard from "../components/Map/MapActionCard.jsx";
import EmptyState from "../components/AnalyzeArea/EmptyStateAnalyzeProject.jsx";
import ChartsHolder from "../components/AnalyzeArea/AnalyzeProjectSitesChartsHolder.jsx";
import MapCard from "../components/Map/AnalyzeProjectSitesMapCard.jsx";
import ShapeFileCorrectionMap from "../components/Map/ShapeFileCorrectionMap.jsx";
import { UpdateRedux } from "../components/Map/ShareMap.jsx";
import { useGetShareMapQuery } from "../services/shareMap";

const analyzeAreaSelector = (state) => state.analyzeArea;
const drawnLayersSelector = (state) => state.mapProperties.drawnLayers;
const selectedRegionSelector = (state) => state.selectedRegion.value;

export default function AnalyzeProjectSite(props) {
  const { setErrorState } = props;
  const analyzeAreaState = useSelector(analyzeAreaSelector);
  const drawnLayersFromState = useSelector(drawnLayersSelector);
  const region = useSelector(selectedRegionSelector);

  const dispatch = useDispatch();
  const [shareUrlComplete, setShareUrlComplete] = useState(false);
  const [querySearchParams, setQuerySearchParams] = useSearchParams();
  const leafletFeatureGroupRef = useRef();
  const [map, setMap] = useState(null);
  const [drawAreaDisabled, setDrawAreaDisabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [skip, setSkip] = useState(true);

  const [geoToRedraw, setGeoToRedraw] = useState(null);

  const featuresForCurrentRegion = drawnLayersFromState.features.filter(
    (feature) =>
      JSON.stringify(feature.properties.region) === JSON.stringify(region),
  );

  const queryParams = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const shareUrl = queryParams.shareUrl;

  const { data, error, isFetching } = useGetShareMapQuery(
    {
      shareUrl,
    },
    { skip },
  );

  if (isFetching) {
    // eslint-disable-next-line no-console
    console.log("fetching");
  }

  useEffect(() => {
    if (shareUrl) {
      setErrorState((previous) => ({
        ...previous,
        error: true,
        errorTitle: "Share Link",
        errorType: "warning",
        errorMessage:
          "Warning: Opening this share link will erase your current state. Proceed?",
        errorClose: () => {
          setErrorState({ ...previous, error: false });
          if (querySearchParams.has("shareUrl")) {
            querySearchParams.delete("shareUrl");
            setQuerySearchParams(querySearchParams);
          }
        },
        acceptButtonText: "Proceed",
        acceptButtonClose: () => {
          setErrorState({ ...previous, error: false });
          setSkip(false);
        },
      }));
    }
  }, [
    shareUrl,
    setSkip,
    setErrorState,
    querySearchParams,
    setQuerySearchParams,
  ]);

  useEffect(() => {
    if (error) {
      if (querySearchParams.has("shareUrl")) {
        querySearchParams.delete("shareUrl");
        setQuerySearchParams(querySearchParams);
      }
      setErrorState((previous) => ({
        ...previous,
        error: true,
        errorTitle: "Share Link Error",
        errorMessage: `The following error occurred with the share link: ${error.data}`,
      }));
    }
  }, [error, querySearchParams, setErrorState, setQuerySearchParams]);

  useEffect(() => {
    if (data) {
      UpdateRedux(data, dispatch, setShareUrlComplete);
      setSkip(true);
      if (querySearchParams.has("shareUrl")) {
        querySearchParams.delete("shareUrl");
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
        map={map}
        setErrorState={setErrorState}
      />
    );
  }

  if (shareUrl && !shareUrlComplete) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <GenericMapHolder
        map={map}
        isItAGraph={analyzeAreaState.isItAGraph}
        leftColumn={
          <AnalyzeProjectSiteLeftColumn
            mapActionCard={
              <MapActionCard
                map={map}
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
                  featuresForCurrentRegion.length > 0
                    ? featuresForCurrentRegion
                    : null
                }
              />
            }
            noDataState={<EmptyState />}
          />
        }
        tableData="Insert Table Data Here"
        mapCard={
          <React.Fragment>
            <MapCard
              map={map}
              setMap={setMap}
              leafletFeatureGroupRef={leafletFeatureGroupRef}
              setDrawAreaDisabled={setDrawAreaDisabled}
              hover={hover}
              setErrorState={setErrorState}
            />
          </React.Fragment>
        }
      />
    </>
  );
}

AnalyzeProjectSite.propTypes = {
  setErrorState: PropTypes.func,
};
