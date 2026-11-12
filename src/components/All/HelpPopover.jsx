import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/system";
import { Cancel } from "@mui/icons-material";
import { IconButton, Popper, Box } from "@mui/material";

const PopupBox = styled(Box)(({ theme }) => ({
  width: "450px",
  borderRadius: theme.spacing(0.5),
  [theme.breakpoints.down("lg")]: {
    width: "300px",
  },
  backgroundColor: theme.palette.CRESTLight.main,
  color: theme.palette.CRESTLight.contrastText,
  border: `2px solid ${theme.palette.CRESTLightBorderColor.main}`,
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

export default function HelpPopover(props) {
  const {
    id,
    open,
    anchorEl,
    title,
    onClose,
    padContent = true,
    footer,
    children,
  } = props;

  return (
    <Popper
      id={id}
      open={open}
      placement={"bottom-end"}
      anchorEl={anchorEl}
      sx={{ zIndex: 1500, borderRadius: (theme) => theme.spacing(0.5) }}
    >
      <PopupBox>
        <PopupHeaderBox>
          <PopupTitleBox>{title}</PopupTitleBox>
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
            aria-label="Close"
            onClick={onClose}
            size="large"
          >
            <Cancel sx={{ color: "#394E61" }} />
          </IconButton>
        </PopupHeaderBox>
        <PopupContentBox p={padContent ? 1 : 0}>{children}</PopupContentBox>
        {footer}
      </PopupBox>
    </Popper>
  );
}

HelpPopover.propTypes = {
  id: PropTypes.string,
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  padContent: PropTypes.bool,
  footer: PropTypes.node,
  children: PropTypes.node,
};
