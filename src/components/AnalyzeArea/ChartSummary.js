import React, {
  useEffect,
  useRef,
  useCallback,
  useState
} from 'react';
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

import { useSelector } from 'react-redux';
import * as L from 'leaflet';
import buffer from '@turf/buffer';

import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { mapConfig } from '../../configuration/config';

import ChartCustomLabels from './ChartCustomLabels';

const regions = mapConfig.regions;

const drawnLayersSelector = (state) => state.mapProperties.drawnLayers;

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

const chartDataTemplate = {
  name: '',
  value: null,
  chartValue: null,
  tickLabel: ''
};

export default function ChartSummary(props) {
  const [barColors, setBarColors] = useState([]);
  const {
    areaName,
    zonalStatsData,
    chartRegion,
    chartIndices,
    chartType,
    map,
    layerToHighlight,
    bufferLayerToHighlight
  } = props;

  const drawnLayersFromState = useSelector(drawnLayersSelector);
  const region = regions[chartRegion];
  const [chartData, setChartData] = useState([]);

  const dataToPlot = useRef(true);
  const thisMap = useRef(map);
  const chartLabel = `${chartType} ${areaName}`;
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

  const handleGetZonalStatsData = useCallback((data) => {
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
      const normValue = value / maxValue;
      const retData = [selectedColor, normValue, selectedChartLabel];
      return retData;
    };

    const tempColors = []; // Stores colors for data bars plotted
    const tempData = []; // Stores data to be plotted
    // This is the logic to build the chart for Summary charts
    // Currently this is going to pull all data across all regions... need to simplify
    // An error occurs when trying to cross-reference the wrong data/region combo
    chartIndices.forEach((element) => {
      if (data[element] === undefined) { return; }
      const value = data[element];
      const layerData = getData(element, value);
      const barColor = layerData[0];
      const chartValue = layerData[1];
      const tickLabel = layerData[2];

      tempData.push({
        name: element, value, chartValue, tickLabel
      });
      tempColors.push(barColor);
    });
    if (tempData.length === 0) {
      dataToPlot.current = false;
    }
    // Match colors to data
    // tempData.map(({ name, value }) => tempColors.push(getColor(name, value)));
    setChartData(tempData);
    setBarColors(tempColors);
  }, [layerList, chartIndices]);

  useEffect(() => {
    handleGetZonalStatsData(zonalStatsData);
  }, [zonalStatsData, handleGetZonalStatsData]);

  const handleMouseEnter = () => {
    const areaHighlightStyle = {
      color: '#dda006',
      weight: 2,
      opacity: 1
    };
    const bufferHighlightStyle = {
      color: '#ffc107',
      weight: 2,
      opacity: 1
    };

    drawnLayersFromState.features.forEach((feature) => {
      const id = feature.properties.leafletId;
      const bufferLayerId = feature.properties.bufferLayerId;
      if (feature.properties.areaName === areaName) {
        if (bufferLayerToHighlight !== undefined) {
          bufferLayerToHighlight.setStyle(bufferHighlightStyle);
        } else {
          layerToHighlight.setStyle(areaHighlightStyle);
        }
      }
    });
  };
  const handleMouseLeave = () => {
    const areaStyle = {
      color: '#4992f9',
      weight: 2,
      opacity: 1
    };
    const bufferStyle = {
      color: '#99c3ff',
      weight: 2,
      opacity: 1
    };

    drawnLayersFromState.features.forEach((feature) => {
      const id = feature.properties.leafletId;
      const bufferLayerId = feature.properties.bufferLayerId;
      if (feature.properties.areaName === areaName) {
        if (bufferLayerToHighlight !== undefined) {
          bufferLayerToHighlight.setStyle(bufferStyle);
        }
        layerToHighlight.setStyle(areaStyle);
      }
    });
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

        <XAxis dataKey="tickLabel" tick={<ChartCustomLabels />} style={{ fontFamily: 'Roboto, sans-serif', fontSize: '10rem', lineHeight: '2rem' }} interval={0} />
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
  areaName: PropTypes.string.isRequired,
  zonalStatsData: PropTypes.object,
  chartRegion: PropTypes.string.isRequired,
  chartIndices: PropTypes.array.isRequired,
  chartType: PropTypes.string,
  map: PropTypes.object
};
