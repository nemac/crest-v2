/*
Purpose
  Button for example case study actions

  Buttons include:
    - Next go to next step
    - View In CREST jump to area with Analyze Project already complete
    - Previous go to Previous step

Child Components
  - None

Libs
  - Not sure yet

API
  - Not sure yet

State needed
  - Not sure yet

Props
  - button Text
  - button icon
  - Not sure yet
*/

import React from 'react';
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
    width: '100%',
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: '0.75rem'
    }
  }
}));

// just a place holder needs props passed in and image etc
export default function ExampleActionButton(props) {
  const classes = useStyles();
  const {
    children,
    buttonLabel,
    buttonName,
    onClick
  } = props;

  const handleClick = (event) => {
    onClick(event);
  };

  return (
    <Box className={classes.buttonHolder}>
      <Button
        variant="text"
        color="CRESTPrimary"
        fullWidth={true}
        aria-label={buttonName}
        value={buttonName}
        className={classes.actionButton}
        onClick={handleClick}>
        <Box component="div" className={classes.button} pt={0.5}>{children}</Box>
        <Box component="div" className={classes.button} pb={0.5}>{buttonLabel}</Box>
      </Button>
    </Box>
  );
}

ExampleActionButton.propTypes = {
  children: PropTypes.node.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  buttonName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};