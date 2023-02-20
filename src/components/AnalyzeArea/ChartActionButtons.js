/*
Purpose
  The component holds all the action buttons for each chart/area. Each chart are the zonal
  set of statistics for an Area the user-designated on the map.

  The button is one of the following:
   - more/less (more provides all the detailed charts, less and the default is the summary map)
   - export (the map to png/svg)
   - zoom (zoom/pan the map to the area)
   - Remove Area (removes the area from the map)

   Do we need to decide of the button action happens here?

Child Components
- AnalyzeArea-ChartActionButton.js

Libs
  - Not sure yet

API
  - Not sure yets

State needed
  - More or less?

Props
  - Not sure yet
*/
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

import {
  CameraAlt,
  DeleteForever,
  MoreHorizOutlined,
  CenterFocusStrong
} from '@mui/icons-material';

import { changeMore } from '../../reducers/analyzeAreaSlice';
import { removeFeatureFromAnalyzedAreas } from '../../reducers/mapPropertiesSlice';
import ChartActionButton from './ChartActionButton';

const useStyles = makeStyles((theme) => ({
  contentBox: {
    height: theme.spacing(8),
    maxHeight: theme.spacing(8),
    backgroundColor: theme.palette.CRESTGridBackground.dark,
    borderColor: theme.palette.CRESTBorderColor.main,
    borderStyle: 'solid',
    borderWidth: '1px'
  }
}));

// selector named functions for lint rules makes it easier to re-use if needed.
const AnalyzeAreaSelector = (state) => state.AnalyzeArea;
// Analyzed Areas Selector is a list of features stored in state that zonal stats has analyzed
const AnalyzedAreasSelector = (state) => state.mapProperties.analyzedAreas;

export default function ChartActionButtons(props) {
  const { areaName, leafletDrawFeatureGroupRef, chartRemoveButtonId } = props;
  const [removeIds, setRemoveIds] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const analyzeAreaState = useSelector(AnalyzeAreaSelector);
  const analyzedAreasState = useSelector(AnalyzedAreasSelector);

  useEffect(() => {
    if (!removeIds) {
      setRemoveIds(chartRemoveButtonId);
    }
  }, [chartRemoveButtonId, removeIds]);

  // handle state change more charts or more details charts
  const handleMoreOnClick = () => {
    dispatch(changeMore(areaName));
  };

  // place holder for later wanted to add a click handler for graph or Table
  // TODO add exportOnClick, zoomOnClick, removeOnClick
  // TODO removeOnClick will also have to remove redux state for more/less
  // TODO this will also need to clear all the save results
  //      from the store (from add areas) when its completed
  const handleGenericClick = (event) => {
    event.stopPropagation();
    console.log('clicked'); // eslint-disable-line no-console
  };

  const handleRemoveClick = (event) => {
    event.stopPropagation();
    const featureGroup = leafletDrawFeatureGroupRef.current;
    // chartRemoveButtonId is a list of ids to remove since a buffer and the drawn layer can exist
    removeIds.forEach((element) => {
      featureGroup.removeLayer(element.id);
    });
    // TODO JEFF YOU NEED TO REMOVE THIS FROM STATE/REDUX TOO
    analyzedAreasState.features.forEach((feature, index) => {
      console.log('all da features when clicking remove');
      console.log(feature);
      if (removeIds.includes(feature.properties.id)) {
        dispatch(removeFeatureFromAnalyzedAreas(index));
      }
    });
  };

  return (
    <Grid container spacing={0} justifyContent="center" alignItems="center" p={0} className={classes.contentBox}>
      <Grid item xs={3} >
        <ChartActionButton
          buttonLabel={analyzeAreaState.isMore[areaName] ? 'Less' : 'More'}
          buttonName={analyzeAreaState.isMore[areaName] ? 'Less' : 'More'}
          onClick={handleMoreOnClick}>
          <MoreHorizOutlined />
        </ChartActionButton>
      </Grid>
      <Grid item xs={3}>
        <ChartActionButton
          buttonLabel={'Export'}
          buttonName={'Export'}
          onClick={handleGenericClick}>
          <CameraAlt />
        </ChartActionButton>
      </Grid>
      <Grid item xs={3}>
        <ChartActionButton
          buttonLabel={'Zoom'}
          buttonName={'Zoom'}
          onClick={handleGenericClick}>
          <CenterFocusStrong />
        </ChartActionButton>
      </Grid>
      <Grid item xs={3}>
        <ChartActionButton
          buttonLabel={'Remove'}
          buttonName={'Remove'}
          onClick={handleRemoveClick}>
          <DeleteForever />
        </ChartActionButton>
      </Grid>
    </Grid>
  );
}

ChartActionButtons.propTypes = {
  areaName: PropTypes.string.isRequired,
  leafletDrawFeatureGroupRef: PropTypes.object,
  chartRemoveButtonId: PropTypes.array
};
