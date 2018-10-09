
export var mapConfig = {

  //ESRI Vector BaseMap
  ESRIVectorBasemap: {
    name: "DarkGray"
  },

  //ESRI Vector BaseMap
  ESRIBaseMapLayers: {
    basemaps:[
      {
        name: "DarkGray"
      },
      {
        name: "Imagery"
      },
      {
        name: "Topographic"
      },
      {
        name: "Streets"
      },
    ]
  },

  //tile layers (WMS)
  TMSLayers:[
    {
      id: "HubsTMS",
      layer: "Hubs TMS",
      label: "Hubs Index",
      url: "http://nfwf-tiles.s3-website-us-east-1.amazonaws.com/HubsIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 13,
      tms: false
    },
    {
      id: "ExposureTMS",
      layer: "Exposure TMS",
      label: "Exposure Index",
      url: "http://nfwf-tiles.s3-website-us-east-1.amazonaws.com/ExposureIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 13,
      tms: false
    },
    {
      id: "AssetsTMS",
      layer: "Assets TMS",
      label: "Assets Index",
      url: "http://nfwf-tiles.s3-website-us-east-1.amazonaws.com/AssetsIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 13,
      tms: false
    },
    {
      id: "ThreatsTMS",
      layer: "Threats TMS",
      label: "Threats Index",
      url: "http://nfwf-tiles.s3-website-us-east-1.amazonaws.com/ThreatsIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 13,
      tms: false
    },
    {
      id: "AquaticTMS",
      layer: "Aquatic TMS",
      label: "Aquatic Index",
      url: "http://nfwf-tiles.s3-website-us-east-1.amazonaws.com/AquaticIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 12,
      tms: false
    },
    {
      id: "TerrestrialTMS",
      layer: "Terrestrial TMS",
      label: "Terrestrial Index",
      url: "http://nfwf-tiles.s3-website-us-east-1.amazonaws.com/TerrestrialIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 12,
      tms: false
    },
    {
      id: "PopDensityTMS",
      layer: "Population Density TMS",
      label: "Population Density Index",
      url: "http://nfwf-tiles.s3-website-us-east-1.amazonaws.com/PopDensityIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 12,
      tms: false
    },
    {
      id: "SocVulnTMS",
      layer: "Social Vulnerability TMS",
      label: "Social Vulnerability Index",
      url: "http://nfwf-tiles.s3-website-us-east-1.amazonaws.com/SocVulnIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 12,
      tms: false
    },
    {
      id: "CriticalFacilitiesTMS",
      layer: "Critical Facilities TMS",
      label: "Critical Facilities Index",
      url: "http://nfwf-tiles.s3-website-us-east-1.amazonaws.com/CriticalFacilitiesIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 12,
      tms: false
    },
    {
      id: "CriticalInfrastructureTMS",
      layer: "Critical Infrastructure TMS",
      label: "Critical Infrastructure Index",
      url: "http://nfwf-tiles.s3-website-us-east-1.amazonaws.com/CriticalInfrastructureIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 12,
      tms: false
    },
    {
      id: "DraingeTMS",
      layer: "Drainge TMS",
      label: "Drainge Index",
      url: "http://nfwf-tiles.s3-website-us-east-1.amazonaws.com/DraingeIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 12,
      tms: false
    },
    {
      id: "ErosionTMS",
      layer: "Erosion TMS",
      label: "Erosion Index",
      url: "http://nfwf-tiles.s3-website-us-east-1.amazonaws.com/ErosionIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 12,
      tms: false
    },
    {
      id: "SLRTMS",
      layer: "Sea Level Rise TMS",
      label: "Sea Level Rise Index",
      url: "http://nfwf-tiles.s3-website-us-east-1.amazonaws.com/SLRIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 12,
      tms: false
    },
    {
      id: "StormSurgeTMS",
      layer: "Storm Surge TMS",
      label: "Storm Surge Index",
      url: "http://nfwf-tiles.s3-website-us-east-1.amazonaws.com/StormSurgeIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 12,
      tms: false
    },
    {
      id: "GeoStressTMS",
      layer: "Geo Stressors TMS",
      label: "Geo Stressors Index",
      url: "http://nfwf-tiles.s3-website-us-east-1.amazonaws.com/GeoStressIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 12,
      tms: false
    },
    {
      id: "SlopeTMS",
      layer: "Slope TMS",
      label: "Slope Index",
      url: "http://nfwf-tiles.s3-website-us-east-1.amazonaws.com/SlopeIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 12,
      tms: false
    },
    {
      id: "FloodProneAreasTMS",
      layer: "Flood Prone Areas TMS",
      label: "Flood Prone Areas Index",
      url: "http://nfwf-tiles.s3-website-us-east-1.amazonaws.com/FloodProneAreasIndexTiles/{z}/{x}/{y}.png",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857,
      maxNativeZoom: 12,
      tms: false
    },
  ],


  //tile layers (WMS)
  TileLayers:[
    // {
    //   id: "SA_ExposureIndex",
    //   layer: "SA_ExposureIndex",
    //   label: "Exposure Index",
    //   url: "https://gis.nemac.org/nfwf?",
    //   attribution: "NFWF 2018",
    //   format: "image/png",
    //   tileSize: 256,
    //   transparent: true,
    //   opacity: 0.75,
    //   zIndex: 9000,
    //   crs: L.CRS.EPSG3857
    // },
    // {
    //   id: "SA_AssetIndex",
    //   layer: "SA_AssetIndex",
    //   label: "Asset Index",
    //   url: "https://gis.nemac.org/nfwf?",
    //   attribution: "NFWF 2018WF",
    //   format: "image/png",
    //   tileSize: 256,
    //   transparent: true,
    //   opacity: 0.75,
    //   zIndex: 8999,
    //   crs: L.CRS.EPSG3857
    // },
    // {
    //   id: "SA_ThreatIndex",
    //   layer: "SA_ThreatIndex",
    //   label: "Threat Index",
    //   url: "https://gis.nemac.org/nfwf?",
    //   attribution: "NFWF 2018",
    //   format: "image/png",
    //   tileSize: 256,
    //   transparent: true,
    //   opacity: 0.75,
    //   zIndex: 8999,
    //   crs: L.CRS.EPSG3857
    // },
    // {
    //   id: "SA_AquaticIndex",
    //   layer: "SA_AquaticIndex",
    //   label: "Aquatic Index",
    //   url: "https://gis.nemac.org/nfwf?",
    //   attribution: "NFWF 2018",
    //   format: "image/png",
    //   tileSize: 256,
    //   transparent: true,
    //   opacity: 0.75,
    //   zIndex: 8999,
    //   crs: L.CRS.EPSG3857
    // },
    // {
    //   id: "SA_TerrestrialIndex",
    //   layer: "SA_TerrestrialIndex",
    //   label: "Terrestrial Index",
    //   url: "https://gis.nemac.org/nfwf?",
    //   attribution: "NFWF 2018",
    //   format: "image/png",
    //   tileSize: 256,
    //   transparent: true,
    //   opacity: 0.75,
    //   zIndex: 8999,
    //   crs: L.CRS.EPSG3857
    // },
    // {
    //   id: "SA_HubsPreliminary",
    //   layer: "SA_HubsPreliminary",
    //   label: "Hubs (Preliminary)",
    //   url: "https://gis.nemac.org/nfwf?",
    //   attribution: "NFWF 2018",
    //   format: "image/png",
    //   tileSize: 256,
    //   transparent: true,
    //   opacity: 0.75,
    //   zIndex: 9001,
    //   crs: L.CRS.EPSG3857
    // }

 ],

 mapDefaults: {
    center: [ 32.7765, -79.9311 ],
    zoom: 12
 },

  //leaflet optoins expand as needed
  mapOptions: {
    // center: [ 32.7765, -79.9311 ],
    zoom: 12,
    maxZoom: 16,
    minZoom: 4,
    crs: L.CRS.EPSG3857
  }


};

export default mapConfig;
