import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// just a place holder needs props passed in and image etc
export default function ShapeActionButton(props) {
  const {
    children,
    buttonLabel,
    buttonName,
    onClick,
    buttonDisabled,
    isIconFirst
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
        {isIconFirst ? (
          <>{children}&nbsp;&nbsp;{buttonLabel}</>
        ) : (
          <>{buttonLabel}&nbsp;&nbsp;{children}</>
        )}
      </Button>
    </Box>
  );
}

ShapeActionButton.propTypes = {
  children: PropTypes.node.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  buttonName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  buttonDisabled: PropTypes.bool.isRequired,
  isIconFirst: PropTypes.bool.isRequired
};
