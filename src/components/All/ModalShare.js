import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Paper from '@mui/material/Paper';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

export default function ModalShare(props) {
  const {
    contentTitle,
    buttonMessage,
    secondaryButtonMessage,
    onClose,
    onDoubleClick,
    secondaryClick,
    open
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
        <Paper
          onDoubleClick={onDoubleClick}
          variant="outlined"
          square={false}
          sx={{
            padding: '20px',
            backgroundColor: 'CRESTDarkAlt.main',
            color: 'CRESTDarkAlt.contrastText',
            borderColor: 'CRESTBorderColor.main'
          }} >
          {props.contentMessage}
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button
              variant="contained"
              color="CRESTPrimary"
              aria-label="Copy"
              onClick={secondaryClick}
              endIcon={<ContentPasteIcon />}>
              {secondaryButtonMessage}
        </Button>
        <Button
          variant="contained"
          color="CRESTDarkAlt"
          onClick={onClose}
          autoFocus>
          {buttonMessage}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ModalShare.propTypes = {
  contentTitle: PropTypes.string,
  contentMessage: PropTypes.string,
  buttonMessage: PropTypes.string,
  secondaryButtonMessage: PropTypes.string,
  onClose: PropTypes.func,
  onDoubleClick: PropTypes.func,
  secondaryClick: PropTypes.func,
  open: PropTypes.bool
};
