import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MapHolder from '../components/Map/MapHolder';
import { HaveShareUrlAndUpdateRedux } from '../components/Map/ShareMap';

export default function AnalyzeProjectSite() {
  const [shareUrlComplete, setShareUrlComplete] = useState(false);
  const [querySearchParams, setQuerySearchParams] = useSearchParams();
  const leafletFeatureGroupRef = useRef();
  const [listOfDrawnLayers, setListOfDrawnLayers] = useState([]);
  const [bufferGeo, setBufferGeo] = useState({ type: 'FeatureCollection', features: [] });
  useEffect(() => {
    // Delete share url params from url when it's complete
    if (shareUrlComplete) {
      if (querySearchParams.has('shareUrl')) {
        querySearchParams.delete('shareUrl');
        setQuerySearchParams(querySearchParams);
      }
    }
  }, [shareUrlComplete, querySearchParams, setQuerySearchParams]);

  const queryParams = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop)
  });
  const shareUrl = queryParams.shareUrl;
  if (shareUrl) {
    HaveShareUrlAndUpdateRedux(shareUrl, setShareUrlComplete);
  }
  if (shareUrl && !shareUrlComplete) {
    return (
      <div>
        Loading Share Link. We need to eventually style this.
      </div>
    );
  }

  return (
    <MapHolder
    listOfDrawnLayers={listOfDrawnLayers}
    setListOfDrawnLayers={setListOfDrawnLayers}
    bufferGeo={bufferGeo}
    setBufferGeo={setBufferGeo}
    leafletFeatureGroupRef={leafletFeatureGroupRef}
    />
  );
}
