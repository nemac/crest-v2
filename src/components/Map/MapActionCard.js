import * as React from 'react';

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
import Upload from './Upload';
import UpperRightIconButton from '../All/UpperRightIconButton';
import { StyledGrid } from '../All/StyledComponents';

// just a place holder needs props passed in and image etc
export default function MapActionCard(props) {
  const {
    map,
    bufferCheckbox,
    setBufferCheckbox,
    drawAreaDisabled,
    setTooLargeLayerOpen
  } = props;

  return (
    <StyledGrid container spacing={0} justifyContent="center" alignItems="center" sx={{ height: '250px' }}>

      <Grid xs={12}>
        <Box px={1} py={0.75} sx={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
          <LibraryAdd />
          <Typography px={1} sx={{ cursor: 'default', width: '100%', alignItems: 'center' }}>
            Add an area to analyze
          </Typography>
          <UpperRightIconButton ariaLabel="Help">
            <Help />
          </UpperRightIconButton>
          <UpperRightIconButton ariaLabel="Minimize">
            <ArrowDropDownCircle />
          </UpperRightIconButton>
        </Box>
      </Grid>

      <Grid xs={12}>
        <DrawArea map={map} disabled={drawAreaDisabled}/>
      </Grid>
      <Grid xs={12}>
        <Upload setTooLargeLayerOpen={setTooLargeLayerOpen}/>
      </Grid>
      <Grid xs={12}>
        <SearchCustom />
      </Grid>
      <Grid xs={12}>
        <Buffer bufferCheckbox={bufferCheckbox} setBufferCheckbox={setBufferCheckbox}/>
      </Grid>

    </StyledGrid>
  );
}

MapActionCard.propTypes = {
  bufferCheckbox: PropTypes.bool,
  map: PropTypes.object,
  setBufferCheckbox: PropTypes.func,
  drawAreaDisabled: PropTypes.bool,
  setTooLargeLayerOpen: PropTypes.func
};
