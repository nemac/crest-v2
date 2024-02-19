import * as React from "react";

import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/system";

import NEMACAboutLogoImage from "../../assets/images/nemac_logo_white.png";
import NFWFAboutLogoImage from "../../assets/images/nfwf_logo_white.png";

const AboutLogoImage = styled("img")(({ theme }) => ({
  maxHeight: "80px",
  maxWidth: "100%",
  height: "auto",
  padding: theme.spacing(1),
}));

export default function AboutFooter(props) {
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      px={{ xs: 2, md: 3 }}
      pt={2}
      pb={0.75}
    >
      <Grid xs={12} sm={6}>
        <AboutLogoImage src={NFWFAboutLogoImage} px={1} />
      </Grid>
      <Grid xs={12} sm={6}>
        <AboutLogoImage src={NEMACAboutLogoImage} px={1} />
      </Grid>
    </Grid>
  );
}
