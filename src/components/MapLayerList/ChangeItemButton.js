/*
Purpose
  Button for showing current basemap/region
    also opens menu for changing basemap/region

    probably want a config to control

Child Components
  - MapLayerList-ChangeItemMenu.js

Libs
  - Not sure yet

API
  - Not sure yet

State needed
  - region
  - basemap

Props
  - region
  - basemap
  - config?
*/
/*
Purpose
  Action button for the maps

  the actions are one of the following:
    - add area (open or expands the add area menu)
    - export exports the map to png/svg
    - map layers opens the map layer list

Child Components
  - None

Libs
  - Not sure yet

API
  - Not sure yet

State needed
  - map layer list open or not
  - add area open or not NEW state item
  - Not sure yet

Props
  - Not sure yet
*/
import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import { makeStyles } from '@mui/styles';

import ChangeItemMenu from './ChangeItemMenu';

const useStyles = makeStyles((theme) => ({
  ChangeItemButton: {
    width: '100%',
    borderRadius: theme.spacing(0.5),
    paddingLeft: theme.spacing(2),
    height: '60px',
    textTransform: 'none',
    display: 'flex',
    justifyContent: 'start',
    '&:hover': {
      backgroundColor: '#6f6f6f'
    }
  },
  buttonHolder: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start'
  },
  buttonIcon: {
    display: 'flex',
    alignItems: 'center'
  },
  buttonMainLabel: {
    display: 'flex',
    fontSize: '1rem',
    fontWeight: '500',
    justifyContent: 'start',
    lineHeight: '1',
    paddingBottom: theme.spacing(0.5)
  },
  buttonNameLabel: {
    display: 'flex',
    fontSize: '0.88rem',
    fontWeight: '400',
    justifyContent: 'start',
    width: '100%',
    lineHeight: '1',
    paddingTop: theme.spacing(0.5)
  },
  labelHolder: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'start'
  }
}));

// just a place holder needs props passed in and image etc
export default function ChangeItemButton(props) {
  const classes = useStyles();
  const {
    children,
    buttonMainLabel,
    buttonNameLabel,
    buttonName,
    menuItems,
    showMenu,
    onClick,
    itemOnClick
  } = props;

  return (
    <Grid container spacing={0} className={classes.buttonHolder}>
      <Grid item xs={12} >
        <Button
          variant="contained"
          color="CRESTDarkAlt"
          fullWidth={true}
          aria-label={buttonName}
          className={classes.ChangeItemButton}
          onClick={onClick}>
          <Box component="div" className={classes.buttonIcon} pr={2}>{children}</Box>
          <div className={classes.labelHolder}>
            <Box component="div" className={classes.buttonMainLabel} >{buttonMainLabel}</Box>
            <Box component="div" className={classes.buttonNameLabel} pb={0.5}>{buttonNameLabel}</Box>
          </div>
        </Button>
      </Grid>
      <Grid item xs={12} >
        <Collapse in={showMenu} >
          <ChangeItemMenu
            selectedValue={buttonNameLabel}
            onClick={onClick}
            itemOnClick={itemOnClick}
            menuName={buttonName}
            menuItems={menuItems}/>
        </Collapse>
      </Grid>
    </Grid>
  );
}

ChangeItemButton.propTypes = {
  children: PropTypes.node.isRequired,
  buttonMainLabel: PropTypes.string.isRequired,
  buttonNameLabel: PropTypes.string.isRequired,
  buttonName: PropTypes.string.isRequired,
  menuItems: PropTypes.array.isRequired,
  showMenu: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  itemOnClick: PropTypes.func.isRequired
};
