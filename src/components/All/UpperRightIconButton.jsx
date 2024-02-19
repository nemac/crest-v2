import * as React from "react";
import PropTypes from "prop-types";

import IconButton from "@mui/material/IconButton";

export default function UpperRightIconButton(props) {
  const { children, ariaLabel, onClick } = props;
  return (
    <IconButton
      variant="contained"
      color="CRESTPrimary"
      onClick={onClick}
      sx={{
        height: (theme) => theme.spacing(4.5),
        padding: (theme) => theme.spacing(0.375),
      }}
      aria-label={ariaLabel}
      size="large"
    >
      {children}
    </IconButton>
  );
}

UpperRightIconButton.propTypes = {
  children: PropTypes.node.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
