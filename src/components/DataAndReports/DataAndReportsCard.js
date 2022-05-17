/*
Purpose
  hold each regions data and assessment report section
  we may want to use a config or set config files

Child Components
  - None

Libs
  - Not sure yet

API
  - Not sure yet

State needed
  - Not sure yet

Props
  - regionName = Region name
  - dataLink = Data file location link
  - dataFileSize = Data file size
  - NativeLanguageText = Native language assement text
  - NativeLanguageLink = Native language assement link
  - EnglishLink = English language assement link
*/
import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { PictureAsPdf, FileDownload } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  CardBackground: {
    padding: '20px',
    backgroundColor: theme.palette.CRESTGridBackground.dark,
    color: theme.palette.CRESTGridBackground.contrastText,
    borderColor: theme.palette.CRESTBorderColor.main
  },
  descriptionBox: {
    justifyContent: 'start',
    alignItems: 'start',
    display: 'flex',
    width: '100%'
  },
  iconColor: {
    color: theme.palette.CRESTCta.main
  }
}));

// just a place holder needs props passed in and image etc
export default function DataAndReportsCard(props) {
  // get props
  const {
    regionName,
    dataLink,
    dataFileSize,
    NativeLanguageText,
    NativeLanguageLink,
    EnglishLink
  } = props;

  const classes = useStyles();

  return (
    <Box>
      <Paper variant="outlined" square={false} className={classes.CardBackground} >
        <Typography variant="h5" component="div" gutterBottom>
          {regionName}
        </Typography>
        <Box className={classes.descriptionBox} >
          <Typography variant="body1" component="div" gutterBottom>
            The download contains all data for the {regionName}.
            The file also contains a readme file describing use.
          </Typography>
        </Box>

        <Grid container justifyContent="start" alignItems="start" pt={3}>
          <Grid item xs={1} sm={0.5}>
            <FileDownload className={classes.iconColor} />
          </Grid>
          <Grid item xs={11} sm={11.5} >
            <Link href={dataLink} >{regionName} Data Download ({dataFileSize})</Link>
          </Grid>
        </Grid>

        {NativeLanguageText ? (
          <Grid container justifyContent="start" alignItems="start" pt={1}>
            <Grid item xs={1} sm={0.5}>
              <PictureAsPdf sx={{ color: 'CRESTCta.main' }} />
            </Grid>
            <Grid item xs={11} sm={11.5} >
              <Link href={NativeLanguageLink} target="_blank">{NativeLanguageText}</Link>
            </Grid>
          </Grid>) : (<></>)}

        <Grid container justifyContent="start" alignItems="start" pt={1}>
          <Grid item xs={1} sm={0.5}>
            <PictureAsPdf sx={{ color: 'CRESTCta.main' }} />
          </Grid>
          <Grid item xs={11} sm={11.5} >
            <Link href={EnglishLink} target="_blank">{regionName} Coastal Resilience Assessment</Link>
          </Grid>
        </Grid>

      </Paper>
    </Box>
  );
}

DataAndReportsCard.propTypes = {
  regionName: PropTypes.string.isRequired,
  dataLink: PropTypes.string.isRequired,
  dataFileSize: PropTypes.string.isRequired,
  NativeLanguageText: PropTypes.string,
  NativeLanguageLink: PropTypes.string,
  EnglishLink: PropTypes.string.isRequired
};
