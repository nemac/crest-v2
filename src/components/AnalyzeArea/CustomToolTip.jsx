import React from "react";
import PropTypes from "prop-types";

import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ToolTipBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  borderRadius: "4px",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.CRESTLight.main,
  borderColor: theme.palette.CRESTLightBorderColor.main,
  color: theme.palette.CRESTLight.contrastText,
  borderStyle: "solid",
  borderWidth: "1px",
  justifyContent: "center",
  alignItems: "center",
}));

export default function CustomToolTip({ active, payload, label }) {
  if (
    active &&
    payload &&
    payload.length &&
    Number.isFinite(payload[0].value)
  ) {
    return (
      <ToolTipBox>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            variant="body2"
            component="div"
          >
            {label}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            variant="h4"
            component="h2"
          >
            {`${parseFloat(payload[0].payload.value).toFixed(2)}`}
          </Typography>
        </Box>
      </ToolTipBox>
    );
  }
  return null;
}

CustomToolTip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.any,
};
