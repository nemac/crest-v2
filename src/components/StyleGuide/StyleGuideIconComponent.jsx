import * as React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { CodeBlock, a11yDark } from "react-code-blocks";

export default function StyleGuideIconComponent(props) {
  const {
    title,
    SelectedIconName,
    UnselectedIconName,
    selectedIcon,
    unSelectedIcon,
    flip,
    color,
  } = props;

  const transformDeg = flip ? "rotate(-180deg)" : "rotate(0)";
  const colorAdd = color ? `color="${color}"` : "";
  const flipText = flip ? `sx={{transform: '${transformDeg}'}}` : "";
  const codeBlock = `import { ${UnselectedIconName}, ${SelectedIconName} } from '@mui/icons-material';

  <${UnselectedIconName} ${colorAdd} />
  <${SelectedIconName} ${colorAdd} ${flipText} />`;

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
              backgroundColor: "CRESTGridBackground.dark",
            }}
          >
            <Grid
              container
              direction="row"
              spacing={3}
              justifyContent="center"
              alignItems="center"
            >
              <Grid xs={6}>
                <Box alignItems="center" justifyContent="center" display="flex">
                  {unSelectedIcon}
                </Box>
                <Box
                  alignItems="center"
                  justifyContent="center"
                  display="flex"
                  pt={0.5}
                >
                  Unselected
                </Box>
              </Grid>
              <Grid xs={6}>
                <Box alignItems="center" justifyContent="center" display="flex">
                  {selectedIcon}
                </Box>
                <Box
                  alignItems="center"
                  justifyContent="center"
                  display="flex"
                  pt={0.5}
                >
                  Selected
                </Box>
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

StyleGuideIconComponent.propTypes = {
  title: PropTypes.string.isRequired,
  SelectedIconName: PropTypes.string.isRequired,
  UnselectedIconName: PropTypes.string.isRequired,
  selectedIcon: PropTypes.object.isRequired,
  unSelectedIcon: PropTypes.object.isRequired,
  flip: PropTypes.bool,
  color: PropTypes.string,
};
