import React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import ChartHeaderActionButton from './ChartHeaderActionButton';

const StyledGridContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  height: theme.spacing(14),
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  borderColor: theme.palette.CRESTBorderColor.main,
  borderStyle: 'solid',
  borderWidth: '1px'
}));

export default function ChartHeaderActionButtonsHolder(props) {
  const {
    title,
    actionButtons
  } = props;

  return (
    <StyledGridContainer container justifyContent="center" alignItems="center" spacing={0} p={0} mt={1} mb={1}>
      <Grid xs={12} >
        <Typography variant="body1" component="div" justifyContent="center" alignItems="center" p={1} sx={{ display: 'flex' }} >
          {title}
        </Typography>
      </Grid>
      {actionButtons?.map((actionButton) => (
        <Grid xs={3} key={actionButton.buttonName}>
          <ChartHeaderActionButton
            buttonLabel={actionButton.buttonLabel}
            buttonName={actionButton.buttonName}
            onClick={actionButton.onClick}>
            {actionButton.icon}
          </ChartHeaderActionButton>
        </Grid>
      ))}
    </StyledGridContainer>
  );
}

ChartHeaderActionButtonsHolder.propTypes = {
  title: PropTypes.string,
  actionButtons: PropTypes.array
};
