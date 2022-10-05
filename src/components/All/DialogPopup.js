import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function DialogPopup(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.contentMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} autoFocus>
          {props.buttonMessage}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DialogPopup.propTypes = {
  contentMessage: PropTypes.string,
  buttonMessage: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool
};
