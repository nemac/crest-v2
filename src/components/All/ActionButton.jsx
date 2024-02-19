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

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 0,
  maxHeight: theme.spacing(8),
  textTransform: 'none',
  flexWrap: 'wrap',
  '&:hover': {
    backgroundColor: '#6f6f6f'
  }
}));

// just a place holder needs props passed in and image etc
export default function ActionButton(props) {
  const {
    children,
    buttonLabel,
    buttonName,
    onClick,
    buttonId
  } = props;

  return (
    <Box sx={{
      width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    }}>
      <StyledButton id={buttonId} variant="text" color="CRESTPrimary" fullWidth={true} aria-label={buttonName} onClick={onClick}>
        <StyledBox component="div" pt={0.5}>{children}</StyledBox>
        <StyledBox component="div" pb={0.5}>{buttonLabel}</StyledBox>
      </StyledButton>
    </Box>
  );
}

ActionButton.propTypes = {
  children: PropTypes.node.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  buttonName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  buttonId: PropTypes.string
};
