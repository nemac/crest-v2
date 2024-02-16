import React, { useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/system";
import { HelpOutlineOutlined, Cancel } from "@mui/icons-material";
import { IconButton, Popper, Box } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const PopupBox = styled(Box)(({ theme }) => ({
  width: "450px",
  borderRadius: theme.spacing(0.5),
  [theme.breakpoints.down("lg")]: {
    width: "300px",
  },
  backgroundColor: theme.palette.CRESTLight.main,
  color: theme.palette.CRESTLight.contrastText,
  border: `1px solid ${theme.palette.CRESTLightBorderColor.main}`,
}));

const PopupHeaderBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#E6E6E6",
  padding: theme.spacing(1),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderTopRightRadius: theme.spacing(0.5),
  borderTopLeftRadius: theme.spacing(0.5),
}));

const PopupTitleBox = styled(Box)(({ theme }) => ({
  fontSize: "1.1rem",
  fontWeight: 500,
  width: "100%",
  borderTopRightRadius: theme.spacing(0.5),
  borderTopLeftRadius: theme.spacing(0.5),
}));

const PopupContentBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.CRESTLight.main,
  color: theme.palette.CRESTLight.contrastText,
  padding: theme.spacing(1),
  borderBottomRightRadius: theme.spacing(0.5),
  borderBottomLeftRadius: theme.spacing(0.5),
}));

export default function LayerDescription(props) {
  const { layerName, layerDescription } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [clicked, setClicked] = useState(false);

  const handlePopoverOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handlePopoverClose = () => {
    if (!clicked) {
      setAnchorEl(null);
    }
  };

  const handlePopoverButtonClose = () => {
    setAnchorEl(null);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
    setClicked(false);
  };
  const handleClick = () => {
    setClicked(!clicked);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <ClickAwayListener
      onClickAway={anchorEl === null ? () => {} : handleClickAway}
    >
      <IconButton
        variant="contained"
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onClick={handleClick}
        sx={{ padding: (theme) => theme.spacing(0.5) }}
        size="large"
      >
        <HelpOutlineOutlined />
        <Popper
          id={id}
          open={open}
          placement={"bottom-end"}
          anchorEl={anchorEl}
          sx={{ zIndex: 500, borderRadius: (theme) => theme.spacing(0.5) }}
        >
          <PopupBox>
            <PopupHeaderBox>
              <PopupTitleBox>{layerName}</PopupTitleBox>
              <IconButton
                sx={{
                  "&": (theme) => ({
                    color: theme.palette.CRESTLight.contrastText,
                    height: theme.spacing(4.5),
                    padding: theme.spacing(0.375),
                    justifyContent: "end",
                  }),
                }}
                variant="contained"
                color="CRESTPrimary"
                aria-label="Minimize"
                onClick={handlePopoverButtonClose}
                size="large"
              >
                <Cancel />
              </IconButton>
            </PopupHeaderBox>
            <PopupContentBox>{layerDescription}</PopupContentBox>
          </PopupBox>
        </Popper>
      </IconButton>
    </ClickAwayListener>
  );
}
LayerDescription.propTypes = {
  layerName: PropTypes.string.isRequired,
  layerDescription: PropTypes.string.isRequired,
};
