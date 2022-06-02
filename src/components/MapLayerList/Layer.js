import React, { useState } from 'react'
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';


export default function Layer(props) {

  const { layerLabel } = props;

  const initialChecked = {
    isChecked: true
  }

  const [checked, setChecked] = useState(initialChecked)

  return (
    <div>
      <AccordionDetails>
        <Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox checked={checked} onClick={() => setChecked(!checked)} />} label={layerLabel} />
          </FormGroup>
        </Typography>
      </AccordionDetails>
    </div>
  )
}
