/*
Purpose
  holds map and map layer list and graphs/charts

Child Components
  - Map.js  ——— the map
  - MapLayerList.js ——— the list of map layers
  - not sure yet something to hold all the analyze area and chart interactions

Libs
  - Not sure yet

API
  - Not sure yet

State needed
  - Not sure yet
Props
  - Not sure yet

*/
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import MapCard from './MapCard';
import MapActionCard from './MapActionCard';
import MapLayerList from '../MapLayerList/MapLayerList';
import AnalyzeAreaHolder from '../AnalyzeArea/AnalyzeAreaHolder';

const ThreeColumnGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(0.2),
  height: '100%'
}));

const ContentHolderGrid = styled(Grid)(({ theme }) => ({
  height: 'calc(100% - 123px)',
  [theme.breakpoints.down('lg')]: {
    height: 'calc(100% - 56px)'
  },
  [theme.breakpoints.down('md')]: {
    height: 'calc(60% - 56px)'
  }
}));

const ContentMapBox = styled(Box)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(0),
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  borderColor: theme.palette.CRESTBorderColor.main,
  borderStyle: 'solid',
  borderWidth: '1px'
}));

/* Adds bottom padding for small screens this is hacky need another way to handle this */
const GutterGrid = styled(Grid)(({ theme }) => ({
  padding: `${theme.spacing(0)} !important`,
  height: theme.spacing(0),
  [theme.breakpoints.down('lg')]: {
    height: theme.spacing(1)
  }
}));

export default function MapHolder(props) {
  const [map, setMap] = useState(null);
  const [bufferCheckbox, setBufferCheckbox] = useState(true);
  const [drawAreaDisabled, setDrawAreaDisabled] = useState(false);
  const [tooLargeLayerOpen, setTooLargeLayerOpen] = useState(false);
  const leafletFeatureGroupRef = useRef();

  const listVisibleSelector = (state) => state.mapLayerList.visible;
  const layerListVisible = useSelector(listVisibleSelector);

  return (
    <ContentHolderGrid container
      spacing={0}
      rowSpacing={{ xs: 1, sm: 1, md: 0 }}
      px={1}
      pb={{ xs: 1, sm: 1, md: 0 }}
      pt={{ xs: 0.5, sm: 0.5, md: 0 }}
      justifyContent="space-between"
      alignItems="stretch"
    >

       {/* Data (graph/chart/table, action buttons) */}
      <ThreeColumnGrid item
        xs={12} sm={12} md={4} lg={3.75} xl={3}
        order={{ xs: 3, sm: 3, md: 1 }}
      >
        <MapActionCard
          map={map}
          bufferCheckbox={bufferCheckbox}
          setBufferCheckbox={setBufferCheckbox}
          drawAreaDisabled={drawAreaDisabled}
          setTooLargeLayerOpen={setTooLargeLayerOpen}
        />
        <AnalyzeAreaHolder
          boxHeight={'calc(100% - 258px)'}
          boxMarginTop={'8px'}
          leafletFeatureGroupRef={leafletFeatureGroupRef}
          map={map}
        />
      </ThreeColumnGrid>

      {/* Map */}
      <ThreeColumnGrid item
        xs={12}
        sm={12}
        md={4.5}
        lg={layerListVisible ? 5.25 : 8.25}
        xl={layerListVisible ? 6.25 : 9}
        order={{ xs: 1, sm: 1, md: 2 }}
      >
        <ContentMapBox>
          <MapCard
            map={map}
            setMap={setMap}
            leafletFeatureGroupRef={leafletFeatureGroupRef}
            bufferCheckbox={bufferCheckbox}
            setDrawAreaDisabled={setDrawAreaDisabled}
            tooLargeLayerOpen={tooLargeLayerOpen}
            setTooLargeLayerOpen={setTooLargeLayerOpen}
          />
        </ContentMapBox>
      </ThreeColumnGrid>

     {/* Layer List */}
      <ThreeColumnGrid item
        xs={12} sm={12} md={3.5} lg={3} xl={2.75}
        sx={{ display: { xs: layerListVisible ? 'flex' : 'none' } }}
        order={{ xs: 2, sm: 2, md: 3 }}
      >
        <MapLayerList/>
      </ThreeColumnGrid>

      {/* Adds bottom padding for small screens this is hacky need another way to handle this */}
       <GutterGrid item xs={12} order={4}/>

    </ContentHolderGrid>
  );
}
