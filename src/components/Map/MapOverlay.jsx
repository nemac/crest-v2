import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

export const MAP_OVERLAY_CLASS = "map-overlay";

const positions = {
  "top-left": { top: 80, left: 10 },
  "top-right": { top: 10, right: 10 },
  "bottom-left": { bottom: 30, left: 10 },
  "bottom-right": { bottom: 30, right: 10 },
};

export default function MapOverlay({ position, children, sx }) {
  return (
    <Box
      className={MAP_OVERLAY_CLASS}
      sx={{
        position: "absolute",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        ...positions[position],
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

MapOverlay.propTypes = {
  position: PropTypes.oneOf(Object.keys(positions)).isRequired,
  children: PropTypes.node,
  sx: PropTypes.object,
};
