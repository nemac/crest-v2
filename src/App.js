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
import Typography from '@mui/material/Typography';


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

function ReactRouter() {
  const data = { counter: 0 }
  return (
    <>
      <nav>
        <Link to="/" component={RouterLink} >Home</Link>
        <Link to="/ResilienceProject" component={RouterLink}>Where Should I do a Resilience Project?</Link>
        <Link to="/AnalyzeProjectSites" component={RouterLink}>Analyze Project Sites?</Link>
        <Link to="/Examples" component={RouterLink} state={{ data }} >Examples</Link>
        <Link to="/DataAndReports" component={RouterLink}>Data & Reports</Link>
        <Link to="/About"  component={RouterLink}>About</Link>
        <Link to="/StyleGuide"  component={RouterLink}>Style Guide</Link>
      </nav>
    </>
  );
}