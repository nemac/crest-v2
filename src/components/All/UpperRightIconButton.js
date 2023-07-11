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

export default function UpperRightIconButton(props) {
  const { children, ariaLabel } = props;
  return (
    <IconButton
      variant="contained"
      color="CRESTPrimary"
      sx= {{ height: 4.5, padding: 0.375 }} // sx automatically uses theme.spacing()
      aria-label={ariaLabel}
      size="large">
      {children}
    </IconButton>
  );
}

UpperRightIconButton.propTypes = {
  children: PropTypes.node.isRequired,
  ariaLabel: PropTypes.string.isRequired
};
