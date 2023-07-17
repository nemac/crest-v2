import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TableChart, BarChart } from '@mui/icons-material';

import { changeGraphTableResilience } from '../reducers/analyzeAreaSlice';
import GenericMapHolder from '../components/Map/GenericMapHolder';
import ResilienceMapActionCard from '../components/Map/ResilienceMapActionCard';
import ResilienceChartCard from '../components/AnalyzeArea/ResilienceChartCard';
import ResilienceMapCard from '../components/Map/ResilienceMapCard';

const AnalyzeAreaSelector = (state) => state.AnalyzeArea;

export default function ResilienceProject() {
  const dispatch = useDispatch();
  const analyzeAreaState = useSelector(AnalyzeAreaSelector);
  // handle state change Graph/Table
  const handleGraphOrTableClick = () => {
    dispatch(changeGraphTableResilience());
  };

  const chartHeaderActionButtons = [
    {
      buttonLabel: analyzeAreaState.isItAGraphResilience ? 'Table' : 'Chart',
      buttonName: analyzeAreaState.isItAGraphResilience ? 'Table' : 'Chart',
      onClick: handleGraphOrTableClick,
      icon: analyzeAreaState.isItAGraphResilience ? (<TableChart />) : (<BarChart />)
    }
  ];

  return (
    <GenericMapHolder
      mapActionCard={<ResilienceMapActionCard/>}
      chartHeaderActionButtons={chartHeaderActionButtons}
      isItAGraph={analyzeAreaState.isItAGraphResilience}
      chartCard={<ResilienceChartCard/>}
      tableData={<ResilienceMapActionCard/>}
      mapCard={<ResilienceMapCard/>}
      mapActionCardHeight='250px'
    />
  );
}
