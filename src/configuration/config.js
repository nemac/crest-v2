import { americanSamoaConfig } from "./regions/american_samoa";
import { continentalUSConfig } from "./regions/continental_us";
import { guamConfig } from "./regions/guam";
import { hawaiiConfig } from "./regions/hawaii";
import { northernMarianaIslandsConfig } from "./regions/northern_mariana_islands";
import { puertoRicoConfig } from "./regions/puertoRico";
import { usVirginIslandsConfig } from "./regions/usVirginIslands";
import { alaskaConfig } from "./regions/alaska";
import { greatLakesConfig } from "./regions/greatLakes";
import { capeFearWatershedConfig } from "./targetedWatersheds/cape-fear-watershed";
import { charlestonHarborWatershedConfig } from "./targetedWatersheds/charleston-harbor-watershed";
import { delawareBayAndCoastalWatershedsConfig } from "./targetedWatersheds/delaware-bay-and-coastal-watersheds";
import { narragansettBayAndCoastalRhodeIslandWatershedsConfig } from "./targetedWatersheds/narragansett-bay-and-coastal-rhode-island-watersheds";
import { portlandAndMidcoastMaineWatershedsConfig } from "./targetedWatersheds/portland-and-midcoast-maine-watersheds";
import { sanFranciscoBayAndOuterCoastWatershedsConfig } from "./targetedWatersheds/san-francisco-bay-and-outer-coast-watersheds";
import { savannahRiverWatershedsConfig } from "./targetedWatersheds/savannah-river-watersheds";
import { jacksonvilleAndLowerStJohnsRiverWatershedsConfig } from "./targetedWatersheds/jacksonville-and-lower-st-johns-river-watersheds";

import basemapDarkImage from "../assets/images/basemap-dark.png";
import basemapImageryImage from "../assets/images/basemap-imagery.png";
import basemapStreetImage from "../assets/images/basemap-street.jpg";
import basemapTopoImage from "../assets/images/basemap-topo.jpg";

const environment = "beta"; // change to "prod" for production

export const identifyEndpoint = `https://api.resilientcoasts.org/${environment}/identify/`;

export const shareLinkReadEndpoint = `https://api.resilientcoasts.org/${environment}/read_s3`;

export const shareLinkWriteEndpoint = `https://api.resilientcoasts.org/${environment}/write_s3`;

export const uploadShapeEndpoint = `https://api.resilientcoasts.org/${environment}/upload_shape`;

export const zonalStatsEndpoint = `https://api.resilientcoasts.org/${environment}/zonal_stats`;

// this endpoint is functionally equivalent to the zonal stats but has a longer timeout
export const zonalStatsLambdaEndpoint =
  environment === "beta"
    ? "https://5pdq4jsx6i7isl3pmhf3x6ouym0zjnfb.lambda-url.us-east-1.on.aws/" // beta
    : "https://7bhdz7i43pe6fircjvkv3la6ry0tdaip.lambda-url.us-east-1.on.aws/"; // prod

export const s3ShapeFileBucket =
  "https://nfwf-tool-user-shapes.s3.amazonaws.com/";

export const sketchShapeThresholds = {
  areaThreshold: 500,
  verticeThreshold: 1000,
  maxFeatures: 40,
  maxFeaturesWarning: 10,
  maxFileSize: 10000000,
};

