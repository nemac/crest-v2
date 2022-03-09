import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { CodeBlock, a11yDark } from "react-code-blocks";
import { makeStyles } from '@mui/styles';
import Divider from '@mui/material/Divider';
import StyleGuideButtonComponent from './StyleGuideButtonComponent';

const useStyles = makeStyles((theme) => ({
  block: {
    padding: theme.spacing(3),
  }
}));

const codeBlockButtonCTA = `<Button color="CRESTCta">Button</Button>
<Button variant="contained" color="CRESTCta">Button</Button>
<Button variant="outlined" color="CRESTCta">Button</Button>`

const codeBlockButtonPrimary = `<Button color="CRESTPrimary">Button</Button>
<Button variant="contained" color="CRESTPrimary">Button</Button>
<Button variant="outlined" color="CRESTPrimary">Button</Button>`

const codeBlockButtonSecondary = `<Button color="CRESTSecondary">Button</Button>
<Button variant="contained" color="CRESTSecondary">Button</Button>
<Button variant="outlined" color="CRESTSecondary">Button</Button>`

const codeBlockLink = `<Link href="#" >Link</Link>`

export default function StyleGuide() {
  const classes = useStyles({});
  return (
    <div>
      <Box p={3}>
        <Typography variant="h2" component="div" gutterBottom>
          CREST Style Guide
        </Typography>
      </Box>

      <Grid container spacing={3} justifyContent="start" alignItems="start" p={3}>
        <Grid item xs={12}>
          <Typography variant="h3" component="div" gutterBottom>
            Buttons
          </Typography>
          <Divider />
        </Grid>
      </Grid>

      <StyleGuideButtonComponent
        title="Call to action button"
        themeName="CRESTCta"
        codeBlock={codeBlockButtonCTA}
      />

      <StyleGuideButtonComponent
        title="Primary button"
        themeName="CRESTPrimary"
        codeBlock={codeBlockButtonPrimary}
      />

      <StyleGuideButtonComponent
        title="Secondary button"
        themeName="CRESTSecondary"
        codeBlock={codeBlockButtonSecondary}
      />

      <Grid container spacing={3} justifyContent="start" alignItems="start" p={3}>
        <Grid item xs={12}>
          <Typography variant="h3" component="div" gutterBottom>
            Links
          </Typography>
          <Divider />
        </Grid>
      </Grid>


      <div>

        <Grid container spacing={3} justifyContent="start" alignItems="start" pb={1} px={3} pt={3}>
          <Grid item xs={1}>
            &nbsp;
          </Grid>
          <Grid item xs={11}>
            <Typography variant="h6" gutterBottom>
              Default Link
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={3} justifyContent="start" alignItems="start" pb={1} px={3} pt={0}>
          <Grid item xs={1}>
            &nbsp;
          </Grid>
          <Grid item xs={3}>
            <Link href="#" >Link</Link>
          </Grid>
          <Grid item xs={8}>
            &nbsp;
          </Grid>
        </Grid>

        <Grid container spacing={3} justifyContent="start" alignItems="start" pb={1} px={3} pt={1}>
          <Grid item xs={1}>
            &nbsp;
          </Grid>
          <Grid item xs={11}>
            <Box>
              <CodeBlock
                theme={a11yDark}
                text={codeBlockLink}
                language={'jsx'}
                showLineNumbers={false} />
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={3} justifyContent="start" alignItems="start" pb={3} px={3} pt={1}>
          <Grid item xs={1}>
            &nbsp;
          </Grid>
          <Grid item xs={11}>
            <Divider />
          </Grid>
        </Grid>

      </div>

    </div>
  )
}