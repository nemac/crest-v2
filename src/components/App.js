import * as React from 'react';
import { Routes, Route, NavLink } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import Home from '../pages/Home'
import ResilienceProject from '../pages/ResilienceProject';
import AnalyzeProjectSites from '../pages/AnalyzeProjectSites'
import Examples from '../pages/Examples'
import DataAndReports from '../pages/DataAndReports'
import About from '../pages/About'

/*
Just some simple css at the moment to demonstrate react router. I imagine we'll
get rid of this when we're ready to actually code some CSS in
*/
const useStyles = makeStyles((theme) => ({
  reactRouterNavLink: {
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
  const classes = useStyles();
  return (
    <>
      <nav>
        <NavLink to="/" className = {classes.reactRouterNavLink} >Home</NavLink>
        <NavLink to="/ResilienceProject" className = {classes.reactRouterNavLink}>Where Should I do a Resilience Project?</NavLink>
        <NavLink to="/AnalyzeProjectSites" className = {classes.reactRouterNavLink}>Analyze Project Sites</NavLink>
        <NavLink to="/Examples" className = {classes.reactRouterNavLink}>Examples</NavLink>
        <NavLink to="/DataAndReports" className = {classes.reactRouterNavLink}>Data & Reports</NavLink>
        <NavLink to="/About" className = {classes.reactRouterNavLink}>About</NavLink>
      </nav>
    </>
  );
}