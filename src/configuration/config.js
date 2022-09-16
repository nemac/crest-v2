import { americanSamoaConfig } from './regions/american_samoa';
import { continentalUSConfig } from './regions/continental_us';
import { guamConfig } from './regions/guam';
import { hawaiiConfig } from './regions/hawaii';
import { northernMarianaIslandsConfig } from './regions/northern_mariana_islands';
import { puertoRicoConfig } from './regions/puertoRico';
import { usVirginIslandsConfig } from './regions/usVirginIslands';
import { alaskaConfig } from './regions/alaska';

export const betaIdentifyEndpoint = 'https://rlwk45u34h.execute-api.us-east-1.amazonaws.com/beta/identify/';
export const prodIdentifyEndpoint = 'https://c5pbxj0fe6.execute-api.us-east-1.amazonaws.com/prod/identify/';
export const mapConfig = {
  basemaps: {
    'Dark Gray': 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',
    // eslint-disable-next-line quote-props
    'Imagery': 'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
    // eslint-disable-next-line quote-props
    'Streets': 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    // eslint-disable-next-line quote-props
    'Topographic': 'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg'
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
  }
};
