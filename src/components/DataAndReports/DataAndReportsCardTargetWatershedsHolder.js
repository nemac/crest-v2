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
import { mapConfig } from '../../configuration/config';
const targetedWatersheds = mapConfig.targetedWatersheds;

export default function DataAndReportsCardTargetWatershedsHolder(props) {
  return (
    <Grid container spacing={1} justifyContent="center" alignItems="center" px={0.25} py={0.75}>
      {Object.entries(targetedWatersheds).map(([targetedWatershedsName,targetedWatershedsNameConfig]) => <Grid item xs={12} key={targetedWatershedsName}>
            <DataAndReportsCardRegions
              regionName={targetedWatershedsName}
              dataDownloadName={targetedWatershedsNameConfig.dataDownload.name}
              dataDownloadFileLink={targetedWatershedsNameConfig.dataDownload.fileLink}
              dataDownloadFileSize={targetedWatershedsNameConfig.dataDownload.fileSize}
              reportNativeName={targetedWatershedsNameConfig.reportNative.name}
              reportNativeFileLink={targetedWatershedsNameConfig.reportNative.fileLink}
              reportEnglishName={targetedWatershedsNameConfig.reportEnglish.name}
              reportEnglishFileLink={targetedWatershedsNameConfig.reportEnglish.fileLink}/>
              </Grid>)}
 
    </Grid>
  );
}