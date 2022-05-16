/*
Purpose
    The component holds all the region cards on the data and reports page.

    we may want to use a config to pass down props and create an arrray of region cards

Child Components
  - DataAndReports-RegionCard.js

Libs
  - Not sure yet

API
  - Not sure yet

State needed
  No need to for state here.
  - Not sure yet

Props
  - maybe config file - or config json
  - Not sure yet
*/
import * as React from 'react';
import PropTypes from 'prop-types';

import Grid from '@mui/material/Grid';
import DataAndReportsCard from './DataAndReportsCard';

export default function DataAndReportsCardHolder(props) {
  const { cardConfig } = props;

  return (
    <Grid container spacing={1} justifyContent="center" alignItems="center" px={0.25} py={0.75}>

      {cardConfig.map((cardData) => <Grid item xs={12} key={cardData.regionName}>
            <DataAndReportsCard
              regionName={cardData.regionName}
              dataFileSize={cardData.dataFileSize}
              NativeLanguageText={cardData.NativeLanguageText}
              dataLink={cardData.dataLink}
              EnglishLink={cardData.EnglishLink}/>
          </Grid>)}

    </Grid>
  );
}

DataAndReportsCardHolder.propTypes = {
  cardConfig: PropTypes.array.isRequired
};
