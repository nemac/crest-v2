import * as React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {
  FileUploadOutlined
  // FileUpload
} from '@mui/icons-material';

import { uploadedShapeFileGeoJSON } from '../../reducers/mapPropertiesSlice';
import { Shape2GeoJSON } from '../../api/shapeFileToGeoJson';

// just a place holder needs props passed in and image etc
export default function Upload(props) {
  const { setTooLargeLayerOpen } = props;
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
        sx={{ height: (theme) => theme.spacing(4.5), textTransform: 'none', justifyContent: 'start' }}
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
