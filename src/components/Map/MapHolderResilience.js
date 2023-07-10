import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as L from 'leaflet';
import * as esri from 'esri-leaflet';

import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

import { useMapEvents, GeoJSON, Tooltip } from 'react-leaflet';
import LeafletMapContainer from './LeafletMapContainer';
import ResiliencePieChart from '../AnalyzeArea/ResiliencePieChart';
import ActionButtons from './ActionButtons';
import BasemapLayer from './BasemapLayer';
import ActiveTileLayers from './ActiveTileLayers';
import MapLayerList from '../MapLayerList/MapLayerList';
import { changeRegion, regionUserInitiated } from '../../reducers/regionSelectSlice';
import { changeZoom, changeCenter } from '../../reducers/mapPropertiesSlice';
import { mapConfig } from '../../configuration/config';
// import { FeatureLayer } from 'react-esri-leaflet';

const useStyles = makeStyles((theme) => ({
  threeColumnHolder: {
    padding: theme.spacing(0.2),
    height: '100%'
  },
  contentHolder: {
    height: 'calc(100% - 115px)',
    [theme.breakpoints.down('md')]: {
      height: 'calc(100% - 56px)'
    }
  },
  contentBox: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.CRESTGridBackground.dark,
    borderColor: theme.palette.CRESTBorderColor.main,
    borderStyle: 'solid',
    borderWidth: '1px'
  },
  contentmapBox: {
    height: '100%',
    padding: theme.spacing(0),
    backgroundColor: theme.palette.CRESTGridBackground.dark,
    borderColor: theme.palette.CRESTBorderColor.main,
    borderStyle: 'solid',
    borderWidth: '1px'
  },
  guttter: {
    padding: `${theme.spacing(0)} !important`,
    height: theme.spacing(0),
    [theme.breakpoints.down('md')]: {
      height: theme.spacing(1)
    }
  },
  // Feels a bit hacky that I had to tack !important on to everything to get the override
  leafletTooltips: {
    backgroundColor: 'transparent !important',
    border: 'transparent !important',
    color: '#FFFFFF !important',
    'box-shadow': 'none !important',
    fontSize: '1.5em',
    fontWeight: 700
  }
}));

const selectedRegionSelector = (state) => state.selectedRegion.value;
const selectedZoomSelector = (state) => state.mapProperties.zoom;
const selectedCenterSelector = (state) => state.mapProperties.center;
const userInitiatedSelector = (state) => state.selectedRegion.userInitiated;
const listVisibleSelector = (state) => state.mapLayerList.visible;

