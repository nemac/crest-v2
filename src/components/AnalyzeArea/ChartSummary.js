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
import React from 'react';
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
  const barColors = [];
  const { areaName } = props;
  const chartData = [];
  const summaryCharts = ['hubs', 'exposure', 'threat', 'asset', 'fishandwildlife'];
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

  const getColor = (name, mean) => {
    const colorValue = Math.round(mean);
    const selectedColor = layerList.find(
      ((layer) => layer.chartCSSSelector === name)
    ).chartCSSColor[colorValue];
    return selectedColor;
  };

  const getLabel = (name) => layerList.find(
    ((layer) => layer.chartCSSSelector === name)
  ).label;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
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
    label: PropTypes.string
  };

  const sampleResult = {
    type: 'FeatureCollection',
    name: 'test-ar',
    features: [{
      type: 'Feature',
      properties:
      {
        id: null,
        mean:
        {
          exposure: 9.268707482993197,
          asset: 4.447845804988662,
          threat: 5.087301587301587,
          fishandwildlife: 5.0,
          aquatic: 5.0,
          terrestrial: 3.0,
          hubs: 8.3,
          crit_infra: 0.1598639455782313,
          crit_facilities: 0.26077097505668934,
          pop_density: 1.2312925170068028,
          social_vuln: 1.7312925170068028,
          drainage: 2.568027210884354,
          erosion: 1.0,
          floodprone_areas: 0.35374149659863946,
          geostress: 0.0,
          sea_level_rise: 0.0,
          slope: 3.04421768707483,
          storm_surge: 2.7063492063492065
        }
      },
      geometry: { type: 'Polygon', coordinates: [[[-80.01149654388428, 32.887677980874706], [-80.01911401748657, 32.88337138447869], [-80.01553058624268, 32.87764094428261], [-80.00417947769165, 32.882578515468], [-80.01149654388428, 32.887677980874706]]] }
    }]
  };

  Object.entries(sampleResult.features[0].properties.mean).forEach(([key, value]) => {
    if (summaryCharts.includes(key)) {
      chartData.push({ name: key, mean: value });
    }
  });
  chartData.map(({ name, mean }) => barColors.push(getColor(name, mean)));

  return (
    <Box className={classes.contentBox} components='fieldset'>
      {/* <legend>{chartLabel}</legend> */}
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
