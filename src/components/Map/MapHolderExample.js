import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Polygon, Tooltip } from 'react-leaflet';

import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

import Example from '../Example/Examples';
import LeafletMapContainer from './LeafletMapContainer';
import ActionButtons from './ActionButtons';
import BasemapLayer from './BasemapLayer';
import ActiveTileLayers from './ActiveTileLayers';
import ExampleMapLayerList from '../MapLayerList/ExampleMapLayerList';
import { mapConfig } from '../../configuration/config';

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

export default function MapHolderExample() {
  const classes = useStyles();
  const [map, setMap] = useState(null);

  const [examplePolyData, setExamplePolyData] = useState(null);

  const listVisibleSelector = (state) => state.mapLayerList.visible;
  const layerListVisible = useSelector(listVisibleSelector);

  // React.useEffect(() => {
  //   if (map) {
  //     console.log(map._layers);
  //   }
  // }, [map, examplePolyData]);

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
          Step through one of the examples to learn how to use CREST
        </Typography>
        <Example
          map={map}
          examplePolyData={examplePolyData}
          setExamplePolyData={setExamplePolyData}
        />
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
          <LeafletMapContainer
            center={mapConfig.regions['Continental U.S'].mapProperties.center}
            zoom={mapConfig.regions['Continental U.S'].mapProperties.zoom}
            innerRef={setMap}
          >
            <>
            { examplePolyData ? (
              <Polygon positions={examplePolyData.coords} opacity={0.5}>
                <Tooltip position={examplePolyData.center} direction='center' className={classes.leafletTooltips} permanent>
                  {examplePolyData.label}
                </Tooltip>
              </Polygon>
            ) : (<div></div>) }
            </>
            <ActiveTileLayers />
            <BasemapLayer map={map} />
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
        <ExampleMapLayerList/>
      </Grid>

      {/* Adds bottom padding for small screens this is hacky need another way to handle this */}
       <Grid item xs={12} order={4} className={classes.guttter} />

    </Grid>
  );
}
