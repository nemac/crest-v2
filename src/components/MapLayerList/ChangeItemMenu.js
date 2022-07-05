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
    - Great Lakes
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
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => ({
  hold: {
    padding: theme.spacing(1)
  },
  gridHolder: {
    marginTop: theme.spacing(0.1),
    marginBottom: theme.spacing(1),
    border: `1px solid ${theme.palette.CRESTBorderColor.main}`
  },
  rightActionButton: {
    height: theme.spacing(4.5),
    padding: theme.spacing(0.375),
    justifyContent: 'end'
  },
  titleBox: {
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
  },
  titleBoxTypography: {
    cursor: 'default',
    display: 'flex',
    width: '100%',
    fontWeight: 'bold'
  },
  itemRow: {
    cursor: 'pointer',
    backgroundColor: theme.palette.CRESTGridBackground.dark,
    '&:hover': {
      backgroundColor: '#6f6f6f'
    }
  },
  itemRowSelected: {
    cursor: 'pointer',
    backgroundColor: theme.palette.CRESTDarkAlt.main,
    '&:hover': {
      backgroundColor: '#6f6f6f'
    }
  }
}));

export default function ChangeItemMenu(props) {
  const {
    selectedValue,
    menuName,
    menuItems,
    onClick,
    itemOnClick
  } = props;
  const classes = useStyles();

  // Create state for layer list visibility
  const minimizeOnClick = (event) => {
    onClick(event);
  };

  const itemClick = (value) => {
    itemOnClick(value);
  };

  return (
    <Grid container spacing={0} className={classes.gridHolder}>

      <Grid item xs={12}>
        <Box px={1} py={0.75} className={classes.titleBox} onClick={minimizeOnClick}>
          <Typography px={1} variant="h6" component="div" className={classes.titleBoxTypography} >
            {menuName}
          </Typography>
          <IconButton
            variant="contained"
            color="CRESTPrimary"
            className={classes.rightActionButton}
            aria-label="Minimize"
            onClick={minimizeOnClick}>
            <ArrowDropDownCircle sx={{ transform: 'rotate(-180deg)' }}/>
          </IconButton>
        </Box>
        <Grid container spacing={0} justifyContent="center" alignItems="center" >
          <Grid item xs={12} >
            <Divider variant="middle" />
          </Grid>
        </Grid>
      </Grid>

      { menuItems.map((menuItem) => (
        <Grid
          key={menuItem.label}
          container
          spacing={0}
          justifyContent="center"
          alignItems="center"
          className={selectedValue === menuItem.label ? classes.itemRowSelected : classes.itemRow}
          onClick={(event) => { minimizeOnClick(event); itemClick(menuItem.label); }} >
            <Grid item xs={8} sx={{ padding: '8px' }} >
              <Box px={1} py={0.75} >{menuItem.label}</Box>
            </Grid>
            <Grid item xs={4} sx={{ padding: '8px' }} >
              <img src={menuItem.image} style={{ width: '54px', height: '31px' }} />
            </Grid>
          </Grid>
      ))
    };
    </Grid>
  );
}

ChangeItemMenu.propTypes = {
  selectedValue: PropTypes.string.isRequired,
  menuName: PropTypes.string.isRequired,
  menuItems: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  itemOnClick: PropTypes.func.isRequired
};
