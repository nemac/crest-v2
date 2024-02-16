import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Unstable_Grid2";

import ActionButton from "./ActionButton.jsx";
import { StyledGrid } from "./StyledComponents.jsx";

export default function ActionButtonsHolder(props) {
  const { actionButtons, styledGridSx, gridSx } = props;

  return (
    <StyledGrid
      container
      spacing={0}
      justifyContent="center"
      alignItems="center"
      p={0}
      sx={styledGridSx}
    >
      {actionButtons?.map((actionButton) => (
        <Grid key={actionButton.buttonName} xs={3} sx={gridSx}>
          <ActionButton
            buttonLabel={actionButton.buttonLabel}
            buttonName={actionButton.buttonName}
            buttonId={actionButton.id}
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
  actionButtons: PropTypes.array.isRequired,
  styledGridSx: PropTypes.object,
  gridSx: PropTypes.object,
};
