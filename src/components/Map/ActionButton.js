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
import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  actionButton: {
    borderRadius: 0,
    maxHeight: theme.spacing(8),
    textTransform: 'none',
    flexWrap: 'wrap',
    '&:hover': {
      backgroundColor: '#6f6f6f'
    }
  },
  buttonHolder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  }
}));

// just a place holder needs props passed in and image etc
export default function ActionButton(props) {
  const classes = useStyles();
  const {
    children,
    buttonLabel,
    buttonName
  } = props;

  return (
    <Box className={classes.buttonHolder}>
      <Button
        variant="text"
        color="CRESTPrimary"
        fullWidth={true}
        aria-label={buttonName}
        className={classes.actionButton}>
        <Box component="div" className={classes.button} pt={0.5}>{children}</Box>
        <Box component="div" sclassName={classes.button} pb={0.5}>{buttonLabel}</Box>
      </Button>
    </Box>
  );
}

ActionButton.propTypes = {
  children: PropTypes.node.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  buttonName: PropTypes.string.isRequired
};