export default function MapHolderResilience() {
  const classes = useStyles();
  const [map, setMap] = useState(null);
  const [clickedFeature, setClickedFeature] = useState(null);
  const [chartData, setChartData] = useState(null);
  const dispatch = useDispatch();
  const center = useSelector(selectedCenterSelector, () => true);
  const zoom = useSelector(selectedZoomSelector, () => true);
  const userInitiatedRegion = useSelector(userInitiatedSelector);
  const selectedRegion = useSelector(selectedRegionSelector);
  const hubsURL = mapConfig.regions[selectedRegion].hubsFeatureServer;
  const hubsHexesUrl = mapConfig.regions[selectedRegion].hubsHexServer;
  const rankProperty = mapConfig.regions[selectedRegion].rankProperty;

  const featureLayerHubs = esri.featureLayer({
    url: hubsURL
  });

  // there currently isn't a hub core for every region
  let featureLayerHex;
  if (hubsHexesUrl) {
    featureLayerHex = esri.featureLayer({
      url: hubsHexesUrl
    });
  }

  const layerListVisible = useSelector(listVisibleSelector);

  const handleRegionChange = useCallback((regionName, user) => {
    // catch bad region
    if (!mapConfig.regions[regionName]) return null;

    // check for user changing region as opposed to
    //  state update on refresh
    if (!user) return null;

    // ensure map has been instantiated
    if (map) {
      // zoom to region locations
      map.setView(
        mapConfig.regions[regionName].mapProperties.center,
        mapConfig.regions[regionName].mapProperties.zoom
      );

      // Update redux store with new region, zoom, and center
      dispatch(changeRegion(mapConfig.regions[regionName].label));
      dispatch(changeZoom(mapConfig.regions[regionName].mapProperties.zoom));
      dispatch(changeCenter(mapConfig.regions[regionName].mapProperties.center));
      dispatch(regionUserInitiated(false));
    }
    setClickedFeature(null);
    return null;
  }, [map, dispatch]);

  useEffect(() => {
    handleRegionChange(selectedRegion, userInitiatedRegion);
  }, [selectedRegion, handleRegionChange, userInitiatedRegion]);

  // Change the map cursor style to pointer
  React.useEffect(() => {
    if (map) {
      map.getContainer().style.cursor = 'pointer';
    }
  }, [map]);

  // Run query on hex server if it exists after feature clicked on
  React.useEffect(() => {
    if (!featureLayerHex) { return; } // return if no hex layer to query
    if (clickedFeature) {
      const calculatedData = [];
      for (let i = 0; i < 10; i++) {
        calculatedData[i] = { name: 'Hub Score = ' + parseInt((i + 1), 10), value: 0 };
      }
      const query = featureLayerHex.query().within(clickedFeature);
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
        });
        setChartData(calculatedData);
      });
    }
  }, [clickedFeature]);

  // This component exists solely for the useMapEvents hook
  const MapEventsComponent = () => {
    useMapEvents({
      click: (e) => {
        const query = featureLayerHubs.query().nearby(e.latlng, 0);
        query.run((error, featureCollection, response) => {
          if (error) {
            return;
          }
          if (featureCollection.features.length === 0) {
            return;
          }
          setClickedFeature(featureCollection.features[0]);
        });
      },
      moveend: () => { // Send updated zoom and center to redux when moveend event occurs.
        dispatch(changeZoom(map.getZoom()));
        dispatch(
          changeCenter(
            [map.getCenter().lat, map.getCenter().lng]
          )
        );
      }
    });
    return null;
  };

  return (
    <Grid container
      spacing={0}
      rowSpacing={{ xs: 1, sm: 1, md: 0 }}
      px={1}
      pb={{ xs: 1, sm: 1, md: 0 }}
      pt={{ xs: 0.5, sm: 0.5, md: 0 }}
      justify="space-between"
      alignItems="stretch"
      className={classes.contentHolder}>

       {/* Data (graph/chart/table, action buttons) */}
      <Grid item
        xs={12} sm={12} md={4} lg={3.75} xl={3}
        order={{ xs: 3, sm: 3, md: 1 }}
        className={classes.threeColumnHolder}
      >
        <Typography align='center' variant="h6" gutterBottom>
          Placeholder for Resilience
        </Typography>
        <Typography align='center' variant="h4" gutterBottom>
          Hub Core Score
        </Typography>
        {clickedFeature &&
          <Typography align='center' variant="h3" gutterBottom>
            {clickedFeature.properties.hub_rnk}
          </Typography>
        }
        {chartData &&
          <ResiliencePieChart chartData={chartData} />
        }
      </Grid>

      {/* Map */}
      <Grid item
            xs={12}
            sm={12}
            md={4.5}
            lg={layerListVisible ? 5.25 : 8.25}
            xl={layerListVisible ? 6.25 : 9}
            order={{ xs: 1, sm: 1, md: 2 }}
            className={classes.threeColumnHolder}>
        <Box className={classes.contentmapBox} >
          <LeafletMapContainer center={center} zoom={zoom} innerRef={setMap}>
            {/* <FeatureLayer
              minZoom={11}
              url={featureLayerURL}
              onEachFeature={onEachFeature}
              eventHandlers={{
                click: featureLayerclick
              }}
            /> */}
            {clickedFeature &&
              <GeoJSON key={clickedFeature.id} data={clickedFeature}>
                <Tooltip direction='center' className={classes.leafletTooltips} permanent>
                  {clickedFeature.id}
                </Tooltip>
              </GeoJSON>
            }
            <ActiveTileLayers />
            <BasemapLayer map={map} />
            <MapEventsComponent/>
          </LeafletMapContainer>
          <ActionButtons/>
        </Box>
      </Grid>

     {/* Layer List */}
      <Grid item
        xs={12} sm={12} md={3.5} lg={3} xl={2.75}
        sx={{ display: { xs: layerListVisible ? 'flex' : 'none' } }}
        order={{ xs: 2, sm: 2, md: 3 }}
        className={classes.threeColumnHolder}>
        <MapLayerList/>
      </Grid>

      {/* Adds bottom padding for small screens this is hacky need another way to handle this */}
       <Grid item xs={12} order={4} className={classes.guttter} />

    </Grid>
  );
}
