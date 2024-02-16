import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { changeUseBuffer } from "../../reducers/mapPropertiesSlice";

const useBufferSelector = (state) => state.mapProperties.useBuffer;

// just a place holder needs props passed in and image etc
export default function Buffer() {
  const dispatch = useDispatch();
  const bufferCheckbox = useSelector(useBufferSelector);

  const setBufferCheckbox = () => {
    dispatch(changeUseBuffer());
  };

  return (
    <Box p={0.75}>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={bufferCheckbox} />}
          variant="text"
          color="CRESTPrimary"
          aria-label={"Include a Buffer for Nearby Impacts"}
          label="Include a Buffer for Nearby Impacts"
          sx={{
            height: (theme) => theme.spacing(4.5),
            textTransform: "none",
            justifyContent: "start",
          }}
          onChange={() => {
            setBufferCheckbox(!bufferCheckbox);
          }}
        />
      </FormGroup>
    </Box>
  );
}
