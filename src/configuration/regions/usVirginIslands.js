export const usVirginIslandsConfig = {
  label: 'US Virgin Islands',
  region: 'usVirginIslands',
  mapProperties: {
    label: 'US Virgin Islands',
    center: [18.01530387941711, -64.49111938476564],
    extent: [-65.13508888306899, 17.627008270947076, -64.25480934205336, 18.46267598832466],
    zoom: 10
  },
  chartInputs:  [
    {
      chartInputName: 'summary',
      ChartInputLabel: 'Summary',
    },
    {
      chartInputName: 'fishandwildlife',
      ChartInputLabel: 'Fish and Wildlife Inputs',
    },
    {
      chartInputName: 'asset',
      ChartInputLabel: 'Comunity Assets Inputs',
    },
    {
      chartInputName: 'threat',
      ChartInputLabel: 'Threats Inputs',
    }
],
    layerList:
      [
        {
          id: "USVI_HubsTMS",
          layer: "Hubs TMS",
          label: "Resilience Hubs",
          apikey: 'hubs',
          hubsapikey: 'hubs',
          chartLabel: 'Resilience Hubs',
          chartLegendValues: 10,
          chartDriver: false,
          chartSummary: true,
          chartOrder: 1,
          chartInputName: 'summary',
          ChartInputLabel: 'Summary',
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
            10: '#c21500',
          },
          chartMaxValue: 11,
          chartMinValue: 0,
          chartScale: 0,
          chartScaleGroups: 1,
          chartNoDataOverRide: 1,
          url: "https://tiles.resilientcoasts.org/USVI_HubsIndexTiles/{z}/{x}/{y}.png",
          attribution: "NFWF 2020",
          format: "image/png",
          tileSize: 256,
          transparent: true,
          opacity: 0.75,
          zIndex: 9000,
          crs: L.CRS.EPSG3857,
          maxNativeZoom: 13,
          tms: false,
          legend: "usvi_hub",
          description: "Areas of open lands and protected space that may be suitable for resilience-building efforts. Hubs are ranked by priority, given the level of exposure that nearby assets have to flood-related threats and the presence and abundance of fish and wildlife species within and surrounding the Hub.",
          source: 'regional',
          region: 'us_virgin_islands'
        },
        {
          id: "USVI_ExposureTMS",
          layer: "Exposure TMS",
          label: "Community Exposure Index",
          apikey: 'exposure',
          hubsapikey: 'exposure',
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
            10: '#633319',
          },
          chartDriver: false,
          chartSummary: true,
          chartOrder: 2,
          chartInputName: 'summary',
          ChartInputLabel: 'Summary',
          chartCSSSelector: 'exposure',
          chartMaxValue: 11,
          chartMinValue: 0,
          chartScale: 0,
          chartScaleGroups: 1,
          chartNoDataOverRide: 1,
          url: "https://tiles.resilientcoasts.org/USVI_ExposureIndexTiles/{z}/{x}/{y}.png",
          attribution: "NFWF 2020",
          format: "image/png",
          tileSize: 256,
          transparent: true,
          opacity: 0.75,
          zIndex: 9000,
          crs: L.CRS.EPSG3857,
          maxNativeZoom: 14,
          tms: false,
          legend: "usvi_exposure",
          description: "The product of the Asset and Threat Indices, which suggests areas on the landscape where community assets are potentially exposed to flood-related threats.",
          source: 'regional',
          region: 'us_virgin_islands'
        },
        {
          id: "USVI_AssetsTMS",
          layer: "Assets TMS",
          label: "Community Asset Index",
          apikey: 'asset',
          hubsapikey: 'asset',
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
            10: '#090991',
          },
          chartDriver: false,
          chartSummary: true,
          chartOrder: 3,
          chartInputName: 'summary',
          ChartInputLabel: 'Summary',
          chartCSSSelector: 'asset',
          chartMaxValue: 11,
          chartMinValue: 0,
          chartScale: 0,
          chartScaleGroups: 1,
          chartNoDataOverRide: 1,
          url: "https://tiles.resilientcoasts.org/USVI_AssetsIndexTiles/{z}/{x}/{y}.png",
          attribution: "NFWF 2020",
          format: "image/png",
          tileSize: 256,
          transparent: true,
          opacity: 0.75,
          zIndex: 9000,
          crs: L.CRS.EPSG3857,
          maxNativeZoom: 14,
          tms: false,
          legend: "usvi_asset",
          description: "Index of community assets critical to the recovery of an area and human population. High values suggest areas with a higher, cumulative prevalence of community assets on the landscape.",
          source: 'regional',
          region: 'us_virgin_islands'
        },
        {
          id: "USVI_ThreatsTMS",
          layer: "Threats TMS",
          label: "Threat Index",
          apikey: 'threat',
          hubsapikey: 'threat',
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
            10: '#c40a0a',
          },
          chartDriver: false,
          chartSummary: true,
          chartOrder: 4,
          chartInputName: 'summary',
          ChartInputLabel: 'Summary',
          chartCSSSelector: 'threat',
          chartMaxValue: 11,
          chartMinValue: 0,
          chartScale: 0,
          chartScaleGroups: 1,
          chartNoDataOverRide: 1,
          url: "https://tiles.resilientcoasts.org/USVI_ThreatsIndexTiles/{z}/{x}/{y}.png",
          attribution: "NFWF 2020",
          format: "image/png",
          tileSize: 256,
          transparent: true,
          opacity: 0.75,
          zIndex: 9000,
          crs: L.CRS.EPSG3857,
          maxNativeZoom: 14,
          tms: false,
          legend: "usvi_threat",
          description: "Index of flood-related datasets, including storm surge scenarios and landscape characteristics that exacerbate flood potential. High values in the Index represent those areas on the landscape where there are multiple high values of individual inputs.",
          source: 'regional',
          region: 'us_virgin_islands'
        },

        {
          id: "USVI_FishAndWildlifeTMS",
          layer: "FishAndWildlife TMS",
          label: "Fish and Wildlife Index",
          apikey: 'wildlife',
          hubsapikey: 'wildlife',
          chartLabel: 'Fish and Wildlife',
          chartLegendValues: 6,
          chartCSSColor: {
            0: '#E9ECEF',
            1: '#EEE7F8',
            2: '#E9BBCB',
            3: '#DB90A6',
            4: '#D27C99',
            5: '#B7528A',
            6: '#7E33A8',
          },
          chartDriver: false,
          chartSummary: true,
          chartOrder: 5,
          chartInputName: 'summary',
          ChartInputLabel: 'Summary',
          chartCSSSelector: 'fishandwildlife',
          chartMaxValue: 7,
          chartMinValue: 0,
          chartScale: 0,
          chartScaleGroups: 1,
          chartNoDataOverRide: 1,
          url: "https://tiles.resilientcoasts.org/USVI_CombinedWildlifeIndexTiles/{z}/{x}/{y}.png",
          attribution: "NFWF 2020",
          format: "image/png",
          tileSize: 256,
          transparent: true,
          opacity: 0.75,
          zIndex: 9000,
          crs: L.CRS.EPSG3857,
          maxNativeZoom: 14,
          tms: false,
          legend: "usvi_fishandwildlife",
          description: "Identifies valuable habitat for species of concern in both the terrestrial and marine environments. Higher values indicate more valuable habitat areas for both.",
          source: 'regional',
          region: 'us_virgin_islands'
        },
        {
          id: "USVI_AquaticTMS",
          layer: "Marine TMS",
          label: "Marine Index",
          apikey: 'marine',
          hubsapikey: 'marine',
          chartLabel: 'Marine',
          chartLegendValues: 4,
          chartCSSColor: {
            0: '#E9ECEF',
            1: '#CDE1E8',
            2: '#82BCD1',
            3: '#007E91',
            4: '#005A62',
          },
          chartDriver: true,
          chartSummary: false,
          chartOrder: 1,
          chartInputName: 'fishandwildlife',
          ChartInputLabel: 'Fish and Wildlife Inputs',
          chartCSSSelector: 'aquatic',
          chartMaxValue: 5,
          chartMinValue: 0,
          chartScale: 0,
          chartScaleGroups: 1,
          chartNoDataOverRide: 1,
          url: "https://tiles.resilientcoasts.org/USVI_AquaticIndexTiles/{z}/{x}/{y}.png",
          attribution: "NFWF 2020",
          format: "image/png",
          tileSize: 256,
          transparent: true,
          opacity: 0.75,
          zIndex: 9000,
          crs: L.CRS.EPSG3857,
          maxNativeZoom: 14,
          tms: false,
          legend: "usvi_aquatic",
          description: "Higher values identify habitat areas that are most valuable for providing protection to nearby coastal communities and for the protection of marine species.",
          source: 'regional',
          region: 'us_virgin_islands'
        },
        {
          id: "USVI_TerrestrialTMS",
          layer: "Terrestrial TMS",
          label: "Terrestrial Index",
          apikey: 'terrestrial',
          hubsapikey: 'terrestrial',
          chartLabel: 'Terrestrial',
          chartLegendValues: 4,
          chartCSSColor: {
            0: '#E9ECEF',
            1: '#FFE9C4',
            2: '#DFC878',
            3: '#385B23',
            4: '#004900',
          },
          chartDriver: true,
          chartSummary: false,
          chartOrder: 2,
          chartInputName: 'fishandwildlife',
          ChartInputLabel: 'Fish and Wildlife Inputs',
          chartCSSSelector: 'terrestrial',
          chartMaxValue: 5,
          chartMinValue: 0,
          chartScale: 0,
          chartScaleGroups: 1,
          chartNoDataOverRide: 1,
          url: "https://tiles.resilientcoasts.org/USVI_TerrestrialIndexTiles/{z}/{x}/{y}.png",
          attribution: "NFWF 2020",
          format: "image/png",
          tileSize: 256,
          transparent: true,
          opacity: 0.75,
          zIndex: 9000,
          crs: L.CRS.EPSG3857,
          maxNativeZoom: 14,
          tms: false,
          legend: "usvi_terrestrial",
          description: "Higher values identify habitat areas that are suitable to the most species of concern for that region, based on habitat preferences and potential threats identified by the IUCN Red List.",
          source: 'regional',
          region: 'us_virgin_islands'
        },
        {
          id: "USVI_PopDensityTMS",
          layer: "Population Density TMS",
          label: "Population Density",
          apikey: 'pop_density',
          hubsapikey: 'pop_density',
          chartLabel: 'Population Density',
          chartLegendValues: 5,
          chartCSSColor: {
            0: '#E9ECEF',
            1: '#dfc878',
            2: '#efc133',
            3: '#9eac37',
            4: '#2c8d7a',
            5: '#385a4c',
          },
          chartDriver: true,
          chartSummary: false,
          chartOrder: 1,
          chartInputName: 'asset',
          ChartInputLabel: 'Comunity Assets Inputs',
          chartCSSSelector: 'population-density',
          chartMaxValue: 6,
          chartMinValue: 0,
          chartScale: 0,
          chartScaleGroups: 1,
          chartNoDataOverRide: 1,
          url: "https://tiles.resilientcoasts.org/USVI_PopDensityIndexTiles/{z}/{x}/{y}.png",
          attribution: "NFWF 2020",
          format: "image/png",
          tileSize: 256,
          transparent: true,
          opacity: 0.75,
          zIndex: 9000,
          crs: L.CRS.EPSG3857,
          maxNativeZoom: 14,
          tms: false,
          legend: "usvi_popdensity",
          description: "A ranking of population density by estates based on the 2010 Decennial Census. Areas are ranked from low to high using the ratio of people per square kilometer.",
          source: 'regional',
          region: 'us_virgin_islands'
        },
        {
          id: "USVI_SocVulnTMS",
          layer: "Social Vulnerability TMS",
          label: "Social Vulnerability",
          apikey: 'social_vuln',
          hubsapikey: 'social_vuln',
          chartLabel: 'Social Vulnerability',
          chartLegendValues: 5,
          chartCSSColor: {
            0: '#E9ECEF',
            1: '#9EBBD7',
            2: '#7A8EF5',
            3: '#43309D',
            4: '#321669',
            5: '#270B59',
          },
          chartDriver: true,
          chartSummary: false,
          chartOrder: 2,
          chartInputName: 'asset',
          ChartInputLabel: 'Comunity Assets Inputs',
          chartCSSSelector: 'social-vulnerability',
          chartMaxValue: 6,
          chartMinValue: 0,
          chartScale: 0,
          chartScaleGroups: 1,
          chartNoDataOverRide: 1,
          url: "https://tiles.resilientcoasts.org/USVI_SocVulnIndexTiles/{z}/{x}/{y}.png",
          attribution: "NFWF 2020",
          format: "image/png",
          tileSize: 256,
          transparent: true,
          opacity: 0.75,
          zIndex: 9000,
          crs: L.CRS.EPSG3857,
          maxNativeZoom: 14,
          tms: false,
          legend: "usvi_socvuln",
          description: "Estates are ranked from low to high, depicting areas of lower median incomes and minority populations based on 2010 Decennial Census Data and guidance from USEPA EJSCREEN methodology.",
          source: 'regional',
          region: 'us_virgin_islands'
        },
        {
          id: "USVI_CriticalFacilitiesTMS",
          layer: "Critical Facilities TMS",
          label: "Critical Facilities",
          apikey: 'crit_facilities',
          hubsapikey: 'crit_facilities',
          chartLabel: 'Critical Facilities',
          chartLegendValues: 6,
          chartCSSColor: {
            0: '#E9ECEF',
            1: '#0084a8',
            2: '#0084a8',
            3: '#0084a8',
            4: '#0084a8',
            5: '#0084a8', // 5
            6: '#0084A8', // 5
          },
          chartDriver: true,
          chartSummary: false,
          chartOrder: 3,
          chartInputName: 'asset',
          ChartInputLabel: 'Comunity Assets Inputs',
          chartCSSSelector: 'critical-facilities',
          chartMaxValue: 7,
          chartMinValue: 0,
          chartScale: 0,
          chartScaleGroups: 1,
          chartNoDataOverRide: 1,
          url: "https://tiles.resilientcoasts.org/USVI_CriticalFacilitiesIndexTiles/{z}/{x}/{y}.png",
          attribution: "NFWF 2020",
          format: "image/png",
          tileSize: 256,
          transparent: true,
          opacity: 0.75,
          zIndex: 9000,
          crs: L.CRS.EPSG3857,
          maxNativeZoom: 14,
          tms: false,
          legend: "usvi_critfac",
          description: "Facilities such as schools, hospitals, and police and fire stations that are important to recovery efforts when a community is faced with a flood-related event. All facilities are given the same presence rank.",
          source: 'regional',
          region: 'us_virgin_islands'
        },
        {
          id: "USVI_CriticalInfrastructureTMS",
          layer: "Critical Infrastructure TMS",
          label: "Critical Infrastructure",
          apikey: 'crit_infra',
          hubsapikey: 'crit_infra',
          chartLabel: 'Critical Infrastructure',
          chartLegendValues: 6,
          chartCSSColor: {
            0: '#E9ECEF',
            1: '#ccd1d2',
            2: '#355c59',
            3: '#e8b16d',
            4: '#b15a3c',
            5: '#ad3541',
            6: '#7b1733',
          },
          chartDriver: true,
          chartSummary: false,
          chartOrder: 4,
          chartInputName: 'asset',
          ChartInputLabel: 'Comunity Assets Inputs',
          chartCSSSelector: 'critical-infrastructure',
          chartMaxValue: 2,
          chartMinValue: 0,
          chartScale: 0,
          chartScaleGroups: 1,
          chartNoDataOverRide: 1,
          url: "https://tiles.resilientcoasts.org/USVI_CriticalInfrastructureIndexTiles/{z}/{x}/{y}.png",
          attribution: "NFWF 2020",
          format: "image/png",
          tileSize: 256,
          transparent: true,
          opacity: 0.75,
          zIndex: 9000,
          crs: L.CRS.EPSG3857,
          maxNativeZoom: 14,
          tms: false,
          legend: "usvi_critinfra",
          description: "Infrastructure in and around communities that are integral to a community’s ability to recover from a flood event, including primary highways, power plants, and rail lines, among others. High values suggest areas where multiple infrastructure overlap.",
          source: 'regional',
          region: 'us_virgin_islands'
        },
        {
          id: "USVI_DrainageTMS",
          layer: "Drainage TMS",
          label: "Impermeable Soils",
          apikey: 'impermeable',
          hubsapikey: 'impermeable',
          chartLabel: 'Impermeable Soils',
          chartLegendValues: 5,
          chartCSSColor: {
            0: '#E9ECEF',
            1: '#447604',
            2: '#77D66F',
            3: '#dce9f2',
            4: '#755b69',
            5: '#553555',
          },
          chartDriver: true,
          chartSummary: false,
          chartOrder: 1,
          chartInputName: 'threat',
          ChartInputLabel: 'Threats Inputs',
          chartCSSSelector: 'drainage',
          chartMaxValue: 6,
          chartMinValue: 0,
          chartScale: 0,
          chartScaleGroups: 1,
          chartNoDataOverRide: 1,
          url: "https://tiles.resilientcoasts.org/USVI_DraingeIndexTiles/{z}/{x}/{y}.png",
          attribution: "NFWF 2020",
          format: "image/png",
          tileSize: 256,
          transparent: true,
          opacity: 0.75,
          zIndex: 9000,
          crs: L.CRS.EPSG3857,
          maxNativeZoom: 14,
          tms: false,
          legend: "usvi_drainage",
          description: "Those areas with poor water drainage potential, including both less-porous soils and areas with high-intensity development. High values suggest that areas contain soils with poor drainage potential and/or a prevalence of developed, impervious surfaces that may pool during flooding or heavy precipitation events.",
          source: 'regional',
          region: 'us_virgin_islands'
        },
        {
          id: "USVI_ErosionTMS",
          layer: "Erosion TMS",
          label: "Soil Erodibility",
          apikey: 'erosion',
          hubsapikey: 'erosion',
          chartLabel: 'Soil Erodibility',
          chartLegendValues: 5,
          chartCSSColor: {
            0: '#E9ECEF',
            1: '#feeba2',
            2: '#febb47',
            3: '#f07818',
            4: '#b84203',
            5: '#662506',
          },
          chartDriver: true,
          chartSummary: false,
          chartOrder: 2,
          chartInputName: 'threat',
          ChartInputLabel: 'Threats Inputs',
          chartCSSSelector: 'erosion',
          chartMaxValue: 6,
          chartMinValue: 0,
          chartScale: 0,
          chartScaleGroups: 1,
          chartNoDataOverRide: 1,
          url: "https://tiles.resilientcoasts.org/USVI_ErosionIndexTiles/{z}/{x}/{y}.png",
          attribution: "NFWF 2020",
          format: "image/png",
          tileSize: 256,
          transparent: true,
          opacity: 0.75,
          zIndex: 9000,
          crs: L.CRS.EPSG3857,
          maxNativeZoom: 14,
          tms: false,
          legend: "usvi_erosion",
          description: "Those areas that contain soil characteristics that have a high susceptibility of soil particle detachment by water. This may include areas that have high silt content or migratory systems such as beaches and dunes. High values suggest that areas carry an increased potential for erosion due to flooding or heavy precipitation events.",
          source: 'regional',
          region: 'us_virgin_islands'
        },
        {
          id: "USVI_SLRTMS",
          layer: "Sea Level Rise TMS",
          label: "Sea Level Rise",
          apikey: 'sea_level_rise',
          hubsapikey: 'sea_level_rise',
          chartLabel: 'Sea Level Rise',
          chartLegendValues: 5,
          chartCSSColor: {
            0: '#E9ECEF',
            1: '#dbd8ea',
            2: '#99b9d9',
            3: '#4095c3',
            4: '#027976',
            5: '#014636',
          },
          chartDriver: true,
          chartSummary: false,
          chartOrder: 3,
          chartInputName: 'threat',
          ChartInputLabel: 'Threats Inputs',
          chartCSSSelector: 'sea-level-rise',
          chartMaxValue: 6,
          chartMinValue: 0,
          chartScale: 0,
          chartScaleGroups: 1,
          chartNoDataOverRide: 1,
          url: "https://tiles.resilientcoasts.org/USVI_SLRIndexTiles/{z}/{x}/{y}.png",
          attribution: "NFWF 2020",
          format: "image/png",
          tileSize: 256,
          transparent: true,
          opacity: 0.75,
          zIndex: 9000,
          crs: L.CRS.EPSG3857,
          maxNativeZoom: 14,
          tms: false,
          legend: "usvi_slr",
          description: "NOAA’s sea level rise scenarios ranked from low to high, with low being a 5-foot scenario and high being a 1-foot scenario. These ranks are used to suggest the more imminent threat of a 1-foot rise in sea level versus a 5-foot rise that may eventually occur.",
          source: 'regional',
          region: 'us_virgin_islands'
        },
        {
          id: "USVI_StormSurgeTMS",
          layer: "Storm Surge TMS",
          label: "Storm Surge",
          apikey: 'storm_surge',
          hubsapikey: 'storm_surge',
          chartLabel: 'Storm Surge',
          chartLegendValues: 5,
          chartCSSColor: {
            0: '#E9ECEF',
            1: '#d6efb3',
            2: '#73c8bd',
            3: '#2498c1',
            4: '#234da0',
            5: '#081d58',
          },
          chartDriver: true,
          chartSummary: false,
          chartOrder: 4,
          chartInputName: 'threat',
          ChartInputLabel: 'Threats Inputs',
          chartCSSSelector: 'storm-surge',
          chartMaxValue: 6,
          chartMinValue: 0,
          chartScale: 0,
          chartScaleGroups: 1,
          chartNoDataOverRide: 1,
          url: "https://tiles.resilientcoasts.org/USVI_StormSurgeIndexTiles/{z}/{x}/{y}.png",
          attribution: "NFWF 2020",
          format: "image/png",
          tileSize: 256,
          transparent: true,
          opacity: 0.75,
          zIndex: 9000,
          crs: L.CRS.EPSG3857,
          maxNativeZoom: 14,
          tms: false,
          legend: "usvi_stormsurge",
          description: "Based on the impacts from modeled hurricane storm categories, storm surge is ranked from low to high, with low being a 5-foot surge and high being a 1-foot surge. As a 1-foot surge is more likely to occur than a 5-foot surge, areas within the 1-foot designation are ranked with higher values.",
          source: 'regional',
          region: 'us_virgin_islands'
        },
        {
          id: "USVI_SlopeTMS",
          layer: "Slope TMS",
          label: "Areas of Low Slope",
          apikey: 'low_areas',
          hubsapikey: 'low_areas',
          chartLabel: 'Areas of Low Slope',
          chartLegendValues: 5,
          chartCSSColor: {
            0: '#E9ECEF',
            1: '#d3eecd',
            2: '#98d594',
            3: '#4bb062',
            4: '#157f3b',
            5: '#00441b',
          },
          chartDriver: true,
          chartSummary: false,
          chartOrder: 5,
          chartInputName: 'threat',
          ChartInputLabel: 'Threats Inputs',
          chartCSSSelector: 'slope',
          chartMaxValue: 6,
          chartMinValue: 0,
          chartScale: 0,
          chartScaleGroups: 1,
          chartNoDataOverRide: 1,
          url: "https://tiles.resilientcoasts.org/USVI_SlopeIndexTiles/{z}/{x}/{y}.png",
          attribution: "NFWF 2020",
          format: "image/png",
          tileSize: 256,
          transparent: true,
          opacity: 0.75,
          zIndex: 9000,
          crs: L.CRS.EPSG3857,
          maxNativeZoom: 14,
          tms: false,
          legend: "usvi_slope",
          description: "The percent rise of the elevation of the landscape, given values from low to high. High values indicate those areas that are very low lying and more likely to retain water and flood.",
          source: 'regional',
          region: 'us_virgin_islands'
        },
        {
          id: "USVI_FloodProneAreasTMS",
          layer: "Flood Prone Areas TMS",
          label: "Flood-Prone Areas",
          apikey: 'floodprone_areas',
          hubsapikey: 'floodprone_areas',
          chartLabel: 'Flood Prone Areas',
          chartLegendValues: 5,
          chartCSSColor: {
            0: '#E9ECEF',
            1: '#e2e2ef',
            2: '#b6b6d8',
            3: '#8683bd',
            4: '#61409b',
            5: '#3f007d',
          },
          chartDriver: true,
          chartSummary: false,
          chartOrder: 6,
          chartInputName: 'threat',
          ChartInputLabel: 'Threats Inputs',
          chartCSSSelector: 'floodprone-areas',
          chartMaxValue: 6,
          chartMinValue: 0,
          chartScale: 0,
          chartScaleGroups: 1,
          chartNoDataOverRide: 1,
          url: "https://tiles.resilientcoasts.org/USVI_FloodProneAreasIndexTiles/{z}/{x}/{y}.png",
          attribution: "NFWF 2020",
          format: "image/png",
          tileSize: 256,
          transparent: true,
          opacity: 0.75,
          zIndex: 9000,
          crs: L.CRS.EPSG3857,
          maxNativeZoom: 14,
          tms: false,
          legend: "usvi_floodprone",
          description: "Areas considered by FEMA to be in the 100- and 500-year flood zones, as well as the floodway. Frequently and occasionally flooded soil designations are used to identify areas outside of FEMA coverage. Highest values suggest areas directly in the floodway, whereas low values suggest occasionally flooded soils outside of the floodplain.",
          source: 'regional',
          region: 'us_virgin_islands'
        },
      ]
  
};
