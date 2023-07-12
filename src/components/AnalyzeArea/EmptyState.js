/*
Purpose
  Any time the user arives at analze project sites or where should I do..
  there will be empty state meaning they will need to do an action to see a chart.
  They will need to either draw an area, upload an area, or choose/search for watershed or county

  Child Components
  -  None

Libs
  - Not sure yet

API
  - Not sure yet

State needed
  - More or less?

Props
  - Not sure yet
*/
import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  color: theme.palette.CRESTGridBackground.contrastText,
  borderColor: theme.palette.CRESTBorderColor.main,
  borderStyle: 'solid',
  borderWidth: '1px',
  height: '100%'
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.between('md', 'xl')]: {
    fontSize: '0.9rem'
  }
}));

// just a place holder needs props passed in and image etc
export default function EmptyState(props) {
  return (
    <StyledBox variant="outlined" square={false}>
      <Typography variant="h6" gutterBottom>
        To get started
      </Typography>
      <StyledTypography variant="body1" gutterBottom>
        If you are interested in getting detailed statistics about a specfic place or a potential
        project site, you must add an area. This requires you to sketch an area on the map, upload
        a shapefile, or search for county or watershed.
      </StyledTypography>
      <StyledTypography variant="body1" gutterBottom>
        The results will allow you to examine and compare your project site(s) by proximity to
        Resilience Hubs and explore and compare the Community Exposure and Fish and Wildlife
        Indices in the surrounding area.
      </StyledTypography>
    </StyledBox>
  );
}
