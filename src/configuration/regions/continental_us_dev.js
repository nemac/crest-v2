import palettes from "../palettes/conus.json";
import { chartCSSColorFromPalette } from "../palettes/chartColors";
import { continentalUSConfig } from "./continental_us";

const TILES = "pmtiles://https://tiles.resilientcoasts.org/dev/conus";
const ATTRIBUTION = "NFWF 2026";
const REGION = "north_atlantic";
const REPORT = "See the Continental U.S. Assessment report for details.";

const groups = {
  summary: { chartInputName: "summary", ChartInputLabel: "Summary" },
  threat: { chartInputName: "threat", ChartInputLabel: "Threat Index Inputs" },
  asset: { chartInputName: "asset", ChartInputLabel: "Community Asset Inputs" },
  wildlife: {
    chartInputName: "fishandwildlife",
    ChartInputLabel: "Fish and Wildlife Index Inputs",
  },
  landcover: {
    chartInputName: "landcover",
    ChartInputLabel: "Additional Overlays",
  },
};

const CCAP_LEGEND = [
  {
    backgroundColor: "#F2F2F2",
    borderColor: "#F2F2F2",
    label: "Developed, High Intensity",
  },
  {
    backgroundColor: "#AA9EAA",
    borderColor: "#AA9EAA",
    label: "Developed, Medium Intensity",
  },
  {
    backgroundColor: "#917782",
    borderColor: "#917782",
    label: "Developed, Low Intensity",
  },
  {
    backgroundColor: "#C1CC3D",
    borderColor: "#C1CC3D",
    label: "Developed, Open Space",
  },
  {
    backgroundColor: "#592300",
    borderColor: "#592300",
    label: "Cultivated Crops",
  },
  {
    backgroundColor: "#C1A351",
    borderColor: "#C1A351",
    label: "Pasture/Hay",
  },
  {
    backgroundColor: "#F2BC8C",
    borderColor: "#F2BC8C",
    label: "Grassland/Herbaceous",
  },
  {
    backgroundColor: "#00F200",
    borderColor: "#00F200",
    label: "Deciduous",
  },
  {
    backgroundColor: "#003D00",
    borderColor: "#003D00",
    label: "Evergreen Forest",
  },
  {
    backgroundColor: "#0AA33D",
    borderColor: "#0AA33D",
    label: "Mixed Forest",
  },
  {
    backgroundColor: "#707000",
    borderColor: "#707000",
    label: "Scrub/Shrub",
  },
  {
    backgroundColor: "#006060",
    borderColor: "#006060",
    label: "Palustrine Forested Wetland",
  },
  {
    backgroundColor: "#F27000",
    borderColor: "#F27000",
    label: "Palustrine Scrub/Shrub Wetland",
  },
  {
    backgroundColor: "#F200F2",
    borderColor: "#F200F2",
    label: "Palustrine Emergent Wetland",
  },
  {
    backgroundColor: "#3C003C",
    borderColor: "#3C003C",
    label: "Estuarine Forested Wetland",
  },
  {
    backgroundColor: "#6D006D",
    borderColor: "#6D006D",
    label: "Estuarine Scrub/Shrub Wetland",
  },
  {
    backgroundColor: "#B200B2",
    borderColor: "#B200B2",
    label: "Estuarine Emergent Wetland",
  },
  {
    backgroundColor: "#00F2F2",
    borderColor: "#00F2F2",
    label: "Unconsolidated Shore",
  },
  {
    backgroundColor: "#F2F200",
    borderColor: "#F2F200",
    label: "Bare Land",
  },
  {
    backgroundColor: "#000070",
    borderColor: "#000070",
    label: "Open Water",
  },
  {
    backgroundColor: "#0000ED",
    borderColor: "#0000ED",
    label: "Palustrine Aquatic Bed",
  },
  {
    backgroundColor: "#666FDB",
    borderColor: "#666FDB",
    label: "Estuarine Aquatic Bed",
  },
  {
    backgroundColor: "#F9D100",
    borderColor: "#F9D100",
    label: "Tundra",
  },
  {
    backgroundColor: "#AAF9EF",
    borderColor: "#AAF9EF",
    label: "Snow/Ice",
  },
];

const rasterLayer = (
  name,
  label,
  chartOrder,
  group,
  description,
  ChartInputSubHeading,
) => ({
  id: `CONUS_dev_${name}`,
  layer: label,
  label,
  chartOrder,
  chartLabel: label,
  chartTipLabel: label,
  chartInputName: groups[group].chartInputName,
  ChartInputLabel: groups[group].ChartInputLabel,
  ...(ChartInputSubHeading ? { ChartInputSubHeading } : {}),
  chartCSSSelector: name,
  palette: name,
  chartCSSColor: chartCSSColorFromPalette(palettes[name]),
  url: `${TILES}/${name}.pmtiles`,
  maxzoom: 13,
  attribution: ATTRIBUTION,
  opacity: 0.75,
  description: `${description} ${REPORT}`,
  region: REGION,
});

