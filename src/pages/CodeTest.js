// This is just for code testing snippet purposes.
// Can delete when ready for production
import React from 'react';
import { loadState, saveState } from '../localStorage';
// import { Marker, Popup } from 'react-leaflet';
// import LeafletMapContainer from '../components/Map/LeafletMapContainer';

export default function CodeTest() {
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

  const uuid = crypto.randomUUID();
  const s3Location = 'beta/'.concat(uuid).concat('.json');
  const shareUrl = window.location.href.concat('?').concat('shareUrl=').concat(uuid);
  const payload = JSON.stringify({ location: s3Location, state: loadState() });

  /* // This is retrieving the JSON from lambda
  const queryParams = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop)
  });
  const queryParamsShareUrl = queryParams.shareUrl;
  if (queryParamsShareUrl) {
    fetch(url.concat('?shareUrl=').concat(queryParamsShareUrl))
      .then((response) => response.json())
      .then((data) => saveState(data))
      .then(window.alert('Successfully loaded state from shareUrl: ' + queryParamsShareUrl));
  } */
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
