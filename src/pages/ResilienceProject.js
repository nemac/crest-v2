import React from 'react';
// import MapHolderResilience from '../components/Map/MapHolderResilience';
import GenericMapHolder from '../components/Map/GenericMapHolder';
import ResilienceMapCard from '../components/Map/ResilienceMapCard';

export default function ResilienceProject() {
  ResilienceMapCard.displayName = 'MapCard';

  return (
    <GenericMapHolder>
      <ResilienceMapCard/>
    </GenericMapHolder>
  );
}
