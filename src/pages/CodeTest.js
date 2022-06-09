// This is just for code testing snippet purposes. 
// Can delete when ready for production
import React, { useState, useEffect } from 'react';
import LeafletMapContainer from '../components/Map/LeafletMapContainer';


export default function CodeTest() {
  return (
    <LeafletMapContainer props={console.log("hello jeff")}/>
  )
}