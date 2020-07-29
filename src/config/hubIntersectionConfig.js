// config file for search by hubs or should I do resliecen project.
//   field mappings are field in hubs data on AGOL: field it should be mapped to for chart
//   we use a filter to get region singled out
const config = [
  {
    fieldMaps: {
      exposure: 'exposure',
      asset: 'asset',
      aquatic: 'aquatic',
      terrestri: 'terrestrial',
      crit_infra: 'crit_infra',
      crit_fac: 'crit_facilities',
      pop_dens: 'pop_density',
      soc_vuln: 'social_vuln',
      drainage: 'drainage',
      erosion: 'erosion',
      geostress: 'geostress',
      floodprone: 'floodprone_areas',
      slr: 'sea_level_rise',
      slope: 'slope',
      stormsurge: 'stormsurge'
    },
    region: 'continental_us',
    queryUrl: `https://services1.arcgis.com/PwLrOgCfU0cYShcG/arcgis/rest/services/all_resiliencehubs_121818_rank_4326_zonal_stats_shift_ids_gdb/FeatureServer/0/query`,
    agolOutFields: [ 'TARGET_FID','exposure', 'asset', 'threat', 'aquatic', 'terrestri', 'hubs', 'crit_infra', 'crit_fac', 'pop_dens', 'soc_vuln', 'drainage', 'erosion', 'floodprone', 'geostress', 'slr', 'slope', 'stormsurge']
  }
  ,
  {
    fieldMaps: {
      exposure: 'exposure',
      asset: 'asset',
      marine: 'aquatic',
      terrestri: 'terrestri',
      crit_infra: 'crit_infra',
      crit_fac: 'crit_facilities',
      pop_dens: 'pop_density',
      soc_vuln: 'social_vuln',
      impermeabl: 'drainage',
      erosion: 'erosion',
      landslides: 'geostress',
      floodprone: 'floodprone_areas',
      slr: 'sea_level_rise',
      slope: 'slope',
      stormsurge: 'stormsurge',
      wildlife: 'wildlife',
      tsunami: 'tsunami'
    },
    region: 'puerto_rico',
    queryUrl: `https://services1.arcgis.com/PwLrOgCfU0cYShcG/arcgis/rest/services/Puerto_Rico_hubs_staging_072920/FeatureServer/0/query`,
    agolOutFields: [ 'TARGET_FID','exposure', 'asset', 'threat', 'marine', 'terrestri', 'hubs', 'crit_infra', 'crit_fac', 'pop_dens', 'soc_vuln', 'impermeabl', 'erosion', 'floodprone', 'landslides', 'slr', 'low_areas', 'stormsurge', 'tsunami', 'wildlife'  ]
  },
  {
    fieldMaps: {
      terrestri: 'terrestri',
      crit_fac: 'crit_facilities',
      pop_dens: 'pop_density',
      soc_vuln: 'social_vuln',
      floodprone: 'floodprone_areas',
      marine: 'aquatic',
      impermeabl: 'drainage',
      wildlife: 'wildlife',
      slr: 'slr'
    },
    region: 'us_virgin_islands',
    queryUrl: `https://services1.arcgis.com/PwLrOgCfU0cYShcG/arcgis/rest/services/USVI_hubs_staging_072920/FeatureServer/0/query`,
    agolOutFields: [ 'TARGET_FID','exposure', 'asset', 'threat', 'marine', 'terrestri', 'hubs', 'crit_infra', 'crit_fac', 'pop_dens', 'soc_vuln', 'impermeabl', 'erosion', 'floodprone', 'landslides', 'slr', 'low_areas', 'stormsurge']
  },
  {
    fieldMaps: {
      terrestri: 'terrestri',
      crit_fac: 'crit_facilities',
      pop_dens: 'pop_density',
      soc_vuln: 'social_vuln',
      floodprone: 'floodprone_areas',
      marine: 'aquatic',
      impermeabl: 'drainage',
      wildlife: 'wildlife',
      slr: 'slr'
    },
    region: 'northern_mariana_islands',
    queryUrl: `https://services1.arcgis.com/PwLrOgCfU0cYShcG/arcgis/rest/services/CNMI_hubs_staging_072920/FeatureServer/0/query`,
    agolOutFields: [ 'TARGET_FID','exposure', 'asset', 'threat', 'marine', 'terrestri', 'hubs', 'crit_infra', 'crit_fac', 'pop_dens', 'soc_vuln', 'impermeabl', 'erosion', 'floodprone', 'landslides', 'slr', 'low_areas', 'stormsurge']
  },
];

  export default config;
