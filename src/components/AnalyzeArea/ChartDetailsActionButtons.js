/*
Purpose
  The component holds buttons for chart actions on each detailed chart for now its just export

Child Components
  - Not sure yet

Libs
  - Not sure yet

API
  - Not sure yet

State needed
  - Not sure yet

Props
  - Not sure yet
*/
import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

import { CameraAlt } from '@mui/icons-material';
import { useSelector } from 'react-redux';

import ChartActionButton from './ChartActionButton';
import { mapConfig } from '../../configuration/config';

const useStyles = makeStyles((theme) => ({
  contentBox: {
    display: 'flex',
    height: theme.spacing(8),
    backgroundColor: theme.palette.CRESTGridBackground.dark,
    borderColor: theme.palette.CRESTBorderColor.main,
    borderStyle: 'solid',
    borderWidth: '1px',
    borderTop: '0px !important',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    display: 'flex'
  }
}));

const regions = mapConfig.regions;
const selectedRegionSelector = (state) => state.selectedRegion.value;

export default function ChartDetailsActionButtons(props) {
  const {
    areaIndex, data, chartIndices, chartType, handleDownload
  } = props;
  const classes = useStyles();
  const selectedRegion = useSelector(selectedRegionSelector);

  const getLabel = (name) => {
    const thisLabel = regions[selectedRegion].layerList.find(
      ((layer) => layer.chartCSSSelector === name)
    ).label;
    return thisLabel;
  };
  const getRange = (name) => {
    const selectedColorChart = regions[selectedRegion].layerList.find(
      ((layer) => layer.chartCSSSelector === name)
    ).chartCSSColor;
    const allValues = Object.keys(selectedColorChart);
    const thisRange = `${allValues[0]}-${allValues[allValues.length - 1]}`;
    return thisRange;
  };
  const handleExportClick = (event) => {
    event.stopPropagation();
    // console.log(event);
    // console.log(chartIndices);
    // Parse out data by chartIndices
    // console.log(data);
    const dataRows = [];
    Object.entries(data).map(([index, value]) => {
      const thisRow = [];
      if (chartIndices.includes(index)) {
        thisRow.push(getLabel(index)); // need to get label here
        thisRow.push(Number.isNaN(Number(value)) ? '0.0' : value.toFixed(3)); // need to get value here
        thisRow.push(getRange(index)); // need to get range here
        dataRows.push(thisRow);
      }
      return thisRow;
    });

    const rows = [['Index', 'Values', 'Range(s)']];
    dataRows.map((row) => {
      rows.push(row);
      return rows;
    });
    // Get date and time, replace all special characters with '-'
    const dateString = new Date().toLocaleString().replace(/ |\/|,|:/g, '-');
    // concatenate type, area name, and date-time for filename
    const filename = `${chartType.replace(/ /g, '-')}-Area-${areaIndex + 1}-${dateString}.csv`;
    const csvData = rows.map((e) => e.join(',')).join('\n');
    const csvContent = `data:text/csv;charset=utf-8,${csvData}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link); // invisible link for download
    link.click(); // This will download the data file using invisible link
  };
  // place holder for later
  // const handleGenericClick = (event) => {
  //   event.stopPropagation();
  //   console.log('clicked'); // eslint-disable-line no-console
  // };

  return (
    <Grid container spacing={0} p={0} mt={0} mb={0} className={classes.contentBox}>
      <Grid item xs={4.5}>
      </Grid>
      <Grid item xs={3}>
        <ChartActionButton
          buttonLabel={'Export'}
          buttonName={'Export'}
          onClick={() => handleDownload(chartType)}>
          <CameraAlt />
        </ChartActionButton>
      </Grid>
      <Grid item xs={4.5}>
      </Grid>
    </Grid>
  );
}

ChartDetailsActionButtons.propTypes = {
  data: PropTypes.object.isRequired,
  areaIndex: PropTypes.number.isRequired,
  chartIndices: PropTypes.array.isRequired,
  chartType: PropTypes.string.isRequired,
  handleDownload: PropTypes.func
};
