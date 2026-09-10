import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Alert from "@mui/material/Alert";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import CancelIcon from "@mui/icons-material/Cancel";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import SaveIcon from "@mui/icons-material/Save";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { download } from "@crmackey/shp-write";

import MapLibreMapContainer from "./MapLibreMapContainer.jsx";
import GenericMapHolder from "./GenericMapHolder.jsx";
import ShapeActionButton from "./ShapeActionButton.jsx";
import useTerraDraw from "./useTerraDraw";
import useShapefileEditor, {
  createCorrectionModes,
} from "./useShapefileEditor";

import { uploadedShapeFileGeoJSON } from "../../reducers/mapPropertiesSlice";

/* eslint-disable no-nested-ternary */

const selectedZoomSelector = (state) => state.mapProperties.zoom;
const selectedCenterSelector = (state) => state.mapProperties.center;

const StyledBox = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "100%",
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  borderColor: theme.palette.CRESTBorderColor.main,
  borderStyle: "solid",
  borderWidth: "1px",
  overflowY: "scroll",
}));

export default function ShapeFileCorrectionMap(props) {
  const { geoToRedraw, setGeoToRedraw } = props;

  const dispatch = useDispatch();
  const center = useSelector(selectedCenterSelector, () => true);
  const zoom = useSelector(selectedZoomSelector, () => true);
  const [map, setMap] = useState(null);
  const draw = useTerraDraw(map, createCorrectionModes);
  const {
    steps,
    activeStep,
    setActiveStep,
    isEdit,
    numberInvalid,
    numberNotFixed,
    startEdit,
    saveEdits,
    cancelEdits,
    deleteArea,
    completedCollection,
  } = useShapefileEditor(map, draw, geoToRedraw);

  const handleNext = () => setActiveStep(activeStep + 1);
  const handlePrevious = () => setActiveStep(activeStep - 1);

  const isCurrentFixed = steps[activeStep]?.isFixed;
  const isCurrentDeleted = steps[activeStep]?.howFixedText === "DELETED";

  return (
    <GenericMapHolder
      leftColumn={
        <StyledBox>
          <Grid container>
            <Grid xs={12}>
              {numberNotFixed === 0 ? (
                <Alert severity={"success"} sx={{ backgroundColor: "#444444" }}>
                  All issues have been resolved.
                </Alert>
              ) : (
                <Alert severity={"warning"} sx={{ backgroundColor: "#444444" }}>
                  While importing your shapefile we found {numberInvalid}{" "}
                  {numberInvalid < 2
                    ? " area with an issue"
                    : " areas with isssues"}
                  .
                </Alert>
              )}
            </Grid>
            <Grid
              container
              spacing={0}
              px={1}
              pt={2}
              pb={2}
              m={0}
              sx={{ width: "100%" }}
            >
              <Grid
                container
                spacing={0}
                p={0}
                mt={2}
                mb={0}
                mx={0}
                sx={{ width: "100%" }}
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                }}
              >
                <Grid xs={12} md={3}>
                  <ShapeActionButton
                    buttonLabel={"Back"}
                    buttonName={"Back"}
                    onClick={handlePrevious}
                    buttonDisabled={isEdit || activeStep === 0}
                    isIconFirst={true}
                  >
                    <ArrowCircleLeftIcon />
                  </ShapeActionButton>
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {activeStep + 1} / {numberInvalid}
                </Grid>
                <Grid xs={12} md={3}>
                  <ShapeActionButton
                    buttonLabel={"Next"}
                    buttonName={"Next"}
                    onClick={handleNext}
                    buttonDisabled={isEdit || activeStep >= steps.length - 1}
                    isIconFirst={false}
                  >
                    <ArrowCircleRightIcon />
                  </ShapeActionButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={0}
              px={2}
              pt={2}
              pb={1}
              m={0}
              sx={{ width: "100%" }}
            >
              <Grid xs={12} px={2} pt={0} pb={0}>
                <Box>
                  <Typography variant="h6" component="div">
                    Area {activeStep + 1}
                  </Typography>
                  {isCurrentFixed ? (
                    <></>
                  ) : (
                    <Typography variant="h7" component="div">
                      Please review and resolve the issues
                    </Typography>
                  )}
                </Box>
              </Grid>
              <Grid xs={12} px={2} pt={0} pb={0}>
                {isCurrentFixed ? (
                  isCurrentDeleted ? (
                    <Box>
                      <Alert severity="success">
                        <strong>{steps[activeStep]?.howFixedText}</strong>
                      </Alert>
                    </Box>
                  ) : (
                    <Box>
                      <Alert severity="success">
                        <strong>{steps[activeStep]?.howFixedText}</strong>
                      </Alert>
                    </Box>
                  )
                ) : (
                  <Box>
                    <Alert severity="error">
                      {steps[activeStep]?.invalidText}
                      <br />
                      {steps[activeStep]?.fixStatus}
                      &nbsp;
                      {steps[activeStep]?.fixStatusGoal}
                    </Alert>
                  </Box>
                )}
              </Grid>
              <Grid xs={12} px={2} pt={2} pb={0}>
                <Box>
                  <Accordion style={{ padding: 0 }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      Tips to fix this area
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" component="p">
                        {steps[activeStep]?.fixText}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={0}
            px={2}
            pt={1}
            pb={2}
            m={0}
            sx={{ width: "100%" }}
          >
            <Grid
              xs={12}
              px={2}
              pt={2}
              pb={0}
              style={{
                backgroundImage: isEdit
                  ? "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))"
                  : null,
              }}
            >
              <Button
                variant="contained"
                color="CRESTPrimary"
                aria-label={"edit"}
                fullWidth={true}
                onClick={startEdit}
                style={{ display: numberNotFixed > 0 ? "inline-flex" : "none" }}
              >
                <EditIcon style={{ paddingRight: "8px" }} />
                Edit area
              </Button>
            </Grid>
            <Grid
              container
              spacing={0}
              px={3}
              pt={1}
              pb={2}
              m={0}
              sx={{ width: "100%" }}
              style={{
                display: isEdit ? "inline-flex" : "none",
                backgroundImage:
                  "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
              }}
            >
              <Grid xs={12} md={6} px={1} pt={2} pb={0}>
                <Button
                  variant="contained"
                  color="CRESTSecondary"
                  aria-label={"Save"}
                  fullWidth={true}
                  onClick={saveEdits}
                  style={{
                    display: isEdit ? "inline-flex" : "none",
                    fontSize: "0.775rem",
                  }}
                >
                  <SaveIcon style={{ paddingRight: "8px" }} />
                  Save edits
                </Button>
              </Grid>
              <Grid xs={12} md={6} px={1} pt={2} pb={0}>
                <Button
                  variant="contained"
                  color="CRESTSecondary"
                  aria-label={"Cancel edits"}
                  fullWidth={true}
                  onClick={cancelEdits}
                  style={{
                    display: isEdit ? "inline-flex" : "none",
                    fontSize: "0.775rem",
                  }}
                >
                  <CancelIcon style={{ paddingRight: "8px" }} />
                  Cancel edits
                </Button>
              </Grid>
            </Grid>
            <Grid xs={12} md={12} px={2} pt={2} pb={0}>
              <Button
                variant="contained"
                color="CRESTPrimary"
                aria-label={"Delete"}
                fullWidth={true}
                onClick={deleteArea}
                style={{ display: numberNotFixed > 0 ? "inline-flex" : "none" }}
              >
                <DeleteForeverIcon style={{ paddingRight: "8px" }} />
                Delete area
              </Button>
            </Grid>

            <Grid xs={12} px={1} pt={2} pb={0}>
              <Button
                variant="contained"
                color="CRESTPrimary"
                aria-label={"Cancel upload"}
                fullWidth={true}
                onClick={() => setGeoToRedraw(null)}
              >
                <DisabledByDefaultIcon style={{ paddingRight: "8px" }} />
                Cancel upload
              </Button>
            </Grid>

            <Grid
              container
              spacing={0}
              p={0}
              mt={2}
              mb={0}
              mx={0}
              sx={{ width: "100%" }}
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
              }}
            >
              <Grid xs={12} md={3}>
                <ShapeActionButton
                  buttonLabel={"Back"}
                  buttonName={"Back"}
                  onClick={handlePrevious}
                  buttonDisabled={isEdit || activeStep === 0}
                  isIconFirst={true}
                >
                  <ArrowCircleLeftIcon />
                </ShapeActionButton>
              </Grid>
              <Grid
                xs={12}
                md={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {activeStep + 1} / {numberInvalid}
              </Grid>
              <Grid xs={12} md={3}>
                <ShapeActionButton
                  buttonLabel={"Next"}
                  buttonName={"Next"}
                  onClick={handleNext}
                  buttonDisabled={isEdit || activeStep >= steps.length - 1}
                  isIconFirst={false}
                >
                  <ArrowCircleRightIcon />
                </ShapeActionButton>
              </Grid>
            </Grid>

            <Grid xs={12} px={1} pt={2} pb={0}>
              <Button
                variant="contained"
                color="CRESTCta"
                aria-label={"Complete the upload"}
                fullWidth={true}
                style={{
                  display: numberNotFixed === 0 ? "inline-flex" : "none",
                }}
                onClick={() => {
                  setGeoToRedraw(null);
                  dispatch(uploadedShapeFileGeoJSON(completedCollection()));
                }}
              >
                <FileUploadOutlinedIcon style={{ paddingRight: "8px" }} />
                Complete the upload
              </Button>
            </Grid>
            <Grid xs={12} px={1} pt={2} pb={0}>
              <Button
                variant="contained"
                color="CRESTPrimary"
                aria-label={"Download the shapefile"}
                fullWidth={true}
                style={{
                  display: numberNotFixed === 0 ? "inline-flex" : "none",
                }}
                onClick={() => download(completedCollection())}
              >
                <DownloadIcon style={{ paddingRight: "8px" }} />
                Download the shapefile (with edits)
              </Button>
            </Grid>
          </Grid>
        </StyledBox>
      }
      mapCard={
        <MapLibreMapContainer center={center} zoom={zoom} setMap={setMap} />
      }
    />
  );
}

ShapeFileCorrectionMap.propTypes = {
  geoToRedraw: PropTypes.object,
  setGeoToRedraw: PropTypes.func,
};
