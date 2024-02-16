import React from "react";
import PropTypes from "prop-types";

import { BallotOutlined, Ballot } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { toggleLayer, toggleLegend } from "../../reducers/mapLayerListSlice";
import LayerDescription from "./LayerDescription.jsx";
import LayerLegend from "./LayerLegend.jsx";

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
          <Checkbox
            color="CRESTPrimary"
            checked={checked}
            onClick={handleToggleLayerClick}
          />
          {layerData.label}
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
      <Collapse in={layerData.id in displayedLegends}>
        <LayerLegend layer={layerData} />
      </Collapse>
    </div>
  );
}

Layer.propTypes = {
  layerData: PropTypes.object.isRequired,
};