const layerList = [
  rasterLayer(
    "resilience_opportunities",
    "Resilience Opportunities",
    1,
    "summary",
    "Resilience Opportunities represent areas within 0.25 km of suitable habitats and open space for projects where there are no exclusionary land covers or features. They are ranked by multiplying Community Exposure Index and Fish and Wildlife Index values, with a 1-point asset proximity bonus applied. High Resilience Opportunity values represent areas with greater potential for dual community flood protection and wildlife benefits.",
    "Resilience Opportunities",
  ),
  rasterLayer(
    "community_exposure_index",
    "Community Exposure Index",
    2,
    "summary",
    "The product of the Community Asset Index and Threat Index, the Community Exposure Index identifies areas where human community assets are potentially exposed to numerous flood-related threats.",
    "Community Exposure",
  ),
  rasterLayer(
    "threat_index",
    "Threat Index",
    3,
    "summary",
    "Index of flood-related datasets, including storm surge scenarios and landscape characteristics that exacerbate flood potential. High values in the Index represent those areas on the landscape where there are multiple high values of individual inputs.",
    "Community Exposure",
  ),
  rasterLayer(
    "community_asset_index",
    "Community Asset Index",
    4,
    "summary",
    "Index of human community assets that are important to help a community respond to and recover from a flooding event. High values represent areas with dense concentration of critical facilities, infrastructure, and population density.",
    "Community Exposure",
  ),
  rasterLayer(
    "fish_and_wildlife_index",
    "Fish and Wildlife Index",
    5,
    "summary",
    "The sum of taxonomic and habitat, protected and managed areas inputs, the Fish and Wildlife Index identifies habitat and protected and managed areas important for terrestrial and aquatic species of conservation concern. High values represent areas important for numerous species of concern.",
    "Fish and Wildlife",
  ),
  rasterLayer(
    "areas_of_low_slope",
    "Areas of Low Slope",
    6,
    "threat",
    "The percent rise in elevation. High values indicate those areas that are very low lying and more likely to retain water and flood.",
  ),
  rasterLayer(
    "flood_prone_areas",
    "Flood-prone Areas",
    7,
    "threat",
    "Areas classified by FEMA to be in the 100-year flood zone, 500-year flood zones, or a floodway. Frequently and occasionally flooded soil designations are used to identify additional areas. A high value indicates the floodplain, while a low value indicates occasionally flooded soils outside of the mapped floodplain.",
  ),
  rasterLayer(
    "impermeability",
    "Impermeability",
    8,
    "threat",
    "Areas with poor drainage potential, including both soils and areas with low to high intensity development that do not readily drain and have runoff potential. A high value indicates areas that have soils with poor drainage potential and/or an intensity of developed impervious surfaces. A correction factor has been applied to account for poorly drained soils in row crop agricultural areas using tile drainage.",
  ),
  rasterLayer(
    "landslide_susceptibility",
    "Landslide Susceptibility",
    9,
    "threat",
    "USGS Landslide susceptibility model for the conterminus U.S. This is a geologic condition of the landscape that can exacerbate the level of threat represented from other inputs.",
  ),
  rasterLayer(
    "sea_level_rise",
    "Sea Level Rise",
    10,
    "threat",
    "NOAA’s sea level rise scenarios ranked from low to high, with low being a 5-foot scenario and high being a 1-foot scenario. These ranks are used to suggest the more imminent threat of a 1-foot rise in sea level versus a 5-foot rise that may eventually occur.",
  ),
  rasterLayer(
    "soil_erodibility",
    "Soil Erodibility",
    11,
    "threat",
    "Soils identified as having a high probability of erodibility including coastal bluffs, beaches, and dunes. High values suggest that the area contains soils with a high erodibility factor.",
  ),
  rasterLayer(
    "storm_surge",
    "Storm Surge",
    12,
    "threat",
    "Storm surge scenarios from the National Hurricane Center, ranked from low to high so that areas inundated by the weakest storms rank highest.",
  ),
  rasterLayer(
    "vertical_land_motion",
    "Vertical Land Motion",
    13,
    "threat",
    "Land surface elevation change including subsidence (sinking) and uplifting (rising). Land can sink from underground resource extraction or settling soils, and can rise where groundwater is being replenished or where post-glacial rebound occurs.",
  ),
  rasterLayer(
    "critical_facilities",
    "Critical Facilities",
    14,
    "asset",
    "Facilities that provide important recovery and operational support during and following flood events such as schools, emergency response and law enforcement facilities, health and medical facilities, and government and military buildings. All critical facilities are given the same rank based on presence.",
  ),
  rasterLayer(
    "critical_infrastructure",
    "Critical Infrastructure",
    15,
    "asset",
    "Infrastructure integral to a community’s ability to mitigate damages and recover from a flood event, including transportation, waterways, water treatment, communications, energy, and hazardous site infrastructure. All critical infrastructure is given the same rank based on presence and summed across categories. High values indicate areas where one or more infrastructure types are nearby or overlap.",
  ),
  rasterLayer(
    "population_density",
    "Population Density",
    16,
    "asset",
    "A ranking of population density based on the 2020 Decennial Census using dasymetric population distribution methods. Areas are ranked from low to high using a logarithmic distribution based on national data.",
  ),
  rasterLayer(
    "amphibian_species",
    "Amphibian Species",
    17,
    "wildlife",
    "Sum of habitat suitable for amphibian species of conservation concern.",
  ),
  rasterLayer(
    "aquatic_invertebrate_species",
    "Aquatic Invertebrate Species",
    18,
    "wildlife",
    "Sum of habitat suitable for freshwater and marine invertebrate species of conservation concern.",
  ),
  rasterLayer(
    "bird_species",
    "Bird Species",
    19,
    "wildlife",
    "Sum of habitat suitable for bird species of conservation concern.",
  ),
  rasterLayer(
    "fish_species",
    "Fish Species",
    20,
    "wildlife",
    "Sum of habitat suitable for freshwater and marine fish species of conservation concern.",
  ),
  rasterLayer(
    "mammal_species",
    "Mammal Species",
    21,
    "wildlife",
    "Sum of habitat suitable for mammal species of conservation concern, including marine mammals.",
  ),
  rasterLayer(
    "reptile_species",
    "Reptile Species",
    22,
    "wildlife",
    "Sum of habitat suitable for reptile species of conservation concern, including sea turtles.",
  ),
  rasterLayer(
    "habitat_protected_and_managed_areas",
    "Habitat, Protected, and Managed Areas",
    23,
    "wildlife",
    "Sum of designated critical habitat, Important Bird Areas and Key Biodiversity Areas, Essential Fish Habitat, and protected and managed areas for biodiversity. High values represent areas where multiple areas overlap.",
  ),
  {
    id: "CONUS_dev_land_cover",
    layer: "Land Cover",
    label: "Land Cover",
    chartOrder: 24,
    chartLabel: "Land Cover",
    chartTipLabel: "Land Cover",
    chartInputName: groups.landcover.chartInputName,
    ChartInputLabel: groups.landcover.ChartInputLabel,
    chartCSSSelector: "landcover",
    isLegendCustom: true,
    chartCSSColor: CCAP_LEGEND,
    url: `${TILES}/land_cover.pmtiles`,
    maxzoom: 13,
    attribution: "NOAA C-CAP 2021",
    opacity: 0.75,
    description:
      "Land cover categories from the NOAA Coastal Change Analysis Program (C-CAP) Regional Land Cover 2021, clipped to the North Atlantic region. C-CAP provides nationally standardized, raster-based inventories of land cover for the coastal areas of the U.S.",
    region: REGION,
  },
];

