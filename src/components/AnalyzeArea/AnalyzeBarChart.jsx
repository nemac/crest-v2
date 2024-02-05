import React from 'react';
import PropTypes from 'prop-types';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';

import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { mapConfig } from '../../configuration/config';

import ChartCustomLabels from './ChartCustomLabels.jsx';

const regions = mapConfig.regions;

const ToolTipBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  borderRadius: '4px',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.CRESTLight.main,
  borderColor: theme.palette.CRESTLightBorderColor.main,
  color: theme.palette.CRESTLight.contrastText,
  borderStyle: 'solid',
  borderWidth: '1px',
  justifyContent: 'center',
  alignItems: 'center'
}));

export default function AnalyzeBarChart(props) {
  const {
    chartRegion,
    chartIndices,
    chartType,
    areaName,
    feature,
    zonalStatsData,
    barchartMargin
  } = props;

  const region = regions[chartRegion];

  const chartLabel = feature?.properties?.areaName ?
    `${chartType} - ${feature?.properties?.areaName}` :
    '';
  const layerList = region.layerList;

  const formatYAxis = (value) => {
    switch (value) {
      case 1:
        return 'High';
      case 0:
        return 'Low';
      default:
        return '';
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (
      active &&
      payload &&
      payload.length &&
      Number.isFinite(payload[0].value) &&
      zonalStatsData
    ) {
      return (
        <ToolTipBox>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Typography
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              variant="body2"
              component="div"
            >
              {label}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Typography
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              variant="h4"
              component="h2"
            >
              {`${parseFloat(payload[0].payload.value).toFixed(2)}`}
            </Typography>
          </Box>
        </ToolTipBox>
      );
    }
    return null;
  };

  CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.array,
    label: PropTypes.any
  };

  // Bar Color is functional based on value comparison with config
  const getData = (name, value) => {
    const colorValue = Math.round(value);
    const selectedLayerData = layerList.find(
      (layer) => layer.chartCSSSelector === name
    );
    const selectedChartLabel = selectedLayerData.chartLabel;
    const selectedColorChart = selectedLayerData.chartCSSColor;
    const selectedColor = selectedColorChart[colorValue];
    const allValues = Object.keys(selectedColorChart);
    const maxValue = allValues[allValues.length - 1];
    const chartValue = value / maxValue;
    const retData = { selectedColor, chartValue, selectedChartLabel };
    return retData;
  };

  const barColors = []; // Stores colors for data bars plotted
  // this order needs to always match chartData
  const chartData = []; // Stores data to be plotted
  // this needs to be sorted by value

  if (zonalStatsData) {
    let skippedValues = 0;
    chartIndices.forEach((element, i) => {
      const value = zonalStatsData[element];
      if (value === undefined) {
        skippedValues += 1;
        return;
      }
      const index = i - skippedValues;
      const layerData = getData(element, value);
      const { selectedColor, chartValue, selectedChartLabel, areaName, chartType } = layerData;
      chartData.push({
        name: element,
        value,
        chartValue,
        selectedChartLabel,
        chartType,
        index
      });
      barColors.push(selectedColor);
    });
  }

  // This code may come in handy at some point to sort the actual indices of each chart
  // const sortedChartData = [...chartData];
  // sortedChartData.sort((a, b) => a.chartValue - b.chartValue);
  // const thisChartData = analyzeAreaState.chartSortASC ? sortedChartData : chartData;

  return (
    <ResponsiveContainer
      id={`${chartType}-container`}
      sx={{
        padding: '20px',
        width: '100%',
        height: '100%'
      }}
    >
      <BarChart
        id={`${chartType}-barchart`}
        data={chartData}
        // data={thisChartData} // Goes with sorting chart code
        sx={{
          width: '100%',
          height: '100%'
        }}
        margin={barchartMargin}
      >
        <text
          x="50%"
          y="10%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          <tspan
            x="50%"
            style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
              {areaName}
          </tspan>

          <tspan
            x="50%"
            dy={'25px'}
            style={{ fontSize: '1rem' }}>
              {chartType}
          </tspan>
        </text>

        <XAxis
          dataKey="selectedChartLabel"
          tick={<ChartCustomLabels />}
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: '10rem',
            lineHeight: '2rem'
          }}
          interval={0}
        />
        <YAxis
          domain={[0, 1]}
          tickFormatter={formatYAxis}
          style={{ fontFamily: 'Roboto, sans-serif', fontSize: '0.75rem' }}
          interval={0}
        />

        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="chartValue">
          {chartData.map((entry) => (
            <Cell key={`cell-${entry.index}`} fill={barColors[entry.index]} />
          ))}
          {/*
          {thisChartData.map((entry) => ( // Also for sorting chart by indices
            <Cell key={`cell-${entry.index}`} fill={barColors[entry.index]} />
          ))} */}
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
  feature: PropTypes.object,
  zonalStatsData: PropTypes.object,
  barchartMargin: PropTypes.object
};