export const mapConfig = {
  basemaps: {
    "Dark Gray": {
      label: "Dark Gray",
      image: basemapDarkImage,
      basemap: "arcgis/dark-gray",
      worldview: "unitedStatesOfAmerica",
    },
    Imagery: {
      label: "Imagery",
      image: basemapImageryImage,
      basemap: "arcgis/imagery",
      worldview: "unitedStatesOfAmerica",
    },
    "Imagery - No Label": {
      label: "Imagery - No Label",
      image: basemapImageryImage,
      basemap: "arcgis/imagery/standard",
    },
    Streets: {
      label: "Streets",
      image: basemapStreetImage,
      basemap: "arcgis/streets",
      worldview: "unitedStatesOfAmerica",
    },
    Topographic: {
      label: "Topographic",
      image: basemapTopoImage,
      basemap: "arcgis/topographic",
      worldview: "unitedStatesOfAmerica",
    },
  },
  regions: {
    Alaska: alaskaConfig,
    "American Samoa": americanSamoaConfig,
    "Atlantic, Gulf of America, and Pacific Coasts": continentalUSConfig,

    Guam: guamConfig,
    "Hawai'i": hawaiiConfig,
    "Northern Mariana Islands": northernMarianaIslandsConfig,
    "Puerto Rico": puertoRicoConfig,
    "U.S. Great Lakes": greatLakesConfig,
    "US Virgin Islands": usVirginIslandsConfig,
  },
  targetedWatersheds: {
    "Cape Fear Watershed": capeFearWatershedConfig,
    "Charleston Harbor Watershed": charlestonHarborWatershedConfig,
    "Delaware Bay and Coastal Watersheds":
      delawareBayAndCoastalWatershedsConfig,
    "Narragansett Bay and Coastal Rhode Island Watersheds":
      narragansettBayAndCoastalRhodeIslandWatershedsConfig,
    "Portland and Midcoast Maine Watersheds":
      portlandAndMidcoastMaineWatershedsConfig,
    "San Francisco Bay and Outer Coast Watersheds":
      sanFranciscoBayAndOuterCoastWatershedsConfig,
    "Savannah River Watersheds": savannahRiverWatershedsConfig,
    "Jacksonville and Lower St. Johns River Watersheds":
      jacksonvilleAndLowerStJohnsRiverWatershedsConfig,
  },
  // Can delete
  resiliencePieChartLegend: [
    "#ffc500",
    "#f9b500",
    "#f3a400",
    "#ed9400",
    "#e78300",
    "#e07000",
    "#d95e00",
    "#d14c00",
    "#ca3600",
    "#c21500",
  ],
  // Can delete
  landcoverPieChartLegend: [
    "#000000",
    "#5475A8",
    "#FFFFFF",
    "#E8D1D1",
    "#E29E8C",
    "#ff0000",
    "#B50000",
    "#D2CDC0",
    "#85C77E",
    "#38814E",
    "#D4E7B0",
    "#AF963C",
    "#DCCA8F",
    "#FDE9AA",
    "#D1D182",
    "#A3CC51",
    "#82BA9E",
    "#FBF65D",
    "#CA9146",
    "#C8E6F8",
    "#64B3D5",
  ],
  // Can delete
  nlcdLandcoverPieChartLegend: [
    "#000000",
    "#5475A8",
    "#FFFFFF",
    "#E8D1D1",
    "#E29E8C",
    "#ff0000",
    "#B50000",
    "#D2CDC0",
    "#85C77E",
    "#38814E",
    "#D4E7B0",
    "#AF963C",
    "#DCCA8F",
    "#FDE9AA",
    "#D1D182",
    "#A3CC51",
    "#82BA9E",
    "#FBF65D",
    "#CA9146",
    "#C8E6F8",
    "#64B3D5",
  ],
  nlcdLandcover: [
    { name: "No Data", value: "lc_no_data", color: "#000000" },
    { name: "Open Water", value: "lc_open_water", color: "#5475A8" },
    {
      name: "Perennial Ice/Snow",
      value: "lc_perennial_icesnow",
      color: "#FFFFFF",
    },
    {
      name: "Developed, Open Space",
      value: "lc_developed_open_space",
      color: "#E8D1D1",
    },
    {
      name: "Developed, Low Intensity",
      value: "lc_developed_low_intensity",
      color: "#E29E8C",
    },
    {
      name: "Developed, Medium Intensity",
      value: "lc_developed_medium_intensity",
      color: "#ff0000",
    },
    {
      name: "Developed High Intensity",
      value: "lc_developed_high_intensity",
      color: "#B50000",
    },
    {
      name: "Barren Land (Rock/Sand/Clay)",
      value: "lc_barren_land",
      color: "#D2CDC0",
    },
    {
      name: "Deciduous Forest",
      value: "lc_deciduous_forest",
      color: "#85C77E",
    },
    {
      name: "Evergreen Forest",
      value: "lc_evergreen_forest",
      color: "#38814E",
    },
    { name: "Mixed Forest", value: "lc_mixed_forest", color: "#D4E7B0" },
    { name: "Dwarf Scrub", value: "lc_dwarf_scrub", color: "#AF963C" },
    { name: "Shrub/Scrub", value: "lc_shrub_scrub", color: "#DCCA8F" },
    {
      name: "Grassland/Herbaceous",
      value: "lc_grassland_herbaceous",
      color: "#FDE9AA",
    },
    {
      name: "Sedge/Herbaceous",
      value: "lc_sedge_herbaceous",
      color: "#D1D182",
    },
    { name: "Lichens", value: "lc_lichens", color: "#A3CC51" },
    { name: "Moss", value: "lc_moss", color: "#82BA9E" },
    { name: "Pasture/Hay", value: "lc_pasture_hay_areas", color: "#FBF65D" },
    {
      name: "Cultivated Crops",
      value: "lc_cultivated_crops",
      color: "#CA9146",
    },
    { name: "Woody Wetlands", value: "lc_woody_wetlands", color: "#C8E6F8" },
    {
      name: "Emergent Herbaceous Wetlands",
      value: "lc_emerg_herbaceous_wetlands",
      color: "#64B3D5",
    },
  ],
  // Can delete
  ccapLandcoverPiechartLegend: [
    "#000000",
    "#F2F2F2",
    "#AA9EAA",
    "#917782",
    "#C1CC3D",
    "#592300",
    "#C1A351",
    "#F2BC8C",
    "#00F200",
    "#003D00",
    "#0AA33D",
    "#707000",
    "#006060",
    "#F27000",
    "#F200F2",
    "#3C003C",
    "#6D006D",
    "#B200B2",
    "#00F2F2",
    "#F2F200",
    "#000070",
    "#0000ED",
    "#666FDB",
    "#F9D100",
    "#AAF9EF",
  ],
  ccapLandcover: [
    { name: "No Data", value: "lc_no_data", color: "#000000" },
    {
      name: "Developed, High Intensity",
      value: "lc_developed_high_intensity",
      color: "#F2F2F2",
    },
    {
      name: "Developed, Medium Intensity",
      value: "lc_developed_medium_intensity",
      color: "#AA9EAA",
    },
    {
      name: "Developed, Low Intensity",
      value: "lc_developed_low_intensity",
      color: "#917782",
    },
    {
      name: "Developed, Open Space",
      value: "lc_developed_open space",
      color: "#C1CC3D",
    },
    {
      name: "Cultivated Crops",
      value: "lc_cultivated_crops",
      color: "#592300",
    },
    { name: "Pasture/Hay", value: "lc_pasture_hay", color: "#C1A351" },
    {
      name: "Grassland/Herbaceous",
      value: "lc_grassland_herbaceous",
      color: "#F2BC8C",
    },
    {
      name: "Deciduous Forest",
      value: "lc_deciduous_forest",
      color: "#00F200",
    },
    {
      name: "Evergreen Forest",
      value: "lc_evergreen_forest",
      color: "#003D00",
    },
    { name: "Mixed Forest", value: "lc_mixed_forest", color: "#0AA33D" },
    { name: "Scrub/Shrub", value: "lc_scrub_shrub", color: "#707000" },
    {
      name: "Palustrine Forested Wetland",
      value: "lc_palus_forested_wetland",
      color: "#006060",
    },
    {
      name: "Palustrine Scrub/Shrub Wetland",
      value: "lc_palus_scrub_shrub_wetland",
      color: "#F27000",
    },
    {
      name: "Palustrine Emergent Wetland",
      value: "lc_palus_emergent_wetland",
      color: "#F200F2",
    },
    {
      name: "Estuarine Forested Wetland",
      value: "lc_estuar_forested_wetland",
      color: "#3C003C",
    },
    {
      name: "Estuarine Scrub/Shrub Wetland",
      value: "lc_estuar_scrub_shrub_wetland",
      color: "#6D006D",
    },
    {
      name: "Estuarine Emergent Wetland",
      value: "lc_estuar_emergent_wetland",
      color: "#B200B2",
    },
    {
      name: "Unconsolidated Shore",
      value: "lc_unconsolidated_shore",
      color: "#00F2F2",
    },
    { name: "Bare Land", value: "lc_bare_land", color: "#F2F200" },
    { name: "Open Water", value: "lc_open_water", color: "#000070" },
    {
      name: "Palustrine Aquatic Bed",
      value: "lc_palustrine_aquatic_bed",
      color: "#0000ED",
    },
    {
      name: "Estuarine Aquatic Bed",
      value: "lc_estuarine_aquatic_bed",
      color: "#666FDB",
    },
    { name: "Tundra", value: "lc_tundra", color: "#F9D100" },
    { name: "Snow/Ice", value: "lc_snow_ice", color: "#AAF9EF" },
  ],
  examplePolygonFeature: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [],
    },
    properties: {
      areaname: null,
      buffer: true,
      leafletId: null, // this is the leaflet id of just the drawn layer
      zonalStatsData: {},
    },
  },

  examples: [
    {
      title: "Atlantic City, New Jersey",
      summaryText: `Because of Hurricane Sandy's size and strength, this devastating 2012 storm
      informed specific datasets to include in the regional coastal assessment. Of particular 
      importance was the transportation infrastructure used in the Critical Infrastructure input.`,
      geojson: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              areaName: "White Horse Pike",
              region: "Atlantic, Gulf of America, and Pacific Coasts",
              zonalStatsData: {
                exposure: 8.095615479621243,
                asset: 2.0521819678880195,
                threat: 7.358480856319473,
                aquatic: 5,
                terrestrial: 2,
                hubs: 6.156908665105386,
                crit_infra: 0.2006998764923837,
                crit_facilities: 0,
                pop_density: 0.5652531906134212,
                social_vuln: 0.2862289007822149,
                drainage: 3.3779333058871965,
                erosion: 0.540654590366406,
                floodprone_areas: 1.915500205846027,
                geostress: 0,
                ea_level_rise: 3.8905928365582545,
                slope: 3.3070193495265543,
                storm_surge: 3.163030053519967,
              },
            },
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [-74.47557058418107, 39.41830265237318],
                  [-74.47700058418107, 39.39903754258014],
                  [-74.47724908482222, 39.39776684356539],
                  [-74.47779644509973, 39.39655329621017],
                  [-74.47862390521031, 39.395438496721845],
                  [-74.47970310542537, 39.39446065846312],
                  [-74.48099705807047, 39.3936533014976],
                  [-74.48246141521226, 39.39304410288033],
                  [-74.48404598860533, 39.39265394721612],
                  [-74.48569646980535, 39.39249621014238],
                  [-74.49601446980535, 39.39225418607139],
                  [-74.49777776059312, 39.39234725278965],
                  [-74.49948334562039, 39.392705323138024],
                  [-74.50106520350077, 39.39331453267124],
                  [-74.50246210219443, 39.394151293345914],
                  [-74.50361996923539, 39.39518320753751],
                  [-74.50449398481923, 39.39637032326916],
                  [-74.50505031673028, 39.397666681886854],
                  [-74.50526742995064, 39.399022098091955],
                  [-74.50587542995063, 39.41809714483567],
                  [-74.50574994452012, 39.41943627406887],
                  [-74.50529300956359, 39.420731649089255],
                  [-74.50452172861841, 39.42193478644227],
                  [-74.50346497151017, 39.423000657347465],
                  [-74.50216229372585, 39.42388937230102],
                  [-74.50066245581196, 39.42456767312385],
                  [-74.499021598218, 39.42501017676316],
                  [-74.49730113990267, 39.42520032445151],
                  [-74.4849451399027, 39.42563228148638],
                  [-74.48327926530045, 39.425570809131806],
                  [-74.48165681132639, 39.42527252423086],
                  [-74.48013370084328, 39.424747705148846],
                  [-74.47876243253518, 39.42401443653142],
                  [-74.47759027137886, 39.423097986625656],
                  [-74.47665761951119, 39.42202993716735],
                  [-74.47599662364529, 39.42084709571155],
                  [-74.47563006703518, 39.41959022777433],
                  [-74.47557058418107, 39.41830265237318],
                ],
              ],
            },
          },
        ],
      },
      steps: [
        {
          title: "Start",
          text: "Explore the Atlantic City case study",
        },
        {
          title: "Location",
          text: "U.S. Route 30 (White Horse Pike) is one of the main entry points into Atlantic City, NJ.",
        },
        {
          title: "Critical Infrastructure",
          text: `White Horse Pike appears in the Critical Infrastructure input as 
          both a major road and an evacuation route, giving it a value of 2.`,
          layerIndex: 10, // do not love this but it is easy way to dig into the layer to toggle
        },
        {
          title: "Storm Surge",
          text: `White Horse Pike could be inundated under storm surge scenarios 
          with conditions as low as Category 1 storms.`,
          layerIndex: 14, // do not love this but it is easy way to dig into the layer to toggle
        },
        {
          title: "Community Exposure Index",
          text: `White Horse Pike is highly exposed, suggesting that it is impacted 
          by several inputs in the Threat Index.`,
          layerIndex: 1, // do not love this but it is easy way to dig into the layer to toggle
        },
        {
          title: "Aquatic Index",
          text: `This area has a very high value in the Aquatic Index. All together, 
          this area scores very high in wildlife habitat suitability and species presence.`,
          layerIndex: 5, // do not love this but it is easy way to dig into the layer to toggle
        },
        {
          title: "Resilience Hubs",
          text: `Within the area around the Pike, there are three areas that are highly ranked as hubs. 
          Higher rank values help place projects where there are greater dual benefits for both human and wildlife communities.`,
          layerIndex: 0, // do not love this but it is easy way to dig into the layer to toggle
        },
      ],
      mapCoordinates: [39.40713376792768, -74.48786981846509],
      polygonLabel: "White Horse Pike",
      polygonCenter: [39.409169, -74.490893],
      zoom: 12,
    },
    {
      title: "Buffalo Bayou, Houston, Texas",
      summaryText: `Hurricane Harvey brought catastrophic rainfall to the Houston area in 2017. 
      This case study incorporates inputs that can help planners improve community resilience around urban waterways.`,
      geojson: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              areaName: "Buffalo Bayou",
              region: "Atlantic, Gulf of America, and Pacific Coasts",
              zonalStatsData: {
                exposure: 9.513333333333334,
                asset: 3.981333333333333,
                threat: 5.734666666666667,
                aquatic: 1,
                terrestrial: 0,
                hubs: "NaN",
                crit_infra: 0.504,
                crit_facilities: 0,
                pop_density: 2.477333333333333,
                social_vuln: 0,
                drainage: 2.656,
                erosion: 0,
                floodprone_areas: 4.534666666666666,
                geostress: 1.264,
                sea_level_rise: 0.28933333333333333,
                slope: 0.09733333333333333,
                storm_surge: 2.132,
              },
            },
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [-95.408742, 29.761644999999984],
                  [-95.40675300000001, 29.76175899999999],
                  [-95.40299, 29.762002999999975],
                  [-95.40166400000001, 29.762725999999983],
                  [-95.39851699999998, 29.76415299999999],
                  [-95.396246, 29.76411099999999],
                  [-95.394119, 29.763626999999996],
                  [-95.391063, 29.762975000000015],
                  [-95.387199, 29.762126999999996],
                  [-95.384741, 29.761892999999997],
                  [-95.381154, 29.762888],
                  [-95.378604, 29.763503000000014],
                  [-95.375735, 29.763629999999996],
                  [-95.37564300000001, 29.760373000000005],
                  [-95.377284, 29.760318000000005],
                  [-95.379372, 29.761206000000016],
                  [-95.38363400000001, 29.76145599999999],
                  [-95.38782200000001, 29.761022999999994],
                  [-95.38895900000001, 29.760728999999976],
                  [-95.39125400000002, 29.761773999999985],
                  [-95.392347, 29.761822999999975],
                  [-95.39457800000001, 29.761289],
                  [-95.39674900000001, 29.76190599999997],
                  [-95.399449, 29.761254999999995],
                  [-95.401268, 29.760956999999987],
                  [-95.402459, 29.759378999999992],
                  [-95.403888, 29.759260999999984],
                  [-95.405603, 29.76000100000001],
                  [-95.407201, 29.760273000000005],
                  [-95.408497, 29.759749999999997],
                  [-95.408742, 29.761644999999984],
                ],
              ],
            },
          },
        ],
      },
      steps: [
        {
          title: "Start",
          text: "Explore the Buffalo Bayou case study.",
        },
        {
          title: "Location",
          text: `Buffalo Bayou, a slow-moving river that flows through Houston, Texas, 
          is surrounded by parks and established neighborhoods. Buffalo Bayou Park is outlined here.`,
        },
        {
          title: "Population Density",
          text: `The Population Density input helps identify the most densely populated 
          census blocks in the neighborhoods around the Park.`,
          layerIndex: 7, // do not love this but it is easy way to dig into the layer to toggle
        },
        {
          title: "Flood-Prone Areas",
          text: `This input shows flood-prone areas identified by FEMA and soils outside of those 
          zones with the potential for flooding. The majority of the area identified here is part of the Park.`,
          layerIndex: 17, // do not love this but it is easy way to dig into the layer to toggle
        },
        {
          title: "Community Exposure Index",
          text: `Buffalo Bayou is highly exposed, suggesting that it is impacted 
          by many other inputs in the Threat Index.`,
          layerIndex: 1, // do not love this but it is easy way to dig into the layer to toggle
        },
        {
          title: "Aquatic Index",
          text: `The area surrounding Buffalo Bayou Park is low on the Aquatic Index, suggesting that 
          this area is not a very suitable habitat for at-risk species. However, some species may be found here.`,
          layerIndex: 5, // do not love this but it is easy way to dig into the layer to toggle
        },
        {
          title: "Resilience Hubs",
          text: `Within the area around the Pike, there are three areas that are highly ranked as hubs. 
          Higher rank values help place projects where there are greater dual benefits for both human and wildlife communities.`,
          layerIndex: 0, // do not love this but it is easy way to dig into the layer to toggle
        },
      ],
      mapCoordinates: [29.76, -95.37],
      polygonLabel: "Buffalo Bayou",
      polygonCenter: [29.761922, -95.392616],
      zoom: 13,
    },
    {
      title: "Wilmington, NC",
      summaryText: `Hurricane Florence was a slow-moving storm in 2018 that produced extensive flooding throughout coastal North Carolina. 
      Most notably, for a time the city of Wilmington was essentially cut off from the rest of the state as a result of storm-related flooding.`,
      geojson: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              areaName: "Water Street",
              region: "Atlantic, Gulf of America, and Pacific Coasts",
              zonalStatsData: {
                exposure: 8.430505117200395,
                asset: 2.693298118190822,
                threat: 5.925387916804226,
                aquatic: 4,
                terrestrial: 3.3486299108616704,
                hubs: 1,
                crit_infra: 0.2119511389897656,
                crit_facilities: 0.16011885110597557,
                pop_density: 1.2677451304060745,
                social_vuln: 0.05348299768900627,
                drainage: 3.046880158468141,
                erosion: 1.3367448002641136,
                floodprone_areas: 2.086167051832288,
                geostress: 0,
                sea_level_rise: 2.3337735226147243,
                slope: 1.8689336414658304,
                storm_surge: 1.7959722680752723,
              },
            },
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [-77.94021188650011, 34.24096756878416],
                  [-77.9399758865001, 34.23937958586665],
                  [-77.93992651881474, 34.23800840853208],
                  [-77.94018305935336, 34.23665309545862],
                  [-77.94073675478094, 34.235359892699115],
                  [-77.94156871263856, 34.23417292903386],
                  [-77.94265054596681, 34.23313270974793],
                  [-77.94394534188781, 34.23227473384791],
                  [-77.94540892109734, 34.23162828199646],
                  [-77.94699134529233, 34.23121541663126],
                  [-77.94871234529234, 34.230907390078],
                  [-77.95038711608697, 34.23074159472215],
                  [-77.95206985068849, 34.230837566954776],
                  [-77.9537012222808, 34.231191922281575],
                  [-77.95522371491201, 34.23179216433716],
                  [-77.95658365128791, 34.23261712589893],
                  [-77.95773308522902, 34.23363771585787],
                  [-77.95863149207035, 34.234817945713516],
                  [-77.95924719740681, 34.236116199283835],
                  [-77.95955849381215, 34.23748670073992],
                  [-77.95975549381217, 34.23925971504624],
                  [-77.95974351610148, 34.240718597032206],
                  [-77.95938675857394, 34.24214736664929],
                  [-77.95869898991745, 34.24349088490917],
                  [-77.95770675385215, 34.244697305367445],
                  [-77.95644834470305, 34.245720074280335],
                  [-77.95497232947005, 34.246519726257695],
                  [-77.95333567343494, 34.247065406269954],
                  [-77.95160154164509, 34.24733605943985],
                  [-77.94991954164509, 34.24745904863081],
                  [-77.94819660696687, 34.247447910826295],
                  [-77.94650793640945, 34.24716507131159],
                  [-77.94491565284653, 34.24662093254308],
                  [-77.94347833326373, 34.245835507503166],
                  [-77.94224885382606, 34.244837684164075],
                  [-77.94127244466773, 34.24366416367059],
                  [-77.94058502596434, 34.24235811117099],
                  [-77.94021188650011, 34.24096756878416],
                ],
              ],
            },
          },
        ],
      },
      steps: [
        {
          title: "Start",
          text: "Explore the Wilmington case study.",
        },
        {
          title: "Location",
          text: "Water Street is in Wilmington’s historic riverfront area, located on the Cape Fear River.",
        },
        {
          title: "Population Density",
          text: `In addition to restaurants, shops, and bed and breakfasts, this area is home to many full-time residents. 
          This input suggests the majority of the area is low density with a few neighboring areas of moderate density.`,
          layerIndex: 7, // do not love this but it is easy way to dig into the layer to toggle
        },
        {
          title: "Storm Surge",
          text: `Storm surge data from the National Hurricane Center suggests that this area of Water Street could be inundated 
          by storms that are rated as Categories 1-5. It is important to visualize this threat in low-lying coastal areas.`,
          layerIndex: 14, // do not love this but it is easy way to dig into the layer to toggle
        },
        {
          title: "Community Exposure Index",
          text: `As a result of the combination of assets and threats, this particular area of Water Street, 
          housing the iconic J.W. Brooks building, is calculated as having high exposure in this assessment.`,
          layerIndex: 1, // do not love this but it is easy way to dig into the layer to toggle
        },
        {
          title: "Terrestrial Index",
          text: `This area of Water Street has a high value in the Terrestrial Index. 
          All together, this area scores very high in habitat suitability and species presence.`,
          layerIndex: 6, // do not love this but it is easy way to dig into the layer to toggle
        },
        {
          title: "Resilience Hubs",
          text: `There are no Hubs inside the area drawn on the map; however, some exist nearby. 
          The lack of Hubs is likely a result of the open space selection process that determines suitability. 
          It is uncommon for Hubs to be located in urban areas because of the size threshold applied during this process.`,
          layerIndex: 0, // do not love this but it is easy way to dig into the layer to toggle
        },
      ],
      mapCoordinates: [34.239146, -77.949891],
      polygonLabel: "Water Street",
      polygonCenter: [34.239146, -77.949891],
      zoom: 13,
    },
  ],
};
