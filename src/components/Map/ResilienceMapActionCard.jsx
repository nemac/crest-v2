import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import HubIcon from "@mui/icons-material/Hub";

import { StyledGrid } from "../All/StyledComponents.jsx";
import HelpPopup from "../All/HelpPopup.jsx";

// just a place holder needs props passed in and image etc
export default function ResilienceMapActionCard(props) {
  const helperTitle = "How to Explore Resilience Cores";
  const helpDescription =
    "To explore in-depth statistics and gain a better understanding of a specific " +
    "resilience hub, interact with the map by clicking on the hub you're interested in.";

  return (
    <StyledGrid
      container
      spacing={0}
      justifyContent="center"
      alignItems="center"
      sx={{ height: "80px" }}
    >
      <Grid xs={12}>
        <Box
          px={3}
          py={0.75}
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center",
            height: "60px",
          }}
        >
          <HubIcon />
          <Typography
            px={1}
            sx={{ cursor: "default", width: "100%", alignItems: "center" }}
          >
            Click on a Resilience Core to start exploring
          </Typography>
          <HelpPopup
            helpTitle={helperTitle}
            helpDescription={helpDescription}
            useExamplesLink={true}
          />
        </Box>
      </Grid>
    </StyledGrid>
  );
}
