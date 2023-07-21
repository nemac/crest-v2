import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import {
  ArrowDropDownCircle,
  Help
} from '@mui/icons-material';

import UpperRightIconButton from '../All/UpperRightIconButton';
import { StyledGrid } from '../All/StyledComponents';

// just a place holder needs props passed in and image etc
export default function ResilienceMapActionCard(props) {
  return (
    // There was a height of 250px here originally. Trying without it and seeing what it is like
    <StyledGrid container spacing={0} justifyContent="center" alignItems="center" sx={{ height: '80px' }} >

      <Grid xs={12} >
        <Box px={1} py={0.75} sx={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center', height: '60px' }} >
          <Typography px={1} sx={{ cursor: 'default', width: '100%', alignItems: 'center' }}>
            Click on a Resilience Core to start exploring
          </Typography>
          <UpperRightIconButton ariaLabel="Help">
            <Help />
          </UpperRightIconButton>
          <UpperRightIconButton ariaLabel="Minimize">
            <ArrowDropDownCircle />
          </UpperRightIconButton>
        </Box>
      </Grid>

      {/*
      for now I want to remove this it looks like a button but does not do anything
      <Grid xs={12} m={1}>
        <Box p={0.75}>
          <Button
            disabled
            variant="contained"
            color="CRESTPrimary"
            fullWidth={true}
            aria-label={'Click on Area Resilience Hub Core'}
            sx={{
              '&': (theme) => ({
                height: theme.spacing(4.5),
                '&.Mui-disabled': {
                  background: theme.palette.CRESTPrimary.main,
                  color: theme.palette.CRESTPrimary.contrastText
                }
              }),
              textTransform: 'none',
              justifyContent: 'start'
            }}
            component="label"
            endIcon={<Info/>}
          >
            Click on Area Resilience Hub Core
          </Button>
        </Box>
      </Grid> */}
    </StyledGrid>
  );
}
