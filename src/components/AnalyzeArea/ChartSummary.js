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

import ChartCustomLabels from './ChartCustomLabels';

const regions = mapConfig.regions;

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '340px',
  maxHeight: '340px',
  [theme.breakpoints.down('sm')]: {
    height: '300px',
    maxHeight: '300px'
  },
  padding: theme.spacing(0),
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  borderColor: theme.palette.CRESTBorderColor.main,
  borderStyle: 'solid',
  borderWidth: '1px',
  justifyContent: 'center',
  alignItems: 'center'
}));

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

export default function ChartSummary(props) {
  const {
    chartRegion,
    chartIndices,
    chartType,
    setHover,
    feature
  } = props;

  const region = regions[chartRegion];

  const chartLabel = `${chartType} ${feature.properties.areaName}`;
  const layerList = region.layerList;
  const zonalStatsData = feature.properties.zonalStatsData;

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
    // eslint-disable-next-line max-len
    if (active && payload && payload.length && Number.isFinite(payload[0].value) && zonalStatsData) {
      return (
        <ToolTipBox >
          <Box sx={{
            display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center'
          }} >
            <Typography sx={{
              display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center'
            }} variant="body2" component="div">{label}</Typography>
          </Box>
          <Box sx={{
            display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center'
          }} >
            <Typography sx={{
              display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center'
            }} variant="h4" component="h2">{`${payload[0].payload.value.toFixed(2)}`}</Typography>
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
      ((layer) => layer.chartCSSSelector === name)
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
  const chartData = []; // Stores data to be plotted

  if (zonalStatsData) {
    chartIndices.forEach((element) => {
      const value = zonalStatsData[element];
      const layerData = getData(element, value);
      const { selectedColor, chartValue, selectedChartLabel } = layerData;
      // const barColor = layerData[0];
      // const chartValue = layerData[1];
      // const tickLabel = layerData[2];
      chartData.push({
        name: element, value, chartValue, selectedChartLabel
      });
      barColors.push(selectedColor);
    });
  }

  const handleMouseEnter = () => {
    if (feature.properties.buffGeo) {
      setHover({ bufferAreaName: feature.properties.areaName });
    } else {
      setHover({ areaName: feature.properties.areaName });
    }
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const thisChart = (
    <ResponsiveContainer
    id ={`${chartType}-container`}
      sx={{
        padding: '20px',
        width: '100%',
        height: '100%'
      }}>
      <BarChart
        id={`${chartType}-barchart`}
        data={chartData}
        sx={{
          width: '100%',
          height: '100%'
        }}
        margin={{
          top: 90,
          right: 30,
          left: 0,
          bottom: 30
        }}>

        <text x={400 / 2} y={'10%'} fill="white" textAnchor="middle" dominantBaseline="central" style={{ fontFamily: 'Roboto, sans-serif' }} >
          <tspan style={{ fontSize: '1.25rem' }}>{chartLabel}</tspan>
        </text>

        <XAxis dataKey="selectedChartLabel" tick={<ChartCustomLabels />} style={{ fontFamily: 'Roboto, sans-serif', fontSize: '10rem', lineHeight: '2rem' }} interval={0} />
        <YAxis domain={[0, 1]} tickFormatter={formatYAxis} style={{ fontFamily: 'Roboto, sans-serif', fontSize: '0.75rem' }} interval={0} />

        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey='chartValue' >
          {
            chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={barColors[index]} />
            ))
          }
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
  return (
    <ContentBox
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      components='fieldset'
      id={`${chartType}-chartbox`}
    >
      {thisChart}
    </ContentBox>
  );
}

ChartSummary.propTypes = {
  chartRegion: PropTypes.string.isRequired,
  chartIndices: PropTypes.array.isRequired,
  chartType: PropTypes.string,
  feature: PropTypes.object,
  setHover: PropTypes.func
};
