import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import About from './pages/About';
import AnalyzeProjectSites from './pages/AnalyzeProjectSites';
import CustomTheme from './CRESTTheme/CRESTCustomTheme';
import DataAndReports from './pages/DataAndReports';
import Examples from './pages/ExamplesPage';
import Home from './pages/Home';
import ResilienceProject from './pages/ResilienceProject';
import StyleGuide from './pages/StyleGuide';
import NavBar from './components/NavBar/NavBar';
import ModelErrors from './components/All/ModelErrors';
import CodeTest from './pages/CodeTest'; // CAN DELETE THIS WHEN READY FOR PRODUCTION. BE SURE TO DELETE ROUTE BELOW TOO

export default function App() {
  const [errorState, setErrorState] = React.useState({
    error: false,
    errorType: 'error', // error, warning, info, success (https://mui.com/material-ui/react-alert/)
    errorTitle: 'Error',
    errorMessage: 'An error has occurred.',
    errorButtonText: 'Dismiss',
    acceptButtonText: null,
    errorClose: () => setErrorState((previous) => ({ ...previous, error: false })),
    acceptButtonClose: () => setErrorState((previous) => ({ ...previous, error: false }))
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={CustomTheme}>
        <CssBaseline/>
        <div className='App' style={{ height: '100%' }}>
          <Box px={0} pb={0.75}>
            <NavBar />
          </Box>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='ResilienceProject' element={<ResilienceProject />} />
            <Route path='/AnalyzeProjectSites' element={<AnalyzeProjectSites setErrorState={setErrorState} />} />
            <Route path='/Examples' element={<Examples />} />
            <Route path='/DataAndReports' element={<DataAndReports />} />
            <Route path='/About' element={<About />} />
            <Route path='/StyleGuide' element={<StyleGuide />} />
            <Route path='/CodeTest' element={<CodeTest />} />
          </Routes>
          <ModelErrors
            contentTitle={errorState.errorTitle}
            contentMessage={errorState.errorMessage}
            buttonMessage={errorState.errorButtonText}
            errorType={errorState.errorType}
            onClose={errorState.errorClose}
            open={errorState.error}
            acceptButtonText={errorState.acceptButtonText}
            acceptButtonClose={errorState.acceptButtonClose}
          />
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
