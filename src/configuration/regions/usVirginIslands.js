import regionUSVirginIslandsImage from '../../assets/images/zoomregion-uvi-v2.png';

export const usVirginIslandsConfig = {
  label: 'US Virgin Islands',
  image: regionUSVirginIslandsImage,
  regionName: 'us_virgin_islands',
  reportEnglish: {
    fileLink: 'https://www.nfwf.org/sites/default/files/2020-08/us-virgin-islands-coastal-resilience-assessment.pdf',
    name: 'U.S. Virgin Islands Coastal Resilience Assessment'
  },
  reportNative: {
    fileLink: null,
    name: null
  },
  dataDownload: {
    fileSize: '10 MB',
    fileLink: 'https://nfwf-tool.s3.amazonaws.com/nfwf_download_data/US_Virgin_Islands_Assessment_Data.zip',
    name: 'U.S. Virgin Islands Data Download'
  },
  mapProperties: {
    label: 'US Virgin Islands',
    center: [18.02, -64.70],
    extent: [-65.13508888306899, 17.627008270947076, -64.25480934205336, 18.46267598832466],
    zoom: 10
  },
  attribution: 'NFWF 2020',
  hubsFeatureServer: 'https://services1.arcgis.com/PwLrOgCfU0cYShcG/arcgis/rest/services/USVI_hubs_staging_073020/FeatureServer/0',
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
  layerList:
    [
      {
        id: 'USVI_HubsTMS',
        layer: 'Hubs TMS',
        label: 'Resilience Hubs',
        chartLabel: 'Resilience Hubs',
        chartInputName: 'summary',
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
        url: 'https://tiles.resilientcoasts.org/USVI_HubsIndexTiles/{z}/{x}/{y}.png',
        attribution: 'NFWF 2020',
        opacity: 0.75,
        maxNativeZoom: 14,
        description: 'Areas of open lands and protected space that may be suitable for resilience-building efforts. Hubs are ranked by priority, given the level of exposure that nearby assets have to flood-related threats and the presence and abundance of fish and wildlife species within and surrounding the Hub.',
        region: 'us_virgin_islands'
      },
      {
        id: 'USVI_ExposureTMS',
        layer: 'Exposure TMS',
        label: 'Community Exposure Index',
        chartLabel: 'Community Exposure',
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
        chartInputName: 'summary',
        ChartInputLabel: 'Summary',
        ChartInputSubHeading: 'Community Exposure Index',
        chartCSSSelector: 'exposure',
        url: 'https://tiles.resilientcoasts.org/USVI_ExposureIndexTiles/{z}/{x}/{y}.png',
        attribution: 'NFWF 2020',
        opacity: 0.75,
        maxNativeZoom: 14,
        description: 'The product of the Asset and Threat Indices, which suggests areas on the landscape where community assets are potentially exposed to flood-related threats.',
        region: 'us_virgin_islands'
      },
      {
        id: 'USVI_AssetsTMS',
        layer: 'Assets TMS',
        label: 'Community Asset Index',
        chartLabel: 'Community Asset',
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
        chartInputName: 'summary',
        ChartInputLabel: 'Summary',
        ChartInputSubHeading: 'Community Asset and Threat Indices',
        chartCSSSelector: 'asset',
        url: 'https://tiles.resilientcoasts.org/USVI_AssetsIndexTiles/{z}/{x}/{y}.png',
        attribution: 'NFWF 2020',
        opacity: 0.75,
        maxNativeZoom: 14,
        description: 'Index of community assets critical to the recovery of an area and human population. High values suggest areas with a higher, cumulative prevalence of community assets on the landscape.',
        region: 'us_virgin_islands'
      },
      {
        id: 'USVI_ThreatsTMS',
        layer: 'Threats TMS',
        label: 'Threat Index',
        chartLabel: 'Threat',
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
        chartInputName: 'summary',
        ChartInputLabel: 'Summary',
        ChartInputSubHeading: 'Community Asset and Threat Indices',
        chartCSSSelector: 'threat',
        url: 'https://tiles.resilientcoasts.org/USVI_ThreatsIndexTiles/{z}/{x}/{y}.png',
        attribution: 'NFWF 2020',
        opacity: 0.75,
        maxNativeZoom: 14,
        description: 'Index of flood-related datasets, including storm surge scenarios and landscape characteristics that exacerbate flood potential. High values in the Index represent those areas on the landscape where there are multiple high values of individual inputs.',
        region: 'us_virgin_islands'
      },

      {
        id: 'USVI_FishAndWildlifeTMS',
        layer: 'FishAndWildlife TMS',
        label: 'Fish and Wildlife Index',
        chartLabel: 'Fish and Wildlife',
        chartCSSColor: {
          0: '#E9ECEF',
          1: '#EEE7F8',
          2: '#E9BBCB',
          3: '#DB90A6',
          4: '#D27C99',
          5: '#B7528A',
          6: '#7E33A8'
        },
        chartInputName: 'summary',
        ChartInputLabel: 'Summary',
        ChartInputSubHeading: 'Fish and Wildlife',
        chartCSSSelector: 'wildlife',
        url: 'https://tiles.resilientcoasts.org/USVI_CombinedWildlifeIndexTiles/{z}/{x}/{y}.png',
        attribution: 'NFWF 2020',
        opacity: 0.75,
        maxNativeZoom: 14,
        description: 'Identifies valuable habitat for species of concern in both the terrestrial and marine environments. Higher values indicate more valuable habitat areas for both.',
        region: 'us_virgin_islands'
      },
      {
        id: 'USVI_AquaticTMS',
        layer: 'Marine TMS',
        label: 'Marine Index',
        chartLabel: 'Marine',
        chartCSSColor: {
          0: '#E9ECEF',
          1: '#CDE1E8',
          2: '#82BCD1',
          3: '#007E91',
          4: '#005A62'
        },
        chartInputName: 'fishandwildlife',
        ChartInputLabel: 'Fish and Wildlife Inputs',
        chartCSSSelector: 'aquatic',
        url: 'https://tiles.resilientcoasts.org/USVI_AquaticIndexTiles/{z}/{x}/{y}.png',
        attribution: 'NFWF 2020',
        opacity: 0.75,
        maxNativeZoom: 14,
        description: 'Higher values identify habitat areas that are most valuable for providing protection to nearby coastal communities and for the protection of marine species.',
        region: 'us_virgin_islands'
      },
      {
        id: 'USVI_TerrestrialTMS',
        layer: 'Terrestrial TMS',
        label: 'Terrestrial Index',
        chartLabel: 'Terrestrial',
        chartCSSColor: {
          0: '#E9ECEF',
          1: '#FFE9C4',
          2: '#DFC878',
          3: '#385B23',
          4: '#004900'
        },
        chartInputName: 'fishandwildlife',
        ChartInputLabel: 'Fish and Wildlife Inputs',
        chartCSSSelector: 'terrestrial',
        url: 'https://tiles.resilientcoasts.org/USVI_TerrestrialIndexTiles/{z}/{x}/{y}.png',
        attribution: 'NFWF 2020',
        opacity: 0.75,
        maxNativeZoom: 14,
        description: 'Higher values identify habitat areas that are suitable to the most species of concern for that region, based on habitat preferences and potential threats identified by the IUCN Red List.',
        region: 'us_virgin_islands'
      },
      {
        id: 'USVI_PopDensityTMS',
        layer: 'Population Density TMS',
        label: 'Population Density',
        chartLabel: 'Population Density',
        chartCSSColor: {
          0: '#E9ECEF',
          1: '#dfc878',
          2: '#efc133',
          3: '#9eac37',
          4: '#2c8d7a',
          5: '#385a4c'
        },
        chartInputName: 'asset',
        ChartInputLabel: 'Community Assets Inputs',
        chartCSSSelector: 'pop_density',
        url: 'https://tiles.resilientcoasts.org/USVI_PopDensityIndexTiles/{z}/{x}/{y}.png',
        attribution: 'NFWF 2020',
        opacity: 0.75,
        maxNativeZoom: 14,
        description: 'A ranking of population density by estates based on the 2010 Decennial Census. Areas are ranked from low to high using the ratio of people per square kilometer.',
        region: 'us_virgin_islands'
      },
      {
        id: 'USVI_SocVulnTMS',
        layer: 'Social Vulnerability TMS',
        label: 'Social Vulnerability',
        chartLabel: 'Social Vulnerability',
        chartCSSColor: {
          0: '#E9ECEF',
          1: '#9EBBD7',
          2: '#7A8EF5',
          3: '#43309D',
          4: '#321669',
          5: '#270B59'
        },
        chartInputName: 'asset',
        ChartInputLabel: 'Community Assets Inputs',
        chartCSSSelector: 'social_vuln',
        url: 'https://tiles.resilientcoasts.org/USVI_SocVulnIndexTiles/{z}/{x}/{y}.png',
        attribution: 'NFWF 2020',
        opacity: 0.75,
        maxNativeZoom: 14,
        description: 'Estates are ranked from low to high, depicting areas of lower median incomes and minority populations based on 2010 Decennial Census Data and guidance from USEPA EJSCREEN methodology.',
        region: 'us_virgin_islands'
      },
      {
        id: 'USVI_CriticalFacilitiesTMS',
        layer: 'Critical Facilities TMS',
        label: 'Critical Facilities',
        chartLabel: 'Critical Facilities',
        chartCSSColor: {
          0: '#E9ECEF',
          1: '#0084a8',
          2: '#0084a8',
          3: '#0084a8',
          4: '#0084a8',
          5: '#0084a8',
          6: '#0084a8'
        },
        chartInputName: 'asset',
        ChartInputLabel: 'Community Assets Inputs',
        chartCSSSelector: 'crit_facilities',
        url: 'https://tiles.resilientcoasts.org/USVI_CriticalFacilitiesIndexTiles/{z}/{x}/{y}.png',
        attribution: 'NFWF 2020',
        opacity: 0.75,
        maxNativeZoom: 14,
        description: 'Facilities such as schools, hospitals, and police and fire stations that are important to recovery efforts when a community is faced with a flood-related event. All facilities are given the same presence rank.',
        region: 'us_virgin_islands'
      },
      {
        id: 'USVI_CriticalInfrastructureTMS',
        layer: 'Critical Infrastructure TMS',
        label: 'Critical Infrastructure',
        chartLabel: 'Critical Infrastructure',
        chartCSSColor: {
          0: '#E9ECEF',
          1: '#ccd1d2',
          2: '#355c59',
          3: '#e8b16d',
          4: '#b15a3c',
          5: '#ad3541',
          6: '#7b1733'
        },
        chartInputName: 'asset',
        ChartInputLabel: 'Community Assets Inputs',
        chartCSSSelector: 'crit_infra',
        url: 'https://tiles.resilientcoasts.org/USVI_CriticalInfrastructureIndexTiles/{z}/{x}/{y}.png',
        attribution: 'NFWF 2020',
        opacity: 0.75,
        maxNativeZoom: 14,
        description: 'Infrastructure in and around communities that are integral to a community’s ability to recover from a flood event, including primary highways, power plants, and rail lines, among others. High values suggest areas where multiple infrastructure overlap.',
        region: 'us_virgin_islands'
      },
      {
        id: 'USVI_DrainageTMS',
        layer: 'Drainage TMS',
        label: 'Impermeable Soils',
        chartLabel: 'Impermeable Soils',
        chartCSSColor: {
          0: '#E9ECEF',
          1: '#447604',
          2: '#77D66F',
          3: '#dce9f2',
          4: '#755b69',
          5: '#553555'
        },
        chartInputName: 'threat',
        ChartInputLabel: 'Threats Inputs',
        chartCSSSelector: 'drainage',
        url: 'https://tiles.resilientcoasts.org/USVI_DraingeIndexTiles/{z}/{x}/{y}.png',
        attribution: 'NFWF 2020',
        opacity: 0.75,
        maxNativeZoom: 14,
        description: 'Those areas with poor water drainage potential, including both less-porous soils and areas with high-intensity development. High values suggest that areas contain soils with poor drainage potential and/or a prevalence of developed, impervious surfaces that may pool during flooding or heavy precipitation events.',
        region: 'us_virgin_islands'
      },
      {
        id: 'USVI_ErosionTMS',
        layer: 'Erosion TMS',
        label: 'Soil Erodibility',
        chartLabel: 'Soil Erodibility',
        chartCSSColor: {
          0: '#E9ECEF',
          1: '#feeba2',
          2: '#febb47',
          3: '#f07818',
          4: '#b84203',
          5: '#662506'
        },
        chartInputName: 'threat',
        ChartInputLabel: 'Threats Inputs',
        chartCSSSelector: 'erosion',
        url: 'https://tiles.resilientcoasts.org/USVI_ErosionIndexTiles/{z}/{x}/{y}.png',
        attribution: 'NFWF 2020',
        opacity: 0.75,
        maxNativeZoom: 14,
        description: 'Those areas that contain soil characteristics that have a high susceptibility of soil particle detachment by water. This may include areas that have high silt content or migratory systems such as beaches and dunes. High values suggest that areas carry an increased potential for erosion due to flooding or heavy precipitation events.',
        region: 'us_virgin_islands'
      },
      {
        id: 'USVI_SLRTMS',
        layer: 'Sea Level Rise TMS',
        label: 'Sea Level Rise',
        chartLabel: 'Sea Level Rise',
        chartCSSColor: {
          0: '#E9ECEF',
          1: '#dbd8ea',
          2: '#99b9d9',
          3: '#4095c3',
          4: '#027976',
          5: '#014636'
        },
        chartInputName: 'threat',
        ChartInputLabel: 'Threats Inputs',
        chartCSSSelector: 'sea_level_rise',
        url: 'https://tiles.resilientcoasts.org/USVI_SLRIndexTiles/{z}/{x}/{y}.png',
        attribution: 'NFWF 2020',
        opacity: 0.75,
        maxNativeZoom: 14,
        description: 'NOAA’s sea level rise scenarios ranked from low to high, with low being a 5-foot scenario and high being a 1-foot scenario. These ranks are used to suggest the more imminent threat of a 1-foot rise in sea level versus a 5-foot rise that may eventually occur.',
        region: 'us_virgin_islands'
      },
      {
        id: 'USVI_StormSurgeTMS',
        layer: 'Storm Surge TMS',
        label: 'Storm Surge',
        chartLabel: 'Storm Surge',
        chartCSSColor: {
          0: '#E9ECEF',
          1: '#d6efb3',
          2: '#73c8bd',
          3: '#2498c1',
          4: '#234da0',
          5: '#081d58'
        },
        chartInputName: 'threat',
        ChartInputLabel: 'Threats Inputs',
        chartCSSSelector: 'storm_surge',
        url: 'https://tiles.resilientcoasts.org/USVI_StormSurgeIndexTiles/{z}/{x}/{y}.png',
        attribution: 'NFWF 2020',
        opacity: 0.75,
        maxNativeZoom: 14,
        description: 'Based on the impacts from modeled hurricane storm categories, storm surge is ranked from low to high, with low being a 5-foot surge and high being a 1-foot surge. As a 1-foot surge is more likely to occur than a 5-foot surge, areas within the 1-foot designation are ranked with higher values.',
        region: 'us_virgin_islands'
      },
      {
        id: 'USVI_SlopeTMS',
        layer: 'Slope TMS',
        label: 'Areas of Low Slope',
        chartLabel: 'Areas of Low Slope',
        chartCSSColor: {
          0: '#E9ECEF',
          1: '#d3eecd',
          2: '#98d594',
          3: '#4bb062',
          4: '#157f3b',
          5: '#00441b'
        },
        chartInputName: 'threat',
        ChartInputLabel: 'Threats Inputs',
        chartCSSSelector: 'slope',
        url: 'https://tiles.resilientcoasts.org/USVI_SlopeIndexTiles/{z}/{x}/{y}.png',
        attribution: 'NFWF 2020',
        opacity: 0.75,
        maxNativeZoom: 14,
        description: 'The percent rise of the elevation of the landscape, given values from low to high. High values indicate those areas that are very low lying and more likely to retain water and flood.',
        region: 'us_virgin_islands'
      },
      {
        id: 'USVI_FloodProneAreasTMS',
        layer: 'Flood Prone Areas TMS',
        label: 'Flood-Prone Areas',
        chartLabel: 'Flood Prone Areas',
        chartCSSColor: {
          0: '#E9ECEF',
          1: '#e2e2ef',
          2: '#b6b6d8',
          3: '#8683bd',
          4: '#61409b',
          5: '#3f007d'
        },
        chartInputName: 'threat',
        ChartInputLabel: 'Threats Inputs',
        chartCSSSelector: 'floodprone_areas',
        url: 'https://tiles.resilientcoasts.org/USVI_FloodProneAreasIndexTiles/{z}/{x}/{y}.png',
        attribution: 'NFWF 2020',
        opacity: 0.75,
        maxNativeZoom: 14,
        description: 'Areas considered by FEMA to be in the 100- and 500-year flood zones, as well as the floodway. Frequently and occasionally flooded soil designations are used to identify areas outside of FEMA coverage. Highest values suggest areas directly in the floodway, whereas low values suggest occasionally flooded soils outside of the floodplain.',
        region: 'us_virgin_islands'
      }
    ]

};
