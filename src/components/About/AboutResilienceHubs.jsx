import * as React from "react";
// import { Link as RouterLink } from "react-router-dom";

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
// import Link from "@mui/material/Link";

import { AboutImage } from "../All/StyledComponents.jsx";
import AboutResilienceHubsImage from "../../assets/images/about_resilience_hubs.png";

export default function AboutResilienceHubs(props) {
  return (
    <div>
      <Typography variant="h5" component="div" px={3} py={1} gutterBottom>
        About Resilience Hubs
      </Typography>
      <Divider variant="middle" />
      <Grid container justifyContent="center" alignItems="center" pt={1.5}>
        <Grid xs={12}>
          <AboutImage src={AboutResilienceHubsImage} />
        </Grid>
      </Grid>
      <Typography variant="body" component="div" px={3} py={1} gutterBottom>
        Resilience Hubs are areas of open space or habitat where resilience
        projects may have the greatest potential to benefit both human community
        resilience and fish and wildlife. The Hubs combine information about
        natural open spaces, flooding threats, community assets, and fish and
        wildlife resources. As the primary output of the Regional Coastal
        Resilience Assessments, Resilience Hubs are common to all regions.
        However, the methods used to develop Resilience Hubs do vary regionally,
        with significant methodological enhancements made in Puerto Rico, the
        U.S. Virgin Islands, and the Northern Mariana Islands.
        {/* For details,
        review the{" "}
        <Link
          value="DataAndReports"
          to="/DataAndReports"
          component={RouterLink}
        >
          final reports
        </Link> */}
      </Typography>
    </div>
  );
}
