import * as React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import { PolylineOutlined } from "@mui/icons-material";

import { toggleSketchArea } from "../../reducers/mapPropertiesSlice";

const StyledButton = styled(Button)(({ theme }) => ({
  height: theme.spacing(4.5),
  textTransform: "none",
  justifyContent: "start",
}));

export default function DrawArea({ disabled }) {
  const dispatch = useDispatch();

  return (
    <Box p={0.75}>
      <StyledButton
        variant="contained"
        color="CRESTPrimary"
        fullWidth={true}
        aria-label={"Sketch an Area"}
        onClick={() => dispatch(toggleSketchArea())}
        startIcon={<PolylineOutlined />}
        disabled={Boolean(disabled)}
      >
        Sketch an Area
      </StyledButton>
    </Box>
  );
}

DrawArea.propTypes = {
  disabled: PropTypes.bool,
};
