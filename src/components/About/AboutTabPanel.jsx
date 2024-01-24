import * as React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/system';
import Box from '@mui/material/Box';

const StyledDiv = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  border: 1,
  borderStyle: 'solid',
  borderColor: theme.palette.CRESTBorderColor.main
}));

export default function AboutTabPanel(props) {
  const {
    children,
    value,
    index,
    ...other
  } = props;

  return (
    <StyledDiv
      role="tabpanel"
      hidden={value !== index}
      id={`about-tab-index-${index}`}
      aria-labelledby={`about-tab-index-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </StyledDiv>
  );
}

AboutTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};
