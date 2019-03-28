
const GDB_NAME = 'NFWF_HUBS_WITH_STATS_CONUS_01072019_gdb';
const QUERY_REQUEST_URL = `https://services1.arcgis.com/PwLrOgCfU0cYShcG/arcgis/rest/services/${GDB_NAME}/FeatureServer/0/query`;
const config = {
  // fieldMaps: {
  //   terrestri: 'terrestrial',
  //   crit_fac: 'crit_facilities',
  //   pop_dens: 'pop_density',
  //   soc_vuln: 'social_vuln',
  //   floodprone: 'floodprone_areas',
  //   slr: 'sea_level_rise'
  // },
  fieldMaps: {
    exposure: 'ns_exposure',
    asset: 'ns_asset',
    threat: 'ns_threat',
    aquatic: 'ns_fishandwildlife',
    terrestri: 'terrestri',
    hubs: 'ns_hubs'
  },
  queryUrl: QUERY_REQUEST_URL,
  agolOutFields: [ 'TARGET_FID','exposure', 'asset', 'threat', 'aquatic', 'terrestri', 'hubs']
};

export default config;
