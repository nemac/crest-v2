/*
Purpose
  On the home page at the bottom we have a few call to actions to jump to a tab,
  along with why you would want to go to the tab (Tab description)

Child Components
  - None

Libs
  - Not sure yet

API
  - Not sure yet

State needed
  - Not sure yet

Props
  - Tab Name
  - Tab description
  - Tab CTA Label
  - Not sure yet
*/
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  CardBackground: {
    padding: '20px',
    backgroundColor: theme.palette.CRESTGridBackground.dark,
    color: theme.palette.CRESTGridBackground.contrastText,
    borderColor: theme.palette.CRESTBorderColor.main
  },
  regionImageBox: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    height: '150px'
  }
}));

// just a place holder needs props passed in and image etc
export default function RegionCard() {
  const classes = useStyles();

  return (
    <Box>
      <Paper variant="outlined" square={false} className={classes.CardBackground} >
        <Typography variant="h6" component="div" align="center" gutterBottom>
          Tab Call to Action
        </Typography>
        <Divider />
        <Grid container justifyContent="center" alignItems="center" pt={1.5}>
          <Grid item xs={12}>
            <Box className={classes.regionImageBox} >
              <Typography variant="body" component="div" align="center" gutterBottom>
                Tab Call to Action text
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" alignItems="center" pt={1.5}>
          <Grid item xs={12}>
            <Button variant="contained" color="CRESTCta" fullWidth={true}>Tab Call to Action</Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
