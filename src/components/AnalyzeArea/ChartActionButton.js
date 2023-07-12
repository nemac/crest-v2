/*
Purpose
  Individual button for the charts held in AnalyzeArea-ChartActionButtons.js

  The button is one of the following:
   - more/less (more proivdes all the detailed charts, less and the default is the summary map)
   - export (the map to png/svg)
   - zoom (zoom/pan the map to the area)
   - Remove Area (removes the area from the map)

   Do we need to decide of the button action happens here?

Child Components
  - something.js

Libs
  - Not sure yet

API
  - Not sure yet

State needed
  - More or less?

Props
  - Not sure yet
*/
import React from 'react';
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
export default function ChartActionButton(props) {
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
    <Box sx={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    }}>
      <Button
        variant="text"
        color="CRESTPrimary"
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
        onClick={handleClick}>
        <StyledBox component="div" pt={0.5}>{children}</StyledBox>
        <StyledBox component="div" pb={0.5}>{buttonLabel}</StyledBox>
      </Button>
    </Box>
  );
}

ChartActionButton.propTypes = {
  children: PropTypes.node.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  buttonName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
