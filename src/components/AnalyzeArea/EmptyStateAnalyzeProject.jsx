import React from "react";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  color: theme.palette.CRESTGridBackground.contrastText,
  border: `1px solid ${theme.palette.CRESTBorderColor.main}`,
  height: "100%",
  overflow: "hidden",
}));

// just a place holder needs props passed in and image etc
export default function EmptyState(props) {
  return (
    <StyledBox>
      <Box sx={{ height: "calc(100% - 4px)", overflow: "hidden" }}>
        <Typography variant="h6" gutterBottom>
          To get started
        </Typography>
        <Typography variant="body1" gutterBottom>
          If you are interested in getting detailed statistics about a specfic
          place or a potential project site, you must add an area. This requires
          you to sketch an area on the map, upload a shapefile, or search for
          county or watershed.
        </Typography>
        <Typography variant="body1" gutterBottom>
          The results will allow you to examine and compare your project site(s)
          by proximity to Resilience Hubs and explore and compare the Community
          Exposure and Fish and Wildlife Indices in the surrounding area.
        </Typography>
      </Box>
    </StyledBox>
  );
}
