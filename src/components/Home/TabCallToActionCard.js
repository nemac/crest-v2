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
import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
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
export default function TabCallToActionCard(props) {
  const classes = useStyles();
  const {
    tabLabel,
    tabLocation,
    tabText,
    onClick
  } = props;

  const tabCallToActionClick = (value) => {
    onClick(value);
  };

  return (
    <Box>
      <Paper variant="outlined" square={false} className={classes.CardBackground} >
        <Typography variant="h6" component="div" align="center" gutterBottom style={{ minHeight: '64px' }}>
          {tabLabel}
        </Typography>
        <Divider />
        <Grid container justifyContent="center" alignItems="center" pt={1.5}>
          <Grid item xs={12}>
            <Box className={classes.regionImageBox} >
              <Typography variant="body" component="div" gutterBottom>
                {tabText}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" alignItems="center" pt={1.5}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="CRESTCta"
              fullWidth={true}
              to={`/${tabLocation}`}
              component={RouterLink}
              onClick={(event) => { tabCallToActionClick(tabLocation); }}
              style={{ minHeight: '64px' }}>{tabLabel}</Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

TabCallToActionCard.propTypes = {
  tabLabel: PropTypes.string.isRequired,
  tabLocation: PropTypes.string.isRequired,
  tabText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
