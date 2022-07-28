import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  legendHolder: {
    transition: 'all 0.75s ease',
    willChange: 'transform',
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  low: {
    fontSize: '1rem',
    display: 'flex',
    justifyContent: 'start'
  },
  high: {
    fontSize: '1rem',
    display: 'flex',
    justifyContent: 'end'
  },
  legend: {
    height: '48px'
  },
  legendBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000000'
  },
  legendIsNotRreal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 600
  }
}));

export default function LayerLegend(props) {
  const { layer } = props;
  const classes = useStyles();
  const colorChart = layer.chartCSSColor;
  const chartIndices = Object.keys(colorChart);
  const maxLegendWidth = 12;

  return (
    <Box m={1.5}>
      <Grid container spacing={0}>
        <Grid item xs={2} className={classes.low}>
          Low
        </Grid>
        <Grid item xs={8} className={classes.legendIsNotRreal}>

        </Grid>
        <Grid item xs={2} className={classes.high}>
          High
        </Grid>
        <Grid item xs={12} className={classes.legendHolder}>

          {/* this is where the code generated legend goes this
            is just a example of what will be here */}

            <Grid container spacing={0} m={0} p={0} className={classes.legend}>
              {chartIndices.map((index) => <Grid item xs={maxLegendWidth / chartIndices.length}
              key={layer.id.concat('-', index)} sx={{ backgroundColor: colorChart[index] }}
              className={classes.legendBox}>{index}</Grid>)}

            </Grid>
          </Grid>
        </Grid>
      </Box>
  );
}

LayerLegend.propTypes = {
  layer: PropTypes.object.isRequired
};
