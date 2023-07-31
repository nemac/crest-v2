import React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { StyledGrid } from '../All/StyledComponents';
import { mapConfig } from '../../configuration/config';

const regions = mapConfig.regions;

export const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.CRESTBlack.dark,
  borderBottomColor: theme.palette.CRESTLight.main,
  borderBottomStyle: 'solid',
  borderBottomWidth: '2px',
  paddingBottom: theme.spacing(2)
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.CRESTDarkAlt.main
  },
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.CRESTGridBackground.dark
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

export default function TableData(props) {
  const { data } = props;

  const getLabel = (region, name) => {
    const thisLabel = regions[region].layerList.find(
      ((layer) => layer.chartCSSSelector === name)
    ).label;
    return thisLabel;
  };
  const getRange = (region, name) => {
    const selectedColorChart = regions[region].layerList.find(
      ((layer) => layer.chartCSSSelector === name)
    ).chartCSSColor;
    const allValues = Object.keys(selectedColorChart);
    const thisRange = `${allValues[0]}-${allValues[allValues.length - 1]}`;
    return thisRange;
  };

  return (
    <StyledGrid container
      spacing={0}
      justifyContent="center"
      alignItems="center"
      px={0}
      pb={4}
      sx={{ padding: (theme) => theme.spacing(2) }}
    >
      <Grid xs={12} >
        <TableContainer component={Paper}>
          <Table sx={{ width: '100%' }} aria-label="customized table">
            <StyledTableHead>
              <TableRow>
                <TableCell align="left">Area&nbsp;Name</TableCell>
                <TableCell align="left">Index</TableCell>
                <TableCell align="left">Value</TableCell>
                <TableCell align="left">Range</TableCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {Object.entries(data.properties.zonalStatsData).map(([key, value]) => (
                <StyledTableRow key={`${data.properties.areaName}-${key}`}>
                  <TableCell align="left">{data.properties.areaName}</TableCell>
                  <TableCell align="left">{getLabel(data.properties.region, key)}</TableCell>
                  <TableCell align="left">{Number.isNaN(Number(value)) ? '0.0' : value.toFixed(3)}</TableCell>
                  <TableCell align="left">{getRange(data.properties.region, key)}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </StyledGrid>
  );
}

TableData.propTypes = {
  data: PropTypes.object.isRequired
};
