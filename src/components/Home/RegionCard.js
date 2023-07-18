/*
Purpose
  On the Home Page, we need a region card to hold the regional call to action
  or a way to jump to a region from the home page

Child Components
  - None

Libs
  - Not sure yet

API
  - Not sure yet

State needed
  - Region
  - Not sure yet

Props
  - Region name
  - Region Map Image
  - Region CTA name
*/

import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/system';

import { StyledPaper } from '../All/StyledComponents';

const StyledBox = styled(Box)(({ theme }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  width: '100%',
  height: '150px',
  [theme.breakpoints.up('xxl')]: {
    height: '250px'
  }
}));

// just a place holder needs props passed in and image etc
export default function RegionCard(props) {
  const {
    regionName,
    regionImage,
    onClick
  } = props;

  const regionClick = (value) => {
    onClick(value);
  };

  return (
    <Box>
      <StyledPaper variant="outlined" square={false} >
        <Typography variant="h6" component="div" align="center" gutterBottom>
          {regionName}
        </Typography>
        <Divider />
        <Grid container justifyContent="center" alignItems="center" pt={1.5}>
          <Grid xs={12}>
            <StyledBox >
              <img src={regionImage} style={{ maxWidth: '50%', alignSelf: 'center' }} />
            </StyledBox>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" alignItems="center" pt={1.5}>
          <Grid xs={12}>
            <Button
              variant="contained"
              color="CRESTCta"
              fullWidth={true}
              to='/AnalyzeProjectSites'
              component={RouterLink}
              onClick={(event) => { regionClick(regionName); }}>
              {regionName}
            </Button>
          </Grid>
        </Grid>
      </StyledPaper>
    </Box>
  );
}

RegionCard.propTypes = {
  regionName: PropTypes.string.isRequired,
  regionImage: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
