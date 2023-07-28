import React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import { CameraAlt } from '@mui/icons-material';

import ActionButton from '../All/ActionButton';

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

export default function ChartDetailsActionButtons(props) {
  const {
    handleDownload
  } = props;

  return (
    <StyledGridContent container spacing={0} p={0} mt={0} mb={0}>
      <Grid xs={4.5}>
      </Grid>
      <Grid xs={3}>
        <ActionButton
          buttonLabel={'Export'}
          buttonName={'Export'}
          onClick={handleDownload}>
          <CameraAlt />
        </ActionButton>
      </Grid>
      <Grid xs={4.5}>
      </Grid>
    </StyledGridContent>
  );
}

ChartDetailsActionButtons.propTypes = {
  handleDownload: PropTypes.func
};
