
const GDB_NAME = 'NFWF_HUBS_WITH_STATS_CONUS_01072019_gdb';
const QUERY_REQUEST_URL = `https://services1.arcgis.com/PwLrOgCfU0cYShcG/arcgis/rest/services/${GDB_NAME}/FeatureServer/0/query`;
const config = {
  fieldMaps: {
    exposure: 'ns_exposure',
    asset: 'ns_asset',
    threat: 'ns_threat',
    aquatic: 'ns_fishandwildlife',
    hubs: 'ns_hubs'
  },
  queryUrl: QUERY_REQUEST_URL,
  agolOutFields: [ 'TARGET_FID','exposure', 'asset', 'threat', 'aquatic', 'hubs']
};

export default config;
