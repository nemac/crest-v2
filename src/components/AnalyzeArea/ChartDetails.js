/*
Purpose
  Shows all the detailed charts when the user does analyze project site.
  and also clicks more.

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
import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import FileSaver from 'file-saver';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import html2canvas from 'html2canvas';

import ChartDetailsActionButtons from './ChartDetailsActionButtons';
import ChartSummary from './ChartSummary';

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
    borderBottom: '0px !important',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ChartDetailsButton: {
    display: 'flex',
    width: '100%'
  }
}));

export default function ChartDetails(props) {
  const classes = useStyles();

  const {
    areaName,
    areaIndex,
    region,
    zonalStatsData,
    map
  } = props;

  const handleDownload = useCallback(async (chartType) => {
    const elId = `${chartType}-container`;
    await html2canvas(document.getElementById(elId), {
      logging: false,
      backgroundColor: null,
      useCORS: true, // Enable CORS to avoid cross-origin issues
      allowTaint: true, // Allow images from other domains
      useUnsafeCSS: true // Allow unsafe CSS (if needed)
    }).then((canvas) => {
      const png = canvas.toDataURL('image/png', 1.0);
      const fileName = `${chartType}.png`;
      FileSaver.saveAs(png, fileName);
    });
  }, []);

  const chartValues = useRef({
    'Summary Chart': ['hubs', 'exposure', 'threat', 'asset', 'wildlife'],
    'Fish and Wildlife Inputs': ['aquatic', 'terrestrial', 'marine'],
    'Threats Inputs': [
      'floodprone_areas', 'slope', 'sea_level_rise', 'low_areas', 'drainage', 'impermeable',
      'storm_surge', 'erosion', 'tsunami', 'permafrost', 'wave_flooding', 'geostress'],
    'Community Assets Inputs': [
      'pop_density', 'crit_infra', 'transportation',
      'social_vuln', 'crit_facilities'],
    Landcover: []
  });

  return (
    <div>
      <Box className={classes.contentBox} >
        <ChartSummary
          areaName={areaName}
          areaIndex={areaIndex}
          chartRegion={region}
          zonalStatsData={zonalStatsData}
          chartType={'Summary Chart'}
          chartIndices={chartValues.current['Summary Chart']}
          map={map}
        />
      </Box>
      <ChartDetailsActionButtons
        chartType={'Summary Chart'}
        handleDownload={handleDownload}
      />

      <Box className={classes.contentBox} >
        <ChartSummary
          areaName={areaName}
          areaIndex={areaIndex}
          chartRegion={region}
          zonalStatsData={zonalStatsData}
          chartIndices={chartValues.current['Fish and Wildlife Inputs']}
          chartType={'Fish and Wildlife Inputs'}
          map={map}

        />
      </Box>
      <ChartDetailsActionButtons
        chartType={'Fish and Wildlife Inputs'}
        handleDownload={handleDownload}
      />

      <Box className={classes.contentBox} >
        <ChartSummary
          areaName={areaName}
          areaIndex={areaIndex}
          chartRegion={region}
          zonalStatsData={zonalStatsData}
          chartIndices={chartValues.current['Threats Inputs']}
          chartType={'Threats Inputs'}
          map={map}

        />
      </Box>
      <ChartDetailsActionButtons
        chartType={'Threats Inputs'}
        handleDownload={handleDownload}
      />

      <Box className={classes.contentBox} >
        <ChartSummary
          areaName={areaName}
          areaIndex={areaIndex}
          chartRegion={region}
          zonalStatsData={zonalStatsData}
          chartIndices={chartValues.current['Community Assets Inputs']}
          chartType={'Community Assets Inputs'}
          map={map}
        />
      </Box>
      <ChartDetailsActionButtons
        chartType={'Community Assets Inputs'}
        handleDownload={handleDownload}
      />

      <Box className={classes.contentBox} >
        Landcover Chart {areaName}
      </Box>
      <ChartDetailsActionButtons
        chartType={'Landcover'}
        handleDownload={handleDownload}
      />
    </div>
  );
}

ChartDetails.propTypes = {
  areaName: PropTypes.string.isRequired,
  areaIndex: PropTypes.number.isRequired,
  region: PropTypes.string.isRequired,
  zonalStatsData: PropTypes.object.isRequired,
  map: PropTypes.object
};
