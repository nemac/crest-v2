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
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { StyledPaper } from '../All/StyledComponents.jsx';

// just a place holder needs props passed in and image etc
export default function TabCallToActionCard(props) {
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
    <Box sx={{ 
      height: '100%' }}>
      <StyledPaper
        variant="outlined"
        square={false}
        sx={{
          display: 'flex',
          height: '100%',
          flexDirection: 'column'
        }}>
        <Typography variant="h6" component="div" align="center" gutterBottom style={{ minHeight: '64px' }}>
          {tabLabel}
        </Typography>
        <Divider />
        <Grid container justifyContent="center" alignItems="center" pt={1.5}>
          <Grid xs={12}>
            <Box sx={{
              justifyContent: 'center', alignItems: 'center', display: 'flex', width: '100%', height: '150px'
            }}>
              <Typography variant="body" component="div" gutterBottom>
                {tabText}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="center"
          alignContent="stretch"
          pt={1.5}
          sx={{
            flexGrow: '1'
          }}>
          <Grid
            xs={12}
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'flex-end',
              justifycontent: 'flex-end'
            }}
            alignContent="end">
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
      </StyledPaper>
    </Box>
  );
}

TabCallToActionCard.propTypes = {
  tabLabel: PropTypes.string.isRequired,
  tabLocation: PropTypes.string.isRequired,
  tabText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
