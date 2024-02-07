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

import {
  CameraAlt,
  DeleteForever,
  SortOutlined,
  // ToggleOff, keeping incase we go back to this
  // ToggleOn, keeping incase we go back to this
  TableChart,
  BarChart
} from '@mui/icons-material';

import ChartHeaderActionButton from './ChartHeaderActionButton.jsx';

const StyledGridContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  height: theme.spacing(14),
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  borderColor: theme.palette.CRESTBorderColor.main,
  borderStyle: 'solid',
  borderWidth: '1px'
}));

// selector named functions for lint rules makes it easier to re-use if needed.
const analyzeAreaSelector = (state) => state.analyzeArea;

export default function ChartHeaderActionButtons(props) {
  const {
    handleSortClick,
    handleGraphOrTableClick,
    HandleRemoveAllClick,
    handleExportClick
  } = props;

  // get the redux state for analyze area
  const analyzeAreaState = useSelector(analyzeAreaSelector);

  return (
    <StyledGridContainer container spacing={0} p={0} mt={1} mb={1}>

      <Grid xs={12} >
        <Typography variant="body1" component="div" justifyContent="center" alignItems="center" p={1} sx={{ display: 'flex' }} >
          Analyzed project sites
        </Typography>
        {/* <Divider sx={{ marginLeft: '6px', marginRight: '6px' }} /> */}
      </Grid>
      <Grid xs={3} >
        <ChartHeaderActionButton
          buttonLabel={'Sort'}
          buttonName={'Sort'}
          onClick={handleSortClick}>
          {analyzeAreaState.isSortASC[analyzeAreaState.sortBy] ? (<SortOutlined />) : (<SortOutlined sx={{ transform: 'rotate(-180deg)' }} />)}
        </ChartHeaderActionButton>
      </Grid>
      <Grid xs={3}>
        <ChartHeaderActionButton
          buttonLabel={'Export'}
          buttonName={'Export'}
          onClick={handleExportClick}>
          <CameraAlt />
        </ChartHeaderActionButton>
      </Grid>
      <Grid xs={3}>
        <ChartHeaderActionButton
          buttonLabel={analyzeAreaState.isItAGraph ? 'Table' : 'Chart'}
          buttonName={analyzeAreaState.isItAGraph ? 'Table' : 'Chart'}
          onClick={handleGraphOrTableClick}>
          {analyzeAreaState.isItAGraph ? (<TableChart />) : (<BarChart />)}
        </ChartHeaderActionButton>
      </Grid>
      <Grid xs={3}>
        <ChartHeaderActionButton
          buttonLabel={'Remove All'}
          buttonName={'Remove All'}
          onClick={HandleRemoveAllClick}>
          <DeleteForever />
        </ChartHeaderActionButton>
      </Grid>
    </StyledGridContainer>
  );
}

ChartHeaderActionButtons.propTypes = {
  handleSortClick: PropTypes.func.isRequired,
  handleGraphOrTableClick: PropTypes.func.isRequired,
  handleExportClick: PropTypes.func.isRequired,
  HandleRemoveAllClick: PropTypes.func.isRequired
};
