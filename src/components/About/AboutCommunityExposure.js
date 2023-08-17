import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import { AboutImage } from '../All/StyledComponents';
import AboutComunityExposureImage from '../../assets/images/about_comunity_exposure.png';

export default function AboutCommunityExposure(props) {
  return (
    <div>
      <Typography variant="h5" component="div" px={3} py={1} gutterBottom>
        About Community Exposure
      </Typography>
      <Divider variant="middle" />
      <Grid container justifyContent="center" alignItems="center" pt={1.5}>
        <Grid xs={12}>
          <AboutImage src={AboutComunityExposureImage} />
        </Grid>
      </Grid>
      <Typography variant="body" component="div" px={3} py={1} gutterBottom>
        The Community Exposure Index explores the relationship between potential flooding threats
        and the presence ofcommunity assets by combining two composite indices: the Threat Index
        and the Community Asset Index. The Threat Index utilizes landscape characteristics and
        flood-related data. The Community Asset Index helps to understand where critical
        infrastructure, facilities, and population are concentrated on the landscape. Together,
        these indices combine to identify areas where community assets overlap with flood threats,
        also known as exposure. While individual data inputs vary regionally, the Regional Coastal
        Resilience Assessments utilize standardized methods to calculate the Community Exposure
        Index. For details, review the&nbsp;
        <Link value="DataAndReports" to='/DataAndReports' component={RouterLink} >
          final reports
        </Link>
      </Typography>
    </div>
  );
}
