import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import {
  ArrowDropDownCircle,
  Help,
  LibraryAdd
} from '@mui/icons-material';

import Buffer from './Buffer';
import DrawArea from './DrawArea';
import SearchCustom from './SearchCustom';
import Upload from './UploadShapeFile';
import UpperRightIconButton from '../All/UpperRightIconButton';
import { StyledGrid } from '../All/StyledComponents';
import { toggleAreaVisible } from '../../reducers/analyzeAreaSlice';

const analyzeAreaVisibleSelector = (state) => state.analyzeArea.visible;

export default function MapActionCard(props) {
  const {
    map,
    bufferCheckbox,
    setBufferCheckbox,
    drawAreaDisabled,
    setGeoToRedraw,
    setErrorState
  } = props;

  const dispatch = useDispatch();
  const analyzeAreaVisible = useSelector(analyzeAreaVisibleSelector);

  const minimizeOnClick = () => {
    dispatch(toggleAreaVisible());
  };
  return (
    <StyledGrid container spacing={0} 
      justifyContent="center"
      alignItems="center" 
      sx={{ height: analyzeAreaVisible ? '250px' : '50px', minHeight: analyzeAreaVisible ? '250px' : '50px' }}
      style={{  transition: 'all 0.333s ease-in-out' }} >
      <Grid xs={12}>
        <Box px={1} py={0.75} sx={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
          <LibraryAdd />
          <Typography px={1} sx={{ cursor: 'default', width: '100%', alignItems: 'center' }}>
            Add an area to analyze
          </Typography>
          <UpperRightIconButton ariaLabel="Help">
            <Help />
          </UpperRightIconButton>
          <UpperRightIconButton ariaLabel="Minimize" onClick={minimizeOnClick}>
            <ArrowDropDownCircle sx={{ transform: analyzeAreaVisible ? 'rotate(-180deg)' : 'none' }}/>
          </UpperRightIconButton>
        </Box>
      </Grid>
      { analyzeAreaVisible && (
        <>
        <Grid xs={12}>
          <DrawArea map={map} disabled={drawAreaDisabled}/>
        </Grid>
        <Grid xs={12}>
          <Upload setGeoToRedraw={setGeoToRedraw} setErrorState={setErrorState}/>
        </Grid>
        <Grid xs={12}>
          <SearchCustom />
        </Grid>
        <Grid xs={12}>
          <Buffer bufferCheckbox={bufferCheckbox} setBufferCheckbox={setBufferCheckbox}/>
        </Grid>
        </>
      )}

    </StyledGrid>
  );
}

MapActionCard.propTypes = {
  bufferCheckbox: PropTypes.bool,
  map: PropTypes.object,
  setBufferCheckbox: PropTypes.func,
  drawAreaDisabled: PropTypes.bool,
  setGeoToRedraw: PropTypes.func,
  setErrorState: PropTypes.func
};
