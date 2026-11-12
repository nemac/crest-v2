import React from "react";
import PropTypes from "prop-types";
import { Button, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SEARCH_LABEL = "Search for places or addresses";

const toggleButtonStyle = {
  minHeight: "30px",
  minWidth: "30px",
  width: "30px",
  height: "30px",
  color: "#000000",
  backgroundColor: "#FFFFFF",
  "&:hover": { backgroundColor: "#FFFFFF" },
  "&.Mui-focusVisible": {
    outline: "2px solid #000000",
    boxShadow: "0 0 0 4px #FFFFFF",
  },
};

export default function SearchToggleButton({ onOpen, autoFocus = false }) {
  const handleClick = (event) => {
    event.stopPropagation();
    onOpen();
  };

  return (
    <Tooltip title={SEARCH_LABEL} placement="right">
      <Button
        variant="contained"
        onClick={handleClick}
        autoFocus={autoFocus}
        sx={toggleButtonStyle}
        aria-label={SEARCH_LABEL}
      >
        <SearchIcon />
      </Button>
    </Tooltip>
  );
}

SearchToggleButton.propTypes = {
  onOpen: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool,
};
