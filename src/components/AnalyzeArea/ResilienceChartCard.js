import React from 'react';
import { useSelector } from 'react-redux';
import * as esri from 'esri-leaflet';

import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

import ResiliencePieChart from './ResiliencePieChart';
import ActionButtonsHolder from '../All/ActionButtonsHolder';
import { mapConfig } from '../../configuration/config';

const selectedRegionSelector = (state) => state.selectedRegion.value;
const selectedResilienceHub = (state) => state.mapProperties.resilienceHub;
const AnalyzeAreaSelector = (state) => state.AnalyzeArea;

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '350px',
  maxHeight: '350px',
  padding: theme.spacing(0),
  backgroundColor: theme.palette.CRESTGridBackground.dark,
  borderColor: theme.palette.CRESTBorderColor.main,
  borderStyle: 'solid',
  borderWidth: '1px',
  justifyContent: 'center',
  alignItems: 'center'
}));

export default function ChartCard(props) {
  const [chartData, setChartData] = React.useState(null);
  const [averageHubScore, setAverageHubScore] = React.useState(0);
  const selectedRegion = useSelector(selectedRegionSelector);
  const resilienceHub = useSelector(selectedResilienceHub);
  const analyzeAreaState = useSelector(AnalyzeAreaSelector);
  const hubsHexesUrl = mapConfig.regions[selectedRegion].hubsHexServer;
  const rankProperty = mapConfig.regions[selectedRegion].rankProperty;

  // there currently isn't a hub core for every region
  let featureLayerHex;
  if (hubsHexesUrl) {
    featureLayerHex = esri.featureLayer({
      url: hubsHexesUrl
    });
  }

  // Run query on hex server if it exists after feature clicked on
  React.useEffect(() => {
    if (!featureLayerHex) { return; } // return if no hex layer to query
    if (resilienceHub) {
      const calculatedData = [];
      let runningTotalScore = 0; // using this increment the hub core scores
      for (let i = 0; i < 10; i++) {
        calculatedData[i] = { name: 'Hub Score = ' + parseInt((i + 1), 10), value: 0 };
      }
      const query = featureLayerHex.query().within(resilienceHub);
      query.run((error, featureCollection, response) => {
        if (error) {
          return;
        }
        if (featureCollection.features.length === 0) {
          return;
        }
        // Count occurrences of each rank
        featureCollection.features.forEach(obj => {
          // Subtracting 1 because rankProperty 1 goes into 0th element etc
          calculatedData[parseInt(obj.properties[rankProperty] - 1, 10)].value += 1;
          runningTotalScore += parseInt(obj.properties[rankProperty], 10);
        });
        const round = Math.round((runningTotalScore / featureCollection.features.length) * 10) / 10;
        setAverageHubScore(round);
        setChartData(calculatedData);
      });
    }
  }, [resilienceHub, featureLayerHex, rankProperty]);

  return (
    <Grid container spacing={0} justifyContent="center" alignItems="center" px={0} pb={4} >
        <div style={{ width: '100%' }}>
          <Grid xs={12} >
            <ContentBox>
              <ResiliencePieChart data={chartData}/>
            </ContentBox>
          </Grid>
          <Grid xs={12} >
            <ActionButtonsHolder/>
          </Grid>
        </div>
    </Grid>
  );
}
