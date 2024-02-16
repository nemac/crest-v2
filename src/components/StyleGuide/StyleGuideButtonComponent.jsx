import * as React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CodeBlock, a11yDark } from "react-code-blocks";

export default function StyleGuideButtonComponent(props) {
  const { title, themeName, blockBackgroundColor } = props;

  const codeBlock = `<Button color="${themeName}">Button</Button>
  <Button variant="contained" color="${themeName}">Button</Button>
  <Button variant="outlined" color="${themeName}">Button</Button>`;

  return (
    <div>
      <Grid
        container
        spacing={3}
        justifyContent="start"
        alignItems="start"
        pb={1}
        px={3}
        pt={3}
      >
        <Grid xs={1}>&nbsp;</Grid>
        <Grid xs={11}>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={3}
        justifyContent="start"
        alignItems="start"
        pb={1}
        px={3}
        pt={0}
      >
        <Grid xs={1}>&nbsp;</Grid>
        <Grid xs={3} pl={0}>
          <Paper
            variant="outlined"
            square={false}
            sx={{
              padding: "20px",
              backgroundColor: blockBackgroundColor,
            }}
          >
            <Grid container justifyContent="start" alignItems="start">
              <Grid xs={4} sx={{ backgroundColor: blockBackgroundColor }}>
                <Button color={themeName}>Button</Button>
              </Grid>
              <Grid xs={4} sx={{ backgroundColor: blockBackgroundColor }}>
                <Button variant="contained" color={themeName}>
                  Button
                </Button>
              </Grid>
              <Grid xs={4} sx={{ backgroundColor: blockBackgroundColor }}>
                <Button variant="outlined" color={themeName}>
                  Button
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid xs={8}>&nbsp;</Grid>
      </Grid>

      <Grid
        container
        spacing={3}
        justifyContent="start"
        alignItems="start"
        pb={3}
        px={3}
        pt={1}
      >
        <Grid xs={1}>&nbsp;</Grid>
        <Grid xs={11}>
          <Box>
            <CodeBlock
              theme={a11yDark}
              text={codeBlock}
              language={"jsx"}
              showLineNumbers={false}
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

StyleGuideButtonComponent.propTypes = {
  title: PropTypes.string.isRequired,
  themeName: PropTypes.string.isRequired,
  blockBackgroundColor: PropTypes.string.isRequired,
};
