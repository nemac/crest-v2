import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

import { ArrowDropDownCircle, LibraryAdd } from "@mui/icons-material";

import Buffer from "./Buffer.jsx";
import DrawArea from "./DrawArea.jsx";
import SearchCustom from "./SearchCustom.jsx";
import Upload from "./UploadShapeFile.jsx";
import UpperRightIconButton from "../All/UpperRightIconButton.jsx";
import HelpPopup from "../All/HelpPopup.jsx";
import HelpAlert from "../All/HelpAlert.jsx";
import { StyledGrid } from "../All/StyledComponents.jsx";
import { toggleAreaVisible } from "../../reducers/analyzeAreaSlice";
import { changeUseBuffer } from "../../reducers/mapPropertiesSlice";
import { mapConfig } from "../../configuration/config";

const analyzeAreaVisibleSelector = (state) => state.analyzeArea.visible;
const useBufferSelector = (state) => state.mapProperties.useBuffer;

export default function MapActionCard(props) {
  const { map, drawAreaDisabled, setGeoToRedraw, setErrorState } = props;

  const dispatch = useDispatch();
  const analyzeAreaVisible = useSelector(analyzeAreaVisibleSelector);
  const bufferCheckbox = useSelector(useBufferSelector);
  const regionSelector = (state) => state.selectedRegion.value;
  const selectedRegion = useSelector(regionSelector);
  const isLimitMessage = mapConfig.regions[selectedRegion].limitMessage;

  const minimizeOnClick = () => {
    dispatch(toggleAreaVisible());
  };

  const setBufferCheckbox = () => {
    dispatch(changeUseBuffer());
  };

  const helperTitle = "How to add an area";
  const helpDescription =
    "If you are interested in getting detailed statistics about a specific place or a potential project site, " +
    "you must add an area. This requires you to sketch an area on the map, upload a shapefile, or search for county or (HUC-8).\n\n" +
    "The results will allow you to examine and compare your project site(s) by proximity to Resilience Hubs and explore and compare the " +
    "Community Exposure and Fish and Wildlife Indices in the surrounding area.";

  return (
    <StyledGrid
      container
      spacing={0}
      justifyContent="center"
      alignItems="center"
      sx={{
        height: analyzeAreaVisible ? "250px" : "50px",
        minHeight: analyzeAreaVisible ? "250px" : "50px",
      }}
      style={{ transition: "all 0.333s ease-in-out" }}
    >
      <Grid px={2} xs={12}>
        <Box
          px={1}
          py={0.75}
          sx={{ display: "flex", flexWrap: "nowrap", alignItems: "center" }}
        >
          <LibraryAdd />
          <Typography
            px={1}
            sx={{ cursor: "default", width: "100%", alignItems: "center" }}
          >
            Add an area to analyze
          </Typography>
          <HelpPopup
            helpTitle={helperTitle}
            helpDescription={helpDescription}
            useExamplesLink={true}
          />
          <UpperRightIconButton ariaLabel="Minimize" onClick={minimizeOnClick}>
            <ArrowDropDownCircle
              sx={{
                transform: analyzeAreaVisible ? "rotate(-180deg)" : "none",
              }}
            />
          </UpperRightIconButton>
        </Box>
      </Grid>
      {analyzeAreaVisible && (
        <>
          <Grid px={2} xs={12}>
            <DrawArea map={map} disabled={drawAreaDisabled} />
          </Grid>
          <Grid px={2} xs={12}>
            <Upload
              setGeoToRedraw={setGeoToRedraw}
              setErrorState={setErrorState}
            />
          </Grid>
          <Grid px={2} xs={12}>
            <SearchCustom map={map} setErrorState={setErrorState} />
          </Grid>
          <Grid px={2} xs={10}>
            <Buffer
              bufferCheckbox={bufferCheckbox}
              setBufferCheckbox={setBufferCheckbox}
            />
          </Grid>
          <Grid px={2} xs={2} sx={{ alignItems: "flex-end" }}>
            <Box
              mt={1}
              pr={1}
              sx={{
                width: "100%",
                display: "flex",
                cursor: "pointer",
                justifyContent: "flex-end",
              }}
            >
              {isLimitMessage ? (
                <HelpAlert
                  helpTitle={`Data warnings for ${selectedRegion}`}
                  helpDescription={isLimitMessage}
                />
              ) : (
                <></>
              )}
            </Box>
          </Grid>
        </>
      )}
    </StyledGrid>
  );
}

MapActionCard.propTypes = {
  map: PropTypes.object,
  drawAreaDisabled: PropTypes.bool,
  setGeoToRedraw: PropTypes.func,
  setErrorState: PropTypes.func,
};
