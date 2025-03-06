import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

export default function LayerLegendCustom(props) {
  const { layer } = props;
  const layerListSelector = (state) => state.mapLayerList.activeLayerList;
  const legend = layer.chartCSSColor ? layer.chartCSSColor : [];

  return (
    <Box m={1.5} sx={{ width: "100%", minHeight: "40px" }}>
      {legend.map((legendValue) => (
        <Grid
          container
          spacing={0}
          pl={2}
          pr={1}
          py={1}
          key={`${legendValue.label}-grid`}
        >
          <Grid
            item={"item"}
            xs={2}
            sx={{
              backgroundColor: legendValue.backgroundColor,
              borderColor: legendValue.borderColor,
              borderWidth: "2px",
              borderStyle: "solid",
              color: legendValue.backgroundColor,
            }}
          ></Grid>
          <Grid item={"item"} xs={10} pl={1} sx={{ fontSize: "0.85rem" }}>
            {legendValue.label}
          </Grid>
        </Grid>
      ))}
    </Box>
  );
}

LayerLegendCustom.propTypes = {
  layer: PropTypes.object.isRequired,
};
