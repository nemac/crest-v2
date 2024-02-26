import React, { useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/system";

import {
  changeGraphTable,
  changeSortExpanded,
} from "../../reducers/analyzeAreaSlice";
import ChartCard from "./AnalyzeProjectSitesChartCard.jsx";
import ChartHeaderActionButtons from "./ChartHeaderActionButtons.jsx";
import TableData from "./AnalyzeProjectSitesTableData.jsx";
import { ChartSort } from "./ChartSort.jsx";
import { handleExportAllCSV, HandleRemoveAllClick } from "./ChartFunctions.jsx";

// selector named functions for lint rules makes it easier to re-use if needed.
const analyzeAreaSelector = (state) => state.analyzeArea;

const ChartHolderGrid = styled(Grid)(({ theme }) => ({
  paddingRight: theme.spacing(0),
  overflowY: "auto",
  overflowX: "clip",
  height: "calc(100% - 112px)",
  [theme.breakpoints.down("md")]: {
    height: "calc(100%)",
  },
}));

export default function ChartsHolder(props) {
  const { map, setHover, featureGroupRef, chartData } = props;

  const dispatch = useDispatch();
  const analyzeAreaState = useSelector(analyzeAreaSelector);
  const sortedChartData = useRef([...chartData]);

  const sortCharts = useCallback(
    (chartIndex) => {
      sortedChartData.current = [...chartData];

      if (analyzeAreaState.isSortASC[analyzeAreaState.sortBy]) {
        if (chartIndex === "areaNumber") {
          sortedChartData.current.sort(
            (a, b) => b.properties[chartIndex] - a.properties[chartIndex],
          ); // Asending sort
        } else {
          sortedChartData.current.sort(
            (a, b) =>
              b.properties.zonalStatsData[chartIndex] -
              a.properties.zonalStatsData[chartIndex],
          ); // Asending sort
        }
      } else if (chartIndex === "areaNumber") {
        sortedChartData.current.sort(
          (a, b) => a.properties[chartIndex] - b.properties[chartIndex],
        ); // Descending sort
      } else {
        sortedChartData.current.sort(
          (a, b) =>
            a.properties.zonalStatsData[chartIndex] -
            b.properties.zonalStatsData[chartIndex],
        ); // Descending sort
      }
    },
    [chartData, analyzeAreaState.isSortASC, analyzeAreaState.sortBy],
  );

  sortCharts(analyzeAreaState.sortBy);

  // handle state change Graph/Table
  const handleGraphOrTableClick = (newValue) => {
    dispatch(changeGraphTable());
  };

  // handle state change sort
  const handleSortClick = (newValue) => {
    dispatch(changeSortExpanded());
    // dispatch(changeChartSortDirection()); // Sort an individual chart ascending or not
  };

  return (
    <Grid
      container
      spacing={0}
      justifyContent="center"
      alignItems="center"
      px={0}
      pb={2}
      sx={{ height: "100%" }}
    >
      <Grid xs={12}>
        <ChartHeaderActionButtons
          handleSortClick={handleSortClick}
          handleGraphOrTableClick={handleGraphOrTableClick}
          HandleRemoveAllClick={(e) => {
            HandleRemoveAllClick(e, dispatch, featureGroupRef);
          }}
          handleExportClick={(e) => {
            handleExportAllCSV(e, chartData);
          }}
        />
        {analyzeAreaState.isSortExpanded ? <ChartSort /> : null}
      </Grid>

      {analyzeAreaState.isItAGraph ? (
        // This is the place the scroll bar overflows in chrome
        <ChartHolderGrid style={{ paddingRight: "0px" }} xs={12}>
          <Box pr={0} style={{ overflowX: "visible" }}>
            {sortedChartData.current.map((feature, index) => (
              <ChartCard
                key={feature.properties.areaName}
                feature={feature}
                region={feature.properties.region}
                zonalStatsData={feature.properties.zonalStatsData}
                featureGroupRef={featureGroupRef}
                map={map}
                setHover={setHover}
              />
            ))}
          </Box>
        </ChartHolderGrid>
      ) : (
        <ChartHolderGrid xs={12}>
          <Box>
            {sortedChartData.current.map((feature, index) => (
              <TableData
                key={`${feature.properties.areaName} + table`}
                data={feature}
              />
            ))}
          </Box>
        </ChartHolderGrid>
      )}
    </Grid>
  );
}

ChartsHolder.propTypes = {
  map: PropTypes.object,
  setHover: PropTypes.func,
  featureGroupRef: PropTypes.object,
  chartData: PropTypes.array,
};
