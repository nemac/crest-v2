import React from "react";

import PropTypes from "prop-types";
import Alert from "@mui/material/Alert";
import { WarningAmberOutlined, Warning } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import HelpPopover from "./HelpPopover.jsx";
import useHoverPopover from "./useHoverPopover";

const warningIconSx = {
  fontSize: "1.25rem",
  marginLeft: (theme) => theme.spacing(0),
  justifyItems: "center",
};

export default function HelpAlert(props) {
  const { helpTitle, helpDescription, useText } = props;
  const popover = useHoverPopover();
  const WarningIcon = popover.highlighted ? Warning : WarningAmberOutlined;

  return (
    <ClickAwayListener onClickAway={popover.close}>
      <Box p={0} m={0} width="100%">
        <span
          aria-describedby={popover.open ? popover.popoverId : undefined}
          onMouseEnter={popover.show}
          onMouseLeave={popover.hideUnlessPinned}
          onClick={popover.togglePin}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "4px",
            borderRadius: "4px",
            justifyItems: "center",
            backgroundColor: popover.highlighted
              ? "rgba(255,167,38,0.3)"
              : "rgba(255,167,38,0)",
          }}
        >
          <WarningIcon color="warning" sx={warningIconSx} />
          {useText && (
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
          )}
        </span>
        <HelpPopover
          id={popover.popoverId}
          open={popover.open}
          anchorEl={popover.anchorEl}
          title={helpTitle}
          onClose={popover.close}
          padContent={false}
        >
          <Alert severity="warning" sx={{ borderRadius: 0 }}>
            <Typography variant="body2" component="p">
              {helpDescription}
            </Typography>
          </Alert>
        </HelpPopover>
      </Box>
    </ClickAwayListener>
  );
}

HelpAlert.propTypes = {
  helpTitle: PropTypes.string.isRequired,
  helpDescription: PropTypes.string.isRequired,
  useText: PropTypes.bool,
};
