import React, { useState } from 'react'
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';


export function Layer(layerLabel) {

    const initialChecked = {
        isChecked: true
    }

    const [checked, setChecked] = useState(initialChecked)

    return (
        <div>
            <AccordionDetails>
                <Typography>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox isChecked />} label={layerLabel} />
                    </FormGroup>
                </Typography>
            </AccordionDetails>
        </div>
    )
}
