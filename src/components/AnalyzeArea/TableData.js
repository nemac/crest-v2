/*
Purpose
  Shows table when the user does analyze project site and choses to show the table

Child Components
  - None

Libs
  - Not sure yet

API
  - Not sure yet

State needed
  - table or graph
  - Not sure yet

Props
  - GEOJSON data (to get properies aka attributes)
  - Not sure yet
*/
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

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
const selectedRegionSelector = (state) => state.selectedRegion.value;

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
  console.log(data);
  const selectedRegion = useSelector(selectedRegionSelector);

  const getLabel = (area, name) => {
    const thisLabel = regions[area.region].layerList.find(
      ((layer) => layer.chartCSSSelector === name)
    ).label;
    return thisLabel;
  };
  const getRange = (area, name) => {
    const selectedColorChart = regions[area.region].layerList.find(
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
              {data.map((row) => {
                if (row.region === selectedRegion) {
                  return (Object.entries(row.zonalStatsData).map(([ind, val]) => (
                    <React.Fragment key={row.areaName + ind}>
                      <StyledTableRow key={`${row.areaName}-${row.name}`}>
                        <TableCell align="left">{row.areaName}</TableCell>
                        <TableCell align="left">{getLabel(row, ind)}</TableCell>
                        <TableCell align="left">{Number.isNaN(Number(val)) ? '0.0' : val.toFixed(3)}</TableCell>
                        <TableCell align="left">{getRange(row, ind)}</TableCell>
                      </StyledTableRow>
                    </React.Fragment>)));
                }
                return null;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </StyledGrid>
  );
}

TableData.propTypes = {
  data: PropTypes.array.isRequired
};
