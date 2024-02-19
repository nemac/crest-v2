import * as React from "react";

import Grid from "@mui/material/Grid";
import DataAndReportsCardRegions from "./DataAndReportsCardRegions.jsx";
import { mapConfig } from "../../configuration/config";

const targetedWatersheds = mapConfig.targetedWatersheds;

export default function DataAndReportsCardTargetWatershedsHolder(props) {
  return (
    <Grid
      container
      spacing={1}
      justifyContent="center"
      alignItems="center"
      px={0.25}
      py={0.75}
    >
      {Object.entries(targetedWatersheds).map(
        ([targetedWatershedsName, targetedWatershedsNameConfig]) => (
          <Grid item xs={12} key={targetedWatershedsName}>
            <DataAndReportsCardRegions
              regionName={targetedWatershedsName}
              dataDownloadName={targetedWatershedsNameConfig.dataDownload.name}
              dataDownloadFileLink={
                targetedWatershedsNameConfig.dataDownload.fileLink
              }
              dataDownloadFileSize={
                targetedWatershedsNameConfig.dataDownload.fileSize
              }
              reportNativeName={targetedWatershedsNameConfig.reportNative.name}
              reportNativeFileLink={
                targetedWatershedsNameConfig.reportNative.fileLink
              }
              reportEnglishName={
                targetedWatershedsNameConfig.reportEnglish.name
              }
              reportEnglishFileLink={
                targetedWatershedsNameConfig.reportEnglish.fileLink
              }
            />
          </Grid>
        ),
      )}
    </Grid>
  );
}
