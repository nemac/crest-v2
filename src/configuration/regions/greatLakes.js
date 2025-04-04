import regionGreatLakesImage from "../../assets/images/zoomregion-great_lakes-v2.png";

export const greatLakesConfig = {
  label: "U.S. Great Lakes",
  image: regionGreatLakesImage,
  regionName: "great_lakes",
  reportEnglish: {
    fileLink:
      "https://www.nfwf.org/sites/default/files/2023-06/us-great-lakes-coastal-resilience-assessment-2023.pdf",
    name: "U.S. Great Lakes Assessment",
  },
  reportNative: {
    fileLink: null,
    name: null,
  },
  dataDownload: {
    fileSize: "610 MB",
    fileLink:
      "https://nfwf-tool.s3.amazonaws.com/nfwf_download_data/Great_Lakes_Data_Download_20230605.zip",
    name: "U.S. Great Lakes Data Download",
  },
  mapProperties: {
    label: "Great_Lakes",
    center: [45.32, -84.47],
    extent: [-92.03, 47.28, -76.52, 42.19],
    zoom: 6,
  },
  attribution: "NFWF 2022",
  hubsFeatureServer:
    "https://services1.arcgis.com/PwLrOgCfU0cYShcG/ArcGIS/rest/services/gl_hubs_cores_052323_CREST_3857_sean_2/FeatureServer/0",
  hubsHexServer:
    "https://services1.arcgis.com/PwLrOgCfU0cYShcG/arcgis/rest/services/gl_hubs_hex_052323_CREST_3857/FeatureServer/0",
  rankProperty: "rank_val", // need this in config because the rank property is different for all of the regions
  chartInputs: [
    {
      chartInputName: "summary",
      ChartInputLabel: "Summary",
    },
    {
      chartInputName: "asset",
      ChartInputLabel: "Community Assets Inputs",
    },
    {
      chartInputName: "threat",
      ChartInputLabel: "Threats Inputs",
    },
    {
      chartInputName: "additional",
      ChartInputLabel: "Additional Overlays",
    },
  ],
  layerList: [
    {
      id: "GL_HubsTMS",
      layer: "Hubs TMS",
      label: "Resilience Hubs Score",
      chartOrder: 1,
      chartLabel: "Resilience Hubs Score",
      chartTipLabel: "Resilience Hubs Score",
      isLegendCustom: false,
      chartCSSColor: {
        0: "#E9ECEF",
        1: "#ffc500",
        2: "#f9b500",
        3: "#f3a400",
        4: "#ed9400",
        5: "#e78300",
        6: "#e07000",
        7: "#d95e00",
        8: "#d14c00",
        9: "#ca3600",
        10: "#c21500",
      },
      chartInputName: "summary",
      ChartInputLabel: "Summary",
      ChartInputSubHeading: "Resilience Hubs",
      chartCSSSelector: "hubs",
      url: "https://tiles.resilientcoasts.org/GL_HubsIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2022",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "Resilience Hub Cores represent contiguous, unfragmented habitat cores proximate to human community assets ranked by combining Community Exposure and Fish and Wildlife Index values with other key inputs. Resilience Hub Cores provide a coarse-scale view of Resilience Hubs, where higher values represent areas with greater potential for dual community flood protection and wildlife benefits.",
      region: "great_lakes",
    },
    {
      id: "GL_HubsHexTMS",
      layer: "Hubs Hex TMS",
      label: "Resilience Hub Grid",
      chartOrder: 2,
      chartLabel: "Resilience Hub Grid",
      chartTipLabel: "Resilience Hub Grid",
      chartInputName: "summary",
      ChartInputLabel: "Summary",
      ChartInputSubHeading: "Resilience Hubs",
      isLegendCustom: false,
      chartCSSColor: {
        0: "#E9ECEF",
        1: "#ffc500",
        2: "#f9b500",
        3: "#f3a400",
        4: "#ed9400",
        5: "#e78300",
        6: "#e07000",
        7: "#d95e00",
        8: "#d14c00",
        9: "#ca3600",
        10: "#c21500",
      },
      url: "https://tiles.resilientcoasts.org/GL_HubsHexIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2022",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "The Resilience Hub Grid applies a 10-acre hexagonal grid to show variation within habitat cores, ranking each hexagon by combining Community Exposure and Fish and Wildlife Index values with other key inputs. The Resilience Hub Grid provides a fine-scale view of Resilience Hubs, where higher values represent areas with greater potential for dual community flood protection and wildlife benefits.",
      region: "great_lakes",
    },
    {
      id: "GL_ExposureTMS",
      layer: "Exposure TMS",
      chartOrder: 3,
      label: "Community Exposure Index",
      chartLabel: "Community Exposure",
      chartTipLabel: "Community Exposure",
      isLegendCustom: false,
      chartCSSColor: {
        0: "#E9ECEF",
        1: "#FFFFE5",
        2: "#FFF8C1",
        3: "#FEE79B",
        4: "#FECE65",
        5: "#FEAC3A",
        6: "#F68720",
        7: "#E1640E",
        8: "#C14702",
        9: "#933204",
        10: "#662506",
      },
      chartInputName: "summary",
      ChartInputLabel: "Summary",
      ChartInputSubHeading: "Community Exposure",
      chartCSSSelector: "exposure",
      url: "https://tiles.resilientcoasts.org/GL_ExposureIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2022",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,

      description:
        "The product of the Community Asset Index and Threat Index, the Community Exposure Index identifies areas where human community assets are potentially exposed to numerous flood-related threats. Color ramp varies from other regions but displays similar information.",
      region: "great_lakes",
    },
    {
      id: "GL_AssetsTMS",
      layer: "Assets TMS",
      label: "Community Asset Index",
      chartOrder: 4,
      chartLabel: "Community Asset",
      chartTipLabel: "Community Asset",
      isLegendCustom: false,
      chartCSSColor: {
        0: "#E9ECEF",
        1: "#b6edf0",
        2: "#98d2ed",
        3: "#7cbbeb",
        4: "#5ca3e6",
        5: "#368de3",
        6: "#2176d9",
        7: "#2259c7",
        8: "#1d3eb5",
        9: "#1727a3",
        10: "#090991",
      },
      chartInputName: "summary",
      ChartInputLabel: "Summary",
      ChartInputSubHeading: "Community Exposure",
      chartCSSSelector: "asset",
      url: "https://tiles.resilientcoasts.org/GL_AssetsIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2022",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      // description:
      //   "Index of human community assets that are important to help a community respond to and recover from a flooding event. High values represent areas with dense concentration of critical facilities, infrastructure, and population and social vulnerability.",
      description:
        "Index of human community assets that are important to help a community respond to and recover from a flooding event. High values represent areas with dense concentration of critical facilities, infrastructure, and population.",
      region: "great_lakes",
    },
    {
      id: "GL_ThreatsTMS",
      layer: "Threats TMS",
      label: "Threat Index",
      chartOrder: 5,
      chartLabel: "Threat",
      chartTipLabel: "Threat",
      isLegendCustom: false,
      chartCSSColor: {
        0: "#E9ECEF",
        1: "#ffebd6",
        2: "#f7d7bc",
        3: "#f0c0a1",
        4: "#eba988",
        5: "#e3906f",
        6: "#de775b",
        7: "#d65d45",
        8: "#d14030",
        9: "#c9251c",
        10: "#c40a0a",
      },
      chartInputName: "summary",
      ChartInputLabel: "Summary",
      ChartInputSubHeading: "Community Exposure",
      chartCSSSelector: "threat",
      url: "https://tiles.resilientcoasts.org/GL_ThreatsIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2022",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "Index of flood-related datasets, including high lake levels and landscape characteristics that exacerbate flood potential. High values represent areas with multiple flood-related threat inputs.",
      region: "great_lakes",
    },
    {
      id: "GL_FishAndWildlifeTMS",
      layer: "FishAndWildlife TMS",
      label: "Fish and Wildlife Index",
      chartOrder: 6,
      chartLabel: "Fish and Wildlife",
      chartTipLabel: "Fish and Wildlife",
      isLegendCustom: false,
      chartCSSColor: {
        0: "#E9ECEF",
        1: "#EEF8F3",
        2: "#EDD0E0",
        3: "#E9BBCB",
        4: "#E3A6B7",
        5: "#DB90A6",
        6: "#D27C99",
        7: "#C6678F",
        8: "#B7528A",
        9: "#A33F8F",
        10: "#7E33A8",
      },
      chartInputName: "summary",
      ChartInputLabel: "Summary",
      ChartInputSubHeading: "Fish and Wildlife",
      chartCSSSelector: "wildlife",
      url: "https://tiles.resilientcoasts.org/GL_CombinedWildlifeIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2022",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "The sum of the Terrestrial Index, Aquatic Index, and Protected and Managed Areas for Biodiversity, the Fish and Wildlife Index identifies habitat and protected areas important for terrestrial and aquatic species of conservation concern and/or off-reservation harvest regulations. Higher values represent areas important for numerous species of concern.",
      region: "great_lakes",
    },
    {
      id: "GL_AquaticTMS",
      layer: "Aquatic TMS",
      label: "Aquatic Index",
      chartOrder: 7,
      chartLabel: "Aquatic",
      chartTipLabel: "Aquatic",
      isLegendCustom: false,
      chartCSSColor: {
        0: "#E9ECEF",
        1: "#FFF7FB",
        2: "#ECE7F2",
        3: "#D0D1E6",
        4: "#A6BDDB",
        5: "#74A9CF",
        6: "#3690C0",
        7: "#0570B0",
        8: "#045A8D",
        9: "#023858",
        10: "#01172C",
      },
      chartInputName: "fishandwildlife",
      ChartInputLabel: "Summary",
      ChartInputSubHeading: "Fish and Wildlife",
      chartCSSSelector: "aquatic",
      url: "https://tiles.resilientcoasts.org/GL_AquaticIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2022",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "Index of habitat suitable for species of conservation concern and/or species with off-reservation harvest regulations that utilize riverine and lacustrine habitats. The Index also considers designated critical habitat, nearshore reefs and fish spawning locations, and U.S. Great Lakes Brook Trout Conservation Portfolio habitat patches, which served as a proxy for cool and cold-water habitat. High values represent areas important for numerous aquatic species of concern.",
      region: "great_lakes",
    },
    {
      id: "GL_TerrestrialTMS",
      layer: "Terrestrial TMS",
      label: "Terrestrial Index",
      chartOrder: 8,
      chartLabel: "Terrestrial",
      chartTipLabel: "Terrestrial",
      isLegendCustom: false,
      chartCSSColor: {
        0: "#E9ECEF",
        1: "#FFFFE5",
        2: "#F1E7B5",
        3: "#E3CE84",
        4: "#BAB065",
        5: "#888F4C",
        6: "#576F33",
        7: "#32591F",
        8: "#215415",
        9: "#114E0A",
        10: "#004900",
      },
      chartInputName: "fishandwildlife",
      ChartInputLabel: "Summary",
      ChartInputSubHeading: "Fish and Wildlife",
      chartCSSSelector: "terrestrial",
      url: "https://tiles.resilientcoasts.org/GL_TerrestrialIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2022",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "Index of habitat suitable for species of conservation concern and/or species with off-reservation harvest regulations that utilize terrestrial habitats. The Index also considers designated critical habitat, Important Bird Areas, and Key Biodiversity Areas. High values represent areas important for numerous terrestrial species of concern.",
      region: "great_lakes",
    },
    // {
    //   id: "GL_SocVulnTMS",
    //   layer: "Social Vulnerability TMS",
    //   label: "Social Vulnerability",
    //   chartOrder: 12,
    //   chartLabel: "Social Vulnerability",
    // chartTipLabel: "Social Vulnerability",
    //   isLegendCustom: false,
    //   chartCSSColor: {
    //     0: "#E9ECEF",
    //     1: "#9EBBD7",
    //     2: "#7A8EF5",
    //     3: "#43309D",
    //     4: "#321699",
    //     5: "#270B59",
    //   },
    //   chartInputName: "asset",
    //   ChartInputLabel: "Community Assets Inputs",
    //   chartCSSSelector: "social_vuln",
    //   url: "https://tiles.resilientcoasts.org/GL_SocVulnIndexTiles/{z}/{x}/{y}.png",
    //   attribution: "NFWF 2022",
    //   opacity: 0.75,
    //   maxNativeZoom: 14,
    //   description:
    //     "Identifies census blocks that are socially vulnerable using the Demographic Index in EPA’s EJSCREEN data. Census blocks above the 50th percentile nationally are ranked from low to high, which indicates census blocks with low income and minority populations.",
    //   region: "great_lakes",
    // },
    {
      id: "GL_PopDensityTMS",
      layer: "Population Density TMS",
      label: "Population Density",
      chartOrder: 11,
      chartLabel: "Population Density",
      chartTipLabel: "Population Density",
      isLegendCustom: false,
      chartCSSColor: {
        0: "#E9ECEF",
        1: "#fff6d0",
        2: "#efc133",
        3: "#9eac37",
        4: "#2c8d7a",
        5: "#385a4c",
      },
      chartInputName: "asset",
      ChartInputLabel: "Community Assets Inputs",
      chartCSSSelector: "pop_density",
      url: "https://tiles.resilientcoasts.org/GL_PopDensityIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2020",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "A ranking of population density by census blocks based on the 2020 Decennial Census. Areas are ranked from low to high using the ratio of people per square kilometer relative to the most densely populated census block in the study area.",
      region: "great_lakes",
    },
    {
      id: "GL_CriticalFacilitiesTMS",
      layer: "Critical Facilities TMS",
      label: "Critical Facilities",
      chartOrder: 9,
      chartLabel: "Critical Facilities",
      chartTipLabel: "Critical Facilities",
      isLegendCustom: false,
      chartCSSColor: {
        0: "#E9ECEF",
        1: "#0084A8", // 5
        2: "#0084A8", // 5
        3: "#0084A8", // 5
        4: "#0084A8", // 5
        5: "#0084A8", // 5
      },
      chartInputName: "asset",
      ChartInputLabel: "Community Assets Inputs",
      chartCSSSelector: "crit_facilities",
      url: "https://tiles.resilientcoasts.org/GL_CriticalFacilitiesIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2022",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "Facilities that provide important recovery and operational support during and following flood events such as schools, emergency response and law enforcement facilities, health and medical facilities, and government and military buildings. All critical facilities are given the same rank based on presence.",
      region: "great_lakes",
    },
    {
      id: "GL_CommunityInfrastructureTMS",
      layer: "Critical Infrastructure TMS",
      label: "Critical Infrastructure",
      chartOrder: 10,
      chartLabel: "Critical Infrastructure",
      chartTipLabel: "Critical Infrastructure",
      isLegendCustom: false,
      chartCSSColor: {
        0: "#E9ECEF",
        1: "#A82B41", // 5
        2: "#A82B41", // 5
        3: "#A82B41", // 5
        4: "#A82B41", // 5
        5: "#A82B41", // 5
      },
      chartInputName: "asset",
      ChartInputLabel: "Community Assets Inputs",
      chartCSSSelector: "crit_infra",
      url: "https://tiles.resilientcoasts.org/GL_CommunityInfrastructurIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2022",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "Infrastructure integral to a community’s ability to mitigate damages and recover from a flood event, including transportation, waterways, water treatment, communications, energy, and hazardous site infrastructure. All critical infrastructure is given the same rank based on presence. High values indicate areas where one or more infrastructure types are nearby or overlap.",
      region: "great_lakes",
    },
    {
      id: "GL_ErosionTMS",
      layer: "Erosion TMS",
      label: "Soil Erodibility",
      chartOrder: 17,
      chartLabel: "Soil Erodibility",
      chartTipLabel: "Soil Erodibility",
      isLegendCustom: false,
      chartCSSColor: {
        0: "#E9ECEF",
        1: "#FEEBA2",
        2: "#FEBB47",
        3: "#F07818",
        4: "#B84203",
        5: "#662506",
      },
      chartInputName: "threat",
      ChartInputLabel: "Threats Inputs",
      chartCSSSelector: "erosion",
      url: "https://tiles.resilientcoasts.org/GL_ErosionIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2022",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "Soils identified as having a high probability of erodibility including coastal bluffs, beaches, and dunes. High values suggest that the area contains soils with a high erodibility factor.",
      region: "great_lakes",
    },
    {
      id: "GL_FloodProneAreasTMS",
      layer: "Flood Prone Areas TMS",
      label: "Flood-prone Areas",
      chartOrder: 14,
      chartLabel: "Flood-prone Areas",
      chartTipLabel: "Flood-prone Areas",
      isLegendCustom: false,
      chartCSSColor: {
        0: "#E9ECEF",
        1: "#E2E2EF",
        2: "#B6B6D8",
        3: "#8683BD",
        4: "#61409B",
        5: "#3F007D",
      },
      chartInputName: "threat",
      ChartInputLabel: "Threats Inputs",
      chartCSSSelector: "floodprone_areas",
      url: "https://tiles.resilientcoasts.org/GL_FloodProneAreasIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2022",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "Areas classified by FEMA to be in the 100-year flood zone, 500-year flood zones, or a floodway. Frequently and occasionally flooded soil designations are used to identify additional areas. A high value indicates the floodplain, while a low value indicates occasionally flooded soils outside of the floodplain.",
      region: "great_lakes",
    },
    {
      id: "GL_SlopeTMS",
      layer: "Slope TMS",
      label: "Areas of Low Slope",
      chartOrder: 13,
      chartLabel: "Areas of Low Slope",
      chartTipLabel: "Areas of Low Slope",
      isLegendCustom: false,
      chartCSSColor: {
        0: "#E9ECEF",
        1: "#d3eecd",
        2: "#98d594",
        3: "#4bb062",
        4: "#157f3b",
        5: "#00441b",
      },
      chartInputName: "threat",
      ChartInputLabel: "Threats Inputs",
      chartCSSSelector: "slope",
      url: "https://tiles.resilientcoasts.org/GL_SlopeIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2020",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "The percent rise in elevation. High values indicate those areas that are very low lying and more likely to retain water and flood.",
      region: "great_lakes",
    },
    {
      id: "GL_DrainageTMS",
      layer: "Drainage TMS",
      label: "Impermeability",
      chartOrder: 16,
      chartLabel: "Impermeability",
      chartTipLabel: "Impermeability",
      isLegendCustom: false,
      chartCSSColor: {
        0: "#E9ECEF",
        1: "#E9DD66",
        2: "#CBBA06",
        3: "#A19400",
        4: "#786D00",
        5: "#4D4700",
      },
      chartInputName: "threat",
      ChartInputLabel: "Threats Inputs",
      chartCSSSelector: "impermeable",
      url: "https://tiles.resilientcoasts.org/GL_DraingeIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2020",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "Areas with poor drainage potential, including both soils and areas with low to high intensity development that do not readily drain and have runoff potential. A high value indicates areas that have soils with poor drainage potential and/or an intensity of developed impervious surfaces. A correction factor has been applied to account for poorly drained soils in row crop agricultural areas using tile drainage.",
      region: "great_lakes",
    },
    {
      id: "GL_MaxWaterLevelTMS",
      layer: "MaxWaterLevel TMS",
      label: "High Water Level",
      chartOrder: 15,
      chartLabel: "High Water Level",
      chartTipLabel: "High Water Level",
      isLegendCustom: false,
      chartCSSColor: {
        0: "#E9ECEF",
        1: "#DBD8EA",
        2: "#99B9D9",
        3: "#4095C3",
        4: "#027976",
        5: "#014636",
      },
      chartInputName: "threat",
      ChartInputLabel: "Threats Inputs",
      chartCSSSelector: "highwater",
      url: "https://tiles.resilientcoasts.org/GL_MaxWaterLevelIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2020",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "Used to identify high lake levels estimated from global satellite imagery. Data show the distribution of surface water from 1984-2020 and represent intra- and inter-annual variation based on observed lake level changes. High values indicate areas that are more likely to have experienced higher lake levels.",
      region: "great_lakes",
    },
    {
      id: "GL_VisualizationOverlay1TMS",
      layer: "Visualization Overlay 1 TMS",
      label: "American Indian/Alaska Native/Native Hawaiian (AIANNH) Areas",
      chartOrder: 18,
      chartLabel: "AIANNHA",
      chartTipLabel: "AIANNHA",
      isLegendCustom: true,
      chartCSSColor: [
        {
          backgroundColor: "#02C5FE",
          borderColor: "#02C5FE",
          label: "All areas",
        },
      ],
      chartInputName: "VisualizationOverlays",
      ChartInputLabel: "Additional Overlays",
      url: "https://tiles.resilientcoasts.org/GL_AIANNHAIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2020",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "Boundaries of Federal American Indian Reservations, Off-Reservation Trust Lands (ORTL), State American Indian Reservations, Hawaiian Home Lands (HHL), Alaska Native Village Statistical Areas (ANVSA), Oklahoma Tribal Statistical Areas (OTSA), State Designated Tribal Statistical Areas (SDTSA), Tribal Designated Statistical Areas (TDSA), American Indian Joint-Use Areas (AIJUA), Joint-Use Oklahoma Tribal Statistical Areas.",
      region: "great_lakes",
    },
    {
      id: "GL_VisualizationOverlay2TMS",
      layer: "Visualization Overlay2 TMS",
      label: "Ceded Territory",
      chartOrder: 19,
      chartLabel: "Ceded Territory",
      chartTipLabel: "Ceded Territory",
      isLegendCustom: true,
      chartCSSColor: [
        {
          backgroundColor: "transparent",
          borderColor: "#97363C",
          label: "Ceded Territory",
        },
        {
          backgroundColor: "#FCB7BC",
          borderColor: "#97363C",
          label: "Ceded Territory - Disputed",
        },
      ],
      chartInputName: "VisualizationOverlays",
      ChartInputLabel: "Additional Overlays",
      url: "https://tiles.resilientcoasts.org/GL_CededTerritoryIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2020",
      format: "image/png",
      opacity: 1.0,
      maxNativeZoom: 14,
      description:
        "U.S. Great Lakes Indian Fish and Wildlife Commission representation of the boundaries of the 1836, 1837, 1842 and 1854 treaty areas of the Ojibwe ceded territories in Michigan, Minnesota and Wisconsin.",
      region: "great_lakes",
    },
    // {
    //   id: "GL_VisualizationOverlay3TMS",
    //   layer: "Visualization Overlay3 TMS",
    //   label: "Department of Defense Lands",
    //   chartLabel: "Department of Defense Lands",
    // chartTipLabel: "Department of Defense Lands",
    //   isLegendCustom: true,
    //   chartCSSColor: [
    //     {
    //       backgroundColor: "#FCE479",
    //       borderColor: "#FCE479",
    //       label: "Bureau of Land Management",
    //     },
    //     {
    //       backgroundColor: "#FFFFB5",
    //       borderColor: "#FFFFB5",
    //       label: "Bureau of Reclamation",
    //     },
    //     {
    //       backgroundColor: "#FAB4CE",
    //       borderColor: "#FAB4CE",
    //       label: "Department of Defense",
    //     },
    //     {
    //       backgroundColor: "#81CCA8",
    //       borderColor: "#81CCA8",
    //       label: "Fish and Wildlife Service",
    //     },
    //     {
    //       backgroundColor: "#CDEBC5",
    //       borderColor: "#CDEBC5",
    //       label: "Forest Service",
    //     },
    //     {
    //       backgroundColor: "#C9BDDB",
    //       borderColor: "#C9BDDB",
    //       label: "National Park Service",
    //     },
    //   ],
    // },
    {
      id: "GL_VisualizationOverlay4TMS",
      layer: "Visualization Overlay4 TMS",
      label: "Fetch",
      chartOrder: 20,
      chartLabel: "Fetch",
      chartTipLabel: "Fetch",
      isLegendCustom: true,
      chartCSSColor: [
        {
          backgroundColor: "#C7E9B4",
          borderColor: "#C7E9B4",
          label: "1",
        },
        {
          backgroundColor: "#7FCDBB",
          borderColor: "#7FCDBB",
          label: "2",
        },
        {
          backgroundColor: "#41B6C4",
          borderColor: "#41B6C4",
          label: "3",
        },
        {
          backgroundColor: "#2B7FB8",
          borderColor: "#2B7FB8",
          label: "4",
        },
        {
          backgroundColor: "#253493",
          borderColor: "#253493",
          label: "5",
        },
      ],
      chartInputName: "VisualizationOverlays",
      ChartInputLabel: "Additional Overlays",
      url: "https://tiles.resilientcoasts.org/GL_FetchIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2020",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "U.S. Great Lakes Aquatic Habitat Framework composite fetch data layer where wind fetch calculations were performed for each of the U.S. Great Lakes using wind data averaged from 2006-2014 during open-water months (April-Nov.). Wind fetches in this model were calculated as effective fetch at a 30 m grid cell resolution resulting from the directional frequency method where each grid cell is the distance to shore along each input direction weighted by the percent frequency that the wind blew from that direction and summed, resulting in a continuous layer ranked from low (1) to high (5) using a regional quantile distribution.",
      region: "great_lakes",
    },
    {
      id: "GL_VisualizationOverlay5TMS",
      layer: "Visualization Overlay5 TMS",
      label: "Lake Level Fluctuation Zone",
      chartOrder: 21,
      chartLabel: "Lake Level Fluctuation Zone",
      chartTipLabel: "Lake Level Fluctuation Zone",
      isLegendCustom: true,
      chartCSSColor: [
        {
          backgroundColor: "#005CE6",
          borderColor: "#005CE6",
          label: "All areas",
        },
      ],
      chartInputName: "VisualizationOverlays",
      ChartInputLabel: "Additional Overlays",
      chartCSSSelector: "VisualizationOverlay5",
      url: "https://tiles.resilientcoasts.org/GL_LakeFluctuationZoneIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2020",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "Shows the spatial and temporal distribution of where non-permanent surface water occurred between 1984 and 2020. The layer captures both the intra and inter-annual variability and changes known as surface water occurrence.",
      region: "great_lakes",
    },
    {
      id: "GL_landcover",
      layer: "landcover",
      label: "Landcover",
      chartOrder: 22,
      chartLabel: "Landcover",
      chartTipLabel: "Landcover",
      isLegendCustom: true,
      chartCSSColor: [
        {
          backgroundColor: "#5475A8",
          borderColor: "#5475A8",
          label: "Open Water",
        },
        {
          backgroundColor: "#FFFFFF",
          borderColor: "#FFFFFF",
          label: "Perennial Ice/Snow",
        },
        {
          backgroundColor: "#E8D1D1",
          borderColor: "#E8D1D1",
          label: "Developed, Open Space",
        },
        {
          backgroundColor: "#E29E8C",
          borderColor: "#E29E8C",
          label: "Developed, Low Intensity",
        },
        {
          backgroundColor: "#ff0000",
          borderColor: "#ff0000",
          label: "Developed, Medium Intensity",
        },
        {
          backgroundColor: "#B50000",
          borderColor: "#B50000",
          label: "Developed High Intensity",
        },
        {
          backgroundColor: "#D2CDC0",
          borderColor: "#D2CDC0",
          label: "Barren Land (Rock/Sand/Clay)",
        },
        {
          backgroundColor: "#85C77E",
          borderColor: "#85C77E",
          label: "Deciduous Forest",
        },
        {
          backgroundColor: "#38814E",
          borderColor: "#38814E",
          label: "Evergreen Forest",
        },
        {
          backgroundColor: "#D4E7B0",
          borderColor: "#D4E7B0",
          label: "Mixed Forest",
        },
        {
          backgroundColor: "#AF963C",
          borderColor: "#AF963C",
          label: "Dwarf Scrub",
        },
        {
          backgroundColor: "#DCCA8F",
          borderColor: "#DCCA8F",
          label: "Shrub/Scrub",
        },
        {
          backgroundColor: "#FDE9AA",
          borderColor: "#FDE9AA",
          label: "Grassland/Herbaceous",
        },
        {
          backgroundColor: "#D1D182",
          borderColor: "#D1D182",
          label: "Sedge/Herbaceous",
        },
        {
          backgroundColor: "#A3CC51",
          borderColor: "#A3CC51",
          label: "Lichens",
        },
        {
          backgroundColor: "#82BA9E",
          borderColor: "#82BA9E",
          label: "Moss",
        },
        {
          backgroundColor: "#FBF65D",
          borderColor: "#FBF65D",
          label: "Pasture/Hay",
        },
        {
          backgroundColor: "#CA9146",
          borderColor: "#CA9146",
          label: "Cultivated Crops",
        },
        {
          backgroundColor: "#C8E6F8",
          borderColor: "#C8E6F8",
          label: "Woody Wetlands",
        },
        {
          backgroundColor: "#64B3D5",
          borderColor: "#64B3D5",
          label: "Emergent Herbaceous Wetlands",
        },
      ],
      chartInputName: "landcover",
      ChartInputLabel: "Additional Overlays",
      chartCSSSelector: "landcover",
      url: "https://tiles.resilientcoasts.org/GL_NLCDTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2023",
      opacity: 0.75,
      maxNativeZoom: 13,
      description: "Insert Landcover Description Here", // TODO: INSERT DESCRIPTION
      region: "great_lakes",
    },
  ],
  zonalStatsKeys: [
    "aquatic",
    "asset",
    "crit_facilities",
    "wildlife",
    "crit_infra",
    "erosion",
    "exposure",
    "floodprone_areas",
    "highwater",
    "hubs",
    "impermeable",
    "pop_density",
    "slope",
    // "social_vuln",
    "terrestrial",
    "threat",
    "wildlife",
    "lc_no_data",
    "lc_open_water",
    "lc_perennial_icesnow",
    "lc_developed_open_space",
    "lc_developed_low_intensity",
    "lc_developed_medium_intensity",
    "lc_developed_high_intensity",
    "lc_barren_land",
    "lc_deciduous_forest",
    "lc_evergreen_forest",
    "lc_mixed_forest",
    "lc_dwarf_scrub",
    "lc_shrub_scrub",
    "lc_grassland_herbaceous",
    "lc_sedge_herbaceous",
    "lc_lichens",
    "lc_moss",
    "lc_pasture_hay_areas",
    "lc_cultivated_crops",
    "lc_woody_wetlands",
    "lc_emerg_herbaceous_wetlands",
  ],
};
