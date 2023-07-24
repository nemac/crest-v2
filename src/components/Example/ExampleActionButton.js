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
import { styled } from '@mui/system';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%'
}));

// just a place holder needs props passed in and image etc
export default function ExampleActionButton(props) {
  const {
    children,
    buttonLabel,
    buttonName,
    onClick,
    buttonDisabled
  } = props;

  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    }}>
      <Button
        variant="text"
        color="CRESTPrimary"
        disabled={buttonDisabled}
        fullWidth={true}
        aria-label={buttonName}
        sx={{
          borderRadius: 0,
          maxHeight: (theme) => theme.spacing(8),
          textTransform: 'none',
          flexWrap: 'wrap',
          '&:hover': {
            backgroundColor: '#6f6f6f'
          }
        }}
        onClick={onClick}>
        <StyledBox component="div" pt={0.5}>{children}</StyledBox>
        <StyledBox component="div" pb={0.5}>{buttonLabel}</StyledBox>
      </Button>
    </Box>
  );
}

ExampleActionButton.propTypes = {
  children: PropTypes.node.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  buttonName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  buttonDisabled: PropTypes.bool.isRequired
};
