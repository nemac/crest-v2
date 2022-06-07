// This is just for code testing snippet purposes. 
// Can delete when ready for production

import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { betaIdentifyEndpoint, prodIdentifyEndpoint, mapConfig } from '../configuration/config';

const ButtonClick = () => {
  const [items, setItems] = useState();
  const endPoint = betaIdentifyEndpoint
  const fetchPoint = endPoint+"?lat=58.3019"+"&lng=-134.4197"+"&region=alaska"

  const fetchData = async () => {
    await fetch(fetchPoint)
    .then(response => {
      return response.json()
    })
    .then(data =>{
      setItems(data);
    })
  }

  if (items === undefined) {
    return (
      <div>
        <button onClick={fetchData}>Identify Function</button>
      </div>
    )
  }

  return (
    <div>
      <ul>
        {Object.keys(items).map(x => 
          <li>{x} : {items[x]}</li>
        )}
      </ul>
    </div>
  )
}

export default function CodeTest() {
  return (
    <ButtonClick/>
  )
}