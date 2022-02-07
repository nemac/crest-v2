import { americanSamoaConfig } from './regions/american_samoa'
import { conusConfig } from './regions/continental_us'
import { guamConfig } from './regions/guam'
import { hawaiiConfig } from './regions/hawaii'
import { northernMarianaIslandsConfig } from './regions/northern_mariana_islands'
import { puertoRicoConfig } from './regions/puertoRico'
import { usVirginIslandsConfig } from './regions/usVirginIslands'

export var mapConfig = {
  /*regions: {
    americanSamoa: americanSamoaConfig,
    conus: conusConfig,
    guam: guamConfig,
    hawaii: hawaiiConfig,
    northernMarianaIslands: northernMarianaIslandsConfig,
    puertoRico: puertoRicoConfig,
    usVirginIslands: usVirginIslandsConfig
  },*/
  regions: [
    americanSamoaConfig,
    conusConfig,
    guamConfig,
    hawaiiConfig,
    northernMarianaIslandsConfig,
    puertoRicoConfig,
    usVirginIslandsConfig
  ],
}