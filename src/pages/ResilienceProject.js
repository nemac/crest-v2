import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MapHolderResilience from '../components/Map/MapHolderResilience';
import { HaveShareUrlAndUpdateRedux } from '../components/Map/ShareMap';
// import DiaglogPopup from '../components/All/DiaglogPopup';

export default function ResilienceProject() {
  const [shareUrlComplete, setShareUrlComplete] = useState(false);
  const [querySearchParams, setQuerySearchParams] = useSearchParams();
  const [haveError, setHaveError] = useState(false);

  const handleErrorMessageClose = () => {
    setHaveError(false);
    setShareUrlComplete(true); // set share url complete so map renders
  };

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
  if (shareUrl && !haveError) {
    HaveShareUrlAndUpdateRedux(shareUrl, setShareUrlComplete, setHaveError);
  }

  if (haveError && !shareUrlComplete) {
    return (
      /* <DialogPopup
        contentMessage={'An error has occured'}
        buttonMessage='Okay'
        onClose={handleErrorMessageClose}
        open={haveError}
      /> */
      <button onClick={handleErrorMessageClose}>
        Bad Link. Click to proceed.
      </button>
    );
  }

  if (shareUrl && !shareUrlComplete) {
    return (
      <div>
        Loading Share Link. We need to eventually style this.
      </div>
    );
  }
  return (
    <MapHolderResilience/>
  );
}
