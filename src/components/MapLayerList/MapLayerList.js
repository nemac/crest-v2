import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { IconButton } from '@mui/material/';
import { makeStyles } from '@mui/styles';
import {
  ArrowDropDownCircle,
  Layers,
  GridViewRounded,
  FilterNone
} from '@mui/icons-material';
import Typography from '@mui/material/Typography';

import { mapConfig } from '../../configuration/config';
import { toggleVisible } from '../../reducers/mapLayerListSlice';
import { changeRegion, regionUserInitiated } from '../../reducers/regionSelectSlice';
import { changeZoom, changeCenter, changeBasemap } from '../../reducers/mapPropertiesSlice';
import ChangeItemButton from './ChangeItemButton';
import DriverGroup from './DriverGroup';
import LayerGroup from './LayerGroup';

import regionAlaskaImage from '../../assets/images/zoomregion-alaska.png';
import regionAmericanSamoaImage from '../../assets/images/zoomregion-as.png';
import regionContinentalUSImage from '../../assets/images/zoomregion-cus.png';
import regionGuamImage from '../../assets/images/zoomregion-guam.png';
import regionHawaiiImage from '../../assets/images/zoomregion-hawaii.png';
import regionNorthernMarianaIslandsImage from '../../assets/images/zoomregion-cnmi.png';
import regionPuertoRicoImage from '../../assets/images/zoomregion-pr.png';
import regionUSVirginIslandsImage from '../../assets/images/zoomregion-uvi.png';

import basemapDarkImage from '../../assets/images/basemap-dark.png';
import basemapImageryImage from '../../assets/images/basemap-imagery.png';
import basemapStreetImage from '../../assets/images/basemap-street.jpg';
import basemapTopoImage from '../../assets/images/basemap-topo.jpg';

const useStyles = makeStyles((theme) => ({
  gridHolder: {
    height: '100%',
    paddingRight: theme.spacing(0),
    overflowY: 'scroll',
    backgroundColor: theme.palette.CRESTGridBackground.dark,
    border: `1px solid ${theme.palette.CRESTBorderColor.main}`,
    placeContent: 'flex-start'
  },
  rightActionButton: {
    height: theme.spacing(4.5),
    padding: theme.spacing(0.375),
    justifyContent: 'end'
  },
  titleBox: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    height: '54px',
    paddingBottom: theme.spacing(0.5)
  },
  titleBoxTypography: {
    cursor: 'default',
    display: 'flex',
    width: '100%',
    fontWeight: 'bold'
  },
  changeItemIcon: {
    fontSize: '1.75rem'
  }
}));

// TODO: move this to config file?
const baseMapMenuItems = [
  {
    label: 'Dark Gray',
    image: basemapDarkImage
  },
  {
    label: 'Imagery',
    image: basemapImageryImage
  },
  {
    label: 'Topographic',
    image: basemapTopoImage
  },
  {
    label: 'Streets',
    image: basemapStreetImage
  }
];

// TODO: move this to config file?
const regionMenuItems = [
  {
    label: 'Alaska',
    image: regionAlaskaImage
  },
  {
    label: 'American Samoa',
    image: regionAmericanSamoaImage
  },
  {
    label: 'Continental U.S',
    image: regionContinentalUSImage
  },
  {
    label: 'Guam',
    image: regionGuamImage
  },
  {
    label: 'Hawai\'i',
    image: regionHawaiiImage
  },
  {
    label: 'Northern Mariana Islands',
    image: regionNorthernMarianaIslandsImage
  },
  {
    label: 'Puerto Rico',
    image: regionPuertoRicoImage
  },
  {
    label: 'US Virgin Islands',
    image: regionUSVirginIslandsImage
  }
];

const regions = mapConfig.regions;

