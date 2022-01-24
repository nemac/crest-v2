import * as React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Leaflet from './LeafletMap';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

/*export default function App () {
  

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}*/

export default function App() {
  return (
    <div className="App">
      <h1>Crest V2!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="leaflet" element={<Leaflet />} />
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <>
      <nav>
        <Link to="/leaflet">Leaflet</Link>
      </nav>
    </>
  );
}