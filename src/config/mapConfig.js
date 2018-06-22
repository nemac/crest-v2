
export var mapConfig = {

  //ESRI Vector BaseMap
  ESRIVectorBasemap: {
    name: "DarkGray"
  },

  //tile layers (WMS)
  TileLayers:[
    {
      id: "SA_ExposureIndex",
      layer: "SA_ExposureIndex",
      label: "Exposure Index",
      url: "https://gis.nemac.org/nfwf?",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 9000,
      crs: L.CRS.EPSG3857
    },
    {
      id: "SA_AssetIndex",
      layer: "SA_AssetIndex",
      label: "Asset Index",
      url: "https://gis.nemac.org/nfwf?",
      attribution: "NFWF 2018WF",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 8999,
      crs: L.CRS.EPSG3857
    },
    {
      id: "SA_ThreatIndex",
      layer: "SA_ThreatIndex",
      label: "Threat Index",
      url: "https://gis.nemac.org/nfwf?",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 8999,
      crs: L.CRS.EPSG3857
    },
    {
      id: "SA_AquaticIndex",
      layer: "SA_AquaticIndex",
      label: "Aquatic Index",
      url: "https://gis.nemac.org/nfwf?",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 8999,
      crs: L.CRS.EPSG3857
    },
    {
      id: "SA_TerrestrialIndex",
      layer: "SA_TerrestrialIndex",
      label: "Terrestrial Index",
      url: "https://gis.nemac.org/nfwf?",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 8999,
      crs: L.CRS.EPSG3857
    },
    {
      id: "SA_HubsPreliminary",
      layer: "SA_HubsPreliminary",
      label: "Hubs (Preliminary)",
      url: "https://gis.nemac.org/nfwf?",
      attribution: "NFWF 2018",
      format: "image/png",
      tileSize: 256,
      transparent: true,
      opacity: 0.75,
      zIndex: 8999,
      crs: L.CRS.EPSG3857
    }

 ],

  //leaflet optoins expand as needed
  mapOptions: {
    center: [ 32.7765, -79.9311 ],
    zoom: 12,
    maxZoom: 16,
    minZoom: 4,
    crs: L.CRS.EPSG3857
  }


};

export default mapConfig;
