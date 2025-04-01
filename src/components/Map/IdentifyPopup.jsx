/*
Purpose
  When a user clicks on the map gets the stats for that point
    we were going to to the hole hub but the idea of hub as selectable element
    is going away its just a hex so we cannot do that

    is a leaflet button so needs access to leaflet object can be a challenge in React

    handle errors:
      - Nothing returned
      - HTTP Error

Child Components
  - None

Libs
  - leaflet

API
  - identify

State needed
  - identify GEOJSON returned from API

Props
  - Not sure yet
*/

// TODO:
// 1. style custom close button
// 2. Figure out why closing identify popup causes TypeError: el is null in firefox
//    and why it causes TypeError: Cannot read properties of null (reading '_leaflet_disable_click')

import React from "react";
import { Popup, CircleMarker, useMap } from "react-leaflet";
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
import IdentifyBarChart from "../AnalyzeArea/IdentifyBarChart";

const StyledPopup = styled(Popup)(({ theme }) => ({
  bottom: "-22px !important",
  left: "-308px !important",
  "& .leaflet-popup-content-wrapper": {
    padding: `${theme.spacing(1)} !important`,
    borderRadius: `${theme.spacing(0.5)} !important`,
    backgroundColor: `${theme.palette.CRESTGridBackground.dark} !important`,
    color: `${theme.palette.CRESTGridBackground.contrastText} !important`,
    border: `1px solid ${theme.palette.CRESTBorderColor.main} !important`,
    width: "310px !important",
    height: "255px !important",
    overflow: "clip !important",
  },
  "& .leaflet-popup-content": {
    margin: "0px !important",
  },
  "& .leaflet-popup-tip": {
    width: "0px !important",
    height: "0px !important",
  },
  "& a.leaflet-popup-close-button": {
    paddingTop: "2px !important",
    paddingLeft: "3px !important",
    borderRadius: "20px !important",
    width: "20px !important",
    height: "20px !important",
    top: "15px !important",
    right: "10px !important",
    backgroundColor: `${theme.palette.CRESTLight.main} !important`,
    color: `${theme.palette.CRESTLight.contrastText} !important`,
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
  const map = useMap();
  const summaryIndices = ["hubs", "exposure", "threat", "asset", "wildlife"];

  const closePopups = () => {
    map.closePopup();
    dispatch(changeIdentifyIsLoaded(false));
    dispatch(changeIdentifyResults(null));
    dispatch(changeIdentifyCoordinates(null));
  };

  if (!identifyCoordinates) {
    return null;
  }

  return (
    <div>
      <StyledPopup
        position={identifyCoordinates}
        autoPan={false}
        closeButton={false}
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
      <CircleMarker
        center={{ lat: identifyCoordinates.lat, lng: identifyCoordinates.lng }}
        fillColor="#444444"
        color="#555555"
        fillOpacity="0.9"
        radius={5}
      />
    </div>
  );
}

ShowIdentifyPopup.propTypes = {
  region: PropTypes.string,
  identifyItems: PropTypes.object,
  identifyIsLoaded: PropTypes.bool,
  identifyCoordinates: PropTypes.object,
};
