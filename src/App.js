import * as React from 'react';
import { Routes, Route, Link as RouterLink } from 'react-router-dom';

import Home from './pages/Home'
import ResilienceProject from './pages/ResilienceProject';
import AnalyzeProjectSites from './pages/AnalyzeProjectSites'
import Examples from './pages/Examples'
import DataAndReports from './pages/DataAndReports'
import About from './pages/About'
import StyleGuide from './pages/StyleGuide'
import CustomTheme from './CRESTTheme/CRESTCustomTheme'

import Box from '@mui/material/Box';
import { CssBaseline } from '@mui/material/';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import NFWFLogoImage from './assets/images/NFWF_logo_navbar.png';

import NavBar from './components/NavBar/NavBar';

export default function App() {
  return (
    <ThemeProvider theme={CustomTheme}>
      <CssBaseline/>
      <div className='App'>
        <ReactRouter/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='ResilienceProject' element={<ResilienceProject />} />
          <Route path='/AnalyzeProjectSites' element={<AnalyzeProjectSites />} />
          <Route path='/Examples' element={<Examples />} />
          <Route path='/DataAndReports' element={<DataAndReports />} />
          <Route path='/About' element={<About />} />
          <Route path='/StyleGuide' element={<StyleGuide />} />
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
        <NavBar state={{ data }}/>
      </Box>
  );
}