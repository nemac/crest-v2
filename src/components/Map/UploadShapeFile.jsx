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

export default function Upload(props) {
  const { setGeoToRedraw, setErrorState } = props;
  const [inputValue, setInputValue] = React.useState("");
  const dispatch = useDispatch();
  const errorTitle = "Upload Error";
  const maxFileSize = sketchShapeThresholds.maxFileSize;
  const maxFeatures = sketchShapeThresholds.maxFeatures;
  const maxFeaturesCaution = sketchShapeThresholds.maxFeaturesWarning;

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

      let tooLargeFlag = false;
      const buffer = await file.arrayBuffer();
      const geojson = await shp(buffer);
      const countFeatures = geojson ? geojson.features.length : 0;

      // Limiting many features for upload
      // we may want to move this to a config file
      if (countFeatures > maxFeatures) {
        setErrorState((previous) => ({
          ...previous,
          error: true,
          errorTitle: "There are too many shapes in the shapefile",
          errorMessage: `CREST can process ${maxFeatures} or fewer shapes, and you included ${countFeatures}.
            Please remove ${countFeatures - maxFeatures} shapes from the file and try again.`,
        }));
        return;
      }

      geojson.features.forEach((feature) => {
        if (!validPolygon(feature)) {
          tooLargeFlag = true;
        }
      });

      // this is not great but it is working so we can let it go
      //   for now
      // long process
      if (countFeatures > maxFeaturesCaution) {
        setErrorState((previous) => ({
          ...previous,
          error: true,
          errorTitle: "Long processing warning",
          errorType: "warning",
          errorMessage: `Your shapfile contains ${maxFeaturesCaution} features and may take of 30 seconds to process. Do you want proceed?`,
          errorClose: () => {
            setInputValue("");
            setErrorState({ ...previous, error: false });
          },
          acceptButtonText: "Proceed",
          acceptButtonClose: () => {
            // long process with invalid shapes
            if (tooLargeFlag) {
              setErrorState((previousToLarge) => ({
                ...previousToLarge,
                error: true,
                errorTitle: "Invalid Shapefile",
                errorType: "warning",
                errorMessage:
                  "There are invalid shapes in the shapefile. Proceed to the shape file correction screen?",
                errorClose: () => {
                  setInputValue("");
                  setErrorState({ ...previousToLarge, error: false });
                },
                acceptButtonText: "Proceed",
                acceptButtonClose: () => {
                  setInputValue("");
                  setGeoToRedraw(geojson);
                  setErrorState({ ...previousToLarge, error: false });
                },
              }));
            } else {
              setInputValue("");
              setErrorState({ ...previous, error: false });
            }
          },
        }));
        return;
      }

      if (tooLargeFlag) {
        setErrorState((previous) => ({
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
        }));
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
