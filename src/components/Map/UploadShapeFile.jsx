import * as React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import shp from "shpjs";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FileUploadOutlined } from "@mui/icons-material";

import { validPolygon } from "../../utility/utilityFunctions";
import { uploadedShapeFileGeoJSON } from "../../reducers/mapPropertiesSlice";
import { sketchShapeThresholds } from "../../configuration/config";
import {
  UPLOAD_PLANS,
  proceedAfterLongWarning,
  uploadPlan,
} from "./uploadSteps";

export default function Upload(props) {
  const { setGeoToRedraw, setErrorState } = props;
  const [inputValue, setInputValue] = React.useState("");
  const dispatch = useDispatch();
  const errorTitle = "Upload Error";
  const maxFileSize = sketchShapeThresholds.maxFileSize;
  const maxFeatures = sketchShapeThresholds.maxFeatures;

  const correctionDialog = (geojson) => (previous) => ({
    ...previous,
    error: true,
    errorTitle: "Invalid Shapefile",
    errorType: "warning",
    errorMessage:
      "There are invalid shapes in the shapefile. Proceed to the shape file correction screen?",
    errorClose: () => {
      setInputValue("");
      setErrorState({ ...previous, error: false });
    },
    acceptButtonText: "Proceed",
    acceptButtonClose: () => {
      setInputValue("");
      setGeoToRedraw(geojson);
      setErrorState({ ...previous, error: false });
    },
  });

  const handleFileChange = async (e) => {
    try {
      const file = e.target.files[0];
      // reject incoming file if the size is greater than 10 MB
      if (file.size > maxFileSize) {
        setErrorState((previous) => ({
          ...previous,
          error: true,
          errorTitle,
          errorMessage:
            "The file size of the uploaded file is too large. Please upload a file less than 10 MB.",
        }));
        return;
      }

      const buffer = await file.arrayBuffer();
      const geojson = await shp(buffer);
      const countFeatures = geojson ? geojson.features.length : 0;
      // Shapes are only validated when the file is small enough to process.
      const hasInvalidShapes =
        countFeatures <= maxFeatures &&
        geojson.features.some((feature) => !validPolygon(feature));
      const plan = uploadPlan(
        countFeatures,
        hasInvalidShapes,
        sketchShapeThresholds,
      );

      if (plan === UPLOAD_PLANS.tooManyShapes) {
        setErrorState((previous) => ({
          ...previous,
          error: true,
          errorTitle: "There are too many shapes in the shapefile",
          errorMessage: `CREST can process ${maxFeatures} or fewer shapes, and you included ${countFeatures}.
            Please remove ${countFeatures - maxFeatures} shapes from the file and try again.`,
        }));
        return;
      }

      if (plan === UPLOAD_PLANS.warnLongProcessing) {
        setErrorState((previous) => ({
          ...previous,
          error: true,
          errorTitle: "Long processing warning",
          errorType: "warning",
          errorMessage: `Your shapefile contains ${countFeatures} features and may take up to 30 seconds to process. Do you want to proceed?`,
          errorClose: () => {
            setInputValue("");
            setErrorState({ ...previous, error: false });
          },
          acceptButtonText: "Proceed",
          acceptButtonClose: () => {
            setInputValue("");
            setErrorState({ ...previous, error: false });
            proceedAfterLongWarning({
              hasInvalidShapes,
              geojson,
              dispatch,
              offerCorrection: () => setErrorState(correctionDialog(geojson)),
            });
          },
        }));
        return;
      }

      if (plan === UPLOAD_PLANS.offerCorrection) {
        setErrorState(correctionDialog(geojson));
        return;
      }

      dispatch(uploadedShapeFileGeoJSON(geojson));
    } catch (error) {
      setErrorState((previous) => ({
        ...previous,
        error: true,
        errorTitle,
        errorMessage: `Something wrong with zipfile. Please try another file. Error: ${error}`,
      }));
    }
  };

  return (
    <Box p={0.75}>
      <Button
        variant="contained"
        color="CRESTPrimary"
        fullWidth={true}
        aria-label={"Upload Shapefile"}
        sx={{
          height: (theme) => theme.spacing(4.5),
          textTransform: "none",
          justifyContent: "start",
        }}
        component="label"
        startIcon={<FileUploadOutlined />}
      >
        Upload Shapefile
        <input
          type="file"
          value={inputValue}
          accept=".zip"
          max={1}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </Button>
    </Box>
  );
}

Upload.propTypes = {
  setGeoToRedraw: PropTypes.func,
  setErrorState: PropTypes.func,
};
