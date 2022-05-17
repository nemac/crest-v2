import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import Box from '@mui/material/Box';
import { CssBaseline } from '@mui/material/';
import { ThemeProvider } from '@mui/material/styles';

import About from './pages/About';
import AnalyzeProjectSites from './pages/AnalyzeProjectSites';
import CustomTheme from './CRESTTheme/CRESTCustomTheme';
import DataAndReports from './pages/DataAndReports';
import Examples from './pages/Examples';
import Home from './pages/Home';
import ResilienceProject from './pages/ResilienceProject';
import StyleGuide from './pages/StyleGuide';
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
  const data = { counter: 0 };
  return (
      <Box px={0} pb={0.75}>
        <NavBar state={{ data }}/>
      </Box>
  );
}
