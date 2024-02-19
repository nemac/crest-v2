import * as React from "react";

import Grid from "@mui/material/Grid";
import DataAndReportsCardRegions from "./DataAndReportsCardRegions.jsx";
import DataAndReportsCardMethodology from "./DataAndReportsCardMethodology.jsx";
import { mapConfig } from "../../configuration/config";

const regions = mapConfig.regions;

export default function DataAndReportsCardHolder() {
  return (
    <Grid
      container
      spacing={1}
      justifyContent="center"
      alignItems="center"
      px={0.25}
      py={0.75}
    >
      {Object.entries(regions).map(([regionName, regionConfig]) => (
        <Grid item xs={12} key={regionName}>
          <DataAndReportsCardRegions
            regionName={regionName}
            dataDownloadName={regionConfig.dataDownload.name}
            dataDownloadFileLink={regionConfig.dataDownload.fileLink}
            dataDownloadFileSize={regionConfig.dataDownload.fileSize}
            reportNativeName={regionConfig.reportNative.name}
            reportNativeFileLink={regionConfig.reportNative.fileLink}
            reportEnglishName={regionConfig.reportEnglish.name}
            reportEnglishFileLink={regionConfig.reportEnglish.fileLink}
          />
        </Grid>
      ))}
      <Grid item xs={12} key={DataAndReportsCardMethodology}>
        <DataAndReportsCardMethodology />
      </Grid>
    </Grid>
  );
}
