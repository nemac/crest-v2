import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

const legendLightColor = "#ffffff";
const legendDarkColor = "#000000";

export default function LayerLegend(props) {
  const { layer } = props;
  const colorChart = Object.values(layer.chartCSSColor).slice(1);
  const colorEntries1 = Object.entries(layer.chartCSSColor)
    .slice(1)
    .map(([key, value]) => [value, key]);
  const colorChartEntries = Object.fromEntries(colorEntries1);
  const colorEntries2 = Object.values(layer.chartCSSColor)
    .slice(1)
    .map((color) => [color, colorChartEntries[color]]);
  let colorChartValues = Object();
  colorChartValues = Object.fromEntries(colorEntries2);
  const colors = Array.from(new Set(Object.values(colorChart)));
  const maxLegendWidth = 12;
  const lightDarkThresh = 0.12;

  function pickCSSBasedOnBgColor(bgColor) {
    const color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
    const r = parseInt(color.substring(0, 2), 16); // hexToR
    const g = parseInt(color.substring(2, 4), 16); // hexToG
    const b = parseInt(color.substring(4, 6), 16); // hexToB
    const uicolors = [r / 255, g / 255, b / 255];
    const c = uicolors.map((col) => {
      if (col <= 0.03928) {
        return col / 12.92;
      }
      return ((col + 0.055) / 1.055) ** 2.4;
    });
    const L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    return L > lightDarkThresh ? legendDarkColor : legendLightColor;
  }

  return (
    <Box m={1.5}>
      <Grid container spacing={0}>
        <Grid
          xs={2}
          sx={{ fontSize: "1rem", display: "flex", justifyContent: "start" }}
        >
          Low
        </Grid>
        <Grid
          xs={8}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: 600,
          }}
        ></Grid>
        <Grid
          xs={2}
          sx={{ fontSize: "1rem", display: "flex", justifyContent: "end" }}
        >
          High
        </Grid>
        <Grid
          container
          xs={12}
          sx={{
            transition: "all 0.75s ease",
            willChange: "transform",
            padding: (theme) => theme.spacing(1),
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {colors.map((color) => (
            <Grid
              xs={maxLegendWidth / colors.length}
              key={layer.id.concat("-", color)}
              sx={{
                backgroundColor: color,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 12,
                color: pickCSSBasedOnBgColor(color),
                height: "48px",
              }}
            >
              {colorChartValues[color]}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}

LayerLegend.propTypes = {
  layer: PropTypes.object.isRequired,
};
