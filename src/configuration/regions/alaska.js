export const alaskaConfig = {
  label: 'Alaska',
  regionName: 'alaska',
  mapProperties: {
    label: 'Alaska',
    center: [62.996, -150.858],
    extent: [-185.977, 46.073, -95.801, 73.751],
    zoom: 4
  },
  chartInputs: [
    {
      chartInputName: 'summary',
      ChartInputLabel: 'Summary'
    },
    {
      chartInputName: 'asset',
      ChartInputLabel: 'Comunity Assets Inputs'
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
      id: 'AK_HubsTMS',
      layer: 'Hubs TMS',
      label: 'Resilience Hub Cores',
      chartLabel: 'Resilience Hub Cores',
      chartLegendValues: 10,
      ChartInputLabel: 'Summary',
      ChartInputSubHeading: 'Resilience Hubs',
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#f5f500',
        2: '#f5da00',
        3: '#f5be00',
        4: '#f5a300',
        5: '#f58800',
        6: '#f56d00',
        7: '#f55200',
        8: '#f53600',
        9: '#f51b00',
        10: '#f50000'
      },
      url: 'https://tiles.resilientcoasts.org/AK_HubsIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2022',
      opacity: 0.75,
      maxNativeZoom: 13,
      description: 'Resilience Hub Cores represent contiguous, unfragmented habitat cores proximate to human community assets ranked by combining Community Exposure and Fish and Wildlife Index values. Resilience Hub Cores provide a coarse-scale view of Resilience Hubs, where higher values represent areas with greater potential for dual community flood protection and wildlife benefits.',
      region: 'alaska'
    },
    {
      id: 'AK_HubsHexTMS',
      layer: 'Hubs Hex TMS',
      label: 'Resilience Hub Grid',
      chartLabel: 'Resilience Hub Grid',
      chartLegendValues: 10,
      ChartInputLabel: 'Summary',
      ChartInputSubHeading: 'Resilience Hubs',
      chartCSSSelector: 'hubshex',
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#f5f500',
        2: '#f5da00',
        3: '#f5be00',
        4: '#f5a300',
        5: '#f58800',
        6: '#f56d00',
        7: '#f55200',
        8: '#f53600',
        9: '#f51b00',
        10: '#f50000'
      },
      url: 'https://tiles.resilientcoasts.org/AK_HubsHexIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2022',
      format: 'image/png',
      opacity: 0.75,
      maxNativeZoom: 13,
      description: 'The Resilience Hub Grid applies a 10-acre hexagonal grid to show variation within habitat cores, ranking each hexagon by combining Community Exposure and Fish and Wildlife Index values. The Resilience Hub Grid provides a fine-scale view of Resilience Hubs, where higher values represent areas with greater potential for dual community flood protection and wildlife benefits.',
      region: 'alaska'
    },
    {
      id: 'AK_ExposureTMS',
      layer: 'Exposure TMS',
      label: 'Community Exposure Index',
      chartLabel: 'Community Exposure',
      ChartInputLabel: 'Summary',
      ChartInputSubHeading: 'Community Exposure Index',
      chartLegendValues: 10,
      chartCSSSelector: 'exposure',
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#f7e4cb',
        2: '#e5ceb1',
        3: '#dcb897',
        4: '#c0a27d',
        5: '#ad8b62',
        6: '#946d3f',
        7: '#855621',
        8: '#764c1c',
        9: '#684217',
        10: '#593812'
      },
      url: 'https://tiles.resilientcoasts.org/AK_ExposureIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2022',
      opacity: 0.75,
      maxNativeZoom: 13,
      description: 'The product of the Community Asset Index and Threat Index, the Community Exposure Index identifies areas where human community assets are potentially exposed to numerous flood-related threats. Color ramp varies from other regions but displays similar information.',
      region: 'alaska'
    },
    {
      id: 'AK_AssetsTMS',
      layer: 'Assets TMS',
      label: 'Community Asset Index',
      chartLabel: 'Community Asset',
      ChartInputLabel: 'Summary',
      ChartInputSubHeading: 'Community Asset and Threat Indices',
      chartCSSSelector: 'asset',
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
      url: 'https://tiles.resilientcoasts.org/AK_AssetsIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2022',
      opacity: 0.75,
      maxNativeZoom: 13,
      description: 'Index of human community assets critical to an area’s recovery following a major flooding event. Higher values represent areas with a higher cumulative presence of community assets.',
      region: 'alaska'
    },
    {
      id: 'AK_ThreatsTMS',
      layer: 'Threats TMS',
      label: 'Threat Index',
      chartLabel: 'Threat',
      ChartInputLabel: 'Summary',
      ChartInputSubHeading: 'Community Asset and Threat Indices',
      chartCSSSelector: 'threat',
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
      url: 'https://tiles.resilientcoasts.org/AK_ThreatsIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2022',
      opacity: 0.75,
      maxNativeZoom: 13,
      description: 'Index of flood-related datasets that contribute to or exacerbate flooding potential. High values represent areas with multiple flood-related inputs. Due to data limitations, results present a conservative estimate of the severity and extent of coastal hazards in Alaska; low Threat Index values may correspond to areas with no or few data inputs.',
      region: 'alaska'
    },

    {
      id: 'AK_WildlifeTMS',
      layer: 'FishAndWildlife TMS',
      label: 'Fish and Wildlife Index',
      chartLabel: 'Fish and Wildlife',
      ChartInputLabel: 'Summary',
      ChartInputSubHeading: 'Fish and Wildlife',
      chartCSSSelector: 'fishandwildlife',
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
      url: 'https://tiles.resilientcoasts.org/AK_WildlifeIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2022',
      opacity: 0.75,
      maxNativeZoom: 13,
      description: 'The sum of the Terrestrial Index and Aquatic Index, the Fish and Wildlife Index identifies  habitat and protected areas important for terrestrial and aquatic species of conservation concern and/or subsistence use. Higher values represent areas important for numerous species of concern.',
      region: 'alaska'
    },
    {
      id: 'AK_AquaticTMS',
      layer: 'Aquatic TMS',
      label: 'Aquatic Index',
      chartLabel: 'Aquatic',
      ChartInputLabel: 'Fish and Wildlife Inputs',
      chartCSSSelector: 'aquatic',
      chartLegendValues: 10,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#CDE1E8',
        2: '#B6D2D9',
        3: '#9FC3CA',
        4: '#88B4BB',
        5: '#71A5AC',
        6: '#5B969D',
        7: '#44878E',
        8: '#2D787F',
        9: '#166970',
        10: '#005A62'
      },
      url: 'https://tiles.resilientcoasts.org/AK_AquaticIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2022',
      opacity: 0.75,
      maxNativeZoom: 13,
      description: 'Identifies habitat suitable for species of conservation concern, species with federally-designated Essential Fish Habitat, and/or subsistence species that utilize riverine, lacustrine, and/or nearshore marine habitats (≤20m in depth). High values represent areas important for numerous species. See Alaska Assessment report for data inputs, sources, and methods.',
      region: 'alaska'
    },
    {
      id: 'AK_TerrestrialTMS',
      layer: 'Terrestrial TMS',
      label: 'Terrestrial Index',
      chartLabel: 'Terrestrial',
      ChartInputLabel: 'Fish and Wildlife Inputs',
      chartCSSSelector: 'terrestrial',
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
      url: 'https://tiles.resilientcoasts.org/AK_TerrestrialIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2022',
      opacity: 0.75,
      maxNativeZoom: 13,
      description: 'Identifies habitat suitable for species of conservation concern, Important Bird Areas, and/or subsistence species that utilize terrestrial habitats. High values represent areas important for numerous species. See Alaska Assessment report for data inputs, sources, and methods.',
      region: 'alaska'
    },
    {
      id: 'AK_SocVulnTMS',
      layer: 'Social Vulnerability TMS',
      label: 'Social Vulnerability',
      chartLabel: 'Social Vulnerability',
      ChartInputLabel: 'Comunity Assets Inputs',
      chartCSSSelector: 'social-vulnerability',
      chartLegendValues: 3,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#9EBBD7',
        2: '#43309D',
        3: '#270B59'
      },
      url: 'https://tiles.resilientcoasts.org/AK_SocVulnIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2022',
      opacity: 0.75,
      maxNativeZoom: 13,
      description: 'Communities that are socially vulnerable according to data from the 2020 Denali Commission’s annual Distressed Communities report or the U.S. Environmental Protection Agency Environmental Justice Mapping and Screening Tool.',
      region: 'alaska'
    },
    {
      id: 'AK_CriticalFacilitiesTMS',
      layer: 'Critical Facilities TMS',
      label: 'Critical Facilities',
      chartLabel: 'Critical Facilities',
      ChartInputLabel: 'Comunity Assets Inputs',
      chartCSSSelector: 'critical-facilities',
      chartLegendValues: 5,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#0084A8', // 5
        2: '#0084A8', // 5
        3: '#0084A8', // 5
        4: '#0084A8', // 5
        5: '#0084A8' // 5
      },
      url: 'https://tiles.resilientcoasts.org/AK_CriticalFacilitiesIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2022',
      opacity: 0.75,
      maxNativeZoom: 13,
      description: 'Identifies facilities that provide important recovery and operational support during and following flood events (e.g., schools, medical facilities, post offices, emergency service stations). All critical facilities are given the same rank based on presence. See Alaska Assessment report for data inputs, sources, and methods.',
      region: 'alaska'
    },
    {
      id: 'AK_CommunityInfrastructureTMS',
      layer: 'Critical Infrastructure TMS',
      label: 'Critical Infrastructure',
      chartLabel: 'Critical Infrastructure',
      ChartInputLabel: 'Comunity Assets Inputs',
      chartCSSSelector: 'critical-infrastructure',
      chartLegendValues: 5,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#A82B41', // 5
        2: '#A82B41', // 5
        3: '#A82B41', // 5
        4: '#A82B41', // 5
        5: '#A82B41' // 5
      },
      url: 'https://tiles.resilientcoasts.org/AK_CommunityInfrastructurIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2022',
      opacity: 0.75,
      maxNativeZoom: 13,
      description: 'Infrastructure integral to a community’s ability to recover from a flood event (e.g., power plants, wastewater treatment facilities, petroleum terminals). All critical infrastructure is given the same rank based on presence. See Alaska Assessment report for data inputs, sources, and methods.',
      region: 'alaska'
    },
    {
      id: 'AK_TransporationInfrastructureTMS',
      layer: 'Transporation Infrastructure TMS',
      label: 'Critical Transportation',
      chartLabel: 'Critical Transportation',
      ChartInputLabel: 'Comunity Assets Inputs',
      chartCSSSelector: 'transporation-infrastructure',
      chartLegendValues: 5,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#FEB24C', // 5
        2: '#FEB24C', // 5
        3: '#FEB24C', // 5
        4: '#FEB24C', // 5
        5: '#FEB24C' // 5
      },
      url: 'https://tiles.resilientcoasts.org/AK_TransporationInfrastructure/{z}/{x}/{y}.png',
      attribution: 'NFWF 2022',
      opacity: 0.75,
      maxNativeZoom: 13,
      description: 'Incorporates critical transportation services that provide access to commodities, evacuation routes, and emergency response (e.g., roads, railways, airports, ferry terminals, ports, harbors). All critical transportation infrastructure is given the same rank based on presence. See Alaska Assessment report for data inputs, sources, and methods.',
      region: 'alaska'
    },
    {
      id: 'AK_ErosionTMS',
      layer: 'Erosion TMS',
      label: 'Soil Erodibility',
      chartLabel: 'Soil Erodibility',
      ChartInputLabel: 'Threats Inputs',
      chartCSSSelector: 'erosion',
      chartLegendValues: 5,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#FEEBA2',
        2: '#FEBB47',
        3: '#F07818',
        4: '#B84203',
        5: '#662506'
      },
      url: 'https://tiles.resilientcoasts.org/AK_ErosionIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2022',
      opacity: 0.75,
      maxNativeZoom: 13,
      description: 'Identifies areas susceptible to erosion using multiple data sources. High values represent areas with higher potential for erosion from flooding or heavy precipitation. Data are not available for the entire study area; areas without data may or may not have erodible soils. See Alaska Assessment report for data inputs, sources, and methods.',
      region: 'alaska'
    },
    {
      id: 'AK_FloodProneAreasTMS',
      layer: 'Flood Prone Areas TMS',
      label: 'Flood-prone Areas',
      chartLabel: 'Flood-prone Areas',
      ChartInputLabel: 'Threats Inputs',
      chartCSSSelector: 'floodprone-areas',
      chartLegendValues: 5,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#E2E2EF',
        2: '#B6B6D8',
        3: '#8683BD',
        4: '#61409B',
        5: '#3F007D'
      },
      url: 'https://tiles.resilientcoasts.org/AK_FloodProneAreasIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2022',
      opacity: 0.75,
      maxNativeZoom: 13,
      description: 'Identifies areas prone to flooding using multiple data sources. Data are not available for the entire study area; areas without data may or may not be prone to flooding. Areas greater than 20m in elevation were excluded from this input as they are unlikely to experience flooding. See Alaska Assessment report for data inputs, sources, and methods.',
      region: 'alaska'
    },
    {
      id: 'AK_TsunamiTilesTMS',
      layer: 'Tsunami',
      label: 'Tsunami Inundation',
      chartLabel: 'Tsunami Inundation',
      ChartInputLabel: 'Threats Inputs',
      chartCSSSelector: 'tsunami',
      chartLegendValues: 5,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#FB6A4A', // 3
        2: '#FB6A4A', // 3
        3: '#FB6A4A', // 3
        4: '#DE2D26',
        5: '#A50F15'
      },
      url: 'https://tiles.resilientcoasts.org/AK_TsunamiIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2022',
      opacity: 0.75,
      maxNativeZoom: 13,
      legend: 'AK_tsunami',
      description: 'Communities that have been mapped that may experience tsunami inundation. Data are not available for all communities in the study area; areas without data may or may not be susceptible to tsunami inundation. See Alaska Assessment report for data inputs, sources, and methods.',
      region: 'alaska'
    },
    {
      id: 'AK_PermaFrostTMS',
      label: 'Permafrost Thaw',
      chartLabel: 'Permafrost Thaw',
      ChartInputLabel: 'Threats Inputs',
      chartCSSSelector: 'permafrost',
      chartLegendValues: 5,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#FFFFCC',
        2: '#A1DAB4',
        3: '#41B6C4',
        4: '#2C7FB8',
        5: '#253494'
      },
      url: 'https://tiles.resilientcoasts.org/AK_PermaFrostIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2022',
      opacity: 0.75,
      maxNativeZoom: 13,
      description: 'Identifies areas thought to be susceptible to permafrost thaw and degradation. Values are based on results from multiple studies that provide a direct indicator of permafrost-related flooding threats. See Alaska Assessment report for data inputs, sources, and methods.',
      region: 'alaska'
    },
    {
      id: 'AK_LowLyingAreasTMS',
      label: 'Areas of Low Slope',
      chartLabel: 'Areas of Low Slope',
      ChartInputLabel: 'Threats Inputs',
      chartCSSSelector: 'lowlyingareas',
      chartLegendValues: 5,
      chartCSSColor: {
        0: '#E9ECEF',
        1: '#D3EECD',
        2: '#98D594',
        3: '#4BB062',
        4: '#157F3B',
        5: '#00441B'
      },
      url: 'https://tiles.resilientcoasts.org/AK_LowLyingAreasIndexTiles/{z}/{x}/{y}.png',
      attribution: 'NFWF 2022',
      opacity: 0.75,
      maxNativeZoom: 13,
      description: 'Displays percent rise in elevation. High values represent low-lying areas that are more likely to retain water and flood. Data are not available for the entire study area; areas without data may or may not have a high likelihood to retain water. See Alaska Assessment report for data inputs, sources, and methods.',
      region: 'alaska'
    }
  ]
};
