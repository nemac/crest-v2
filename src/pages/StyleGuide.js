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
import StyleGuideButtonComponent from '../components/StyleGuide/StyleGuideButtonComponent';
import StyleGuideIconComponent from '../components/StyleGuide/StyleGuideIconComponent';
import StyleGuideBackgroundComponent from '../components/StyleGuide/StyleGuideBackgroundComponent';

import {
  Addchart,
  AddchartOutlined,
  ArrowCircleLeft,
  ArrowCircleLeftOutlined,
  ArrowCircleRight,
  ArrowCircleRightOutlined,
  ArrowDropDownCircle,
  Ballot,
  BallotOutlined,
  CameraAlt,
  CameraAltOutlined,
  Cancel,
  CancelOutlined,
  CenterFocusStrong,
  CenterFocusStrongOutlined,
  CheckBox,
  CheckBoxOutlined,
  CheckBoxOutlineBlank,
  DeleteForever,
  DeleteForeverOutlined,
  DisabledByDefault,
  DisabledByDefaultOutlined,
  FastRewind,
  FastRewindOutlined,
  FileDownload,
  FileDownloadOutlined,
  FileUpload,
  FileUploadOutlined,
  FilterNone,
  FilterNoneOutlined,
  GridView,
  GridViewRounded,
  Help,
  HelpOutlineOutlined,
  Info,
  InfoOutlined,
  LayersClear,
  LayersClearOutlined,
  Layers,
  LayersOutlined,
  LibraryAdd,
  LibraryAddOutlined,
  Map,
  MapOutlined,
  Menu,
  MenuOutlined,
  MoreHoriz,
  MoreHorizOutlined,
  PictureAsPdf,
  PictureAsPdfOutlined,
  Polyline,
  PolylineOutlined,
  Search,
  SearchOutlined,
  Share,
  ShareOutlined,
  Sort,
  SortOutlined,
  ToggleOff,
  ToggleOn,
} from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  block: {
    padding: theme.spacing(3),
  }
}));

const codeBlockLink = `<Link href="#" >Link</Link>`
const codeBlockDivider = `<Divider />`

