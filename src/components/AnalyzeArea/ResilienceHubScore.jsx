import React from "react";
import { PropTypes } from "prop-types";

import Grid from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";

export default function ResilienceHubScore(props) {
  const { coreHubScore, hasCoreData } = props;
  return (
    <Grid container spacing={0} p={0} mt={0} mb={0}>
      <Grid xs={12}>
        <Typography
          variant="body"
          component="div"
          justifyContent="center"
          alignItems="center"
          p={1}
          sx={{ display: "flex" }}
        >
          {hasCoreData ? "Average Hub Score" : "Selected Hub Score"}
        </Typography>
      </Grid>
      <Grid xs={12}>
        <Typography
          variant="h2"
          component="div"
          justifyContent="center"
          alignItems="center"
          p={1}
          sx={{ display: "flex" }}
        >
          {coreHubScore}
        </Typography>
      </Grid>
    </Grid>
  );
}

ResilienceHubScore.propTypes = {
  hasCoreData: PropTypes.number,
  coreHubScore: PropTypes.number,
};
