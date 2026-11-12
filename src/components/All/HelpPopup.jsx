import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import PropTypes from "prop-types";
import { styled } from "@mui/system";
import { Help, HelpOutlineOutlined } from "@mui/icons-material";
import { IconButton, Box, Typography } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Link from "@mui/material/Link";
import { changeActiveTab } from "../../reducers/NavBarSlice";
import HelpPopover from "./HelpPopover.jsx";
import useHoverPopover from "./useHoverPopover";

const PopupFooterBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.CRESTLight.dark,
  color: theme.palette.CRESTLight.contrastText,
  padding: theme.spacing(3),
  whiteSpace: "pre-wrap",
  fontSize: "0.85rem",
  borderBottomRightRadius: theme.spacing(0.5),
  borderBottomLeftRadius: theme.spacing(0.5),
}));

const ExamplesLink = () => {
  const dispatch = useDispatch();
  return (
    <Link
      value="Examples"
      to="/Examples"
      component={RouterLink}
      onClick={() => dispatch(changeActiveTab("Examples"))}
    >
      examples
    </Link>
  );
};

const ExamplesFooter = () => (
  <PopupFooterBox>
    Still have questions? Learn how to add areas by stepping through some&nbsp;
    <ExamplesLink />
    &nbsp;.
  </PopupFooterBox>
);

export default function HelpPopup(props) {
  const {
    helpTitle,
    helpDescription,
    useExamplesLink,
    iconFontSize = "1.40rem",
    descriptionVariant = "body2",
  } = props;
  const popover = useHoverPopover();

  return (
    <ClickAwayListener onClickAway={popover.close}>
      <IconButton
        variant="contained"
        aria-describedby={popover.open ? popover.popoverId : undefined}
        aria-haspopup="true"
        onMouseEnter={popover.show}
        onMouseLeave={popover.hideUnlessPinned}
        onClick={popover.togglePin}
        sx={{ padding: (theme) => theme.spacing(0.5) }}
        size="large"
      >
        {popover.highlighted ? (
          <Help sx={{ fontSize: iconFontSize }} />
        ) : (
          <HelpOutlineOutlined sx={{ fontSize: iconFontSize }} />
        )}
        <HelpPopover
          id={popover.popoverId}
          open={popover.open}
          anchorEl={popover.anchorEl}
          title={helpTitle}
          onClose={popover.close}
          footer={useExamplesLink ? <ExamplesFooter /> : null}
        >
          <Typography variant={descriptionVariant} component="p">
            {helpDescription}
          </Typography>
        </HelpPopover>
      </IconButton>
    </ClickAwayListener>
  );
}

HelpPopup.propTypes = {
  helpTitle: PropTypes.string.isRequired,
  helpDescription: PropTypes.string.isRequired,
  useExamplesLink: PropTypes.bool,
  iconFontSize: PropTypes.string,
  descriptionVariant: PropTypes.string,
};
