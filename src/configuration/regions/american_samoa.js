import regionAmericanSamoaImage from '../../assets/images/zoomregion-as.png';

export const americanSamoaConfig = {
  label: 'American Samoa',
  image: regionAmericanSamoaImage,
  regionName: 'american_samoa',
  mapProperties: {
    label: 'American Samoa',
    center: [-14.31, -170.25],
    extent: [-170.88, -14.71, -168.92, -13.90],
    zoom: 9
  },
  attribution: 'NFWF 2020',
  hubsFeatureServer: 'https://services1.arcgis.com/PwLrOgCfU0cYShcG/ArcGIS/rest/services/CREST_American_Samoa_Hub_Cores_API_100421/FeatureServer/0',
  hubsHexServer: 'https://services1.arcgis.com/PwLrOgCfU0cYShcG/arcgis/rest/services/AS_hubs_hexes_merge_081921/FeatureServer/0',
  rankProperty: 'Rank', // need this in config because the rank property is different for all of the regions
  chartInputs: [
    {
      chartInputName: 'summary',
      ChartInputLabel: 'Summary'
    },
    {
      chartInputName: 'asset',
      ChartInputLabel: 'Community Assets Inputs'
    },
    {
      chartInputName: 'threat',
      ChartInputLabel: 'Threats Inputs'
    },
    {
      chartInputName: 'fishandwildlife',
      ChartInputLabel: 'Fish and Wildlife Inputs'
    }
  ],
  layerList: [
    {
      id: 'AS_HubsTMS',
      layer: 'Hubs TMS',
      label: 'Resilience Hubs',
      chartLabel: 'Resilience Hubs',
      chartLegendValues: 10,
      ChartInputLabel: 'Summary',
      ChartInputSubHeading: 'Resilience Hubs',
      chartCSSSelector: 'hubs',
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#ffc500',
        2: '#f9b500',
        3: '#f3a400',
        4: '#ed9400',
        5: '#e78300',
        6: '#e07000',
        7: '#d95e00',
        8: '#d14c00',
        9: '#ca3600',
        10: '#c21500'
      },
      chartCSSLegends: {
        0: '#E9ECEF',
        1: '#ffc500',
        2: '#f9b500',
        3: '#f3a400',
        4: '#ed9400',
        5: '#e78300',
        6: '#e07000',
        7: '#d95e00',
        8: '#d14c00',
        9: '#ca3600',
        10: '#c21500'
      },
      url: 'https://tiles.resilientcoasts.org/AS_HubsIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2020',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'Areas of open lands and protected space that may be suitable for resilience-building efforts. Hubs are ranked by priority, given the level of exposure that nearby assets have to flood-related threats and the presence and abundance of fish and wildlife species within and surrounding the Hub.',
      region: 'american_samoa'
    },
    {
      id: 'AS_HubsHexTMS',
      layer: 'Hubs Hex TMS',
      label: 'Resilience Hexagonal Grid',
      chartLabel: 'Resilience Hexagonal Grid',
      chartLegendValues: 10,
      ChartInputLabel: 'Summary',
      ChartInputSubHeading: 'Resilience Hubs',
      chartCSSSelector: 'hubsHex',
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#ffc500',
        2: '#f9b500',
        3: '#f3a400',
        4: '#ed9400',
        5: '#e78300',
        6: '#e07000',
        7: '#d95e00',
        8: '#d14c00',
        9: '#ca3600',
        10: '#c21500'
      },
      chartCSSLegends: {
        0: '#E9ECEF',
        1: '#ffc500',
        2: '#f9b500',
        3: '#f3a400',
        4: '#ed9400',
        5: '#e78300',
        6: '#e07000',
        7: '#d95e00',
        8: '#d14c00',
        9: '#ca3600',
        10: '#c21500'
      },
      url: 'https://tiles.resilientcoasts.org/AS_HubsHexIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2020',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'Shows variation in Resilience Hub rankings using a 10-acre (4-hectare) hexagonal grid. Highest-ranking hexagons represent areas within Resilience Hub boundaries that may be suitable for resilience-building efforts.',
      region: 'american_samoa'
    },
    {
      id: 'AS_ExposureTMS',
      layer: 'Exposure TMS',
      label: 'Community Exposure Index',
      chartLabel: 'Community Exposure',
      chartLegendValues: 10,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#1f6e6e',
        2: '#3d8282',
        3: '#7dad9c',
        4: '#b7d4b2',
        5: '#e9f2bb',
        6: '#f5e9a9',
        7: '#dbba7a',
        8: '#b08042',
        9: '#9b5526',
        10: '#633319'
      },
      chartCSSLegends: {
        0: '#E9ECEF',
        1: '#1f6e6e',
        2: '#3d8282',
        3: '#7dad9c',
        4: '#b7d4b2',
        5: '#e9f2bb',
        6: '#f5e9a9',
        7: '#dbba7a',
        8: '#b08042',
        9: '#9b5526',
        10: '#633319'
      },
      ChartInputLabel: 'Summary',
      ChartInputSubHeading: 'Community Exposure Index',
      chartCSSSelector: 'exposure',
      url: 'https://tiles.resilientcoasts.org/AS_ExposureIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2020',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'The product of the Asset and Threat Indices, which suggests areas on the landscape where community assets are potentially exposed to flood-related threats.',
      region: 'american_samoa'
    },
    {
      id: 'AS_AssetsTMS',
      layer: 'Assets TMS',
      label: 'Community Asset Index',
      chartLabel: 'Community Asset',
      chartLegendValues: 10,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#b6edf0',
        2: '#98d2ed',
        3: '#7cbbeb',
        4: '#5ca3e6',
        5: '#368de3',
        6: '#2176d9',
        7: '#2259c7',
        8: '#1d3eb5',
        9: '#1727a3',
        10: '#090991'
      },
      chartCSSLegends: {
        0: '#E9ECEF',
        1: '#b6edf0',
        2: '#98d2ed',
        3: '#7cbbeb',
        4: '#5ca3e6',
        5: '#368de3',
        6: '#2176d9',
        7: '#2259c7',
        8: '#1d3eb5',
        9: '#1727a3',
        10: '#090991'
      },
      ChartInputLabel: 'Summary',
      ChartInputSubHeading: 'Community Asset and Threat Indices',
      chartCSSSelector: 'asset',
      url: 'https://tiles.resilientcoasts.org/AS_AssetsIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2020',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'Index of community assets critical to the recovery of an area and human population. High values suggest areas with a higher, cumulative prevalence of community assets on the landscape.',
      region: 'american_samoa'
    },
    {
      id: 'AS_ThreatsTMS',
      layer: 'Threats TMS',
      label: 'Threat Index',
      chartLabel: 'Threat',
      chartLegendValues: 10,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#ffebd6',
        2: '#f7d7bc',
        3: '#f0c0a1',
        4: '#eba988',
        5: '#e3906f',
        6: '#de775b',
        7: '#d65d45',
        8: '#d14030',
        9: '#c9251c',
        10: '#c40a0a'
      },
      chartCSSLegends: {
        0: '#E9ECEF',
        1: '#ffebd6',
        2: '#f7d7bc',
        3: '#f0c0a1',
        4: '#eba988',
        5: '#e3906f',
        6: '#de775b',
        7: '#d65d45',
        8: '#d14030',
        9: '#c9251c',
        10: '#c40a0a'
      },
      ChartInputLabel: 'Summary',
      ChartInputSubHeading: 'Community Asset and Threat Indices',
      chartCSSSelector: 'threat',
      url: 'https://tiles.resilientcoasts.org/AS_ThreatsIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2020',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'Index of flood-related datasets, including storm surge scenarios and landscape characteristics that exacerbate flood potential. High values in the Index represent those areas on the landscape where there are multiple high values of individual inputs. The Threat Index results are conservative and should be interpreted with caution due to ongoing post seismic land subsidence, which is expected to exacerbate sea level rise coastal flooding in the region',
      region: 'american_samoa'
    },

    {
      id: 'AS_FishAndWildlifeTMS',
      layer: 'FishAndWildlife TMS',
      label: 'Fish and Wildlife Index',
      chartLabel: 'Fish and Wildlife',
      chartLegendValues: 6,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#EEE7F8',
        2: '#E9BBCB',
        3: '#DB90A6',
        4: '#D27C99',
        5: '#B7528A',
        6: '#7E33A8'
      },
      chartCSSLegends: {
        0: '#E9ECEF',
        1: '#EEE7F8',
        2: '#E9BBCB',
        3: '#DB90A6',
        4: '#D27C99',
        5: '#B7528A',
        6: '#7E33A8'
      },
      ChartInputLabel: 'Summary',
      ChartInputSubHeading: 'Fish and Wildlife',
      chartCSSSelector: 'wildlife',
      url: 'https://tiles.resilientcoasts.org/AS_CombinedWildlifeIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2020',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'Identifies valuable habitat for species of concern in both the terrestrial and marine environments. Higher values indicate more valuable habitat areas for both.',
      region: 'american_samoa'
    },
    {
      id: 'AS_AquaticTMS',
      layer: 'Marine TMS',
      label: 'Marine Index',
      chartLabel: 'Marine',
      chartLegendValues: 4,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#CDE1E8',
        2: '#82BCD1',
        3: '#007E91',
        4: '#005A62'
      },
      chartCSSLegends: {
        0: '#E9ECEF',
        1: '#CDE1E8',
        2: '#82BCD1',
        3: '#007E91',
        4: '#005A62'
      },
      ChartInputLabel: 'Fish and Wildlife Inputs',
      chartCSSSelector: 'marine',
      url: 'https://tiles.resilientcoasts.org/AS_AquaticIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2020',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'Higher values identify habitat areas that are most valuable for providing protection to nearby coastal communities and for the protection of marine species.',
      region: 'american_samoa'
    },
    {
      id: 'AS_TerrestrialTMS',
      layer: 'Terrestrial TMS',
      label: 'Terrestrial Index',
      chartLabel: 'terrestrial',
      chartLegendValues: 4,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#FFE9C4',
        2: '#DFC878',
        3: '#385B23',
        4: '#004900'
      },
      chartCSSLegends: {
        0: '#E9ECEF',
        1: '#FFE9C4',
        2: '#DFC878',
        3: '#385B23',
        4: '#004900'
      },
      ChartInputLabel: 'Fish and Wildlife Inputs',
      chartCSSSelector: 'terrestrial',
      url: 'https://tiles.resilientcoasts.org/AS_TerrestrialIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2020',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'Higher values identify habitat areas that are suitable to the most species of concern for that region, based on habitat preferences and potential threats identified by the IUCN Red List.',
      region: 'american_samoa'
    },
    {
      id: 'AS_PopDensityTMS',
      layer: 'Population Density TMS',
      label: 'Population Density',
      chartLabel: 'Population Density',
      chartLegendValues: 5,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#FFF6D0',
        2: '#EFC133',
        3: '#9EAC37',
        4: '#2C8D7A',
        5: '#385A4C'
      },
      ChartInputLabel: 'Community Assets Inputs',
      chartCSSSelector: 'pop_density',
      chartCSSLegends: {
        0: '#E9ECEF',
        1: '#FFF6D0',
        2: '#EFC133',
        3: '#9EAC37',
        4: '#2C8D7A',
        5: '#385A4C'
      },
      url: 'https://tiles.resilientcoasts.org/AS_PopDensityIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2020',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'A ranking of population density by estimates based on the 2010 Decennial Census. Areas are ranked from low to high using the ratio of people per square kilometer.',
      region: 'american_samoa'
    },
    {
      id: 'AS_SocVulnTMS',
      layer: 'Social Vulnerability TMS',
      label: 'Social Vulnerability',
      chartLabel: 'Social Vulnerability',
      chartLegendValues: 1,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#88419D',
        2: '#88419D'
      },
      ChartInputLabel: 'Community Assets Inputs',
      chartCSSSelector: 'social_vuln',
      chartCSSLegends: {
        0: '#E9ECEF',
        1: '#88419D'
      },
      url: 'https://tiles.resilientcoasts.org/AS_SocVulnIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2020',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'Estimates are ranked from low to high, depicting areas of high poverty, vulnerable housing characteristics, and personal disruption due to climate change according to data from the 2010 Decennial Census.',
      region: 'american_samoa'
    },
    {
      id: 'AS_CriticalFacilitiesTMS',
      layer: 'Critical Facilities TMS',
      label: 'Critical Facilities',
      chartLabel: 'Critical Facilities',
      chartLegendValues: 5,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#0084A8',
        2: '#0084A8',
        3: '#0084A8',
        4: '#0084A8',
        5: '#0084A8'
      },
      chartCSSLegends: {
        0: '#E9ECEF',
        5: '#0084A8'
      },
      ChartInputLabel: 'Community Assets Inputs',
      chartCSSSelector: 'crit_facilities',
      url: 'https://tiles.resilientcoasts.org/AS_CriticalFacilitiesIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2020',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'Facilities such as schools, hospitals, and police and fire stations that are important to recovery efforts when a community is faced with a flood-related event. All facilities are given the same presence rank.',
      region: 'american_samoa'
    },
    {
      id: 'AS_CriticalInfrastructureTMS',
      layer: 'Critical Infrastructure TMS',
      label: 'Critical Infrastructure',
      chartLabel: 'Critical Infrastructure',
      chartLegendValues: 15,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#CCD1D2',
        2: '#CCD1D2',
        3: '#CCD1D2',
        4: '#355C59',
        5: '#355C59',
        6: '#355C59',
        7: '#E8B16D',
        8: '#E8B16D',
        9: '#E8B16D',
        10: '#AD3541',
        11: '#AD3541',
        12: '#AD3541',
        13: '#7B1733',
        14: '#7B1733',
        15: '#7B1733'
      },
      chartCSSLegends: {
        0: '#E9ECEF',
        3: '#CCD1D2',
        5: '#355C59',
        8: '#E8B16D',
        10: '#AD3541',
        15: '#7B1733'
      },
      ChartInputLabel: 'Community Assets Inputs',
      chartCSSSelector: 'crit_infra',
      url: 'https://tiles.resilientcoasts.org/AS_CriticalInfrastructureIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2020',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'Infrastructure in and around communities that are integral to a community’s ability to recover from a flood event, including primary highways, power plants, and rail lines, among others. High values suggest areas where multiple infrastructure overlap.',
      region: 'american_samoa'
    },
    {
      id: 'AS_DrainageTMS',
      layer: 'Drainage TMS',
      label: 'Impermeable Soils',
      chartLabel: 'Impermeable Soils',
      chartLegendValues: 6,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#447604',
        2: '#447604',
        3: '#DCE9F2',
        4: '#DCE9F2',
        5: '#553555',
        6: '#553555'
      },
      chartCSSLegends: {
        0: '#E9ECEF',
        1: '#447604',
        3: '#DCE9F2',
        5: '#553555'
      },
      ChartInputLabel: 'Threats Inputs',
      chartCSSSelector: 'impermeable',
      url: 'https://tiles.resilientcoasts.org/AS_DraingeIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2020',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'Those areas with poor water drainage potential, including both less-porous soils and areas with high-intensity development. High values suggest that areas contain soils with poor drainage potential and/or a prevalence of developed, impervious surfaces that may pool during flooding or heavy precipitation events.',
      region: 'american_samoa'
    },
    {
      id: 'AS_ErosionTMS',
      layer: 'Erosion TMS',
      label: 'Soil Erodibility',
      chartLabel: 'Soil Erodibility',
      chartLegendValues: 5,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#feeba2',
        2: '#febb47',
        3: '#f07818',
        4: '#b84203',
        5: '#662506'
      },
      chartCSSLegends: {
        0: '#E9ECEF',
        1: '#feeba2',
        2: '#febb47',
        3: '#f07818',
        4: '#b84203',
        5: '#662506'
      },
      ChartInputLabel: 'Threats Inputs',
      chartCSSSelector: 'erosion',
      url: 'https://tiles.resilientcoasts.org/AS_ErosionIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2020',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'Those areas that contain soil characteristics that have a high susceptibility of soil particle detachment by water. This may include areas that have high silt content or migratory systems such as beaches and dunes. High values suggest that areas carry an increased potential for erosion due to flooding or heavy precipitation events.',
      region: 'american_samoa'
    },
    {
      id: 'AS_SLRTMS',
      layer: 'Sea Level Rise TMS',
      label: 'Sea Level Rise',
      chartLabel: 'Sea Level Rise',
      chartLegendValues: 5,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#dbd8ea',
        2: '#99b9d9',
        3: '#4095c3',
        4: '#027976',
        5: '#014636'
      },
      chartCSSLegends: {
        0: '#E9ECEF',
        1: '#dbd8ea',
        2: '#99b9d9',
        3: '#4095c3',
        4: '#027976',
        5: '#014636'
      },
      ChartInputLabel: 'Threats Inputs',
      chartCSSSelector: 'sea_level_rise',
      url: 'https://tiles.resilientcoasts.org/AS_SLRIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2020',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'NOAA’s sea level rise scenarios ranked from low to high, with low being a 5-foot scenario and high being a 1-foot scenario. These ranks are used to suggest the more imminent threat of a 1-foot rise in sea level versus a 5-foot rise that may eventually occur.',
      region: 'american_samoa'
    },
    {
      id: 'AS_WaveDrivenFloodingTMS',
      layer: 'Wave Driven TMS',
      label: 'Wave-Driven Flooding',
      chartLabel: 'Wave Driven Flooding',
      chartLegendValues: 4,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#FFFFCC',
        2: '#A1DAB4',
        3: '#41B6C4',
        4: '#225EA8'
      },
      chartCSSLegends: {
        0: '#E9ECEF',
        1: '#FFFFCC',
        2: '#A1DAB4',
        3: '#41B6C4',
        4: '#225EA8'
      },
      ChartInputLabel: 'Threats Inputs',
      chartCSSSelector: 'wave_flooding',
      url: 'https://tiles.resilientcoasts.org/AS_WaveDrivenFloodingIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2020',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'Areas are ranked according to probability of wave driven flooding, where a 10-year return period is given a higher rank than a 500-year return period.',
      region: 'american_samoa'
    },
    {
      id: 'AS_SlopeTMS',
      layer: 'Slope TMS',
      label: 'Areas of Low Slope',
      chartLabel: 'Areas of Low Slope',
      chartLegendValues: 5,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#d3eecd',
        2: '#98d594',
        3: '#4bb062',
        4: '#157f3b',
        5: '#00441b'
      },
      chartCSSLegends: {
        0: '#E9ECEF',
        1: '#d3eecd',
        2: '#98d594',
        3: '#4bb062',
        4: '#157f3b',
        5: '#00441b'
      },
      ChartInputLabel: 'Threats Inputs',
      chartCSSSelector: 'slope',
      url: 'https://tiles.resilientcoasts.org/AS_SlopeIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2020',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'The percent rise of the elevation of the landscape, given values from low to high. High values indicate those areas that are very low lying and more likely to retain water and flood.',
      region: 'american_samoa'
    },
    {
      id: 'AS_FloodProneAreasTMS',
      layer: 'Flood Prone Areas TMS',
      label: 'Flood-Prone Areas',
      chartLabel: 'Flood Prone Areas',
      chartLegendValues: 5,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#e2e2ef',
        2: '#b6b6d8',
        3: '#8683bd',
        4: '#61409b',
        5: '#3f007d'
      },
      chartCSSLegends: {
        0: '#E9ECEF',
        1: '#e2e2ef',
        2: '#b6b6d8',
        3: '#8683bd',
        4: '#61409b',
        5: '#3f007d'
      },
      ChartInputLabel: 'Threats Inputs',
      chartCSSSelector: 'floodprone_areas',
      url: 'https://tiles.resilientcoasts.org/AS_FloodProneAreasIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2020',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'Areas considered by FEMA to be in the 100- and 500-year flood zones, as well as the floodway. Frequently and occasionally flooded soil designations are used to identify areas outside of FEMA coverage. Highest values suggest areas directly in the floodway, whereas low values suggest occasionally flooded soils outside of the floodplain.',
      region: 'american_samoa'
    },
    {
      id: 'AS_TsunamiIndexTiles',
      layer: 'Tsunami',
      label: 'Tsunami',
      chartLabel: 'Tsunami',
      chartLegendValues: 4,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#2171b5',
        2: '#2171b5',
        3: '#2171b5',
        4: '#2171b5'
      },
      chartCSSLegends: {
        0: '#E9ECEF',
        3: '#2171b5'
      },
      ChartInputLabel: 'Threats Inputs',
      chartCSSSelector: 'tsunami',
      url: 'https://tiles.resilientcoasts.org/AS_TsunamiIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2020',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'Represents the maximum extent of inundation due to tsunami.',
      region: 'american_samoa'
    }
  ]

};
