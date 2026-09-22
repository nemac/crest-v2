import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import palettes from "../../configuration/palettes/conus.json";

const legendLightColor = "#ffffff";
const legendDarkColor = "#000000";
const maxLegendWidth = 12;
const lightDarkThresh = 0.12;

function pickCSSBasedOnBgColor(bgColor) {
  const color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
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

// Legacy configs list colours by value with 0 as no-data; duplicates collapse into one swatch.
const rampFromChartColors = (chartCSSColor) => {
  const entries = Object.entries(chartCSSColor).slice(1);
  const byColor = new Map();
  entries.forEach(([value, color]) => byColor.set(color, value));
  return Array.from(byColor, ([color, value]) => ({ color, text: value }));
};

const rampFromPalette = (entries) =>
  entries.map((entry) => ({
    color: entry.color,
    text: String(entry.value),
    label: entry.label,
  }));

export default function LayerLegend(props) {
  const { layer } = props;
  const palette = layer.palette ? palettes[layer.palette] : null;
  const ramp = palette
    ? rampFromPalette(palette)
    : rampFromChartColors(layer.chartCSSColor);

  return (
    <Box m={1.5}>
      <Grid container spacing={0}>
        <Grid
          xs={2}
          sx={{ fontSize: "1rem", display: "flex", justifyContent: "start" }}
        >
          Low
        </Grid>
        <Grid xs={8} />
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
            alignItems: "flex-start",
          }}
        >
          {ramp.map((swatch) => (
            <Grid
              xs={maxLegendWidth / ramp.length}
              key={layer.id.concat("-", swatch.color)}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Box
                sx={{
                  backgroundColor: swatch.color,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 12,
                  color: pickCSSBasedOnBgColor(swatch.color),
                  height: "48px",
                }}
              >
                {swatch.text}
              </Box>
              {swatch.label && (
                <Box
                  sx={{
                    fontSize: "1rem",
                    pt: 0.5,
                    ml: (theme) => `-${theme.spacing(1)}`,
                  }}
                >
                  {swatch.label}
                </Box>
              )}
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
