import React, { useState } from "react";

import PropTypes from "prop-types";
import { styled } from "@mui/system";
import Alert from "@mui/material/Alert";
import Cancel from "@mui/icons-material/Cancel";
import { WarningAmberOutlined, Warning } from "@mui/icons-material";
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
  border: `2px solid ${theme.palette.CRESTLightBorderColor.light}`,
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
  const { helpTitle, helpDescription, useText } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);

  const handlePopoverOpen = (e) => {
    setAnchorEl(e.currentTarget);
    setMouseOver(true);
  };

  const handlePopoverClose = () => {
    if (!clicked) {
      setAnchorEl(null);
      setMouseOver(false);
    }
  };

  const handlePopoverButtonClose = () => {
    setAnchorEl(null);
    setMouseOver(false);
    setClicked(false);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
    setClicked(false);
    setMouseOver(false);
  };
  const handleClick = () => {
    setClicked(true);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <ClickAwayListener
      onClickAway={anchorEl === null ? () => {} : handleClickAway}
    >
      <Box p={0} m={0} width="100%">
        {clicked || mouseOver ? (
          <span
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            onClick={handleClick}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "4px",
              borderRadius: "4px",
              justifyItems: "center",
              backgroundColor: "rgba(255,167,38,0.3)",
            }}
          >
            <Warning
              color="warning"
              sx={{
                fontSize: "1.25rem",
                marginLeft: (theme) => theme.spacing(0),
                justifyItems: "center",
              }}
            />
            {useText ? (
              <span
                style={{
                  fontSize: "0.85rem",
                  paddingLeft: "8px",
                  color: "#FFA726",
                  justifyItems: "center",
                }}
              >
                {helpTitle}{" "}
              </span>
            ) : (
              <></>
            )}
          </span>
        ) : (
          <span
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            onClick={handleClick}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "4px",
              borderRadius: "4px",
              justifyItems: "center",
              backgroundColor: "rgba(255,167,38,0)",
            }}
          >
            <WarningAmberOutlined
              color="warning"
              sx={{
                fontSize: "1.25rem",
                marginLeft: (theme) => theme.spacing(0),
                justifyItems: "center",
              }}
            />
            {useText ? (
              <span
                style={{
                  fontSize: "0.85rem",
                  paddingLeft: "8px",
                  color: "#FFA726",
                  justifyItems: "center",
                }}
              >
                {helpTitle}{" "}
              </span>
            ) : (
              <></>
            )}
          </span>
        )}

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
  useText: PropTypes.bool,
};
