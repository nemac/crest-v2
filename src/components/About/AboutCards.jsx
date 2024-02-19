import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";

import AboutCrest from "./AboutCrest.jsx";
import AboutCommunityExposure from "./AboutCommunityExposure.jsx";
import AboutFishAndWildlife from "./AboutFishAndWildlife.jsx";
import AboutResilienceHubs from "./AboutResilienceHubs.jsx";

export default function AboutTabs(props) {
  return (
    <div>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        px={2}
        py={1}
      >
        <Grid xs={12}>
          <Box py={0.75}>
            <Paper
              variant="outlined"
              square={false}
              sx={{ minHeight: "800px", height: "100%" }}
            >
              <AboutCrest />
            </Paper>
          </Box>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        px={2}
        py={1}
      >
        <Grid xs={12}>
          <Box py={0.75}>
            <Paper
              variant="outlined"
              square={false}
              sx={{ minHeight: "800px", height: "100%" }}
            >
              <AboutCommunityExposure />
            </Paper>
          </Box>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        px={2}
        pt={1}
      >
        <Grid xs={12}>
          <Box py={0.75}>
            <Paper
              variant="outlined"
              square={false}
              sx={{ minHeight: "800px", height: "100%" }}
            >
              <AboutFishAndWildlife />
            </Paper>
          </Box>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        px={2}
        py={1}
      >
        <Grid xs={12}>
          <Box py={0.75}>
            <Paper
              variant="outlined"
              square={false}
              sx={{ minHeight: "800px", height: "100%" }}
            >
              <AboutResilienceHubs />
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
