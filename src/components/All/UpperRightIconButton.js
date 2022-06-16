/*
Purpose
    Upper Right Buttons on cards and menus typically:
      - Help or Information
      - Minimize

      TODO: needs click handler passed in
Child Components
  - Not sure yet

Libs
  - Not sure yet

API
  - Not sure yet

State needed
  - Not sure yet

Props
  - label for ally
  - icon as child
*/
import * as React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  actionButton: {
    height: theme.spacing(4.5),
    padding: theme.spacing(0.375)
  }
}));

export default function UpperRightIconButton(props) {
  const { children, ariaLabel } = props;
  const classes = useStyles();

  return (
    <IconButton
      variant="contained"
      color="CRESTPrimary"
      className={classes.actionButton}
      aria-label={ariaLabel}>
      {children}
    </IconButton>
  );
}

UpperRightIconButton.propTypes = {
  children: PropTypes.node.isRequired,
  ariaLabel: PropTypes.string.isRequired
};
