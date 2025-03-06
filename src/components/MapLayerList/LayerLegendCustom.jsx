import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import BrightnessLowIcon from "@mui/icons-material/BrightnessLow";
import Slider from "@mui/material/Slider";
import BrightnessHighIcon from "@mui/icons-material/BrightnessHigh";
import Stack from "@mui/material/Stack";

import { setOpacity } from "../../reducers/mapLayerListSlice";

export default function LayerLegendCustom(props) {
  const { layer } = props;
  const layerListSelector = (state) => state.mapLayerList.activeLayerList;
  const dispatch = useDispatch();
  const activeLayerList = useSelector(layerListSelector);
  const legend = layer.chartCSSColor ? layer.chartCSSColor : [];

  return (
    <Box m={1.5} sx={{ width: "100%", minHeight: "40px" }}>
      {layer.id in activeLayerList && (
        <Stack
          spacing={2}
          direction="row"
          sx={{ alignItems: "center", mb: 1, ml: 5, mr: 5 }}
        >
          <BrightnessLowIcon />
          <Slider
            aria-label="Opacity"
            min={0}
            max={1}
            onChange={(e) => {
              dispatch(
                setOpacity({ layerId: layer.id, opacity: e.target.value }),
              );
            }}
            step={0.01}
            value={activeLayerList[layer.id]?.opacity}
          />
          <BrightnessHighIcon />
        </Stack>
      )}
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
  layerOpacity: PropTypes.number,
  setLayerOpacity: PropTypes.func,
};
