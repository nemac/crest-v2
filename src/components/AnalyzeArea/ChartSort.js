/*
We're constantly improving the code you see.
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton } from '@mui/material';
import { ArrowDropDownCircle, SortOutlined } from '@mui/icons-material';
import ActionButton from '../All/ActionButton';
// import './style.css';
import {
  changeSortDirection,
  changeSortBy
} from '../../reducers/analyzeAreaSlice';

const StyledGridContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  height: theme.spacing(20),
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  borderColor: theme.palette.CRESTBorderColor.main,
  borderStyle: 'solid',
  borderWidth: '1px'
}));

const analyzeAreaSelector = (state) => state.analyzeArea;

export const ChartSort = () => {
  const line = 'https://generation-sessions.s3.amazonaws.com/4f3040a399dc7d69bb97b9703d30cdc5/img/line-9-1.svg';
  const charts = {
    Hubs: 'hubs',
    Exposure: 'exposure',
    Threat: 'threat',
    Assets: 'asset',
    Wildlife: 'wildlife'
  };
  const dispatch = useDispatch();
  const analyzeAreaState = useSelector(analyzeAreaSelector);

  const handleSortClick = (chartName, index) => {
    dispatch(changeSortBy(chartName));
  };
  const handleAscendingClick = () => {
    dispatch(changeSortDirection());
  };

  return (
    <StyledGridContainer container spacing={0} p={0} mt={1} mb={1}>
        <Grid xs={12}>
          <div className={'div'}>Sort</div>
          <IconButton
            variant="contained"
            color="CRESTPrimary"
            aria-label="Minimize"
            onClick={handleAscendingClick}
            sx={{
              height: (theme) => theme.spacing(4.5),
              padding: (theme) => theme.spacing(0.375),
              justifyContent: 'end'
            }}
            size="large">
            <ArrowDropDownCircle sx={{ transform: analyzeAreaState.isSortASC ? 'rotate(-180deg)' : 'rotate(0deg)' }}/>
          </IconButton>
        </Grid>
        <Grid xs={12}>
        <img className={'line'} alt="Line" src={line} />
        </Grid>
      {Object.entries(charts).map(([chart, chartName], index) => (
        <Grid xs={2.3} key={`grid-${chart}`} sx={ { backgroundColor: (chartName === analyzeAreaState.sortBy) ? 'grey' : null } }>
          <ActionButton
            key={`sort-button-${index}`}
            buttonLabel={chart}
            buttonName={chart}
            onClick={(e) => handleSortClick(chartName, index, e.target)}
          >
            {analyzeAreaState.isSortASC ? (<SortOutlined />) : (<SortOutlined sx={{ transform: 'rotate(-180deg)' }} />)}
          </ActionButton>
        </Grid>
      ))}
    </StyledGridContainer>
  );
};

ChartSort.propTypes = {

};
