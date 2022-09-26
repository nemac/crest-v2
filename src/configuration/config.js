import { americanSamoaConfig } from './regions/american_samoa';
import { continentalUSConfig } from './regions/continental_us';
import { guamConfig } from './regions/guam';
import { hawaiiConfig } from './regions/hawaii';
import { northernMarianaIslandsConfig } from './regions/northern_mariana_islands';
import { puertoRicoConfig } from './regions/puertoRico';
import { usVirginIslandsConfig } from './regions/usVirginIslands';
import { alaskaConfig } from './regions/alaska';

export const betaIdentifyEndpoint = 'https://api.resilientcoasts.org/beta/identify/';
export const prodIdentifyEndpoint = 'https://api.resilientcoasts.org/prod/identify/';
export const mapConfig = {
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
