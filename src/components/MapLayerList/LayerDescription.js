import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InfoIcon from '@mui/icons-material/Info';
import { IconButton, Typography, Popover } from '@mui/material';

export default function LayerDescription(props) {
  const { layerName, layerDescription } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <IconButton
        variant='contained'
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <InfoIcon />
      </IconButton>
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
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <h3>{layerName}</h3>
        <Typography sx={{ p: 1 }}>{layerDescription}</Typography>
      </Popover>
    </div>
  );
}
LayerDescription.propTypes = {
  layerName: PropTypes.string.isRequired,
  layerDescription: PropTypes.string.isRequired
};
