import * as React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import Home from './pages/Home'
import ResilienceProject from './pages/ResilienceProject';
import AnalyzeProjectSites from './pages/AnalyzeProjectSites'
import Examples from './pages/Examples'
import DataAndReports from './pages/DataAndReports'
import About from './pages/About'

/*
Just some simple css at the moment to demonstrate react router. I imagine we'll
get rid of this when we're ready to actually code some CSS in
*/
const useStyles = makeStyles((theme) => ({
  reactRouterLink: {
    padding: '0 20px 0 0',
  }
}));

export default function App() {
  return (
    <div className="App">
      <ReactRouter/>
      <h1>Crest V2!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="ResilienceProject" element={<ResilienceProject />} />
        <Route path="/AnalyzeProjectSites" element={<AnalyzeProjectSites />} />
        <Route path="/Examples" element={<Examples />} />
        <Route path="/DataAndReports" element={<DataAndReports />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </div>
  );
}

function ReactRouter() {
  const data = { counter: 0 }
  const classes = useStyles();
  return (
    <>
      <nav>
        <Link to="/" className = {classes.reactRouterLink} >Home</Link>
        <Link to="/ResilienceProject" className = {classes.reactRouterLink}>Where Should I do a Resilience Project?</Link>
        <Link to="/AnalyzeProjectSites" className = {classes.reactRouterLink}>Analyze Project Sites</Link>
        <Link className = {classes.reactRouterLink} 
          to="/Examples"
          state={{ data }} 
        >
          Examples
        </Link>
        <Link to="/DataAndReports" className = {classes.reactRouterLink}>Data & Reports</Link>
        <Link to="/About" className = {classes.reactRouterLink}>About</Link>
      </nav>
    </>
  );
}