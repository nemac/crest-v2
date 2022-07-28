/*
Purpose
  Any time the user arives at analze project sites or where should I do..
  there will be empty state meaning they will need to do an action to see a chart.
  They will need to either draw an area, upload an area, or choose/search for watershed or county

  Child Components
  -  None

Libs
  - Not sure yet

API
  - Not sure yet

State needed
  - More or less?

Props
  - Not sure yet
*/
import React from 'react';
import { useDispatch } from 'react-redux';

import BarChartIcon from '@mui/icons-material/BarChart';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

import { changeEmptyState } from '../../reducers/analyzeAreaSlice';
import ChartActionButton from './ChartActionButton';

const useStyles = makeStyles((theme) => ({
  CardBackground: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.CRESTGridBackground.dark,
    color: theme.palette.CRESTGridBackground.contrastText,
    borderColor: theme.palette.CRESTBorderColor.main,
    borderStyle: 'solid',
    borderWidth: '1px',
    height: '100%'
  },
  tempButtonBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.CRESTBlack.dark
  },
  EmptyStateBodyText: {
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: '0.9rem'
    }
  }
}));

// just a place holder needs props passed in and image etc
export default function EmptyState(props) {
  const classes = useStyles();

  const dispatch = useDispatch();

  // to do this will also need to clear all the save results
  // from the store (from add areas) when its completed
  const handleClick = (event) => {
    event.stopPropagation();
    dispatch(changeEmptyState());
  };

  return (
    <Box variant="outlined" square={false} className={classes.CardBackground} >
      <Typography variant="h6" gutterBottom>
        To get started
      </Typography>
      <Typography variant="body1" className={classes.EmptyStateBodyText} gutterBottom>
        If you are interested in getting detailed statistics about a specfic place or a potential
        project site, you must add an area. This requires you to sketch an area on the map, upload
        a shapefile, or search for county or watershed.
      </Typography>
      <Typography variant="body1" className={classes.EmptyStateBodyText} gutterBottom>
        The results will allow you to examine and compare your project site(s) by proximity to
        Resilience Hubs and explore and compare the Community Exposure and Fish and Wildlife
        Indices in the surrounding area.
      </Typography>

      {/* temporary button for chaning state to not empty */}
      <Grid container spacing={0} p={0} mt={0} mb={0} className={classes.tempButtonBox}>

        <Grid item xs={12}>
          <ChartActionButton
            buttonLabel={'View Chart UI'}
            buttonName={'View Chart UI'}
            onClick={handleClick}>
            <BarChartIcon />
          </ChartActionButton>
        </Grid>

      </Grid>
      {/* temporary button for chaning state to not empty */}

    </Box>
  );
}
