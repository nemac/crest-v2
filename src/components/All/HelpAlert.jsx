import React, { useState } from "react";

import PropTypes from "prop-types";
import { styled } from "@mui/system";
import Alert from "@mui/material/Alert";
import Cancel from "@mui/icons-material/Cancel";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { IconButton, Popper, Box, Typography } from "@mui/material";
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
  borderBottomRightRadius: theme.spacing(0.5),
  borderBottomLeftRadius: theme.spacing(0.5),
  whiteSpace: "pre-wrap",
}));

export default function HelpAlert(props) {
  const { helpTitle, helpDescription } = props;
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
      <Box p={0} m={0}>
        <WarningAmberOutlinedIcon
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          onClick={handleClick}
          color="warning"
          sx={{ fontSize: "1.25rem", marginLeft: (theme) => theme.spacing(2) }}
        />
        <Popper
          id={id}
          open={open}
          placement={"bottom-end"}
          anchorEl={anchorEl}
          sx={{ zIndex: 1500, borderRadius: (theme) => theme.spacing(0.5) }}
        >
          <PopupBox>
            <PopupHeaderBox>
              <PopupTitleBox>{helpTitle}</PopupTitleBox>
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
                <Cancel
                  sx={{
                    color: "#394E61",
                  }}
                />
              </IconButton>
            </PopupHeaderBox>
            <PopupContentBox>
              <Alert severity="warning" sx={{ borderRadius: 0 }}>
                <Typography variant="body2" component="p">
                  {helpDescription}
                </Typography>
              </Alert>
            </PopupContentBox>
          </PopupBox>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
}
HelpAlert.propTypes = {
  helpTitle: PropTypes.string.isRequired,
  helpDescription: PropTypes.string.isRequired,
};
