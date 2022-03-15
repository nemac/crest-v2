import * as React from 'react';
import { Routes, Route, Link as RouterLink } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Home from './pages/Home'
import ResilienceProject from './pages/ResilienceProject';
import AnalyzeProjectSites from './pages/AnalyzeProjectSites'
import Examples from './pages/Examples'
import DataAndReports from './pages/DataAndReports'
import About from './pages/About'
import StyleGuide from './pages/StyleGuide'
import CustomTheme from './CRESTTheme/CRESTCustomTheme'
import { CssBaseline } from '@mui/material/';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import NFWFLogoImage from './assets/images/NFWF_logo_navbar.png';

export default function App() {
  return (
    <ThemeProvider theme={CustomTheme}>
      <CssBaseline/>
      <div className="App">
        <ReactRouter/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="ResilienceProject" element={<ResilienceProject />} />
          <Route path="/AnalyzeProjectSites" element={<AnalyzeProjectSites />} />
          <Route path="/Examples" element={<Examples />} />
          <Route path="/DataAndReports" element={<DataAndReports />} />
          <Route path="/About" element={<About />} />
          <Route path="/StyleGuide" element={<StyleGuide />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

// TODO this needs work just a place holder for now and act more like the a nav bar app bar in mui
// probably needs a component one that we missed
function ReactRouter() {
  const data = { counter: 0 }
  return (
      <Box px={0} pb={0.75}>
        <Paper square={false} elevation={3} sx={{backgroundColor: 'CRESTGridBackground.dark', color: 'CRESTGridBackground.contrastText', borderColor: 'CRESTBorderColor.main'}} >
          <Grid container spacing={2} justifyContent="center" alignItems="center" px={0.25} py={0.75}>
            <Grid item xs={1}>
              <Box px={2} >
                <img src={NFWFLogoImage} height="auto" width="100%" />
              </Box>
            </Grid>
            <Grid item xs={11}>
              <Grid container spacing={2} justifyContent="center" alignItems="center" px={0} py={0.75}>
                <Grid item xs={12}>
                  <Typography variant="h5" component="div" px={1} gutterBottom>
                    Coastal Resilience Evaluation and Siting Tool (CREST)
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Link to="/" component={RouterLink} p={1}>Home</Link>
                  <Link to="/ResilienceProject" component={RouterLink} px={1}>Where Should I do a Resilience Project?</Link>
                  <Link to="/AnalyzeProjectSites" component={RouterLink} px={1}>Analyze Project Sites</Link>
                  <Link to="/Examples" component={RouterLink} state={{ data }} >Examples</Link>
                  <Link to="/DataAndReports" component={RouterLink} px={1}>Data & Reports</Link>
                  <Link to="/About"  component={RouterLink} px={1}>About</Link>
                  <Link to="/StyleGuide"  component={RouterLink} px={1}>Style Guide</Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
  );
}