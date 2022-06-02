import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';


export default function Layer(props) {

  const { layerLabel } = props;

  const initialChecked = {
    isChecked: false
  }

  const [checked, setChecked] = useState(initialChecked)

  return (
      <AccordionDetails>
        <Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox checked={checked} onClick={() => setChecked(!checked)} />} label={layerLabel} />
          </FormGroup>
        </Typography>
      </AccordionDetails>
  )
}

Layer.propTypes = {
  layerLabel: PropTypes.string.isRequired,
};