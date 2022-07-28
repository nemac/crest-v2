import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { HelpOutlineOutlined, Cancel } from '@mui/icons-material';
import {
  IconButton,
  Popper,
  Box
} from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const useStyles = makeStyles((theme) => ({
  popupHolder: {
    zIndex: 500,
    borderRadius: theme.spacing(0.5)
  },
  popupBox: {
    width: '450px',
    borderRadius: theme.spacing(0.5),
    [theme.breakpoints.down('md')]: {
      width: '300px'
    },
    backgroundColor: theme.palette.CRESTLight.main,
    color: theme.palette.CRESTLight.contrastText,
    border: `1px solid ${theme.palette.CRESTLightBorderColor.main}`
  },
  popupHeader: {
    backgroundColor: '#E6E6E6',
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: theme.spacing(0.5),
    borderTopLeftRadius: theme.spacing(0.5)
  },
  popupTitle: {
    fontSize: '1.1rem',
    fontWeight: 500,
    width: '100%',
    borderTopRightRadius: theme.spacing(0.5),
    borderTopLeftRadius: theme.spacing(0.5)
  },
  popupContent: {
    backgroundColor: theme.palette.CRESTLight.main,
    color: theme.palette.CRESTLight.contrastText,
    padding: theme.spacing(1),
    borderBottomRightRadius: theme.spacing(0.5),
    borderBottomLeftRadius: theme.spacing(0.5)
  },
  rightActionButton: {
    color: theme.palette.CRESTLight.contrastText,
    height: theme.spacing(4.5),
    padding: theme.spacing(0.375),
    justifyContent: 'end'
  },
  descriptionButton: {
    padding: theme.spacing(0.5)
  }
}));

export default function LayerDescription(props) {
  const { layerName, layerDescription } = props;
  const classes = useStyles();
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

  const handlePopoverButtonClose = () => {
    setAnchorEl(null);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
    setClicked(false);
  };
  const handleClick = () => {
    setClicked(!clicked);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <ClickAwayListener onClickAway={anchorEl === null ? () => {} : handleClickAway}>
      <IconButton
        variant='contained'
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onClick={handleClick}
        className={classes.descriptionButton}>
        <HelpOutlineOutlined />
          <Popper id={id} open={open} placement={'bottom-end'} anchorEl={anchorEl} className={classes.popupHolder}>
            <Box className={classes.popupBox}>
              <Box className={classes.popupHeader}>
                <Box className={classes.popupTitle}>
                  {layerName}
                </Box>
                <IconButton
                  variant="contained"
                  color="CRESTPrimary"
                  className={classes.rightActionButton}
                  aria-label="Minimize"
                  onClick={handlePopoverButtonClose}>
                  <Cancel />
                </IconButton>
              </Box>
              <Box className={classes.popupContent}>
                {layerDescription}
              </Box>
            </Box>
          </Popper>
        </IconButton>
      </ClickAwayListener>
  );
}
LayerDescription.propTypes = {
  layerName: PropTypes.string.isRequired,
  layerDescription: PropTypes.string.isRequired
};