const CCAP_KEYS = [
  "lc_background",
  "lc_unclassified",
  "lc_developed_high_intensity",
  "lc_developed_medium_intensity",
  "lc_developed_low_intensity",
  "lc_developed_open_space",
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
];

const selectorsIn = (group) =>
  layerList
    .filter((layer) => layer.chartInputName === groups[group].chartInputName)
    .map((layer) => layer.chartCSSSelector);

const summaryIndices = selectorsIn("summary");

export const continentalUSDevConfig = {
  label: continentalUSConfig.label,
  image: continentalUSConfig.image,
  regionName: REGION,
  reportEnglish: continentalUSConfig.reportEnglish,
  reportNative: continentalUSConfig.reportNative,
  dataDownload: continentalUSConfig.dataDownload,
  mapProperties: continentalUSConfig.mapProperties,
  attribution: ATTRIBUTION,
  hubsFeatureServer: continentalUSConfig.hubsFeatureServer,
  rankProperty: continentalUSConfig.rankProperty,
  chartInputs: Object.values(groups),
  layerList,
  zonalStatsKeys: [
    ...layerList.filter((layer) => layer.palette).map((layer) => layer.palette),
    ...CCAP_KEYS,
  ],
  chartValues: {
    "Summary Chart": summaryIndices,
    "Threats Inputs": selectorsIn("threat"),
    "Community Assets Inputs": selectorsIn("asset"),
    "Fish and Wildlife Inputs": selectorsIn("wildlife"),
    Landcover: ["does not matter"],
  },
  summaryIndices,
  sortIndices: {
    Name: "areaNumber",
    Opportunities: "resilience_opportunities",
    Exposure: "community_exposure_index",
    Threat: "threat_index",
    Assets: "community_asset_index",
    Wildlife: "fish_and_wildlife_index",
  },
};
