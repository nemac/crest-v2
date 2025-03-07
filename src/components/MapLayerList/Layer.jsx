import React from "react";
import PropTypes from "prop-types";

import { BallotOutlined, Ballot } from "@mui/icons-material";
import Box from "@mui/material/Box";
import BrightnessLowIcon from "@mui/icons-material/BrightnessLow";
import Slider from "@mui/material/Slider";
import BrightnessHighIcon from "@mui/icons-material/BrightnessHigh";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import Collapse from "@mui/material/Collapse";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import {
  setOpacity,
  toggleLayer,
  toggleLegend,
} from "../../reducers/mapLayerListSlice";
import LayerDescription from "./LayerDescription.jsx";
import LayerLegend from "./LayerLegend.jsx";
import LayerLegendCustom from "./LayerLegendCustom.jsx";

export default function Layer(props) {
  const { layerData } = props;

  const dispatch = useDispatch();
  const layerListSelector = (state) => state.mapLayerList.activeLayerList;
  const layerLegendsSelector = (state) => state.mapLayerList.displayedLegends;
  const activeLayerList = useSelector(layerListSelector);
  const displayedLegends = useSelector(layerLegendsSelector);
  const checked = layerData.id in activeLayerList;

  const handleToggleLayerClick = (event) => {
    dispatch(toggleLayer(layerData));
    event.stopPropagation();
  };

  const handleToggleLegendClick = (event) => {
    dispatch(toggleLegend(layerData));
    event.stopPropagation();
  };

  return (
    <div>
      <Box
        sx={{
          minHeight: "36px",
          height: "auto",
          padding: 0,
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "center",
        }}
      >
        <Box
          component="div"
          onClick={handleToggleLayerClick}
          sx={{
            fontWeight: "400",
            fontSize: "0.9rem",
            letterSpacing: "0.02857em",
            width: "100%",
            cursor: "pointer",
            minHeight: "36px",
            height: "auto",
          }}
        >
          <Grid container spacing={0} p={0} m={0}>
            <Grid item xs={2} p={0} m={0}>
              <Checkbox
                color="CRESTPrimary"
                checked={checked}
                onClick={handleToggleLayerClick}
              />
            </Grid>
            <Grid
              item
              xs={10}
              pr={0}
              py={0}
              pl={{ sm: 0, md: 1, lg: 1 }}
              m={0}
              sx={{ alignItems: "center", display: "flex" }}
            >
              {layerData.label}
            </Grid>
          </Grid>
        </Box>
        <Box>
          <IconButton
            onClick={handleToggleLegendClick}
            sx={{ padding: 0.5 }} // sx automatically uses theme.spacing
            size="large"
          >
            {layerData.id in displayedLegends ? <Ballot /> : <BallotOutlined />}
          </IconButton>
        </Box>
        <LayerDescription
          layerName={layerData.label}
          layerDescription={layerData.description}
        />
      </Box>
      {layerData.id in activeLayerList && (
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
                setOpacity({ layerId: layerData.id, opacity: e.target.value }),
              );
            }}
            step={0.01}
            value={activeLayerList[layerData.id]?.opacity}
          />
          <BrightnessHighIcon />
        </Stack>
      )}
      <Collapse in={layerData.id in displayedLegends}>
        {layerData.isLegendCustom ? (
          <LayerLegendCustom layer={layerData} />
        ) : (
          <LayerLegend layer={layerData} />
        )}
      </Collapse>
    </div>
  );
}

Layer.propTypes = {
  layerData: PropTypes.object.isRequired,
};
