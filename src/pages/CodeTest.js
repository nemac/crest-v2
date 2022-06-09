// This is just for code testing snippet purposes. 
// Can delete when ready for production
import React, { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import LeafletMapContainer from '../components/Map/LeafletMapContainer';


export default function CodeTest() {
  return (
    <LeafletMapContainer>
      <Marker position={[ 42.382894009614034, -82.85888671875001 ]}> Hello World</Marker>
      <Marker position={[ 35.382894009614034, -82.85888671875001 ]}> Hello World</Marker>
    </LeafletMapContainer>
  )
}