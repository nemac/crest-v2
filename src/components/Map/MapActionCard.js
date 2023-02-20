/*
Purpose
    Holds all the Analyze Area actions
      - sketch area
      - upload shapefile
      - search county or water shed
      - buffer

Child Components
  - upload.js

Libs
  - Not sure yet

API
  - Not sure yet

State needed
  - Not sure yet

Props
  - Not sure yet
*/
import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import {
  ArrowDropDownCircle,
  Help,
  LibraryAdd
} from '@mui/icons-material';

import Buffer from './Buffer';
import DrawArea from './DrawArea';
import SearchCustom from './SearchCustom';
import Upload from './Upload';
import UpperRightIconButton from '../All/UpperRightIconButton';

const useStyles = makeStyles((theme) => ({
  contentGrid: {
    height: '250px',
    padding: theme.spacing(0),
    backgroundColor: theme.palette.CRESTGridBackground.dark,
    borderColor: theme.palette.CRESTBorderColor.main,
    borderStyle: 'solid',
    borderWidth: '1px'
  },
  titleBox: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center'
  },
  titleBoxTypography: {
    cursor: 'default',
    width: '100%',
    alignItems: 'center'
  }
}));

// just a place holder needs props passed in and image etc
export default function MapActionCard(props) {
  const classes = useStyles();
  const { map, bufferCheckbox, setBufferCheckbox, drawAreaDisabled } = props;

  return (
    <Grid container spacing={0} justifyContent="center" alignItems="center" className={classes.contentGrid}>

      <Grid item xs={12}>
        <Box px={1} py={0.75} className={classes.titleBox}>
          <LibraryAdd />
          <Typography px={1} className={classes.titleBoxTypography}>
            Add an area to analyze
          </Typography>
          <UpperRightIconButton ariaLabel="Help">
            <Help />
          </UpperRightIconButton>
          <UpperRightIconButton ariaLabel="Minimize">
            <ArrowDropDownCircle />
          </UpperRightIconButton>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <DrawArea map={map} disabled={drawAreaDisabled}/>
      </Grid>
      <Grid item xs={12}>
        <Upload />
      </Grid>
      <Grid item xs={12}>
        <SearchCustom />
      </Grid>
      <Grid item xs={12}>
        <Buffer bufferCheckbox={bufferCheckbox} setBufferCheckbox={setBufferCheckbox}/>
      </Grid>

    </Grid>
  );
}

MapActionCard.propTypes = {
  bufferCheckbox: PropTypes.bool,
  map: PropTypes.object,
  setBufferCheckbox: PropTypes.func
};
