/*
Purpose
  The component holds all of the chart and action buttons. This should be the summary chart only.

  There are four buttons which include
    - Sort (sorts data from high to low or low to high. sort will display a menu to choose
      sort order and sort field)
    - Export All (exports all the maps to png/svg (if in graph mode) or the data to
      CSV (if in table mode). will display a menu for the user to pick which format)
    - Graph/table (toggles graph or table mode)
    - Remove All (Removes all areas from map and anaylsis results area)

    We need to decide if the button action happens here?

Child Components
  - AnalyzeArea-ChartHeaderActionButtons.js
  - AnalyzeArea-Chart.js

Libs
  - Not sure yet

API
  - Not sure yet

State needed
  - More or less?
  - Graph or table mode
  - Sort field
  - Sort direction
  - Not sure yet

Props
  - Not sure yet
*/
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { styled } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import ChartHeaderActionButton from './ChartHeaderActionButton';

const StyledGridContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  height: theme.spacing(14),
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  borderColor: theme.palette.CRESTBorderColor.main,
  borderStyle: 'solid',
  borderWidth: '1px'
}));

// selector named functions for lint rules makes it easier to re-use if needed.
const AnalyzeAreaSelector = (state) => state.AnalyzeArea;

export default function ChartHeaderActionButtonsHolder(props) {
  const {
    title,
    actionButtons
  } = props;

  // get the redux state for analyze area
  const analyzeAreaState = useSelector(AnalyzeAreaSelector);

  return (
    <StyledGridContainer container spacing={0} p={0} mt={1} mb={1}>
      <Grid xs={12} >
        <Typography variant="body1" component="div" justifyContent="center" alignItems="center" p={1} sx={{ display: 'flex' }} >
          {title}
        </Typography>
      </Grid>
      {actionButtons?.map((actionButton) => (
        <Grid xs={3} key={actionButton.buttonName}>
          <ChartHeaderActionButton
            buttonLabel={actionButton.buttonLabel}
            buttonName={actionButton.buttonName}
            onClick={actionButton.onClick}>
            {actionButton.icon}
          </ChartHeaderActionButton>
        </Grid>
      ))}
    </StyledGridContainer>
  );
}

ChartHeaderActionButtonsHolder.propTypes = {
  title: PropTypes.string,
  actionButtons: PropTypes.array,
};
