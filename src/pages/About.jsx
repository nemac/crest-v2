import * as React from "react";

import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import AboutTabs from "../components/About/AboutTabs.jsx";
import AboutCards from "../components/About/AboutCards.jsx";
import AboutFooter from "../components/About/AboutFooter.jsx";

export default function About(props) {
  // get breakpoint for small screens so we can
  // force cards on small screen and tabs on larger screens
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Box px={{ xs: 0, md: 3 }} py={0.75}>
      {isSmallScreen ? <AboutCards /> : <AboutTabs />}

      <AboutFooter />
    </Box>
  );
}
