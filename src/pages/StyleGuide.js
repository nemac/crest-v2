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

const codeBlockButtonCRESTDark = `<Button color="CRESTDarkAlt">Button</Button>
<Button variant="contained" color="CRESTDarkAlt">Button</Button>
<Button variant="outlined" color="CRESTDarkAlt">Button</Button>`

const codeBlockLink = `<Link href="#" >Link</Link>`

const codeBlockDefaultBG = `<Box >
  <Paper variant="outlined" square={false} sx={{padding: '20px', backgroundColor: 'CRESTGridBackground.main'}} >
    Default Background
  </Paper>
</Box>`

const codeBlockDarkBG = `<Box >
  <Paper variant="outlined" square={false} sx={{padding: '20px', backgroundColor: 'CRESTGridBackground.dark'}} >
    Default Background
  </Paper>
</Box>`

const codeBlockDarkAltBG = `<Box >
  <Paper variant="outlined" square={false} sx={{padding: '20px', backgroundColor: 'CRESTDarkAlt.main'}} >
    Dark Background Alternate
  </Paper>
</Box>`

const codeBlocklightBG = `<Box >
  <Paper variant="outlined" square={false} sx={{padding: '20px', backgroundColor: 'CRESTLight.main', color: 'CRESTLight.contrastText', borderColor: 'CRESTLight.dark'}} >
    Light Background
  </Paper>
</Box>`



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
            Backgrounds and associated text
          </Typography>
          <Divider />
        </Grid>
      </Grid>

      <Grid container spacing={3} justifyContent="start" alignItems="start" pb={1} px={3} pt={3}>
        <Grid item xs={1}>
          &nbsp;
        </Grid>
        <Grid item xs={11}>
          <Typography variant="h6" gutterBottom>
            Default Background and text
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3} justifyContent="center" alignItems="center" pb={1} px={3} pt={0}>
        <Grid item xs={1}>
          &nbsp;
        </Grid>
        <Grid item xs={3}>
          <Box >
            <Paper variant="outlined" square={false} sx={{padding: '20px', backgroundColor: 'CRESTGridBackground.main'}} >
              Default Background
            </Paper>
          </Box>
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
              text={codeBlockDefaultBG}
              language={'jsx'}
              showLineNumbers={false} />
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={3} justifyContent="start" alignItems="start" pb={1} px={3} pt={3}>
        <Grid item xs={1}>
          &nbsp;
        </Grid>
        <Grid item xs={11}>
          <Typography variant="h6" gutterBottom>
            Dark Background and text
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3} justifyContent="center" alignItems="center" pb={1} px={3} pt={0}>
        <Grid item xs={1}>
          &nbsp;
        </Grid>
        <Grid item xs={3}>
          <Box >
            <Paper variant="outlined" square={false} sx={{padding: '20px',backgroundColor: 'CRESTGridBackground.dark'}} >
              Dark Background
            </Paper>
          </Box>
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
              text={codeBlockDarkBG}
              language={'jsx'}
              showLineNumbers={false} />
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={3} justifyContent="start" alignItems="start" pb={1} px={3} pt={3}>
        <Grid item xs={1}>
          &nbsp;
        </Grid>
        <Grid item xs={11}>
          <Typography variant="h6" gutterBottom>
            Dark Background Alternate and text
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3} justifyContent="center" alignItems="center" pb={1} px={3} pt={0}>
        <Grid item xs={1}>
          &nbsp;
        </Grid>
        <Grid item xs={3}>
          <Box >
            <Paper variant="outlined" square={false} sx={{padding: '20px',backgroundColor: 'CRESTDarkAlt.main'}} >
              Dark Background Alternate
            </Paper>
          </Box>
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
              text={codeBlockDefaultBG}
              language={'jsx'}
              showLineNumbers={false} />
          </Box>
        </Grid>
      </Grid>


      <Grid container spacing={3} justifyContent="start" alignItems="start" pb={1} px={3} pt={3}>
        <Grid item xs={1}>
          &nbsp;
        </Grid>
        <Grid item xs={11}>
          <Typography variant="h6" gutterBottom>
            Light Background and text
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3} justifyContent="center" alignItems="center" pb={1} px={3} pt={0}>
        <Grid item xs={1}>
          &nbsp;
        </Grid>
        <Grid item xs={3}>
          <Box >
            <Paper variant="outlined" square={false} sx={{padding: '20px', backgroundColor: 'CRESTLight.main', color: 'CRESTLight.contrastText', borderColor: 'CRESTLight.dark'}} >
              Light Background
            </Paper>
          </Box>
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
              text={codeBlocklightBG}
              language={'jsx'}
              showLineNumbers={false} />
          </Box>
        </Grid>
      </Grid>

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
        blockBackgroundColor={'CRESTGridBackground.main'}
      />

      <StyleGuideButtonComponent
        title="Primary button"
        themeName="CRESTPrimary"
        codeBlock={codeBlockButtonPrimary}
        blockBackgroundColor={'CRESTGridBackground.main'}
      />

      <StyleGuideButtonComponent
        title="Secondary button"
        themeName="CRESTSecondary"
        codeBlock={codeBlockButtonSecondary}
        blockBackgroundColor={'CRESTGridBackground.main'}
      />

      <StyleGuideButtonComponent
        title="Dark button"
        themeName="CRESTDarkAlt"
        codeBlock={codeBlockButtonCRESTDark}
        blockBackgroundColor={'CRESTGridBackground.dark'}
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
          <Grid item xs={3} pl={0}>
            <Paper variant="outlined" square={false} sx={{padding: '20px',backgroundColor: 'CRESTGridBackground.main'}}>

              <Grid container spacing={3} justifyContent="start" alignItems="start">
                <Grid item xs={12}>
                  <Link href="#" >Link</Link>
                </Grid>
              </Grid>

            </Paper>
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

      </div>

    </div>
  )
}