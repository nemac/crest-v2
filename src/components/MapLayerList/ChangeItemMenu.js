/*
Purpose
  menu for changing basemap/region will contain the differnt option
  we will need to switch this to a vector map the old base maps are depericated

  where should logic for switch this live?

  basemap
    - Dark Gray
    - Imagery
    - Topographic
    - Streets

  region
    - Alaska
    - American Samoa
    - Contiental U.S.
    - U.S. Great Lakes
    - Guam
    - Hawai'i
    - Northern Mariana Islands
    - Puerto Rico
    - U.S. Virgin Islands

    may want to use a config file

Child Components
  - Not sure yet

Libs
  - ESRI Vector basemap - may need this not sure yet

API
  - Not sure yet

State needed
  - region
  - basemap

Props
  - region
  - basemap
  - config?
*/
import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { ArrowDropDownCircle } from '@mui/icons-material';
import Typography from '@mui/material/Typography';

export default function ChangeItemMenu(props) {
  const {
    selectedValue,
    menuName,
    menuItems,
    onClick,
    itemOnClick
  } = props;

  // Create state for layer list visibility
  const minimizeOnClick = (event) => {
    onClick(event);
  };

  const itemClick = (value) => {
    itemOnClick(value);
  };

  return (
    <Grid
      sx={{
        '&': (theme) => ({
          marginTop: theme.spacing(0.1),
          marginBottom: theme.spacing(1),
          border: `1px solid ${theme.palette.CRESTBorderColor.main}`
        })
      }}
      container
      spacing={0}
    >

      <Grid item xs={12}>
        <Box px={1} py={0.75} onClick={minimizeOnClick}
          sx={{
            '&': (theme) => ({
              cursor: 'pointer',
              display: 'flex',
              flexWrap: 'nowrap',
              alignItems: 'center',
              justifyContent: 'center',
              height: '54px',
              paddingBottom: theme.spacing(0.5),
              backgroundColor: theme.palette.CRESTGridBackground.dark,
              '&:hover': {
                backgroundColor: '#6f6f6f'
              }
            })
          }}
        >
          <Typography px={1} variant="h6" component="div"
            sx={{
              cursor: 'default',
              display: 'flex',
              width: '100%',
              fontWeight: 'bold'
            }}
          >
            {menuName}
          </Typography>
          <IconButton
            sx={{
              '&': (theme) => ({
                height: theme.spacing(4.5),
                padding: theme.spacing(0.375),
                justifyContent: 'end'
              })
            }}
            variant="contained"
            color="CRESTPrimary"
            aria-label="Minimize"
            onClick={minimizeOnClick}
            size="large">
            <ArrowDropDownCircle sx={{ transform: 'rotate(-180deg)' }}/>
          </IconButton>
        </Box>
        <Grid container spacing={0} justifyContent="center" alignItems="center" >
          <Grid item xs={12} >
            <Divider variant="middle" />
          </Grid>
        </Grid>
      </Grid>

      { Object.keys(menuItems).map((menuItem) => (
        <Grid
          key={menuItems[menuItem].label}
          container
          spacing={0}
          justifyContent="center"
          alignItems="center"
          sx={{
            cursor: 'pointer',
            backgroundColor: selectedValue === menuItems[menuItem].label ? 'CRESTDarkAlt.main' : 'CRESTGridBackground.dark',
            '&:hover': {
              backgroundColor: '#6f6f6f'
            }
          }}
          onClick={(event) => { minimizeOnClick(event); itemClick(menuItems[menuItem].label); }} >
            <Grid item xs={8} sx={{ padding: '8px' }} >
              <Box px={1} py={0.75} >{menuItems[menuItem].label}</Box>
            </Grid>
            <Grid item xs={4} sx={{ padding: '8px' }} >
              <img src={menuItems[menuItem].image} style={{ width: '54px', height: '31px' }} />
            </Grid>
          </Grid>
      ))
    }
    </Grid>
  );
}

ChangeItemMenu.propTypes = {
  selectedValue: PropTypes.string.isRequired,
  menuName: PropTypes.string.isRequired,
  menuItems: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  itemOnClick: PropTypes.func.isRequired
};
