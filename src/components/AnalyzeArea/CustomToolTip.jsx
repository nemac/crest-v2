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
  transition: "transform 400ms ease",
}));

// Places the box centred over its column with its bottom edge just above the bar top, clamped to the plot area.
export const anchorTransform = ({
  coordinate,
  viewBox,
  minValue = 0,
  chartValue = 0,
  gap = 8,
}) => {
  if (!coordinate || !viewBox) return undefined;
  const span = 1 - minValue || 1;
  const ratio = 1 - (Math.max(chartValue, 0) - minValue) / span;
  const barTop = viewBox.y + viewBox.height * ratio;
  const right = viewBox.x + viewBox.width;
  return `translate(clamp(0px, calc(${coordinate.x}px - 50%), calc(${right}px - 100%)), max(0px, calc(${barTop}px - 100% - ${gap}px)))`;
};

export default function CustomToolTip({
  active,
  payload,
  coordinate,
  viewBox,
  minValue,
}) {
  if (active && payload && payload.length) {
    const transform = anchorTransform({
      coordinate,
      viewBox,
      minValue,
      chartValue: payload[0].payload.chartValue,
    });
    return (
      <ToolTipBox style={{ transform }}>
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
            {payload[0].payload.selectedChartTipLabel}
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
            {payload[0].payload.noData
              ? "No data"
              : `${parseFloat(payload[0].payload.value).toFixed(2)}`}
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
  coordinate: PropTypes.object,
  viewBox: PropTypes.object,
  minValue: PropTypes.number,
};
