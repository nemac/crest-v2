import { americanSamoaConfig } from './regions/american_samoa';
import { continentalUSConfig } from './regions/continental_us';
import { guamConfig } from './regions/guam';
import { hawaiiConfig } from './regions/hawaii';
import { northernMarianaIslandsConfig } from './regions/northern_mariana_islands';
import { puertoRicoConfig } from './regions/puertoRico';
import { usVirginIslandsConfig } from './regions/usVirginIslands';
import { alaskaConfig } from './regions/alaska';

import basemapDarkImage from '../assets/images/basemap-dark.png';
import basemapImageryImage from '../assets/images/basemap-imagery.png';
import basemapStreetImage from '../assets/images/basemap-street.jpg';
import basemapTopoImage from '../assets/images/basemap-topo.jpg';

export const betaIdentifyEndpoint = 'https://api.resilientcoasts.org/beta/identify/';
export const prodIdentifyEndpoint = 'https://api.resilientcoasts.org/prod/identify/';
export const betaShareLinkEndpoint = 'https://api.resilientcoasts.org/beta/share-link';
export const prodShareLinkEndpoint = 'https://api.resilientcoasts.org/prod/share-link';
export const betaUploadShapeEndpoint = 'https://api.resilientcoasts.org/beta/upload_shape';
export const prodUploadShapeEndpoint = 'https://api.resilientcoasts.org/prod/upload_shape';
export const betaZonalStatsEndpoint = 'https://api.resilientcoasts.org/beta/zonal_stats';
export const prodZonalStatsEndpoint = 'https://api.resilientcoasts.org/prod/zonal_stats';
export const s3ShapeFileBucket = 'https://nfwf-tool-user-shapes.s3.amazonaws.com/';

export const mapConfig = {
  basemaps: {
    'Dark Gray': {
      label: 'Dark Gray',
      image: basemapDarkImage,
      basemap: 'ArcGIS:DarkGray'

    },
    Imagery: {
      label: 'Imagery',
      image: basemapImageryImage,
      basemap: 'ArcGIS:Imagery'
    },
    ImageryNoLabel: {
      label: 'Imagery - No Labels',
      image: basemapImageryImage,
      basemap: 'https://basemapstyles-api.arcgis.com/arcgis/rest/services/styles/v2/styles/arcgis/imagery/standard'
    },
    Streets: {
      label: 'Streets',
      image: basemapStreetImage,
      basemap: 'ArcGIS:Streets'
    },
    Topographic: {
      label: 'Topographic',
      image: basemapTopoImage,
      basemap: 'ArcGIS:Topographic'
    }
  },
  regions: {
    // eslint-disable-next-line quote-props
    'Alaska': alaskaConfig,
    'American Samoa': americanSamoaConfig,
    'Continental U.S': continentalUSConfig,
    // eslint-disable-next-line quote-props
    'Guam': guamConfig,
    'Hawai\'i': hawaiiConfig,
    'Northern Mariana Islands': northernMarianaIslandsConfig,
    'Puerto Rico': puertoRicoConfig,
    'US Virgin Islands': usVirginIslandsConfig
  },
  examplePolygonFeature: {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: []
    },
    properties: {
      areaName: null,
      buffer: true,
      leafletId: null, // this is the leaflet id of just the drawn layer
      leafletIdsList: [], // List of leaflet ids to remove. Includes both drawn layer and buffer
      zonalStatsData: {}
    }
  }
};
