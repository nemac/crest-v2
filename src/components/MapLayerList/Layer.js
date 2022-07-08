import React from 'react';
import PropTypes from 'prop-types';

import { BallotOutlined, Ballot } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLayer, toggleLegend } from '../../reducers/mapLayerListSlice';
import LayerDescription from './LayerDescription';
import LayerLegend from './LayerLegend';

const useStyles = makeStyles((theme) => ({
  layer: {
    height: '250px',
    padding: theme.spacing(0),
    backgroundColor: theme.palette.CRESTGridBackground.dark,
    borderColor: theme.palette.CRESTBorderColor.main,
    borderStyle: 'solid',
    borderWidth: '1px'
  },
  layerName: {
    fontWeight: '400',
    fontSize: '0.9rem',
    letterSpacing: '0.02857em',
    width: '100%',
    cursor: 'pointer',
    minHeight: '36px',
    height: 'auto'
  },
  layerHolder: {
    minHeight: '36px',
    height: 'auto',
    padding: `${theme.spacing(0)} ${theme.spacing(0)} ${theme.spacing(0)} ${theme.spacing(0)}`,
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center'
  },
  legendButton: {
    padding: theme.spacing(0.5)
  }
}));

export default function Layer(props) {
  const { layerData } = props;
  const classes = useStyles();

  const dispatch = useDispatch();
  const layerListSelector = (state) => state.mapLayerList.activeLayerList;
  const layerLegendsSelector = (state) => state.mapLayerList.displayedLegends;
  const activeLayerList = useSelector(layerListSelector);
  const displayedLegends = useSelector(layerLegendsSelector);
  const checked = layerData.id in activeLayerList;

  const handleToggleLayerClick = (event) => {
    dispatch(toggleLayer(layerData));
    event.stopPropagation();
  };

  const handleToggleLegendClick = (event) => {
    dispatch(toggleLegend(layerData));
    event.stopPropagation();
  };

  return (
      <div>
        <Box className={classes.layerHolder}>
          <Box component="div" className={classes.layerName} onClick={handleToggleLayerClick} >
            <Checkbox color="CRESTPrimary" checked={checked} onClick={handleToggleLayerClick} />
            {layerData.label}
          </Box>
          <Box>
            <IconButton onClick={handleToggleLegendClick} className={classes.legendButton} >
              {layerData.id in displayedLegends ? <Ballot /> : <BallotOutlined />}
            </IconButton>
          </Box>
          <LayerDescription layerName={layerData.label} layerDescription={layerData.description} />
        </Box>
        <Collapse in={layerData.id in displayedLegends} >
          <LayerLegend layer={layerData} />
        </Collapse>
      </div>
  );
}

Layer.propTypes = {
  layerData: PropTypes.object.isRequired
};
