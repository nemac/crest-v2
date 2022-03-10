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
import StyleGuideIconComponent from './StyleGuideIconComponent';
import StyleGuideBackgroundComponent from './StyleGuideBackgroundComponent';

import {
  Ballot,
  BallotOutlined,
  Layers,
  LayersOutlined,
  LibraryAdd,
  LibraryAddOutlined,
} from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  block: {
    padding: theme.spacing(3),
  }
}));

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
            Backgrounds and associated text
          </Typography>
          <Divider />
        </Grid>
      </Grid>

      <StyleGuideBackgroundComponent
        title="Default Background"
        gridBackgroundColor='CRESTGridBackground.main'
        gridTextColor='CRESTGridBackground.contrastText'
        blockBackgroundColor='CRESTGridBackground.main'
        gridBorderColor="CRESTBorderColor.main"
      />

      <StyleGuideBackgroundComponent
        title="Dark Background"
        gridBackgroundColor='CRESTGridBackground.dark'
        gridTextColor='CRESTGridBackground.contrastText'
        blockBackgroundColor='CRESTGridBackground.dark'
        gridBorderColor="CRESTBorderColor.main"
      />

      <StyleGuideBackgroundComponent
        title="Dark Background Alternate"
        gridBackgroundColor='CRESTDarkAlt.main'
        gridTextColor='CRESTDarkAlt.contrastText'
        blockBackgroundColor='CRESTDarkAlt.main'
        gridBorderColor="CRESTBorderColor.main"
      />

      <StyleGuideBackgroundComponent
        title="Light Background"
        gridBackgroundColor='CRESTLight.main'
        gridTextColor='CRESTLight.contrastText'
        blockBackgroundColor='CRESTLight.main'
        gridBorderColor="CRESTLightBorderColor.main"
      />

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
        blockBackgroundColor='CRESTGridBackground.dark'
      />

      <StyleGuideButtonComponent
        title="Primary button"
        themeName="CRESTPrimary"
        blockBackgroundColor='CRESTGridBackground.dark'
      />

      <StyleGuideButtonComponent
        title="Secondary button"
        themeName="CRESTSecondary"
        blockBackgroundColor='CRESTGridBackground.dark'
      />

      <StyleGuideButtonComponent
        title="Dark button"
        themeName="CRESTDarkAlt"
        blockBackgroundColor='CRESTGridBackground.dark'
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
            <Paper variant="outlined" square={false} sx={{padding: '20px',backgroundColor: 'CRESTGridBackground.dark'}}>

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


      <Grid container spacing={3} justifyContent="start" alignItems="start" p={3}>
        <Grid item xs={12}>
          <Typography variant="h3" component="div" gutterBottom>
            Icons
          </Typography>
          <Divider />
        </Grid>
      </Grid>

      <StyleGuideIconComponent
        title="Add Area"
        SelectedIconName="LibraryAdd"
        UnselectedIconName="LibraryAddOutlined"
        selectedIcon={<LibraryAdd />}
        unSelectedIcon={<LibraryAddOutlined />}
        blockBackgroundColor='CRESTGridBackground.main'
      />

      <StyleGuideIconComponent
        title="Legend"
        SelectedIconName="Ballot"
        UnselectedIconName="BallotOutlined"
        selectedIcon={<Ballot />}
        unSelectedIcon={<BallotOutlined />}
        blockBackgroundColor='CRESTGridBackground.main'
      />

      <StyleGuideIconComponent
        title="Map Layers"
        SelectedIconName="Layers"
        UnselectedIconName="LayersOutlined"
        selectedIcon={<Layers />}
        unSelectedIcon={<LayersOutlined />}
        blockBackgroundColor='CRESTGridBackground.main'
      />

    </div>
  )
}