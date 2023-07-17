import React from 'react';
import { useSelector } from 'react-redux';
// import MapHolderResilience from '../components/Map/MapHolderResilience';
import GenericMapHolder from '../components/Map/GenericMapHolder';
import ResilienceChartCard from '../components/AnalyzeArea/ResilienceChartCard';
import ResilienceMapCard from '../components/Map/ResilienceMapCard';

const selectedResilienceHub = (state) => state.mapProperties.resilienceHub;

export default function ResilienceProject() {
  const resilienceHub = useSelector(selectedResilienceHub);
  ResilienceMapCard.displayName = 'MapCard';
  ResilienceChartCard.displayName = 'ChartCard';

  return (
    <GenericMapHolder>
      <ResilienceChartCard/>
      <ResilienceMapCard/>
    </GenericMapHolder>
  );
}
