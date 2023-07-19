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
import DataAndReportsCardRegions from './DataAndReportsCardRegions';
import DataAndReportsCardMethodology from './DataAndReportsCardMethodology';
import { mapConfig } from '../../configuration/config';
const regions = mapConfig.regions;

export default function DataAndReportsCardHolder(props) {
  return (
    <Grid container spacing={1} justifyContent="center" alignItems="center" px={0.25} py={0.75}>
      {Object.entries(regions).map(([regionName,regionConfig]) => <Grid item xs={12} key={regionName}>
            <DataAndReportsCardRegions
              regionName={regionName}
              dataDownloadName={regionConfig.dataDownload.name}
              dataDownloadFileLink={regionConfig.dataDownload.fileLink}
              dataDownloadFileSize={regionConfig.dataDownload.fileSize}
              reportNativeName={regionConfig.reportNative.name}
              reportNativeFileLink={regionConfig.reportNative.fileLink}
              reportEnglishName={regionConfig.reportEnglish.name}
              reportEnglishFileLink={regionConfig.reportEnglish.fileLink}/>
              </Grid>)}
      <Grid item xs={12} key={DataAndReportsCardMethodology}>
        <DataAndReportsCardMethodology />
      </Grid>
    </Grid>
  );
}