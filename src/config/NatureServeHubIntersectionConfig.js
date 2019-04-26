
const GDB_NAME = 'NATURESERVE_HUBS_STATS_04252019';
const QUERY_REQUEST_URL = `https://services1.arcgis.com/PwLrOgCfU0cYShcG/arcgis/rest/services/${GDB_NAME}/FeatureServer/0/query`;
const config = {
  fieldMaps: {
    exposure: 'ns_exposure',
    asset: 'ns_asset',
    threat: 'ns_threat',
    fishwild: 'ns_fishandwildlife',
    hub_rnk: 'ns_hubs'
  },
  queryUrl: QUERY_REQUEST_URL,
  agolOutFields: [ 'TARGET_FID','exposure', 'asset', 'threat', 'fishwild', 'hub_rnk']
};

export default config;
