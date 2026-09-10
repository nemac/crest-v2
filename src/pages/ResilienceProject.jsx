import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { CameraAlt } from "@mui/icons-material";
import { queryFeatureLayer, SPATIAL_REL } from "../services/arcgisQuery";

import GenericMapHolder from "../components/Map/GenericMapHolder.jsx";
import ResilienceLeftColumn from "../components/AnalyzeArea/ResilienceLeftColumn.jsx";
import ResilienceMapActionCard from "../components/Map/ResilienceMapActionCard.jsx";
import ResilienceChartCard from "../components/AnalyzeArea/ResilienceChartCard.jsx";
import ResilienceMapCard from "../components/Map/ResilienceMapCard.jsx";
import EmptyStateResilience from "../components/AnalyzeArea/EmptyStateResilience.jsx";
import { handleExportImage } from "../components/AnalyzeArea/ChartFunctions.jsx";

import { mapConfig } from "../configuration/config";

const selectedRegionSelector = (state) => state.selectedRegion.value;
const selectedResilienceHub = (state) => state.mapProperties.resilienceHub;

export default function ResilienceProject(props) {
  const { setErrorState } = props;
  const [chartData, setChartData] = useState(null);
  const [averageHubScore, setAverageHubScore] = useState(0);
  const selectedRegion = useSelector(selectedRegionSelector);
  const resilienceHub = useSelector(selectedResilienceHub);
  const hubsHexesUrl = mapConfig.regions[selectedRegion].hubsHexServer;
  const rankProperty = mapConfig.regions[selectedRegion].rankProperty;

  const chartActionButtons = [
    {
      buttonLabel: "Export",
      buttonName: "Export",
      onClick: () => {
        handleExportImage("Core Variability");
      },
      icon: <CameraAlt />,
    },
  ];

  // Run query on hex server if it exists after feature clicked on
  React.useEffect(() => {
    if (!hubsHexesUrl) {
      const hubRankNoCore = resilienceHub
        ? resilienceHub.properties[rankProperty]
        : null;
      setAverageHubScore(hubRankNoCore);
      setChartData([]);
      return;
    }
    if (resilienceHub) {
      const calculatedData = [];
      let runningTotalScore = 0;
      for (let i = 0; i < 10; i += 1) {
        calculatedData[i] = {
          name: `Hub Score = ${parseInt(i + 1, 10)}`,
          value: 0,
        };
      }
      queryFeatureLayer(hubsHexesUrl, {
        geometry: resilienceHub.geometry,
        spatialRel: SPATIAL_REL.contains,
      })
        .then((featureCollection) => {
          if (featureCollection.features.length === 0) return;
          featureCollection.features.forEach((obj) => {
            calculatedData[
              parseInt(obj.properties[rankProperty] - 1, 10)
            ].value += 1;
            runningTotalScore += parseInt(obj.properties[rankProperty], 10);
          });
          const round =
            Math.round(
              (runningTotalScore / featureCollection.features.length) * 10,
            ) / 10;
          setAverageHubScore(round);
          setChartData(calculatedData);
        })
        .catch(() => null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resilienceHub]);

  const hasCoreData = Boolean(hubsHexesUrl);
  return (
    <GenericMapHolder
      leftColumn={
        <ResilienceLeftColumn
          mapActionCard={
            <ResilienceMapActionCard
              setAverageHubScore={setAverageHubScore}
              setChartData={setChartData}
            />
          }
          hasCoreData={hasCoreData}
          coreHubScore={averageHubScore}
          setChartData={setChartData}
          setAverageHubScore={setAverageHubScore}
          chartCard={
            <ResilienceChartCard
              chartData={chartData}
              chartActionButtons={chartActionButtons}
              noDataState={EmptyStateResilience}
              coreHubScore={averageHubScore}
              hasCoreData={hasCoreData}
            />
          }
          noDataState={
            resilienceHub === null ? (
              <EmptyStateResilience />
            ) : (
              <EmptyStateResilience />
            )
          }
        />
      }
      mapCard={
        <ResilienceMapCard
          setErrorState={setErrorState}
          setAverageHubScore={setAverageHubScore}
          setChartData={setChartData}
        />
      }
    />
  );
}

ResilienceProject.propTypes = {
  setErrorState: PropTypes.func,
};
