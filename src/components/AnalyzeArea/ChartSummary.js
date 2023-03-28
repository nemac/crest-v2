/*
Purpose
  Shows chart when the user does analyze project site. Type of chart

  - format data for the chart from Zonal stats API JSON / GEOJSON
  - handle all the charts
    - details, inputs, and summary chart

Child Components
  - AnalyzeArea-ChartActionButtons.js

Libs
  - recharts

API
  - Zonal stats API JSON / GEOJSON
  - Not sure yet

State needed
  - More or less?
  - table or graph
  - Not sure yet

Props
  - GEOJSON data (to get properies aka attributes)
  - if details add export button
  - Not sure yet
*/
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

import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { mapConfig } from '../../configuration/config';

import ChartCustomLabels from './ChartCustomLabels';

const regions = mapConfig.regions;

const useStyles = makeStyles((theme) => ({
  contentBox: {
    display: 'flex',
    width: '100%',
    height: '350px',
    maxHeight: '350px',
    padding: theme.spacing(0),
    backgroundColor: theme.palette.CRESTGridBackground.dark,
    borderColor: theme.palette.CRESTBorderColor.main,
    borderStyle: 'solid',
    borderWidth: '1px',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

export default function ChartSummary(props) {
  const classes = useStyles();
  const [barColors, setBarColors] = useState([]);
  const {
    areaName,
    zonalStatsData,
    chartRegion,
    chartIndices,
    chartType
  } = props;
  const region = regions[chartRegion];
  const [chartData, setChartData] = useState([]);

  const dataToPlot = useRef(true);
  const chartLabel = `${chartType} ${areaName}`;
  const layerList = region.layerList;

  const divStyle = {
    color: 'black',
    backgroundColor: 'white',
    padding: '5px 0',
    borderRadius: '6px'
  };

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
        <div className="custom-tooltip" style={divStyle}>
          <p className="label">{label}</p>
          <h4 className="desc">{`${payload[0].payload.value.toFixed(2)}`}</h4>
        </div>
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
    Object.entries(data).forEach(([key, value]) => {
      if (chartIndices.includes(key) && !value.isNaN && value > 0) {
        const layerData = getData(key, value);
        const barColor = layerData[0];
        const chartValue = layerData[1];
        const tickLabel = layerData[2];
        tempData.push({
          name: key, value, chartValue, tickLabel
        });
        tempColors.push(barColor);
      }
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

  if (dataToPlot.current) {
    return (
      <Box className={classes.contentBox} components='fieldset'>
        <ResponsiveContainer width="100%" height="40%">
          <BarChart data={chartData}
            width={500}
            height={300}
            margin={{
              top: 25,
              right: 30,
              left: 20,
              bottom: 5
            }}>
            <text x={400 / 2} y={10} fill="white" textAnchor="middle" dominantBaseline="central">
              <tspan fontSize="14">{chartLabel}</tspan>
            </text>

            <XAxis dataKey="tickLabel" tick={<ChartCustomLabels />} style={{ fontSize: '8px' }} interval={0} height={80} />
            <YAxis domain={[0, 1]} tickFormatter={formatYAxis} style={{ fontSize: '10px' }} interval={0}/>

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
      </Box>
    );
  }
  return <h3>{chartLabel} - No Data</h3>;
}

ChartSummary.propTypes = {
  areaName: PropTypes.string.isRequired,
  zonalStatsData: PropTypes.object,
  chartRegion: PropTypes.string.isRequired,
  chartIndices: PropTypes.array.isRequired,
  chartType: PropTypes.string
};
