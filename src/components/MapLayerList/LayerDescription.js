import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InfoIcon from '@mui/icons-material/Info';
import { IconButton, Typography, Popover } from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';

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
  const handleClickAway = () => {
    setAnchorEl(null);
    setClicked(false);
  };
  const handleClick = () => {
    setClicked(!clicked);
  };

  const open = Boolean(anchorEl);

  return (
    <ClickAwayListener onClickAway={anchorEl === null ? () => {} : handleClickAway}>
      <IconButton
        variant='contained'
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onClick={handleClick}
      >
        <InfoIcon />
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: 'none'
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          onClose={handleClickAway}
          disableRestoreFocus
        >
          <h3>{layerName}</h3>
          <Typography sx={{ p: 1 }}>{layerDescription}</Typography>
        </Popover>
        </IconButton>
      </ClickAwayListener>
  );
}
LayerDescription.propTypes = {
  layerName: PropTypes.string.isRequired,
  layerDescription: PropTypes.string.isRequired
};
