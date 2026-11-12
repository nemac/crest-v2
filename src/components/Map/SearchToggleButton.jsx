import React, { forwardRef } from "react";
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

const expandedButtonStyle = {
  ...toggleButtonStyle,
  boxShadow: "none",
  "&:hover": { backgroundColor: "#FFFFFF", boxShadow: "none" },
};

const SearchToggleButton = forwardRef(({ expanded, onToggle }, ref) => {
  const handleClick = (event) => {
    event.stopPropagation();
    onToggle();
  };

  return (
    <Tooltip title={SEARCH_LABEL} placement="right">
      <Button
        ref={ref}
        variant="contained"
        onClick={handleClick}
        sx={expanded ? expandedButtonStyle : toggleButtonStyle}
        aria-label={SEARCH_LABEL}
        aria-expanded={expanded}
      >
        <SearchIcon />
      </Button>
    </Tooltip>
  );
});

SearchToggleButton.displayName = "SearchToggleButton";

SearchToggleButton.propTypes = {
  expanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default SearchToggleButton;
