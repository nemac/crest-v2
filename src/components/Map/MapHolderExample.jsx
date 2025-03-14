import React, { useState } from "react";
import { useSelector } from "react-redux";
import { GeoJSON, Tooltip } from "react-leaflet";

import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";

import Example from "../Example/Examples.jsx";
import LeafletMapContainer from "./LeafletMapContainer.jsx";
import ActionButtons from "./ActionButtons.jsx";
import BasemapLayer from "./BasemapLayer.jsx";
import ActiveTileLayers from "./ActiveTileLayers.jsx";
import MapLayerList from "../MapLayerList/MapLayerList.jsx";
import { mapConfig } from "../../configuration/config";
import { StyledGrid } from "../All/StyledComponents.jsx";
import HelpPopup from "../All/HelpPopup.jsx";

const ThreeColumnGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(0.2),
  height: "100%",
}));

const ContentHolderGrid = styled(Grid)(({ theme }) => ({
  height: "calc(100% - 123px)",
  [theme.breakpoints.down("lg")]: {
    height: "calc(100% - 123px)",
  },
  [theme.breakpoints.down("md")]: {
    height: "calc(60% - 56px)",
  },
}));

const ContentMapBox = styled(Box)(({ theme }) => ({
  height: "100%",
  padding: theme.spacing(0),
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  borderColor: theme.palette.CRESTBorderColor.main,
  borderStyle: "solid",
  borderWidth: "1px",
}));

/* Adds bottom padding for small screens this is hacky need another way to handle this */
const GutterGrid = styled(Grid)(({ theme }) => ({
  padding: `${theme.spacing(0)} !important`,
  height: theme.spacing(0),
  [theme.breakpoints.down("lg")]: {
    height: theme.spacing(1),
  },
}));

/* Adds bottom padding for small screens this is hacky need another way to handle this */
const StyledToolTip = styled(Tooltip)(({ theme }) => ({
  // Feels a bit hacky that I had to tack !important on to everything to get the override
  backgroundColor: "transparent !important",
  border: "transparent !important",
  color: "#FFFFFF !important",
  boxShadow: "none !important",
  fontSize: "1.5em",
  fontWeight: 700,
}));

export default function MapHolderExample() {
  const [map, setMap] = useState(null);
  const [examplePolyData, setExamplePolyData] = useState(null);

  const listVisibleSelector = (state) => state.mapLayerList.visible;
  const layerListVisible = useSelector(listVisibleSelector);

  const helperTitle = "Examples";
  const helpDescription =
    "Step through one of the examples to learn how to use the Coastal " +
    "Resilience Evaluation and Siting Tool (CREST)";

  return (
    <ContentHolderGrid
      container
      spacing={0}
      rowSpacing={{ xs: 1, sm: 1, md: 0 }}
      px={1}
      pb={{ xs: 1, sm: 1, md: 0 }}
      pt={{ xs: 0.5, sm: 0.5, md: 0 }}
      justify="space-between"
      alignItems="stretch"
    >
      {/* Data (graph/chart/table, action buttons) */}
      <ThreeColumnGrid
        item
        xs={12}
        sm={12}
        md={4}
        lg={3.75}
        xl={3}
        order={{
          xs: 2,
          sm: 2,
          md: 1,
        }}
      >
        <StyledGrid
          container
          spacing={0}
          mb={1}
          justifyContent="center"
          alignItems="center"
          sx={{ height: "115px" }}
        >
          <Grid item xs={12}>
            <Box
              px={3}
              py={0.75}
              sx={{
                display: "flex",
                flexWrap: "nowrap",
                alignItems: "center",
                height: "80px",
              }}
            >
              <StickyNote2Icon sx={{ marginRight: "4px" }} />
              <Typography
                variant="h7"
                component="div"
                p={1}
                sx={{
                  fontWeight: "bold",
                  cursor: "default",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                Step through one of the examples to learn how to use the Coastal
                Resilience Evaluation and Siting Tool (CREST)
              </Typography>
              <HelpPopup
                helpTitle={helperTitle}
                helpDescription={helpDescription}
                useExamplesLink={false}
              />
            </Box>
          </Grid>
        </StyledGrid>

        <Example
          map={map}
          examplePolyData={examplePolyData}
          setExamplePolyData={setExamplePolyData}
        />
      </ThreeColumnGrid>

      {/* Map */}
      <ThreeColumnGrid
        item
        xs={12}
        sm={12}
        md={4.5}
        lg={layerListVisible ? 5.25 : 8.25}
        xl={layerListVisible ? 6.25 : 9}
        order={{ xs: 1, sm: 1, md: 2 }}
      >
        <ContentMapBox>
          <LeafletMapContainer
            center={
              mapConfig.regions["Atlantic, Gulf of America, and Pacific Coasts"]
                .mapProperties.center
            }
            zoom={
              mapConfig.regions["Atlantic, Gulf of America, and Pacific Coasts"]
                .mapProperties.zoom
            }
            innerRef={setMap}
          >
            <>
              {examplePolyData ? (
                <GeoJSON data={examplePolyData.geojson} opacity={0.5}>
                  <StyledToolTip
                    position={examplePolyData.center}
                    direction="center"
                    permanent
                  >
                    {examplePolyData.label}
                  </StyledToolTip>
                </GeoJSON>
              ) : (
                <div></div>
              )}
            </>
            <ActiveTileLayers />
            <BasemapLayer map={map} examplePage={true} />
          </LeafletMapContainer>
          <ActionButtons />
        </ContentMapBox>
      </ThreeColumnGrid>

      {/* Layer List */}
      <ThreeColumnGrid
        item
        xs={12}
        sm={12}
        md={3.5}
        lg={3}
        xl={2.75}
        sx={{ display: { xs: layerListVisible ? "flex" : "none" } }}
        order={{ xs: 3, sm: 3, md: 3 }}
      >
        <MapLayerList />
      </ThreeColumnGrid>

      {/* Adds bottom padding for small screens this is hacky need another way to handle this */}
      <GutterGrid item xs={12} order={4} />
    </ContentHolderGrid>
  );
}
