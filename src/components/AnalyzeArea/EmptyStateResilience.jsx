import React from "react";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  color: theme.palette.CRESTGridBackground.contrastText,
  height: "100%",
  overflow: "hidden",
}));

// just a place holder needs props passed in and image etc
export default function EmptyStateResilience(props) {
  return (
    <StyledBox>
      <Box sx={{ height: "calc(100% - 4px)", overflow: "hidden" }}>
        <Typography variant="h6" gutterBottom>
          To get started
        </Typography>
        <Typography variant="body1" gutterBottom>
          If you are interested in getting detailed statistics about a specfic
          hub please click on a hub.
        </Typography>
      </Box>
    </StyledBox>
  );
}
