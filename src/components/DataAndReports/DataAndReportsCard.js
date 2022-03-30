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
  - datFileSize = Data file size
  - NativeLanguageText = Native language assement text
  - NativeLanguageLink = Native language assement link
  - EnglishLink = English language assement link
*/
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { PictureAsPdf, FileDownload } from '@mui/icons-material';

// just a place holder needs props passed in and image etc
export default function DataAndReportsCard(props) {
  // get props
  const {
    regionName,
    dataLink,
    datFileSize,
    NativeLanguageText,
    NativeLanguageLink,
    EnglishLink
  } = props;

  // see if has native language
  const hasNativeLanguage = NativeLanguageText ? true : false;

  return (
    <Box>
      <Paper variant="outlined" square={false} sx={{padding: '20px', backgroundColor: 'CRESTGridBackground.dark', color: 'CRESTGridBackground.contrastText', borderColor: 'CRESTBorderColor.main'}} >
        <Typography variant="h5" component="div" gutterBottom>
          {regionName}
        </Typography>
        <Box sx={{ justifyContent: 'start', alignItems: 'start', display: 'flex', width: '100%' }}>
          <Typography variant="body1" component="div" gutterBottom>
            The download contains all data for the {regionName}. The file also contains a readme file describing use.
          </Typography>
        </Box>

        <Grid container justifyContent="start" alignItems="start" pt={3}>
          <Grid item xs={1}  sm={0.5}>
            <FileDownload sx={{color: 'CRESTCta.main'}} />
          </Grid>
          <Grid item xs={11} sm={11.5} >
            <Link href={dataLink} >{regionName} Data Download ({datFileSize})</Link>
          </Grid>
        </Grid>

        {hasNativeLanguage ? (
          <Grid container justifyContent="start" alignItems="start" pt={1}>
            <Grid item xs={1}  sm={0.5}>
              <PictureAsPdf sx={{color: 'CRESTCta.main'}} />
            </Grid>
            <Grid item xs={11} sm={11.5} >
              <Link href={NativeLanguageLink} target="_blank">{NativeLanguageText}</Link>
            </Grid>
          </Grid>) : (<></>)}

        <Grid container justifyContent="start" alignItems="start" pt={1}>
          <Grid item xs={1}  sm={0.5}>
            <PictureAsPdf sx={{color: 'CRESTCta.main'}} />
          </Grid>
          <Grid item xs={11} sm={11.5} >
            <Link href={EnglishLink} target="_blank">{regionName} Coastal Resilience Assessment</Link>
          </Grid>
        </Grid>

      </Paper>
    </Box>
  )
}