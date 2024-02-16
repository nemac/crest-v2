import regionGuamImage from "../../assets/images/zoomregion-guam-v2.png";

export const guamConfig = {
  label: "Guam",
  image: regionGuamImage,
  regionName: "guam",
  reportEnglish: {
    fileLink:
      "https://www.nfwf.org/sites/default/files/2021-10/Guam-Coastal-Resilience-Assessment-Oct-2021_0.pdf",
    name: "Guam Coastal Resilience Assessment",
  },
  reportNative: {
    fileLink: null,
    name: null,
  },
  dataDownload: {
    fileSize: "32 MB",
    fileLink:
      "https://nfwf-tool.s3.amazonaws.com/nfwf_download_data/Guam_Assessment_Data.zip",
    name: "Guam Data Download",
  },
  mapProperties: {
    label: "Guam",
    center: [13.45, 144.8],
    extent: [144.33, 13.2, 145.88, 13.79],
    zoom: 10,
  },
  attribution: "NFWF 2020",
  hubsFeatureServer:
    "https://services1.arcgis.com/PwLrOgCfU0cYShcG/ArcGIS/rest/services/CREST_Guam_Hubs_10042021/FeatureServer/0",
  hubsHexServer:
    "https://services1.arcgis.com/PwLrOgCfU0cYShcG/arcgis/rest/services/gu_hubs_hexes_091421/FeatureServer/0",
  rankProperty: "Rank", // need this in config because the rank property is different for all of the regions
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
      id: "GU_HubsTMS",
      layer: "Hubs TMS",
      label: "Resilience Hubs",
      chartLabel: "Resilience Hubs",
      chartInputName: "summary",
      ChartInputLabel: "Summary",
      ChartInputSubHeading: "Resilience Hubs",
      chartCSSSelector: "hubs",
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
      url: "https://tiles.resilientcoasts.org/GU_HubsIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2020",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "Areas of open lands and protected space that may be suitable for resilience-building efforts. Hubs are ranked by priority, given the level of exposure that nearby assets have to flood-related threats and the presence and abundance of fish and wildlife species within and surrounding the Hub.",
      region: "guam",
    },
    {
      id: "GU_HubsHexTMS",
      layer: "Hubs Hex TMS",
      label: "Resilience Hexagonal Grid",
      chartLabel: "Resilience Hexagonal Grid",
      chartInputName: "summary",
      ChartInputLabel: "Summary",
      ChartInputSubHeading: "Resilience Hubs",
      chartCSSSelector: "hubshex",
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
      url: "https://tiles.resilientcoasts.org/GU_HubsHexIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2020",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "Shows variation in Resilience Hub rankings using a 10-acre (4-hectare) hexagonal grid. Highest-ranking hexagons represent areas within Resilience Hub boundaries that may be suitable for resilience-building efforts.",
      region: "guam",
    },
    {
      id: "GU_ExposureTMS",
      layer: "Exposure TMS",
      label: "Community Exposure Index",
      chartLabel: "Community Exposure",
      chartCSSColor: {
        0: "#E9ECEF",
        1: "#1f6e6e",
        2: "#3d8282",
        3: "#7dad9c",
        4: "#b7d4b2",
        5: "#e9f2bb",
        6: "#f5e9a9",
        7: "#dbba7a",
        8: "#b08042",
        9: "#9b5526",
        10: "#633319",
      },
      chartInputName: "summary",
      ChartInputLabel: "Summary",
      ChartInputSubHeading: "Community Exposure",
      chartCSSSelector: "exposure",
      url: "https://tiles.resilientcoasts.org/GU_ExposureIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2020",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "The product of the Asset and Threat Indices, which suggests areas on the landscape where community assets are potentially exposed to flood-related threats.",
      region: "guam",
    },
    {
      id: "GU_AssetsTMS",
      layer: "Assets TMS",
      label: "Community Asset Index",
      chartLabel: "Community Asset",
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
      url: "https://tiles.resilientcoasts.org/GU_AssetsIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2020",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "Index of community assets critical to the recovery of an area and human population. High values suggest areas with a higher, cumulative prevalence of community assets on the landscape.",
      region: "guam",
    },
    {
      id: "GU_ThreatsTMS",
      layer: "Threats TMS",
      label: "Threat Index",
      chartLabel: "Threat",
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
      url: "https://tiles.resilientcoasts.org/GU_ThreatsIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2020",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "Index of flood-related datasets, including storm surge scenarios and landscape characteristics that exacerbate flood potential. High values in the Index represent those areas on the landscape where there are multiple high values of individual inputs.",
      region: "guam",
    },

    {
      id: "GU_FishAndWildlifeTMS",
      layer: "FishAndWildlife TMS",
      label: "Fish and Wildlife Index",
      chartLabel: "Fish and Wildlife",
      chartCSSColor: {
        0: "#E9ECEF",
        1: "#EEE7F8",
        2: "#E9BBCB",
        3: "#DB90A6",
        4: "#D27C99",
        5: "#B7528A",
        6: "#7E33A8",
      },
      chartInputName: "summary",
      ChartInputLabel: "Summary",
      ChartInputSubHeading: "Fish and Wildlife",
      chartCSSSelector: "wildlife",
      url: "https://tiles.resilientcoasts.org/GU_CombinedWildlifeIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2020",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "Identifies valuable habitat for species of concern in both the terrestrial and marine environments. Higher values indicate more valuable habitat areas for both.",
      region: "guam",
    },
    {
      id: "GU_AquaticTMS",
      layer: "Marine TMS",
      label: "Marine Index",
      chartLabel: "Marine",
      chartCSSColor: {
        0: "#E9ECEF",
        1: "#CDE1E8",
        2: "#82BCD1",
        3: "#007E91",
        4: "#005A62",
      },
      chartInputName: "fishandwildlife",
      ChartInputLabel: "Summary",
      ChartInputSubHeading: "Fish and Wildlife",
      chartCSSSelector: "marine",
      url: "https://tiles.resilientcoasts.org/GU_AquaticIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2020",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "Higher values identify habitat areas that are most valuable for providing protection to nearby coastal communities and for the protection of marine species.",
      region: "guam",
    },
    {
      id: "GU_TerrestrialTMS",
      layer: "Terrestrial TMS",
      label: "Terrestrial Index",
      chartLabel: "Terrestrial",
      chartCSSColor: {
        0: "#E9ECEF",
        1: "#FFE9C4",
        2: "#DFC878",
        3: "#385B23",
        4: "#004900",
      },
      chartInputName: "fishandwildlife",
      ChartInputLabel: "Summary",
      ChartInputSubHeading: "Fish and Wildlife",
      chartCSSSelector: "terrestrial",
      url: "https://tiles.resilientcoasts.org/GU_TerrestrialIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2020",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "Higher values identify habitat areas that are suitable to the most species of concern for that region, based on habitat preferences and potential threats identified by the IUCN Red List.",
      region: "guam",
    },
    {
      id: "GU_PopDensityTMS",
      layer: "Population Density TMS",
      label: "Population Density",
      chartLabel: "Population Density",
      chartCSSColor: {
        0: "#E9ECEF",
        1: "#FFF6D0",
        2: "#EFC133",
        3: "#9EAC37",
        4: "#2C8D7A",
        5: "#385A4C",
      },
      chartInputName: "asset",
      ChartInputLabel: "Community Assets Inputs",
      chartCSSSelector: "pop_density",
      url: "https://tiles.resilientcoasts.org/GU_PopDensityIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2020",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "A ranking of population density by estimates based on the 2010 Decennial Census. Areas are ranked from low to high using the ratio of people per square kilometer.",
      region: "guam",
    },
    {
      id: "GU_SocVulnTMS",
      layer: "Social Vulnerability TMS",
      label: "Social Vulnerability",
      chartLabel: "Social Vulnerability",
      chartCSSColor: {
        0: "#E9ECEF",
        1: "#EDF8FB",
        2: "#B3CDE3",
        3: "#8C96C6",
        4: "#88419D",
      },
      chartInputName: "asset",
      ChartInputLabel: "Community Assets Inputs",
      chartCSSSelector: "social_vuln",
      url: "https://tiles.resilientcoasts.org/GU_SocVulnIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2020",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "Estimates are ranked from low to high, depicting areas of high poverty, vulnerable housing characteristics, and personal disruption due to climate change according to data from the 2010 Decennial Census.",
      region: "guam",
    },
    {
      id: "GU_CriticalFacilitiesTMS",
      layer: "Critical Facilities TMS",
      label: "Critical Facilities",
      chartLabel: "Critical Facilities",
      chartCSSColor: {
        0: "#E9ECEF",
        1: "#0084A8",
        2: "#0084A8",
        3: "#0084A8",
        4: "#0084A8",
        5: "#0084A8",
      },
      chartInputName: "asset",
      ChartInputLabel: "Community Assets Inputs",
      chartCSSSelector: "crit_facilities",
      url: "https://tiles.resilientcoasts.org/GU_CriticalFacilitiesIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2020",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "Facilities such as schools, hospitals, and police and fire stations that are important to recovery efforts when a community is faced with a flood-related event. All facilities are given the same presence rank.",
      region: "guam",
    },
    {
      id: "GU_CriticalInfrastructureTMS",
      layer: "Critical Infrastructure TMS",
      label: "Critical Infrastructure",
      chartLabel: "Critical Infrastructure",
      chartCSSColor: {
        0: "#E9ECEF",
        1: "#CCD1D2",
        2: "#CCD1D2",
        3: "#CCD1D2",
        4: "#355C59",
        5: "#355C59",
        6: "#355C59",
        7: "#E8B16D",
        8: "#E8B16D",
        9: "#E8B16D",
        10: "#AD3541",
        11: "#AD3541",
        12: "#AD3541",
        13: "#7B1733",
        14: "#7B1733",
        15: "#7B1733",
      },
      chartInputName: "asset",
      ChartInputLabel: "Community Assets Inputs",
      chartCSSSelector: "crit_infra",
      url: "https://tiles.resilientcoasts.org/GU_CriticalInfrastructureIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2020",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "Infrastructure in and around communities that are integral to a community’s ability to recover from a flood event, including primary highways, power plants, and rail lines, among others. High values suggest areas where multiple infrastructure overlap.",
      region: "guam",
    },
    {
      id: "GU_DrainageTMS",
      layer: "Drainage TMS",
      label: "Impermeable Soils",
      chartLabel: "Impermeable Soils",
      chartCSSColor: {
        0: "#E9ECEF",
        1: "#447604",
        2: "#447604",
        3: "#DCE9F2",
        4: "#DCE9F2",
        5: "#553555",
        6: "#553555",
      },
      chartInputName: "threat",
      ChartInputLabel: "Threats Inputs",
      chartCSSSelector: "impermeable",
      url: "https://tiles.resilientcoasts.org/GU_DraingeIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2020",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "Those areas with poor water drainage potential, including both less-porous soils and areas with high-intensity development. High values suggest that areas contain soils with poor drainage potential and/or a prevalence of developed, impervious surfaces that may pool during flooding or heavy precipitation events.",
      region: "guam",
    },
    {
      id: "GU_ErosionTMS",
      layer: "Erosion TMS",
      label: "Soil Erodibility",
      chartLabel: "Soil Erodibility",
      chartCSSColor: {
        0: "#E9ECEF",
        1: "#feeba2",
        2: "#febb47",
        3: "#f07818",
        4: "#b84203",
        5: "#662506",
      },
      chartInputName: "threat",
      ChartInputLabel: "Threats Inputs",
      chartCSSSelector: "erosion",
      url: "https://tiles.resilientcoasts.org/GU_ErosionIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2020",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "Those areas that contain soil characteristics that have a high susceptibility of soil particle detachment by water. This may include areas that have high silt content or migratory systems such as beaches and dunes. High values suggest that areas carry an increased potential for erosion due to flooding or heavy precipitation events.",
      region: "guam",
    },
    {
      id: "GU_SLRTMS",
      layer: "Sea Level Rise TMS",
      label: "Sea Level Rise",
      chartLabel: "Sea Level Rise",
      chartCSSColor: {
        0: "#E9ECEF",
        1: "#dbd8ea",
        2: "#99b9d9",
        3: "#4095c3",
        4: "#027976",
        5: "#014636",
      },
      chartInputName: "threat",
      ChartInputLabel: "Threats Inputs",
      chartCSSSelector: "sea_level_rise",
      url: "https://tiles.resilientcoasts.org/GU_SLRIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2020",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "NOAA’s sea level rise scenarios ranked from low to high, with low being a 5-foot scenario and high being a 1-foot scenario. These ranks are used to suggest the more imminent threat of a 1-foot rise in sea level versus a 5-foot rise that may eventually occur.",
      region: "guam",
    },
    {
      id: "GU_WaveDrivenFloodingTMS",
      layer: "Wave Driven TMS",
      label: "Wave-Driven Flooding",
      chartLabel: "Wave Driven Flooding",
      chartCSSColor: {
        0: "#E9ECEF",
        1: "#FFFFCC",
        2: "#A1DAB4",
        3: "#41B6C4",
        4: "#225EA8",
      },
      chartInputName: "threat",
      ChartInputLabel: "Threats Inputs",
      chartCSSSelector: "wave_flooding",
      url: "https://tiles.resilientcoasts.org/GU_WaveDrivenFloodingIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2020",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "Areas are ranked according to probability of wave driven flooding, where a 10-year return period is given a higher rank than a 500-year return period.",
      region: "guam",
    },
    {
      id: "GU_SlopeTMS",
      layer: "Slope TMS",
      label: "Areas of Low Slope",
      chartLabel: "Areas of Low Slope",
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
      url: "https://tiles.resilientcoasts.org/GU_SlopeIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2020",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "The percent rise of the elevation of the landscape, given values from low to high. High values indicate those areas that are very low lying and more likely to retain water and flood.",
      region: "guam",
    },
    {
      id: "GU_FloodProneAreasTMS",
      layer: "Flood Prone Areas TMS",
      label: "Flood-Prone Areas",
      chartLabel: "Flood Prone Areas",
      chartCSSColor: {
        0: "#E9ECEF",
        1: "#e2e2ef",
        2: "#b6b6d8",
        3: "#8683bd",
        4: "#61409b",
        5: "#3f007d",
      },
      chartInputName: "threat",
      ChartInputLabel: "Threats Inputs",
      chartCSSSelector: "floodprone_areas",
      url: "https://tiles.resilientcoasts.org/GU_FloodProneAreasIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2020",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "Areas considered by FEMA to be in the 100- and 500-year flood zones, as well as the floodway. Frequently and occasionally flooded soil designations are used to identify areas outside of FEMA coverage. Highest values suggest areas directly in the floodway, whereas low values suggest occasionally flooded soils outside of the floodplain.",
      region: "guam",
    },
    {
      id: "GU_TsunamiIndexTiles",
      layer: "Tsunami",
      label: "Tsunami",
      chartLabel: "Tsunami",
      chartCSSColor: {
        0: "#E9ECEF",
        1: "#2171B5",
        2: "#2171B5",
      },
      chartInputName: "threat",
      ChartInputLabel: "Threats Inputs",
      chartCSSSelector: "tsunami",
      url: "https://tiles.resilientcoasts.org/GU_TsunamiIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2020",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "Represents the maximum extent of inundation due to tsunami.",
      region: "guam",
    },
    {
      id: "GU_WaveExposureTiles",
      layer: "Wave Exposure",
      label: "Wave Exposure",
      chartLabel: "Wave Exposure",
      chartCSSColor: {
        0: "#E9ECEF",
        1: "#FEEDDE",
        2: "#FDBE85",
        3: "#FD8D3C",
        4: "#E6550D",
        5: "#A63603",
      },
      chartInputName: "threat",
      ChartInputLabel: "Threats Inputs",
      chartCSSSelector: "wave_exposure",
      url: "https://tiles.resilientcoasts.org/GU_WaveExposureTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2020",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "Average daily wave energy along Guam’s shoreline, ranked from low to high. Wave energy is calculated from average wind direction, wind speed and fetch length along the wind bearing.",
      region: "guam",
    },
    {
      id: "GU_LandslideIndexTiles",
      layer: "Landslides",
      label: "Geological Stressors",
      chartLabel: "Geological Stressors",
      chartCSSColor: {
        0: "#E9ECEF",
        1: "#FEEBE2",
        2: "#FBB4B9",
        3: "#F768A1",
        4: "#AE017E",
      },
      chartInputName: "threat",
      ChartInputLabel: "Threats Inputs",
      chartCSSSelector: "geostress",
      url: "https://tiles.resilientcoasts.org/GU_LandslideIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2020",
      format: "image/png",
      opacity: 0.75,
      maxNativeZoom: 14,
      description:
        "Shows landslide susceptibility in Guam, where a higher rank indicates higher susceptibility.",
      region: "guam",
    },
    {
      id: "GU_landcover",
      layer: "landcover",
      label: "Landcover",
      chartLabel: "Landcover",
      chartCSSColor: {
        0: "#000000",
        1: "#F2F2F2",
        2: "#AA9EAA",
        3: "#917782",
        4: "#C1CC3D",
        5: "#592300",
        6: "#C1A351",
        7: "#F2BC8C",
        8: "#00F200",
        9: "#003D00",
        10: "#0AA33D",
        11: "#707000",
        12: "#006060",
        13: "#F27000",
        14: "#F200F2",
        15: "#3C003C",
        16: "#6D006D",
        17: "#B200B2",
        18: "#00F2F2",
        19: "#F2F200",
        20: "#000070",
        21: "#0000ED",
        22: "#666FDB",
        23: "#F9D100",
        24: "#AAF9EF",
      },
      chartInputName: "landcover",
      ChartInputLabel: "Additional Overlays",
      chartCSSSelector: "landcover",
      url: "https://tiles.resilientcoasts.org/GU_CCAPTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2023",
      opacity: 0.75,
      maxNativeZoom: 14,
      description: "Insert Landcover Description Here", // TODO: ADD DESCRIPTION
      region: "guam",
    },
  ],
  zonalStatsKeys: [
    "asset",
    "crit_facilities",
    "crit_infra",
    "erosion",
    "exposure",
    "floodprone_areas",
    "hubs",
    "impermeable",
    "landslides",
    "marine",
    "pop_density",
    "sea_level_rise",
    "slope",
    "social_vuln",
    "terrestrial",
    "threat",
    "wave_flooding",
    "wildlife",
    "tsunami",
    "wave_exposure",
    "lc_no_data",
    "lc_developed_high_intensity",
    "lc_developed_medium_intensity",
    "lc_developed_low_intensity",
    "lc_developed_open space",
    "lc_cultivated_crops",
    "lc_pasture_hay",
    "lc_grassland_herbaceous",
    "lc_deciduous_forest",
    "lc_evergreen_forest",
    "lc_mixed_forest",
    "lc_scrub_shrub",
    "lc_palus_forested_wetland",
    "lc_palus_scrub_shrub_wetland",
    "lc_palus_emergent_wetland",
    "lc_estuar_forested_wetland",
    "lc_estuar_scrub_shrub_wetland",
    "lc_estuar_emergent_wetland",
    "lc_unconsolidated_shore",
    "lc_bare_land",
    "lc_open_water",
    "lc_palustrine_aquatic_bed",
    "lc_estuarine_aquatic_bed",
    "lc_tundra",
    "lc_snow_ice",
  ],
  statesList: ["Guam"],
  countiesList: ["Guam, GU"],
  huc8List: ["22010000"],
};
