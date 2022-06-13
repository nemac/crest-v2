/*
Purpose
  display they layer description popup or popup like component
  this will change when regions change

Child Components
  - None

Libs
  - None

API
  - Not sure yet

State needed
  - layer description ppopup

Props
  - layer name
  - layer Description
  - Not sure yet
*/

import React, { useRef } from 'react'
import InfoIcon from '@mui/icons-material/Info';
import { IconButton, Typography } from '@mui/material';
import { Popover } from '@mui/material';
import { useState } from 'react';


export default function LayerDescription(props) {
  const { layerName, layerDescription } = props
  const [anchorEl, setAnchorEl] = useState(null)

  const handlePopoverOpen = (e) => {
    setAnchorEl(e.currentTarget);
  }
  const handlePopoverClose = () => {
    setAnchorEl(null);
  }

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
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}><h3>{layerName}</h3>{layerDescription}</Typography>
      </Popover>
    </div>
  )
}
