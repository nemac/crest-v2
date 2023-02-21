/*
Purpose
  Shows chart when the user does analyze project site. Type of chart

  - format data for the chart from Zonal stats API JSON / GEOJSON
  - handle all the charts
    - details, inputs, and summary chart

Child Components
  - AnalyzeArea-ChartActionButtons.js

Libs
  - chart.js
  - Not sure yet

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
import { useSelector } from 'react-redux';

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
  const { areaName, areaIndex, zonalStatsData} = props;
  const [chartData, setChartData] = useState([]);
  const summaryCharts = useRef(['hubs', 'exposure', 'threat', 'asset', 'wildlife']);
  const chartLabel = `Summary Chart ${areaName}`;
  const regionSelector = (state) => state.selectedRegion.value;
  const selectedRegion = useSelector(regionSelector);
  const region = regions[selectedRegion];
  const layerList = region.layerList;

  const divStyle = {
    color: 'black',
    backgroundColor: 'white',
    padding: '5px 0',
    borderRadius: '6px'
  };

  const getLabel = (name) => layerList.find(
    ((layer) => layer.chartCSSSelector === name)
  ).label;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length && Number.isFinite(payload[0].value) && zonalStatsData) {
      return (
        <div className="custom-tooltip" style={divStyle}>
          <p className="label">{getLabel(label)}</p>
          <h4 className="desc">{`${payload[0].value.toFixed(2)}`}</h4>
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
    const getColor = (name, value) => {
      const colorValue = Math.round(value);
      const selectedColor = layerList.find(
        ((layer) => layer.chartCSSSelector === name)
      ).chartCSSColor[colorValue];
      return selectedColor;
    };

    const tempColors = [];
    const tempData = [];
    Object.entries(data).forEach(([key, value]) => {
      if (summaryCharts.current.includes(key) && !value.isNaN) {
        tempData.push({ name: key, value });
      }
    });
    tempData.map(({ name, value }) => tempColors.push(getColor(name, value)));
    setChartData(tempData);
    setBarColors(tempColors);
  }, [layerList]);

  useEffect(() => {
    console.log('useEffect triggered!');
    handleGetZonalStatsData(zonalStatsData);
  }, [zonalStatsData, handleGetZonalStatsData]);

  return (
    <Box className={classes.contentBox} components='fieldset'>
      <ResponsiveContainer width="100%" height="40%">
        <BarChart data={chartData}
          width={500}
          height={300}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}>
          <XAxis dataKey="name" tick={{ fill: 'white' }} style={{ fontSize: '12px' }} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey='value' >
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

ChartSummary.propTypes = {
  areaName: PropTypes.string.isRequired,
  areaIndex: PropTypes.number.isRequired,
  zonalStatsData: PropTypes.object
};
