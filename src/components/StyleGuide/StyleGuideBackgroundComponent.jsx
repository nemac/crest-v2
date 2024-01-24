import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { CodeBlock, a11yDark } from 'react-code-blocks';

export default function StyleGuideBackgroundComponent(props) {
  const {
    title,
    gridTextColor,
    gridBackgroundColor,
    gridBorderColor,
    blockBackgroundColor
  } = props;

  const codeBlock = `<Box >
      <Paper variant="outlined" square={false} sx={{ padding: '20px', backgroundColor: '${blockBackgroundColor}', color: '${gridTextColor}', borderColor: '${gridBorderColor}' }} >
        ${title}
      </Paper>
    </Box>`;

  return (
    <div>

      <Grid container spacing={3} justifyContent="start" alignItems="start" pb={1} px={3} pt={3}>
        <Grid xs={1}>
          &nbsp;
        </Grid>
        <Grid xs={11}>
          <Typography variant="h6" gutterBottom>
            {title} and text
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3} justifyContent="center" alignItems="center" pb={1} px={3} pt={0}>
        <Grid xs={1}>
          &nbsp;
        </Grid>
        <Grid xs={3}>
          <Box >
            <Paper
              variant="outlined"
              square={false}
              sx={{
                padding: '20px',
                backgroundColor: gridBackgroundColor,
                color: gridTextColor,
                borderColor: gridBorderColor
              }} >
              {title}
            </Paper>
          </Box>
        </Grid>
        <Grid xs={8}>
          &nbsp;
        </Grid>
      </Grid>

      <Grid container spacing={3} justifyContent="start" alignItems="start" pb={1} px={3} pt={1}>
        <Grid xs={1}>
          &nbsp;
        </Grid>
        <Grid xs={11}>
          <Box>
            <CodeBlock
              theme={a11yDark}
              text={codeBlock}
              language={'jsx'}
              showLineNumbers={false} />
          </Box>
        </Grid>
      </Grid>

    </div>
  );
}

StyleGuideBackgroundComponent.propTypes = {
  title: PropTypes.string.isRequired,
  gridTextColor: PropTypes.string.isRequired,
  gridBackgroundColor: PropTypes.string.isRequired,
  gridBorderColor: PropTypes.string.isRequired,
  blockBackgroundColor: PropTypes.string.isRequired
};
