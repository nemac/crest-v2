import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// just a place holder needs props passed in and image etc
export default function Buffer(props) {
  const { bufferCheckbox, setBufferCheckbox } = props;

  return (
    <Box p={0.75} >
      <FormGroup>
        <FormControlLabel
          control={<Checkbox defaultChecked/>}
          variant="text"
          color="CRESTPrimary"
          aria-label={'Include a Buffer for Nearby Impacts'}
          label='Include a Buffer for Nearby Impacts'
          sx={{ height: (theme) => theme.spacing(4.5), textTransform: 'none', justifyContent: 'start' }}
          onChange={ () => { setBufferCheckbox(!bufferCheckbox); }}
        />
      </FormGroup>
    </Box>
  );
}

Buffer.propTypes = {
  bufferCheckbox: PropTypes.bool,
  setBufferCheckbox: PropTypes.func
};
