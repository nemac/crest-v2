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
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { PictureAsPdf, FileDownload } from '@mui/icons-material';

import { StyledPaper } from '../All/StyledComponents';

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

  return (
    <Box>
      <StyledPaper variant="outlined" square={false}>
        <Typography variant="h5" component="div" gutterBottom>
          {regionName}
        </Typography>
        <Box sx={{ justifyContent: 'start', alignItems: 'start', display: 'flex', width: '100%' }} >
          <Typography variant="body1" component="div" gutterBottom>
            The download contains all data for the {regionName}.
            The file also contains a readme file describing use.
          </Typography>
        </Box>

        <Grid container justifyContent="start" alignItems="start" pt={3}>
          <Grid item xs={1} sm={0.5}>
            <FileDownload sx={{ color: (theme) => theme.palette.CRESTCta.main }} />
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

      </StyledPaper>
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
