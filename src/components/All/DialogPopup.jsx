// TODO: IS THIS STILL NEEDED?!?!?!?!
// IS THIS STILL NEEDED?!?!?!
// IS THIS STILL NEEDED?!?!?!
// IS THIS STILL NEEDED?!?!?!
// IS THIS STILL NEEDED?!?!?!
// IS THIS STILL NEEDED?!?!?!
// IS THIS STILL NEEDED?!?!?!

import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function DialogPopup(props) {
  const { contentTitle, contentMessage, buttonMessage, onClose, open } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{contentTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {contentMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          {buttonMessage}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DialogPopup.propTypes = {
  contentTitle: PropTypes.string,
  contentMessage: PropTypes.string,
  buttonMessage: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
