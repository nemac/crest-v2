import * as React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Leaflet from './LeafletMap';

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