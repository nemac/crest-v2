/*
Purpose
  The component holds buttons for chart actions on each detailed chart for now its just export

Child Components
  - Not sure yet

Libs
  - Not sure yet

API
  - Not sure yet

State needed
  - Not sure yet

Props
  - Not sure yet
*/
import React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';

import { CameraAlt } from '@mui/icons-material';
import { useSelector } from 'react-redux';

import ActionButton from '../All/ActionButton';
import { mapConfig } from '../../configuration/config';

const StyledGridContent = styled(Grid)(({ theme }) => ({
  display: 'flex',
  height: theme.spacing(8),
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  borderColor: theme.palette.CRESTBorderColor.main,
  borderStyle: 'solid',
  borderWidth: '1px',
  borderTop: '0px !important',
  justifyContent: 'center',
  alignItems: 'center'
}));

const regions = mapConfig.regions;
const selectedRegionSelector = (state) => state.selectedRegion.value;

export default function ChartDetailsActionButtons(props) {
  const {
    chartType, handleDownload
  } = props;
  const selectedRegion = useSelector(selectedRegionSelector);

  return (
    <StyledGridContent container spacing={0} p={0} mt={0} mb={0}>
      <Grid xs={4.5}>
      </Grid>
      <Grid xs={3}>
        <ActionButton
          buttonLabel={'Export'}
          buttonName={'Export'}
          onClick={() => handleDownload(chartType)}>
          <CameraAlt />
        </ActionButton>
      </Grid>
      <Grid xs={4.5}>
      </Grid>
    </StyledGridContent>
  );
}

ChartDetailsActionButtons.propTypes = {
  chartType: PropTypes.string.isRequired,
  handleDownload: PropTypes.func
};
