import regionGreatLakesImage from '../../assets/images/great_lakes.png';

export const greatLakesConfig = {
  label: 'Great Lakes',
  image: regionGreatLakesImage,
  regionName: 'great_lakes',
  mapProperties: {
    label: 'Great_Lakes',
    center: [45.32, -84.47],
    extent: [-92.03, 47.28, -76.52, 42.19],
    zoom: 6
  },
  attribution: 'NFWF 2022',
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
    },
    {
      chartInputName: 'additional',
      ChartInputLabel: 'Additional Overlays'
    }
  ],
  layerList: [
    {
      id: 'GL_HubsTMS',
      layer: 'Hubs TMS',
      label: 'Resilience Hubs',
      chartLabel: 'Resilience Hubs',
      chartLegendValues: 10,
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
      chartInputName: 'summary',
      ChartInputLabel: 'Summary',
      ChartInputSubHeading: 'Resilience Hubs',
      chartCSSSelector: 'hubs',
      url: 'https://tiles.resilientcoasts.org/GL_HubsIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2022',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'Resilience Hub Cores represent contiguous, unfragmented habitat cores proximate to human community assets ranked by combining Community Exposure and Fish and Wildlife Index values with other key inputs. Resilience Hub Cores provide a coarse-scale view of Resilience Hubs, where higher values represent areas with greater potential for dual community flood protection and wildlife benefits. See the U.S. Great Lakes Assessment report for details.',
      region: 'great_lakes'
    },
    {
      id: 'GL_HubsHexTMS',
      layer: 'Hubs Hex TMS',
      label: 'Resilience Hub Grid',
      chartLabel: 'Resilience Hub Grid',
      chartLegendValues: 10,
      chartInputName: 'summary',
      ChartInputLabel: 'Summary',
      ChartInputSubHeading: 'Resilience Hubs',
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
      url: 'https://tiles.resilientcoasts.org/GL_HubsHexIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2022',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'The Resilience Hub Grid applies a 10-acre hexagonal grid to show variation within habitat cores, ranking each hexagon by combining Community Exposure and Fish and Wildlife Index values with other key inputs. The Resilience Hub Grid provides a fine-scale view of Resilience Hubs, where higher values represent areas with greater potential for dual community flood protection and wildlife benefits. See the U.S. Great Lakes Assessment report for details.',
      region: 'great_lakes'
    },
    {
      id: 'GL_ExposureTMS',
      layer: 'Exposure TMS',
      label: 'Community Exposure Index',
      chartLabel: 'Community Exposure',
      chartLegendValues: 10,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#FFFFE5',
        2: '#FFF8C1',
        3: '#FEE79B',
        4: '#FECE65',
        5: '#FEAC3A',
        6: '#F68720',
        7: '#E1640E',
        8: '#C14702',
        9: '#933204',
        10: '#662506'
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
      chartInputName: 'summary',
      ChartInputLabel: 'Summary',
      ChartInputSubHeading: 'Community Exposure Index',
      chartCSSSelector: 'exposure',
      url: 'https://tiles.resilientcoasts.org/GL_ExposureIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2022',
      format: 'image/png',
      opacity: 0.75,
      maxNativeZoom: 14,

      description: 'The product of the Community Asset Index and Threat Index, the Community Exposure Index identifies areas where human community assets are potentially exposed to numerous flood-related threats. Color ramp varies from other regions but displays similar information. See the U.S. Great Lakes Assessment report for details.',
      region: 'great_lakes'
    },
    {
      id: 'GL_AssetsTMS',
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
      chartInputName: 'summary',
      ChartInputLabel: 'Summary',
      ChartInputSubHeading: 'Community Asset and Threat Indices',
      chartCSSSelector: 'asset',
      url: 'https://tiles.resilientcoasts.org/GL_AssetsIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2022',
      format: 'image/png',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'Index of human community assets that are important to help a community respond to and recover from a flooding event. High values represent areas with dense concentration of critical facilities, infrastructure, and population and social vulnerability. See the U.S. Great Lakes Assessment report for details.',
      region: 'great_lakes'
    },
    {
      id: 'GL_ThreatsTMS',
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
      chartInputName: 'summary',
      ChartInputLabel: 'Summary',
      ChartInputSubHeading: 'Community Asset and Threat Indices',
      chartCSSSelector: 'threat',
      url: 'https://tiles.resilientcoasts.org/GL_ThreatsIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2022',
      format: 'image/png',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'Index of flood-related datasets, including high lake levels and landscape characteristics that exacerbate flood potential. High values represent areas with multiple flood-related threat inputs. See the U.S. Great Lakes Assessment report for details.',
      region: 'great_lakes'
    },
    {
      id: 'GL_FishAndWildlifeTMS',
      layer: 'FishAndWildlife TMS',
      label: 'Fish and Wildlife Index',
      chartLabel: 'Fish and Wildlife',
      chartLegendValues: 10,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#EEF8F3',
        2: '#EDD0E0',
        3: '#E9BBCB',
        4: '#E3A6B7',
        5: '#DB90A6',
        6: '#D27C99',
        7: '#C6678F',
        8: '#B7528A',
        9: '#A33F8F',
        10: '#7E33A8'
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
      chartInputName: 'summary',
      ChartInputLabel: 'Summary',
      ChartInputSubHeading: 'Fish and Wildlife',
      chartCSSSelector: 'wildlife',
      url: 'https://tiles.resilientcoasts.org/GL_CombinedWildlifeIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2022',
      format: 'image/png',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'The sum of the Terrestrial Index, Aquatic Index, and Protected and Managed Areas for Biodiversity, the Fish and Wildlife Index identifies habitat and protected areas important for terrestrial and aquatic species of conservation concern and/or off-reservation harvest regulations. Higher values represent areas important for numerous species of concern. See the U.S. Great Lakes Assessment report for details.',
      region: 'great_lakes'
    },
    {
      id: 'GL_AquaticTMS',
      layer: 'Aquatic TMS',
      label: 'Aquatic Index',
      chartLabel: 'Aquatic',
      chartLegendValues: 10,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#FFF7FB',
        2: '#ECE7F2',
        3: '#D0D1E6',
        4: '#A6BDDB',
        5: '#74A9CF',
        6: '#3690C0',
        7: '#0570B0',
        8: '#045A8D',
        9: '#023858',
        10: '#01172C'
      },
      chartCSSLegends: {
        0: '#E9ECEF',
        1: '#CDE1E8',
        2: '#82BCD1',
        3: '#007E91',
        4: '#005A62'
      },
      chartInputName: 'fishandwildlife',
      ChartInputLabel: 'Fish and Wildlife Inputs',
      chartCSSSelector: 'aquatic',
      url: 'https://tiles.resilientcoasts.org/GL_AquaticIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2022',
      format: 'image/png',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'Index of habitat suitable for species of conservation concern and/or species with off-reservation harvest regulations that utilize riverine and lacustrine habitats. The Index also considers designated critical habitat, nearshore reefs and fish spawning locations, and Great Lakes Brook Trout Conservation Portfolio habitat patches, which served as a proxy for cool and cold-water habitat. High values represent areas important for numerous aquatic species of concern. See the U.S. Great Lakes Assessment report for details.',
      region: 'great_lakes'
    },
    {
      id: 'GL_TerrestrialTMS',
      layer: 'Terrestrial TMS',
      label: 'Terrestrial Index',

      chartLabel: 'Terrestrial',
      chartLegendValues: 10,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#FFFFE5',
        2: '#F1E7B5',
        3: '#E3CE84',
        4: '#BAB065',
        5: '#888F4C',
        6: '#576F33',
        7: '#32591F',
        8: '#215415',
        9: '#114E0A',
        10: '#004900'
      },
      chartCSSLegends: {
        0: '#E9ECEF',
        1: '#FFE9C4',
        2: '#DFC878',
        3: '#385B23',
        4: '#004900'
      },
      chartInputName: 'fishandwildlife',
      ChartInputLabel: 'Fish and Wildlife Inputs',
      chartCSSSelector: 'terrestrial',
      url: 'https://tiles.resilientcoasts.org/GL_TerrestrialIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2022',
      format: 'image/png',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'Index of habitat suitable for species of conservation concern and/or species with off-reservation harvest regulations that utilize terrestrial habitats. The Index also considers designated critical habitat, Important Bird Areas, and Key Biodiversity Areas. High values represent areas important for numerous terrestrial species of concern. See the U.S. Great Lakes Assessment report for details.',
      region: 'great_lakes'
    },
    {
      id: 'GL_SocVulnTMS',
      layer: 'Social Vulnerability TMS',
      label: 'Social Vulnerability',
      chartLabel: 'Social Vulnerability',
      chartLegendValues: 5,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#9EBBD7',
        2: '#7A8EF5',
        3: '#43309D',
        4: '#321699',
        5: '#270B59'
      },
      chartCSSLegends: {
        0: '#E9ECEF',
        1: '#abd2fa',
        2: '#7692ff',
        3: '#3a1459'
      },
      chartInputName: 'asset',
      ChartInputLabel: 'Community Assets Inputs',
      chartCSSSelector: 'social_vuln',
      url: 'https://tiles.resilientcoasts.org/GL_SocVulnIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2022',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'Identifies census blocks that are socially vulnerable using the Demographic Index in EPA’s EJSCREEN data. Census blocks above the 50th percentile nationally are ranked from low to high, which indicates census blocks with low income and minority populations. See the U.S. Great Lakes Assessment report for details.',
      region: 'great_lakes'
    },
    {
      id: 'GL_PopDensityTMS',
      layer: 'Population Density TMS',
      label: 'Population Density',
      chartLabel: 'Population Density',
      chartLegendValues: 5,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#fff6d0',
        2: '#efc133',
        3: '#9eac37',
        4: '#2c8d7a',
        5: '#385a4c'
      },
      chartCSSLegends: {
        0: '#E9ECEF',
        1: '#FFF6D0',
        2: '#EFC133',
        3: '#9EAC37',
        4: '#2C8D7A',
        5: '#385A4C'
      },
      chartInputName: 'asset',
      ChartInputLabel: 'Community Assets Inputs',
      chartCSSSelector: 'pop_density',
      url: 'https://tiles.resilientcoasts.org/GL_PopDensityIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2020',
      format: 'image/png',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'A ranking of population density by census blocks based on the 2020 Decennial Census. Areas are ranked from low to high using the ratio of people per square kilometer relative to the most densely populated census block in the study area. See the U.S. Great Lakes Assessment report for details.',
      region: 'great_lakes'
    },
    {
      id: 'GL_CriticalFacilitiesTMS',
      layer: 'Critical Facilities TMS',
      label: 'Critical Facilities',

      chartLabel: 'Critical Facilities',
      chartLegendValues: 5,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#0084A8', // 5
        2: '#0084A8', // 5
        3: '#0084A8', // 5
        4: '#0084A8', // 5
        5: '#0084A8' // 5
      },
      chartCSSLegends: {
        0: '#E9ECEF',
        5: '#0084A8'
      },
      chartInputName: 'asset',
      ChartInputLabel: 'Community Assets Inputs',
      chartCSSSelector: 'crit_facilities',
      url: 'https://tiles.resilientcoasts.org/GL_CriticalFacilitiesIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2022',
      format: 'image/png',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'Facilities that provide important recovery and operational support during and following flood events such as schools, emergency response and law enforcement facilities, health and medical facilities, and government and military buildings. All critical facilities are given the same rank based on presence. See the U.S. Great Lakes Assessment report for details.',
      region: 'great_lakes'
    },
    {
      id: 'GL_CommunityInfrastructureTMS',
      layer: 'Critical Infrastructure TMS',
      label: 'Critical Infrastructure',

      chartLabel: 'Critical Infrastructure',
      chartLegendValues: 5,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#A82B41', // 5
        2: '#A82B41', // 5
        3: '#A82B41', // 5
        4: '#A82B41', // 5
        5: '#A82B41' // 5
      },
      chartCSSLegends: {
        0: '#E9ECEF',
        3: '#CCD1D2',
        5: '#355C59',
        8: '#E8B16D',
        10: '#AD3541',
        15: '#7B1733'
      },
      chartInputName: 'asset',
      ChartInputLabel: 'Community Assets Inputs',
      chartCSSSelector: 'crit_infra',
      url: 'https://tiles.resilientcoasts.org/GL_CommunityInfrastructurIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2022',
      format: 'image/png',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'Infrastructure integral to a community’s ability to mitigate damages and recover from a flood event, including transportation, waterways, water treatment, communications, energy, and hazardous site infrastructure. All critical infrastructure is given the same rank based on presence. High values indicate areas where one or more infrastructure types are nearby or overlap. See the U.S. Great Lakes Assessment report for details.',
      region: 'great_lakes'
    },
    {
      id: 'GL_ErosionTMS',
      layer: 'Erosion TMS',
      label: 'Soil Erodibility',
      chartLabel: 'Soil Erodibility',
      chartLegendValues: 5,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#FEEBA2',
        2: '#FEBB47',
        3: '#F07818',
        4: '#B84203',
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
      chartInputName: 'threat',
      ChartInputLabel: 'Threats Inputs',
      chartCSSSelector: 'erosion',
      url: 'https://tiles.resilientcoasts.org/GL_ErosionIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2022',
      format: 'image/png',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'Soils identified as having a high probability of erodibility including coastal bluffs, beaches, and dunes. High values suggest that the area contains soils with a high erodibility factor. See the U.S. Great Lakes Assessment report for details.',
      region: 'great_lakes'
    },
    {
      id: 'GL_FloodProneAreasTMS',
      layer: 'Flood Prone Areas TMS',
      label: 'Flood-prone Areas',

      chartLabel: 'Flood-prone Areas',
      chartLegendValues: 5,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#E2E2EF',
        2: '#B6B6D8',
        3: '#8683BD',
        4: '#61409B',
        5: '#3F007D'
      },
      chartCSSLegends: {
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
      url: 'https://tiles.resilientcoasts.org/GL_FloodProneAreasIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2022',
      format: 'image/png',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'Areas classified by FEMA to be in the 100-year flood zone, 500-year flood zones, or a floodway. Frequently and occasionally flooded soil designations are used to identify additional areas. A high value indicates the floodplain, while a low value indicates occasionally flooded soils outside of the floodplain. See the U.S. Great Lakes Assessment report for details.',
      region: 'great_lakes'
    },
    {
      id: 'GL_SlopeTMS',
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
      chartInputName: 'threat',
      ChartInputLabel: 'Threats Inputs',
      chartCSSSelector: 'slope',
      url: 'https://tiles.resilientcoasts.org/GL_SlopeIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2020',
      format: 'image/png',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'The percent rise in elevation. High values indicate those areas that are very low lying and more likely to retain water and flood. See the U.S. Great Lakes Assessment report for details.',
      region: 'great_lakes'
    },
    {
      id: 'GL_DrainageTMS',
      layer: 'Drainage TMS',
      label: 'Impermeability',
      chartLabel: 'Impermeability',
      chartLegendValues: 5,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#E9DD66',
        2: '#CBBA06',
        3: '#A19400',
        4: '#786D00',
        5: '#4D4700'
      },
      chartCSSLegends: {
        0: '#E9ECEF',
        1: '#447604',
        2: '#77D66F',
        3: '#dce9f2',
        4: '#755b69',
        5: '#553555'
      },
      chartInputName: 'threat',
      ChartInputLabel: 'Threats Inputs',
      chartCSSSelector: 'impermeable',
      url: 'https://tiles.resilientcoasts.org/GL_DraingeIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2020',
      format: 'image/png',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'Areas with poor drainage potential, including both soils and areas with low to high intensity development that do not readily drain and have runoff potential. A high value indicates areas that have soils with poor drainage potential and/or an intensity of developed impervious surfaces. A correction factor has been applied to account for poorly drained soils in row crop agricultural areas using tile drainage. See the U.S. Great Lakes Assessment report for details.',
      region: 'great_lakes'
    },
    {
      id: 'GL_MaxWaterLevelTMS',
      layer: 'MaxWaterLevel TMS',
      label: 'High Water Level',

      chartLabel: 'High Water Level',
      chartLegendValues: 5,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#DBD8EA',
        2: '#99B9D9',
        3: '#4095C3',
        4: '#027976',
        5: '#014636'
      },
      chartCSSLegends: {
        0: '#E9ECEF',
        1: '#DBD8EA',
        2: '#99B9D9',
        3: '#4095C3',
        4: '#027976',
        5: '#014636'
      },
      chartInputName: 'threat',
      ChartInputLabel: 'Threats Inputs',
      chartCSSSelector: 'highwater',
      url: 'https://tiles.resilientcoasts.org/GL_MaxWaterLevelIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2020',
      format: 'image/png',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'Used to identify high lake levels estimated from global satellite imagery. Data show the distribution of surface water from 1984-2020 and represent intra- and inter-annual variation based on observed lake level changes. High values indicate areas that are more likely to have experienced higher lake levels. See the U.S. Great Lakes Assessment report for details.',
      region: 'great_lakes'
    },
    {
      id: 'GL_VisualizationOverlay1TMS',
      layer: 'Visualization Overlay 1 TMS',
      label: 'American Indian/Alaska Native/Native Hawaiian (AIANNH) Areas',
      chartLabel: 'AIANNHA',
      chartLegendValues: 15,
      chartCSSColor: {
        0: '#E9ECEF'
      },
      chartCSSLegends: {
        0: '#E9ECEF'
      },
      chartInputName: 'VisualizationOverlays',
      ChartInputLabel: 'Additional Overlays',
      url: 'https://tiles.resilientcoasts.org/GL_AIANNHAIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2020',
      format: 'image/png',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'Boundaries of Federal American Indian Reservations, Off-Reservation Trust Lands (ORTL), State American Indian Reservations, Hawaiian Home Lands (HHL), Alaska Native Village Statistical Areas (ANVSA), Oklahoma Tribal Statistical Areas (OTSA), State Designated Tribal Statistical Areas (SDTSA), Tribal Designated Statistical Areas (TDSA), American Indian Joint-Use Areas (AIJUA), Joint-Use Oklahoma Tribal Statistical Areas.',
      region: 'great_lakes'
    },
    {
      id: 'GL_VisualizationOverlay2TMS',
      layer: 'Visualization Overlay2 TMS',
      label: 'Ceded Territory',
      chartLabel: 'Ceded Territory',
      chartLegendValues: 1,
      chartCSSColor: {
        0: '#E9ECEF'
      },
      chartCSSLegends: {
        0: '#E9ECEF'
      },
      chartInputName: 'VisualizationOverlays',
      ChartInputLabel: 'Additional Overlays',
      url: 'https://tiles.resilientcoasts.org/GL_CededTerritoryIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2020',
      format: 'image/png',
      opacity: 1.0,
      maxNativeZoom: 14,
      description: 'Great Lakes Indian Fish and Wildlife Commission representation of the boundaries of the 1836, 1837, 1842 and 1854 treaty areas of the Ojibwe ceded territories in Michigan, Minnesota and Wisconsin.',
      region: 'great_lakes'
    },
    // DOD data un comment when ready also uncomment the layer int maplayers_list.html
    // {
    //   id: "GL_VisualizationOverlay3TMS",
    //   layer: "Visualization Overlay3 TMS",
    //   label: "Department of Defense Lands",
    //   chartLabel: 'Department of Defense Lands',
    //   chartLegendValues: 1,
    //   chartCSSColor: {
    //     0: '#E9ECEF',
    //   },
    //   chartCSSLegends: {
    //    0: '#E9ECEF'
    //    },
    //   chartInputName: 'VisualizationOverlays',
    //   ChartInputLabel: 'Additional Overlays',
    //   chartCSSSelector: 'VisualizationOverlay3',
    //   url: "https://tiles.resilientcoasts.org/GL_USA_Department_of_Defense_LandsIndexTiles/{z}/{x}/{y}.png",
    //   attribution: "NFWF 2020",
    //   format: "image/png",
    //   opacity: 0.75,
    //   maxNativeZoom: 14,
    //   description: "Visualization Overlay Two, needs a description",
    //   region: 'great_lakes'
    // },
    {
      id: 'GL_VisualizationOverlay4TMS',
      layer: 'Visualization Overlay4 TMS',
      label: 'Fetch',
      chartLabel: 'Fetch',
      chartLegendValues: 1,
      chartCSSColor: {
        0: '#E9ECEF'
      },
      chartCSSLegends: {
        0: '#E9ECEF'
      },
      chartInputName: 'VisualizationOverlays',
      ChartInputLabel: 'Additional Overlays',
      url: 'https://tiles.resilientcoasts.org/GL_FetchIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2020',
      format: 'image/png',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'Great Lakes Aquatic Habitat Framework composite fetch data layer where wind fetch calculations were performed for each of the Great Lakes using wind data averaged from 2006-2014 during open-water months (April-Nov.). Wind fetches in this model were calculated as effective fetch at a 30 m grid cell resolution resulting from the directional frequency method where each grid cell is the distance to shore along each input direction weighted by the percent frequency that the wind blew from that direction and summed, resulting in a continuous layer ranked from low (1) to high (5) using a regional quantile distribution.',
      region: 'great_lakes'
    },
    {
      id: 'GL_VisualizationOverlay5TMS',
      layer: 'Visualization Overlay5 TMS',
      label: 'Lake Level Fluctuation Zone',
      chartLabel: 'Lake Level Fluctuation Zone',
      chartLegendValues: 1,
      chartCSSColor: {
        0: '#E9ECEF'
      },
      chartCSSLegends: {
        0: '#E9ECEF'
      },
      chartInputName: 'VisualizationOverlays',
      ChartInputLabel: 'Additional Overlays',
      chartCSSSelector: 'VisualizationOverlay5',
      url: 'https://tiles.resilientcoasts.org/GL_LakeFluctuationZoneIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2020',
      format: 'image/png',
      opacity: 0.75,
      maxNativeZoom: 14,
      description: 'Shows the spatial and temporal distribution of where non-permanent surface water occurred between 1984 and 2020. The layer captures both the intra and inter-annual variability and changes known as surface water occurrence.',
      region: 'great_lakes'
    }
  ]
};
