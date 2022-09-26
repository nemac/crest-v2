// This is just for code testing snippet purposes.
// Can delete when ready for production
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadState } from '../localStorage';
import { UpdateRedux } from '../components/Map/ShareMap';
import { v4 } from "uuid";
// import { Marker, Popup } from 'react-leaflet';
// import LeafletMapContainer from '../components/Map/LeafletMapContainer';

async function fetchJsonAndUpdateRedux(fetchUrl, dispatch) {
  const response = await fetch(fetchUrl);
  // waits until the request completes...
  const json = await response.json();
  return json;
}

export default function CodeTest() {
  const dispatch = useDispatch();
  const xhr = new XMLHttpRequest();
  const url = 'https://rlwk45u34h.execute-api.us-east-1.amazonaws.com/beta/share-link';
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  /* xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const json = JSON.parse(xhr.responseText);
      console.log(json.email + ", " + json.password);
    }
  }; */

  //const uuid = crypto.randomUUID();
  const uuid = v4();
  const s3Location = 'beta/'.concat(uuid).concat('.json');
  const shareUrl = window.location.href.concat('?').concat('shareUrl=').concat(uuid);
  const payload = JSON.stringify({ location: s3Location, state: loadState() });

  // This is retrieving the JSON from lambda
  const queryParams = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop)
  });
  const queryParamsShareUrl = queryParams.shareUrl;
  if (queryParamsShareUrl) {
    const fetchUrl = url.concat('?shareUrl=').concat(queryParamsShareUrl);
    fetchJsonAndUpdateRedux(fetchUrl, dispatch).then((json) => {
      UpdateRedux(json, dispatch);
      window.alert('Successfully loaded state from shareUrl');
    });
  }
  return (
   <div>
     <button
      onClick={() => {
        window.alert('your URL is: ' + shareUrl);
        xhr.send(payload);
      }}
     >
       Get Share Link
     </button>
   </div>
  );
}
