import React from "react";
import { Popup, Source, Layer } from "@vis.gl/react-maplibre";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { IconButton } from "@mui/material/";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import CancelIcon from "@mui/icons-material/Cancel";

import {
  changeIdentifyCoordinates,
  changeIdentifyResults,
  changeIdentifyIsLoaded,
} from "../../reducers/mapPropertiesSlice";
import IdentifyBarChart from "../AnalyzeArea/IdentifyBarChart.jsx";

const StyledPopup = styled(Popup)(({ theme }) => ({
  "& .maplibregl-popup-content": {
    padding: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
    backgroundColor: theme.palette.CRESTGridBackground.dark,
    color: theme.palette.CRESTGridBackground.contrastText,
    border: `1px solid ${theme.palette.CRESTBorderColor.main}`,
    width: "310px",
    height: "255px",
    overflow: "clip",
  },
  "& .maplibregl-popup-tip": {
    display: "none",
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  height: "160px",
  maxHeight: "160px",
  padding: theme.spacing(1),
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  justifyContent: "center",
  alignItems: "center",
}));

export default function ShowIdentifyPopup(props) {
  const { region, identifyItems, identifyIsLoaded, identifyCoordinates } =
    props;
  const dispatch = useDispatch();
  const summaryIndices = ["hubs", "exposure", "threat", "asset", "wildlife"];

  const closePopups = () => {
    dispatch(changeIdentifyIsLoaded(false));
    dispatch(changeIdentifyResults(null));
    dispatch(changeIdentifyCoordinates(null));
  };

  if (!identifyCoordinates) {
    return null;
  }

  const point = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [identifyCoordinates.lng, identifyCoordinates.lat],
    },
    properties: {},
  };

  return (
    <>
      <StyledPopup
        longitude={identifyCoordinates.lng}
        latitude={identifyCoordinates.lat}
        anchor="top-right"
        offset={10}
        closeButton={false}
        closeOnClick={false}
        maxWidth="none"
      >
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
          <Typography
            sx={{
              cursor: "default",
              display: "flex",
              width: "100%",
              fontWeight: "bold",
            }}
            px={1}
            variant="h6"
            component="div"
          >
            Map Information
          </Typography>
          <IconButton
            sx={{
              height: (theme) => theme.spacing(4.5),
              padding: (theme) => theme.spacing(0.375),
              justifyContent: "end",
            }}
            variant="contained"
            color="CRESTPrimary"
            aria-label="Close"
            onClick={closePopups}
            size="large"
          >
            <CancelIcon />
          </IconButton>
        </Box>
        <Divider />
        {!identifyIsLoaded ? (
          <Grid
            container
            spacing={2}
            pt={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid xs={12}>
              <Typography
                variant="h6"
                component="div"
                align="center"
                gutterBottom
              >
                Loading...
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            spacing={2}
            pt={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid xs={12}>
              <Typography
                variant="h6"
                component="div"
                align="center"
                gutterBottom
              >
                <ContentBox components="fieldset">
                  <IdentifyBarChart
                    areaName={""}
                    chartRegion={region}
                    chartIndices={summaryIndices}
                    zonalStatsData={identifyItems}
                    barchartMargin={{
                      top: 20,
                      right: 0,
                      left: -25,
                      bottom: 20,
                    }}
                  />
                </ContentBox>
              </Typography>
            </Grid>
          </Grid>
        )}
      </StyledPopup>
      <Source id="identify-point" type="geojson" data={point}>
        <Layer
          id="identify-point-circle"
          type="circle"
          paint={{
            "circle-radius": 5,
            "circle-color": "#444444",
            "circle-opacity": 0.9,
            "circle-stroke-color": "#555555",
            "circle-stroke-width": 1,
          }}
        />
      </Source>
    </>
  );
}

ShowIdentifyPopup.propTypes = {
  region: PropTypes.string,
  identifyItems: PropTypes.object,
  identifyIsLoaded: PropTypes.bool,
  identifyCoordinates: PropTypes.object,
};
