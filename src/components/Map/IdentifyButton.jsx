import React from "react";
import PropTypes from "prop-types";
import { Button, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const identifyButtonStyle = {
  minHeight: "30px",
  minWidth: "30px",
  width: "30px",
  height: "30px",
  color: "#000000",
  backgroundColor: "#FFFFFF",
};

export default function IdentifyButton({ onArm }) {
  const handleClick = (event) => {
    event.stopPropagation();
    onArm();
  };

  return (
    <Tooltip title="Identify a location" placement="right">
      <Button
        variant="contained"
        onClick={handleClick}
        style={identifyButtonStyle}
        aria-label="Identify a location"
      >
        <InfoIcon />
      </Button>
    </Tooltip>
  );
}

IdentifyButton.propTypes = {
  onArm: PropTypes.func.isRequired,
};
