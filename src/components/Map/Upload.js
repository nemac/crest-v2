/*
Purpose
  handles uploading as shapefile has description of what is needed
  handle all the errors
  - missing one of these .dbf, .shp, shx, .prj
  - Area is too big or too big to process
  - Area is not within any assessment
  - There are too many shapes in the file (max is 30)
  - One or more areas are too big to process
  - Shapefile has invalid geometry probably a self-intersection
  - Shapefile has multiple shapes should we treat them as one area or as separate?
  - Shapefile has multi-shape polygons should we treat them as one area or as separate?

  // TODO: need to add these to sperate component.js files for each action
Child Components
  - upload.js

Libs
  - file converter for zips use v1 in v2 we probably want to reuse
  - file converter for shapefile to geosjon on the browser se v1 in v2 we probably want to reuse

API
  - Not sure yet

State needed
  - Not sure yet

Props
  - Not sure yet
*/
import * as React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import {
  FileUploadOutlined
  // FileUpload
} from '@mui/icons-material';

import { uploadedShapeFileGeoJSON } from '../../reducers/mapPropertiesSlice';
import { Shape2GeoJSON } from '../../api/shapeFileToGeoJson';

const useStyles = makeStyles((theme) => ({
  actionButton: {
    height: theme.spacing(4.5),
    textTransform: 'none',
    justifyContent: 'start'
  }
}));

// just a place holder needs props passed in and image etc
export default function Upload(props) {
  const { setTooLargeLayerOpen } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [file, setFile] = React.useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // This useEffect watches for the uploaded file
  React.useEffect(() => {
    if (!file) {
      return;
    }
    // reject incoming file if the size is greater than 10 MB
    if (file.size > 100000000000) {
      setTooLargeLayerOpen(true);
      setFile(null);
      return;
    }

    const uploadShapeFilePromise = Shape2GeoJSON(file);
    uploadShapeFilePromise.then((data) => {
      dispatch(uploadedShapeFileGeoJSON(data));
    });
  }, [file, setFile, dispatch, setTooLargeLayerOpen]);

  return (
    <Box p={0.75} >
      <Button
        variant="contained"
        color="CRESTPrimary"
        fullWidth={true}
        aria-label={'Upload Shapefile'}
        className={classes.actionButton}
        component="label"
        startIcon={<FileUploadOutlined />}
      >
        Upload Shapefile
        <input
          type="file"
          accept=".zip"
          onChange={handleFileChange}
          style={{ display: 'none' }}/>
      </Button>
    </Box>
  );
}

Upload.propTypes = {
  setTooLargeLayerOpen: PropTypes.func
};
