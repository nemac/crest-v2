import React from "react";
import PropTypes from "prop-types";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
} from "recharts";

/* eslint-disable no-nested-ternary */

import { mapConfig } from "../../configuration/config";
import ChartCustomLabels from "./ChartCustomLabels.jsx";
import CustomToolTip from "./CustomToolTip.jsx";

const regions = mapConfig.regions;

export default function AnalyzeBarChart(props) {
  const {
    chartRegion,
    chartIndices,
    chartType,
    areaName,
    zonalStatsData,
    barchartMargin,
    setChartDescription,
    setChartLabel,
    setChartDescriptionFor,
  } = props;

  const region = regions[chartRegion];
  const layerList = region.layerList;

  const formatYAxis = (value) => {
    switch (value) {
      case 1:
        return "High";
      case 0:
        return "Low";
      default:
        return "";
    }
  };

  // Bar Color is functional based on value comparison with config
  const getData = (name, value) => {
    const colorValue = Math.round(value);
    const selectedLayerData = layerList.find(
      (layer) => layer.chartCSSSelector === name,
    );
    if (!selectedLayerData) {
      return null;
    }

    const selectedChartLabel = selectedLayerData.chartLabel;
    const selectedColorChart = selectedLayerData.chartCSSColor;
    const chartOrder = selectedLayerData.chartOrder;
    const selectChartLabelDescription = selectedLayerData.description;
    const selectedColor = selectedColorChart[colorValue];
    const allValues = Object.keys(selectedColorChart);
    const maxValue = allValues[allValues.length - 1];
    const chartValue = value / maxValue;
    const retData = {
      selectedColor,
      chartValue,
      selectedChartLabel,
      selectChartLabelDescription,
      chartOrder,
    };
    return retData;
  };

  const barColors = []; // Stores colors for data bars plotted
  // this order needs to always match chartData
  const chartData = []; // Stores data to be plotted
  // this needs to be sorted by value

  if (zonalStatsData) {
    let skippedValues = 0;
    chartIndices.forEach((element, i) => {
      const value =
        zonalStatsData[element] === "NaN"
          ? null
          : zonalStatsData[element] === 0
            ? 0.000000000001
            : zonalStatsData[element];

      if (!value) {
        skippedValues += 1;
        return;
      }
      const index = i - skippedValues;
      const layerData = getData(element, value);
      if (!layerData) return;

      const {
        selectedColor,
        chartValue,
        selectedChartLabel,
        selectChartLabelDescription,
        chartOrder,
      } = layerData;

      chartData.push({
        name: element,
        value,
        chartValue,
        selectedChartLabel,
        selectChartLabelDescription,
        chartOrder,
        chartType,
        index,
      });
      barColors.push(selectedColor);
    });
  }

  const chartDataSorted = chartData.sort((a, b) => {
    if (a.chartOrder) {
      return a.chartOrder - b.chartOrder;
    }
    return 0;
  });

  const handleChartClick = (event) => {
    if (event && event.activePayload) {
      const chartItem = event.activePayload[0].payload;
      setChartLabel(chartItem.selectedChartLabel);
      setChartDescription(chartItem.selectChartLabelDescription);
      setChartDescriptionFor(chartItem.chartType);
    }
  };

  // This code may come in handy at some point to sort the actual indices of each chart
  // const sortedChartData = [...chartData];
  // sortedChartData.sort((a, b) => a.chartValue - b.chartValue);
  // const thisChartData = analyzeAreaState.chartSortASC ? sortedChartData : chartData;
  return (
    <ResponsiveContainer
      id={`${chartType}-container`}
      style={{ overflow: "visible", paddingTop: "8px", marginBottom: "16px" }}
    >
      <BarChart
        id={`${chartType}-barchart`}
        onClick={handleChartClick}
        data={chartData}
        margin={barchartMargin}
      >
        <text
          x="50%"
          y="10%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          <tspan x="50%" style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
            {areaName.replace("Hawaii", "Hawai'i")}
          </tspan>

          <tspan x="50%" dy={"25px"} style={{ fontSize: "1rem" }}>
            {chartType}
          </tspan>
        </text>
        <CartesianGrid
          strokeDasharray="1"
          stroke="#555555"
          horizontalCoordinatesGenerator={null}
          verticalCoordinatesGenerator={(something) => [0]}
        />
        <XAxis
          dataKey="selectedChartLabel"
          tick={
            <ChartCustomLabels
              chartData={chartDataSorted}
              setChartDescription={setChartDescription}
              setChartLabel={setChartLabel}
              setChartDescriptionFor={setChartDescriptionFor}
            />
          }
          style={{
            fontFamily: "Roboto, sans-serif",
            fontSize: "10rem",
            lineHeight: "2rem",
            overflow: "visible",
          }}
          interval={0}
        />
        <YAxis
          domain={[0, 1]}
          tickFormatter={formatYAxis}
          style={{
            fontFamily: "Roboto, sans-serif",
            fontSize: "0.75rem",
            overflow: "visible",
          }}
          interval={0}
        />

        <Tooltip onClick={handleChartClick} content={<CustomToolTip />} />
        <Bar
          dataKey="chartValue"
          onClick={handleChartClick}
          style={{ overflow: "visible", cursor: "pointer" }}
        >
          {chartDataSorted.map((entry, index) => (
            <Cell
              id={`cell-${entry.index}`}
              key={`cell-${entry.index}`}
              fill={barColors[entry.index]}
              style={{ cursor: "pointer" }}
              onClick={handleChartClick}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

AnalyzeBarChart.propTypes = {
  areaName: PropTypes.string.isRequired,
  chartRegion: PropTypes.string.isRequired,
  chartIndices: PropTypes.array.isRequired,
  chartType: PropTypes.string,
  zonalStatsData: PropTypes.object,
  barchartMargin: PropTypes.object,
  setChartLabel: PropTypes.func,
  setChartDescription: PropTypes.func,
  setChartDescriptionFor: PropTypes.func,
};