export default function MapLayerList() {
  const classes = useStyles();
  const [showBaseMapMenu, setShowBaseMapMenu] = useState(false);
  const [showRegionMenu, setShowRegionMenu] = useState(false);

  // Read in Selected region and separate layers and charts
  const dispatch = useDispatch();
  const regionSelector = (state) => state.selectedRegion.value;
  const selectedRegion = useSelector(regionSelector);

  const basemapSelector = (state) => state.mapProperties.basemap;
  const selectedBasemap = useSelector(basemapSelector);

  const regionLayers = regions[selectedRegion].layerList;
  const chartsInputs = regions[selectedRegion].chartInputs;

  // get summary charts configs
  const chartSummaryInputs = chartsInputs.filter((data) => {
    const summaryValues = data.chartInputName === 'summary';
    return summaryValues;
  });

  // get driver charts configs
  const chartDriverInputs = chartsInputs.filter((data) => {
    const driverValues = data.chartInputName !== 'summary';
    return driverValues;
  });

  // Create state for layer list visibility
  const minimizeOnClick = () => {
    dispatch(toggleVisible());
  };

  const handleBaseMapClick = (event) => {
    setShowBaseMapMenu(!showBaseMapMenu);
    event.stopPropagation();
  };

  const handleRegionClick = (event) => {
    setShowRegionMenu(!showRegionMenu);
    event.stopPropagation();
  };

  const handleRegionMenuItemClick = (regionName) => {
    // catch bad region
    if (!regions[regionName]) return null;

    dispatch(changeRegion(regions[regionName].label));
    dispatch(regionUserInitiated(true));
    dispatch(changeZoom(regions[regionName].mapProperties.zoom));
    dispatch(changeCenter(regions[regionName].mapProperties.center));

    return null;
  };

  const handleBaseMapMenuItemClick = (basemap) => {
    dispatch(changeBasemap(basemap));
  };

  /* Iterate through every label containing target chart and create an array of labels
  This logic could be moved into LayerGroup.js
  */
  const getChartLayers = (targetChartLabel) => {
    const chartLayers = [];
    regionLayers.map((layer) => {
      if (layer.ChartInputLabel === targetChartLabel) {
        chartLayers.push(layer);
        return true;
      }
      return false;
    });

    if (chartLayers.length > 0) {
      return chartLayers;
    }
    return [];
  };

  /* build an accordion for target chart input. If chart is summary,
  no typography is used.  Then render an entry for each label in the chart.
  This logic could be moved to LayerGroup.js
  */
  const renderAccordion = (chInLabel) => {
    const chartLayerList = getChartLayers(chInLabel);
    const isSummary = (chInLabel === 'Summary');
    if (isSummary) {
      return (
        <LayerGroup key={chInLabel} chartInputLabel={chInLabel} chartLayerList={chartLayerList} />
      );
    }
    return (
        <DriverGroup key={chInLabel} chartInputLabel={chInLabel} chartLayerList={chartLayerList} />
    );
  };

  return (
    <Grid container spacing={0} className={classes.gridHolder}>

      <Grid item xs={12}>
        <Box px={1} py={0.75} className={classes.titleBox}>
          <Layers />
          <Typography px={1} variant="h6" component="div" className={classes.titleBoxTypography} >
            Map Layers
          </Typography>
          <IconButton
            variant="contained"
            color="CRESTPrimary"
            className={classes.rightActionButton}
            aria-label="Minimize"
            onClick={minimizeOnClick}>
            <ArrowDropDownCircle sx={{ transform: 'rotate(-180deg)' }}/>
          </IconButton>
        </Box>
        <Grid container spacing={0} justifyContent="center" alignItems="center" >
          <Grid item xs={12} >
            <Divider variant="middle" />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} pt={2} px={2}>
        <ChangeItemButton
          buttonMainLabel={'Change Basemap'}
          buttonNameLabel={selectedBasemap}
          buttonName={'Change Basemap'}
          showMenu={showBaseMapMenu}
          menuItems={baseMapMenuItems}
          onClick={handleBaseMapClick}
          itemOnClick={handleBaseMapMenuItemClick}>
          {<GridViewRounded className={classes.changeItemIcon}/>}
        </ChangeItemButton>
      </Grid>

      <Grid item xs={12} pt={1} px={2}>
        <ChangeItemButton
          buttonMainLabel={'Change Region'}
          buttonNameLabel={selectedRegion}
          buttonName={'Change Region'}
          showMenu={showRegionMenu}
          menuItems={regionMenuItems}
          onClick={handleRegionClick}
          itemOnClick={handleRegionMenuItemClick}>
          {<FilterNone className={classes.changeItemIcon}/>}
        </ChangeItemButton>
      </Grid>

      <Grid item xs={12} px={2} pt={1}>
        { chartSummaryInputs.map((item) => renderAccordion(item.ChartInputLabel)) }
      </Grid>

      <Grid item xs={12} px={2} pt={1} mt={2} mb={1}>
        { chartDriverInputs.map((item) => renderAccordion(item.ChartInputLabel)) }
      </Grid>

    </Grid>
  );
}
