import React from "react";
import ReactGA from "react-ga4";

import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { styled } from "@mui/system";

import Grid from "@mui/material/Unstable_Grid2";
import {
  CameraAlt,
  LayersOutlined,
  Layers,
  LibraryAdd,
  LibraryAddOutlined,
} from "@mui/icons-material";
import ActionButton from "../All/ActionButton.jsx";
import { exportMapImage } from "./mapExport";
import { toggleAreaVisible } from "../../reducers/analyzeAreaSlice";
import { toggleVisible as toggleMapLayerVisibility } from "../../reducers/mapLayerListSlice";

const areaVisibleSelector = (state) => state.analyzeArea.visible;
const listVisibleSelector = (state) => state.mapLayerList.visible;

export const StyledGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(0),
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  borderTopColor: theme.palette.CRESTBorderColor.main,
  borderTopStyle: "solid",
  borderTopWidth: "1px",
  borderRightColor: "transparent",
  borderRightStyle: "none",
  borderRightWidth: "0px",
  borderLeftColor: "transparent",
  borderLeftStyle: "none",
  borderLeftWidth: "0px",
  borderBottomColor: "transparent",
  borderBottomStyle: "none",
  borderBottomWidth: "0px",
}));

// just a place holder needs props passed in and image etc
export default function ActionButtons(props) {
  const { map } = props;
  const dispatch = useDispatch();

  const areaVisible = useSelector(areaVisibleSelector);
  const layerListVisible = useSelector(listVisibleSelector);

  const areaVisiblityOnClick = () => {
    dispatch(toggleAreaVisible());
  };
  const mapLayerVisiblityOnClick = () => {
    dispatch(toggleMapLayerVisibility());
  };

  const handleExportClick = () => {
    if (!map) return;
    exportMapImage(map).then(() => {
      ReactGA.event({
        category: "engagement",
        action: "export_map",
        label: "export map",
      });
    });
  };

  return (
    <StyledGrid
      container
      spacing={0}
      justifyContent="center"
      alignItems="center"
      sx={{ height: (theme) => theme.spacing(8) }}
    >
      <Grid xs={4}>
        <ActionButton
          buttonLabel={"Add Area"}
          buttonName={"Add Area"}
          onClick={areaVisiblityOnClick}
          fullWidth={true}
        >
          {areaVisible ? <LibraryAdd /> : <LibraryAddOutlined />}
        </ActionButton>
      </Grid>
      <Grid xs={4}>
        <ActionButton
          buttonLabel={"Export"}
          buttonName={"Export"}
          onClick={handleExportClick}
        >
          <CameraAlt />
        </ActionButton>
      </Grid>
      <Grid xs={4}>
        <ActionButton
          buttonLabel={"Map Layers"}
          buttonName={"Map Layers"}
          onClick={mapLayerVisiblityOnClick}
        >
          {layerListVisible ? <Layers /> : <LayersOutlined />}
        </ActionButton>
      </Grid>
    </StyledGrid>
  );
}

ActionButtons.propTypes = {
  map: PropTypes.object,
};
