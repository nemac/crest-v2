import * as React from "react";
// import { Link as RouterLink } from "react-router-dom";

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
// import Link from "@mui/material/Link";

import { AboutImage } from "../All/StyledComponents.jsx";
import AboutFishAndWildlifeImage from "../../assets/images/about_fish_and_wildlife.png";

export default function AboutFishAndWildlife(props) {
  return (
    <div>
      <Typography variant="h5" component="div" px={3} py={1} gutterBottom>
        About Fish and Wildlife
      </Typography>
      <Divider variant="middle" />
      <Grid container justifyContent="center" alignItems="center" pt={1.5}>
        <Grid xs={12}>
          <AboutImage src={AboutFishAndWildlifeImage} />
        </Grid>
      </Grid>
      <Typography variant="body" component="div" px={3} py={1} gutterBottom>
        The Fish and Wildlife Index identifies areas on the landscape where
        species and their habitats are located, helping to understand areas
        where implementing nature-based solutions are likely to benefit federal-
        or state-designated species of concern. While the Regional Coastal
        Resilience Assessments consistently combine species data to create a
        single Fish and Wildlife Index, methods vary between the Atlantic, Gulf
        of America, and Pacific Coasts. (CONUS) and other regional assessments.
        In CONUS, a Terrestrial and Aquatic Index are combined based principally
        on rarity-weighted richness. Importantly, in CONUS, the Aquatic Index
        includes both freshwater and marine species, but focuses almost
        exclusively on very shallow, nearshore areas.
      </Typography>
      <Typography variant="body" component="div" px={3} py={1} gutterBottom>
        Implementing significant enhancements to the Fish and Wildlife Index
        methods, regional assessments in Puerto Rico, the U.S. Virgin Islands,
        and the Northern Mariana Islands combine Terrestrial and Marine Indices.
        Unlike CONUS, the Terrestrial Index attempts to identify suitable
        habitat based on the habitat preferences of major taxonomic groups
        (e.g., birds, reptiles, mammals, amphibians, and freshwater fishes and
        invertebrates). The Marine Index considers habitat to a 30-meter depth
        contour, utilizing the best available data to identify marine habitat
        types capable of supporting significant biodiversity (e.g., coral reefs,
        mangroves, and seagrass beds). CREST automatically displays the results
        for each region based on the method applied.
        {/* For details, review
        the&nbsp;
        <Link
          value="DataAndReports"
          to="/DataAndReports"
          component={RouterLink}
        >
          final reports
        </Link> */}
        .
      </Typography>
    </div>
  );
}
