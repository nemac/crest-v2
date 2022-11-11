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
import React, { useEffect, useRef, useCallback, useState } from 'react';
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
  const { areaName } = props;
  const [chartData, setChartData] = useState([]);
  const summaryCharts = useRef(['hubs', 'exposure', 'threat', 'asset', 'fishandwildlife']);
  const chartLabel = `Summary Chart ${areaName}`;
  const regionSelector = (state) => state.selectedRegion.value;
  const selectedRegion = useSelector(regionSelector);
  const featureSelector = (state) => state.mapProperties.analyzedAreas;
  const selectedFeature = useSelector(featureSelector);
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
    if (active && payload && payload.length && selectedFeature && selectedFeature.length) {
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

  const handleGetFeatureData = useCallback((feature) => {
    const getColor = (name, mean) => {
      const colorValue = Math.round(mean);
      const selectedColor = layerList.find(
        ((layer) => layer.chartCSSSelector === name)
      ).chartCSSColor[colorValue];
      return selectedColor;
    };

    if (feature && feature.features[0]) {
      const tempColors = [];
      const tempData = [];
      Object.entries(feature.features[0].properties.mean).forEach(([key, value]) => {
        if (summaryCharts.current.includes(key)) {
          tempData.push({ name: key, mean: value });
        }
      });
      tempData.map(({ name, mean }) => tempColors.push(getColor(name, mean)));
      setChartData(tempData);
      setBarColors(tempColors);
    } else {
      setChartData([]);
      setBarColors([]);
    }
  }, [layerList]);

  useEffect(() => {
    console.log('useEffect triggered!');
    handleGetFeatureData(selectedFeature);
  }, [selectedFeature, handleGetFeatureData]);

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
          <XAxis dataKey="name" style={{ fontSize: '8px' }} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey='mean' >
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
  areaName: PropTypes.string.isRequired
};
