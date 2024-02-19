/*
Purpose
  Individual button for the charts held in AnalyzeArea-ChartHeaderActionButtons.js

  There are four buttons which include
    - Sort (sorts data from high to low or low to high. sort will display a menu
      to choose sort order and sort field)
    - Export All (exports all the maps to png/svg (if in graph mode) or the data
      to CSV (if in table mode). will display a menu for the user to pick which format)
    - Graph/table (toggles graph or table mode)
    - Remove All (Removes all areas from map and anaylsis results area)

    We need to decide if the button action happens here?

Child Components
  - None

Libs
  - Not sure yet

API
  - Not sure yet

State needed
  - More or less?
  - Graph or table mode
  - Sort field
  - Sort direction

Props
  - Not sure yet
*/
import React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  [theme.breakpoints.between("md", "xl")]: {
    fontSize: "0.80rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.80rem",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  borderRadius: 0,
  maxHeight: theme.spacing(10),
  textTransform: "capitalize",
  flexWrap: "wrap",
  "&:hover": {
    backgroundColor: "#6f6f6f",
  },
}));

// just a place holder needs props passed in and image etc
export default function ChartHeaderActionButton(props) {
  const { children, buttonLabel, buttonName, onClick } = props;

  const handleClick = (event) => {
    onClick(event);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StyledButton
        variant="text"
        color="CRESTPrimary"
        fullWidth={true}
        aria-label={buttonName}
        value={buttonName}
        onClick={handleClick}
      >
        <StyledBox component="div" pt={0}>
          {children}
        </StyledBox>
        <StyledBox component="div" pb={0}>
          {buttonLabel}
        </StyledBox>
      </StyledButton>
    </Box>
  );
}

ChartHeaderActionButton.propTypes = {
  children: PropTypes.node.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  buttonName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
