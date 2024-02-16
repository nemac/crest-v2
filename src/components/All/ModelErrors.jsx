import * as React from "react";
import PropTypes from "prop-types";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

export default function ModelErrors(props) {
  // errorType = error, warning, info, success (https://mui.com/material-ui/react-alert/)

  const {
    contentTitle,
    buttonMessage,
    errorType,
    onClose,
    open,
    acceptButtonText,
    acceptButtonClose,
  } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{contentTitle}</DialogTitle>
      <DialogContent>
        <Alert severity={errorType}>{props.contentMessage}</Alert>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="contained"
          color="CRESTPrimary"
          autoFocus
        >
          {buttonMessage}
        </Button>
        {acceptButtonText && (
          <Button
            onClick={acceptButtonClose}
            variant="contained"
            color="CRESTPrimary"
            autoFocus
          >
            {acceptButtonText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

ModelErrors.propTypes = {
  contentTitle: PropTypes.string,
  contentMessage: PropTypes.string,
  buttonMessage: PropTypes.string,
  errorType: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  acceptButtonText: PropTypes.string,
  acceptButtonClose: PropTypes.func,
};
