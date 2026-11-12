import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Stack, Typography } from "@mui/material";

const SAVED_STATE_KEY = "state";

// Clears the saved map state (drawn areas, layers, region) so a bad saved or shared state cannot keep breaking the page.
export const resetSavedState = (
  storage = window.localStorage,
  location = window.location,
) => {
  storage.removeItem(SAVED_STATE_KEY);
  location.reload();
};

function ErrorFallback() {
  return (
    <Box px={3} py={6} sx={{ maxWidth: 640, mx: "auto" }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Something went wrong displaying CREST.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Reloading usually fixes this. If it keeps happening, your saved areas or
        a share link may be out of date: resetting clears them and starts fresh.
      </Typography>
      <Stack direction="row" spacing={2} pt={2}>
        <Button
          variant="contained"
          color="CRESTPrimary"
          onClick={() => window.location.reload()}
        >
          Reload
        </Button>
        <Button
          variant="outlined"
          color="CRESTPrimary"
          onClick={() => resetSavedState()}
        >
          Reset saved state
        </Button>
      </Stack>
    </Box>
  );
}

// Error boundaries have to be class components; this one replaces a blank page with a way to recover.
export default class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    return hasError ? <ErrorFallback /> : children;
  }
}

AppErrorBoundary.propTypes = {
  children: PropTypes.node,
};
