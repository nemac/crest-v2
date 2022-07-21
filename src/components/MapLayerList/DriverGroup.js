import React from 'react';
import PropTypes from 'prop-types';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownCircle from '@mui/icons-material/ArrowDropDownCircle';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import Layer from './Layer';
import { toggleCollapsed } from '../../reducers/mapLayerListSlice';

const useStyles = makeStyles((theme) => ({
  drivers: {
    backgroundColor: theme.palette.CRESTDarkAlt.main,
    color: theme.palette.CRESTDarkAlt.contrastText,
    marginTop: theme.spacing(1),
    borderRadius: theme.spacing(0.5)
  },
  driverHeader: {
    height: '46px',
    minHeight: '46px',
    '& [class$="MuiAccordionSummary-content"]': {
      margin: theme.spacing(0.5)
    },
    '&:hover': {
      backgroundColor: '#6f6f6f',
      borderRadius: theme.spacing(0.5)
    }
  },
  subHeading: {
    fontWeight: '500',
    fontSize: '1rem',
    letterSpacing: '0.02857em'
  },
  darkDivder: {
    borderColor: '#FFFFFF'
  },
  driverAccordion: {
    paddong: theme.spacing(0)
  }
}));

export default function DriverGroup(props) {
  const { chartInputLabel, chartLayerList } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const expandedChartsSelector = (state) => state.mapLayerList.expandedCharts;
  const expandedCharts = useSelector(expandedChartsSelector);
  const isExpanded = expandedCharts.includes(chartInputLabel);

  const onClick = () => {
    dispatch(toggleCollapsed(chartInputLabel));
  };

  return (
    <Accordion
      expanded={isExpanded}
      onChange={onClick}
      className={classes.drivers}
      disableGutters={true}>
        <AccordionSummary
          expandIcon={<ArrowDropDownCircle />}
          aria-controls="panel1a-content"
          id="panel1a-header" sx={{ height: '36px' }}
          className={classes.driverHeader}>
          <Box className={classes.subHeading}>{chartInputLabel}</Box>
        </AccordionSummary>
        <Grid container spacing={0} justifyContent="center" alignItems="center" >
          <Grid item xs={12} >
            <Divider variant="middle" className={classes.darkDivder}/>
          </Grid>
        </Grid>
        <AccordionDetails className={classes.driverAccordion}>
          <Box p={0.5}>
             { chartLayerList.map((layer) => <Layer key={layer.id} layerData={layer}/>) }
          </Box>
        </AccordionDetails>
      </Accordion>
  );
}

DriverGroup.propTypes = {
  chartInputLabel: PropTypes.string.isRequired,
  chartLayerList: PropTypes.array.isRequired
};
