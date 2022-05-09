/*
Purpose
  The About page has a single content block, maybe a card that describes the purpose of the CREST tool.

  The is component handles all the content needed for card.


Child Components
  - Not sure yet

Libs
  - Not sure yet

API
  - Not sure yet

State needed
  - More or less?

Props
  - The title
  - Text description (needs to be able to handle HTML (e.g., links, lists, emailto's)
*/
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function DescriptionMainAboutCard(props) {
  // get props
  const { descriptionTitle, children } = props;

  return (
    <Box  px={3} py={0.75} >
      <Paper variant="outlined" square={false}  >
        <Typography variant="h5" component="div" align="start" px={3} py={1} gutterBottom>
          {descriptionTitle}
        </Typography>
        <Divider variant="middle" />
        <Grid container justifyContent="center" alignItems="center" pt={1.5}>
          <Grid item xs={12}>
            <Typography variant="body" component="div" align="center" gutterBottom>
              {children}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}
