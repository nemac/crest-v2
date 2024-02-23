import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { IconButton } from "@mui/material/";
import {
  ArrowDropDownCircle,
  Layers,
  GridViewRounded,
  FilterNone,
} from "@mui/icons-material";
import Typography from "@mui/material/Typography";

import { mapConfig } from "../../configuration/config";
import { toggleVisible } from "../../reducers/mapLayerListSlice";
import {
  changeRegion,
  regionUserInitiated,
} from "../../reducers/regionSelectSlice";
import {
  changeZoom,
  changeCenter,
  changeBasemap,
} from "../../reducers/mapPropertiesSlice";
import ChangeItemButton from "./ChangeItemButton.jsx";
import DriverGroup from "./DriverGroup.jsx";
import LayerGroup from "./LayerGroup.jsx";
import HelpAlert from "../All/HelpAlert.jsx";

const basemaps = mapConfig.basemaps;
const regions = mapConfig.regions;

export default function MapLayerList() {
  const [showBaseMapMenu, setShowBaseMapMenu] = useState(false);
  const [showRegionMenu, setShowRegionMenu] = useState(false);

  // Read in Selected region and separate layers and charts
  const dispatch = useDispatch();
  const regionSelector = (state) => state.selectedRegion.value;
  const selectedRegion = useSelector(regionSelector);
  const isLimitMessage = mapConfig.regions[selectedRegion].limitMessage;

  const basemapSelector = (state) => state.mapProperties.basemap;
  const selectedBasemap = useSelector(basemapSelector);

  const regionLayers = regions[selectedRegion].layerList;
  const chartsInputs = regions[selectedRegion].chartInputs;

  // get summary charts configs
  const chartSummaryInputs = chartsInputs.filter((data) => {
    const summaryValues = data.chartInputName === "summary";
    return summaryValues;
  });

  // get driver charts configs
  const chartDriverInputs = chartsInputs.filter((data) => {
    const driverValues = data.chartInputName !== "summary";
    return driverValues;
  });

  // Create state for layer list visibility
  const minimizeOnClick = () => {
    dispatch(toggleVisible());
  };

  const handleBaseMapClick = (event) => {
    setShowBaseMapMenu(!showBaseMapMenu);
    event.stopPropagation();
  };

  const handleRegionClick = (event) => {
    setShowRegionMenu(!showRegionMenu);
    event.stopPropagation();
  };

  const handleRegionMenuItemClick = (regionName) => {
    // catch bad region
    if (!regions[regionName]) return null;

    dispatch(changeRegion(regions[regionName].label));
    dispatch(regionUserInitiated(true));
    dispatch(changeZoom(regions[regionName].mapProperties.zoom));
    dispatch(changeCenter(regions[regionName].mapProperties.center));

    return null;
  };

  const handleBaseMapMenuItemClick = (basemap) => {
    dispatch(changeBasemap(basemap));
  };

  /* Iterate through every label containing target chart and create an array of labels
  This logic could be moved into LayerGroup.js
  */
  const getChartLayers = (targetChartLabel) => {
    const chartLayers = [];
    regionLayers.map((layer) => {
      if (layer.ChartInputLabel === targetChartLabel) {
        chartLayers.push(layer);
        return true;
      }
      return false;
    });

    if (chartLayers.length > 0) {
      return chartLayers;
    }
    return [];
  };

  /* build an accordion for target chart input. If chart is summary,
  no typography is used.  Then render an entry for each label in the chart.
  This logic could be moved to LayerGroup.js
  */
  const renderAccordion = (chInLabel) => {
    const chartLayerList = getChartLayers(chInLabel);
    const isSummary = chInLabel === "Summary";
    if (isSummary) {
      return (
        <LayerGroup
          key={chInLabel}
          chartInputLabel={chInLabel}
          chartLayerList={chartLayerList}
        />
      );
    }
    return (
      <DriverGroup
        key={chInLabel}
        chartInputLabel={chInLabel}
        chartLayerList={chartLayerList}
      />
    );
  };

  return (
    <Grid
      container
      spacing={0}
      sx={{
        height: "100%",
        paddingRight: (theme) => theme.spacing(0),
        overflowY: "scroll",
        backgroundColor: (theme) => theme.palette.CRESTGridBackground.dark,
        border: (theme) => `1px solid ${theme.palette.CRESTBorderColor.main}`,
        placeContent: "flex-start",
      }}
    >
      <Grid item xs={12}>
        <Box
          px={1}
          py={0.75}
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center",
            justifyContent: "center",
            height: "54px",
            paddingBottom: (theme) => theme.spacing(0.5),
          }}
        >
          <Layers />
          <Typography
            px={1}
            variant="h6"
            component="div"
            sx={{
              cursor: "default",
              display: "flex",
              width: "100%",
              fontWeight: "bold",
            }}
          >
            Map Layers
          </Typography>
          <IconButton
            variant="contained"
            color="CRESTPrimary"
            aria-label="Minimize"
            onClick={minimizeOnClick}
            sx={{
              height: (theme) => theme.spacing(4.5),
              padding: (theme) => theme.spacing(0.375),
              justifyContent: "end",
            }}
            size="large"
          >
            <ArrowDropDownCircle sx={{ transform: "rotate(-180deg)" }} />
          </IconButton>
        </Box>
        <Grid container spacing={0} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Divider variant="middle" />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} pt={2} px={2}>
        <ChangeItemButton
          buttonMainLabel={"Change Basemap"}
          buttonNameLabel={selectedBasemap}
          buttonName={"Change Basemap"}
          showMenu={showBaseMapMenu}
          menuItems={basemaps}
          onClick={handleBaseMapClick}
          itemOnClick={handleBaseMapMenuItemClick}
        >
          {<GridViewRounded sx={{ fontSize: "1.75rem" }} />}
        </ChangeItemButton>
      </Grid>

      <Grid item xs={12} pt={1} px={2}>
        <ChangeItemButton
          buttonMainLabel={"Change Region"}
          buttonNameLabel={selectedRegion}
          buttonName={"Change Region"}
          showMenu={showRegionMenu}
          menuItems={regions}
          onClick={handleRegionClick}
          itemOnClick={handleRegionMenuItemClick}
          isLimitMessage={isLimitMessage}
        >
          {<FilterNone sx={{ fontSize: "1.75rem" }} />}
        </ChangeItemButton>
        {isLimitMessage ? (
          <Box
            component="div"
            p={1}
            sx={{ display: "flex", alignItems: "start", width: "100%" }}
          >
            <HelpAlert
              helpTitle={`There are data alerts for ${selectedRegion}`}
              helpDescription={isLimitMessage}
              useText={true}
            />
          </Box>
        ) : (
          <></>
        )}
      </Grid>
      <Grid item xs={12} px={2} pt={1}>
        {chartSummaryInputs.map((item) =>
          renderAccordion(item.ChartInputLabel),
        )}
      </Grid>

      <Grid item xs={12} px={2} pt={1} mt={2} mb={1}>
        {chartDriverInputs.map((item) => renderAccordion(item.ChartInputLabel))}
      </Grid>
    </Grid>
  );
}
