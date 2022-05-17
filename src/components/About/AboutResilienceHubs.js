/*
Purpose
  The About card/tab text htmnl for about resilience hubs

Child Components
  - Not sure yet

Libs
  - Not sure yet

API
  - Not sure yets

State needed
  - Not sure yet

Props
  - Not sure yet
*/
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Link from '@mui/material/Link';

import AboutResilienceHubsImage from '../../assets/images/about_resilience_hubs.png';

const useStyles = makeStyles((theme) => ({
  crestList: {
    marginTop: theme.spacing(0.5)
  },
  AboutImageStyle: {
    maxWidth: '100%',
    height: 'auto'
  }
}));

export default function AboutResilienceHubs(props) {
  const classes = useStyles();

  return (
    <div>
    <Typography variant="h5" component="div" px={3} py={1} gutterBottom>
      About Resilience Hubs
    </Typography>
    <Divider variant="middle" />
    <Grid container justifyContent="center" alignItems="center" pt={1.5}>
      <Grid item xs={12}>
        <img src={AboutResilienceHubsImage} className={classes.AboutImageStyle} />
      </Grid>
    </Grid>
    <Typography variant="body" component="div" px={3} py={1} gutterBottom>
      Resilience Hubs are areas of open space or habitat where resilience projects may have the
      greatest potential to benefit both human community resilience and fish and wildlife. The
      Hubs combine information about natural open spaces, flooding threats, community assets,
      and fish and wildlife resources. As the primary output of the Regional Coastal Resilience
      Assessments, Resilience Hubs are common to all regions. However, the methods used to develop
      Resilience Hubs do vary regionally, with significant methodological enhancements made in
      Puerto Rico, the U.S. Virgin Islands, and the Northern Mariana Islands. For details,
      review the <Link value="DataAndReports" to='/DataAndReports' component={RouterLink} >
        final reports
      </Link>
    </Typography>
    </div>
  );
}