export default function StyleGuide() {
  const classes = useStyles({});
  return (
    <div>
      <Box p={3} mt={3}>
        <Typography variant="h3" component="div" gutterBottom>
          CREST MUI based Style Guide Version 1.0
        </Typography>
      </Box>

      <Grid container spacing={3} justifyContent="start" alignItems="start" p={3}>
        <Grid item xs={12}>
          <Typography variant="h4" component="div" gutterBottom>
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

      <StyleGuideBackgroundComponent
        title="Examples Current Step"
        gridBackgroundColor='CRESTExampleCurrentSteps.main'
        gridTextColor='CRESTExampleCurrentSteps.contrastText'
        blockBackgroundColor='CRESTExampleCurrentSteps.main'
        gridBorderColor="CRESTExampleCurrentSteps.light"
      />

      <StyleGuideBackgroundComponent
        title="Examples Other Steps"
        gridBackgroundColor='CRESTExampleOtherSteps.main'
        gridTextColor='CRESTExampleOtherSteps.contrastText'
        blockBackgroundColor='CRESTExampleOtherSteps.dark'
        gridBorderColor="CRESTExampleOtherSteps.main"
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
            Divider
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
              Default Divider (color set in styleOverrides)
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
                    <Divider />
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
                text={codeBlockDivider}
                language={'jsx'}
                showLineNumbers={false} />
            </Box>
          </Grid>
        </Grid>

      </div>


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
              Default Link (color set in styleOverrides)
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
        title="Change Basemap"
        SelectedIconName="GridView"
        UnselectedIconName="GridViewRounded"
        selectedIcon={<GridView />}
        unSelectedIcon={<GridViewRounded />}
        blockBackgroundColor='CRESTGridBackground.main'
      />

      <StyleGuideIconComponent
        title="Change Region"
        SelectedIconName="FilterNone"
        UnselectedIconName="FilterNoneOutlined"
        selectedIcon={<FilterNone />}
        unSelectedIcon={<FilterNoneOutlined />}
        blockBackgroundColor='CRESTGridBackground.main'
      />

      <StyleGuideIconComponent
        title="Clear"
        SelectedIconName="LayersClear"
        UnselectedIconName="LayersClear"
        selectedIcon={<LayersClear />}
        unSelectedIcon={<LayersClear />}
        blockBackgroundColor='CRESTGridBackground.main'
      />

      <StyleGuideIconComponent
        title="Close Modal"
        SelectedIconName="Cancel"
        UnselectedIconName="CancelOutlined"
        selectedIcon={<Cancel />}
        unSelectedIcon={<CancelOutlined />}
        blockBackgroundColor='CRESTGridBackground.main'
      />


      <StyleGuideIconComponent
        title="Close/Minimize Open/Maximize"
        SelectedIconName="ArrowDropDownCircle"
        UnselectedIconName="ArrowDropDownCircle"
        selectedIcon={<ArrowDropDownCircle sx={{transform: 'rotate(-180deg)'}}/>}
        unSelectedIcon={<ArrowDropDownCircle />}
        blockBackgroundColor='CRESTGridBackground.main'
        flip={true}
      />

      <StyleGuideIconComponent
        title="Data Download"
        SelectedIconName="FileDownload"
        UnselectedIconName="FileDownloadOutlined"
        selectedIcon={<FileDownload />}
        unSelectedIcon={<FileDownloadOutlined />}
        blockBackgroundColor='CRESTGridBackground.main'
      />

      <StyleGuideIconComponent
        title="Download Assesssment"
        SelectedIconName="PictureAsPdf"
        UnselectedIconName="PictureAsPdfOutlined"
        selectedIcon={<PictureAsPdf />}
        unSelectedIcon={<PictureAsPdfOutlined />}
        blockBackgroundColor='CRESTGridBackground.main'
        flip={true}
      />

      <StyleGuideIconComponent
        title="Error Wrong Descrption"
        SelectedIconName="DisabledByDefault"
        UnselectedIconName="DisabledByDefaultOutlined"
        selectedIcon={<DisabledByDefault color="error"/>}
        unSelectedIcon={<DisabledByDefaultOutlined color="error"/>}
        blockBackgroundColor='CRESTGridBackground.main'
        color="error"
      />
      <StyleGuideIconComponent
        title="Error Correct Descrption"
        SelectedIconName="CheckBox"
        UnselectedIconName="CheckBoxOutlined"
        selectedIcon={<CheckBox color="success"/>}
        unSelectedIcon={<CheckBoxOutlined color="success"/>}
        blockBackgroundColor='CRESTGridBackground.main'
        color="success"
      />

      <StyleGuideIconComponent
        title="Example Previous"
        SelectedIconName="ArrowCircleLeft"
        UnselectedIconName="ArrowCircleLeftOutlined"
        selectedIcon={<ArrowCircleLeft />}
        unSelectedIcon={<ArrowCircleLeftOutlined />}
        blockBackgroundColor='CRESTGridBackground.main'
      />

      <StyleGuideIconComponent
        title="Example Next"
        SelectedIconName="ArrowCircleRight"
        UnselectedIconName="ArrowCircleRightOutlined"
        selectedIcon={<ArrowCircleRight />}
        unSelectedIcon={<ArrowCircleRightOutlined />}
        blockBackgroundColor='CRESTGridBackground.main'
      />

      <StyleGuideIconComponent
        title="Export"
        SelectedIconName="CameraAlt"
        UnselectedIconName="CameraAlt"
        selectedIcon={<CameraAlt />}
        unSelectedIcon={<CameraAlt />}
        blockBackgroundColor='CRESTGridBackground.main'
      />

      <StyleGuideIconComponent
        title="Get statistcs/charts for location"
        SelectedIconName="Addchart"
        UnselectedIconName="AddchartOutline"
        selectedIcon={<Addchart />}
        unSelectedIcon={<AddchartOutlined />}
        blockBackgroundColor='CRESTGridBackground.main'
      />

      <StyleGuideIconComponent
        title="Help"
        SelectedIconName="Help"
        UnselectedIconName="HelpOutlineOutlined"
        selectedIcon={<Help />}
        unSelectedIcon={<HelpOutlineOutlined />}
        blockBackgroundColor='CRESTGridBackground.main'
      />

      <StyleGuideIconComponent
        title="Graph-Table Toggle"
        SelectedIconName="ToggleOn"
        UnselectedIconName="ToggleOff"
        selectedIcon={<ToggleOn />}
        unSelectedIcon={<ToggleOff />}
        blockBackgroundColor='CRESTGridBackground.main'
      />

      <StyleGuideIconComponent
        title="Menu - Main Menu for Small Screen Only"
        SelectedIconName="Menu"
        UnselectedIconName="MenuOutlined"
        selectedIcon={<Menu />}
        unSelectedIcon={<MenuOutlined />}
        blockBackgroundColor='CRESTGridBackground.main'
      />

      <StyleGuideIconComponent
        title="More Information"
        SelectedIconName="Info"
        UnselectedIconName="InfoOutlined"
        selectedIcon={<Info />}
        unSelectedIcon={<InfoOutlined />}
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
        title="Map Layers Icon"
        SelectedIconName="Layers"
        UnselectedIconName="LayersOutlined"
        selectedIcon={<Layers />}
        unSelectedIcon={<LayersOutlined />}
        blockBackgroundColor='CRESTGridBackground.main'
      />

      <StyleGuideIconComponent
        title="Map - go to map view in examples"
        SelectedIconName="Map"
        UnselectedIconName="MapOutlined"
        selectedIcon={<Map />}
        unSelectedIcon={<MapOutlined />}
        blockBackgroundColor='CRESTGridBackground.main'
      />

      <StyleGuideIconComponent
        title="Map Layer Toggle"
        SelectedIconName="CheckBox"
        UnselectedIconName="CheckBoxOutlineBlank"
        selectedIcon={<CheckBox />}
        unSelectedIcon={<CheckBoxOutlineBlank />}
        blockBackgroundColor='CRESTGridBackground.main'
      />

      <StyleGuideIconComponent
        title="More - Less (with graphs)"
        SelectedIconName="MoreHoriz"
        UnselectedIconName="MoreHorizOutlined"
        selectedIcon={<MoreHoriz />}
        unSelectedIcon={<MoreHorizOutlined />}
        blockBackgroundColor='CRESTGridBackground.main'
      />

      <StyleGuideIconComponent
        title="Remove - Remove All"
        SelectedIconName="DeleteForever"
        UnselectedIconName="DeleteForeverOutlined"
        selectedIcon={<DeleteForever />}
        unSelectedIcon={<DeleteForeverOutlined />}
        blockBackgroundColor='CRESTGridBackground.main'
      />

      <StyleGuideIconComponent
        title="Search Location"
        SelectedIconName="Search"
        UnselectedIconName="SearchOutlined"
        selectedIcon={<Search />}
        unSelectedIcon={<SearchOutlined />}
        blockBackgroundColor='CRESTGridBackground.main'
      />

      <StyleGuideIconComponent
        title="Search Location Collapse Box"
        SelectedIconName="FastRewind"
        UnselectedIconName="FastRewindOutlined"
        selectedIcon={<FastRewind />}
        unSelectedIcon={<FastRewindOutlined />}
        blockBackgroundColor='CRESTGridBackground.main'
      />

      <StyleGuideIconComponent
        title="Share Map"
        SelectedIconName="Share"
        UnselectedIconName="ShareOutlined"
        selectedIcon={<Share />}
        unSelectedIcon={<ShareOutlined />}
        blockBackgroundColor='CRESTGridBackground.main'
      />

      <StyleGuideIconComponent
        title="Sketch Area"
        SelectedIconName="Polyline"
        UnselectedIconName="PolylineOutlined"
        selectedIcon={<Polyline />}
        unSelectedIcon={<PolylineOutlined />}
        blockBackgroundColor='CRESTGridBackground.main'
      />

      <StyleGuideIconComponent
        title="Sort Data"
        SelectedIconName="Sort"
        UnselectedIconName="SortOutlined"
        selectedIcon={<Sort />}
        unSelectedIcon={<SortOutlined />}
        blockBackgroundColor='CRESTGridBackground.main'
      />

      <StyleGuideIconComponent
        title="Upload a shapefile"
        SelectedIconName="FileUpload"
        UnselectedIconName="FileUploadOutlined"
        selectedIcon={<FileUpload />}
        unSelectedIcon={<FileUploadOutlined />}
        blockBackgroundColor='CRESTGridBackground.main'
      />

      <StyleGuideIconComponent
        title="Zoom"
        SelectedIconName="CenterFocusStrong"
        UnselectedIconName="CenterFocusStrongOutlined"
        selectedIcon={<CenterFocusStrong />}
        unSelectedIcon={<CenterFocusStrongOutlined />}
        blockBackgroundColor='CRESTGridBackground.main'
      />

    </div>
  )
}
