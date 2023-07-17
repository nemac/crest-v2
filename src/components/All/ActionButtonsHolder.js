import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Unstable_Grid2';

import ActionButton from './ActionButton';
import { StyledGrid } from './StyledComponents';

export default function ActionButtonsHolder(props) {
  const {
    actionButtons
  } = props;

  return (
    <StyledGrid
      container
      spacing={0}
      justifyContent="center"
      alignItems="center"
      p={0}
      sx={{ height: (theme) => theme.spacing(8), maxHeight: (theme) => theme.spacing(8) }}
    >
      {actionButtons?.map((actionButton) => (
        <Grid key={actionButton.buttonName} xs={3}>
          <ActionButton
            buttonLabel={actionButton.buttonLabel}
            buttonName={actionButton.buttonName}
            onClick={actionButton.onClick}
          >
            {actionButton.icon}
          </ActionButton>
        </Grid>
      ))}
    </StyledGrid>
  );
}

ActionButtonsHolder.propTypes = {
  actionButtons: PropTypes.array.isRequired
};
