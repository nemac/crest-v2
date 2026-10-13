#! /usr/bin/env python
'''
Get zonal stats for features in a hube shapefile and output the results to a new shapefile.
'''

import argparse, copy, os, sys

import fiona
from fiona.crs import to_string, from_epsg, from_string
from pyproj import Transformer

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
from src import config as cfg  # noqa: E402
from src.zonal_stats import get_response  # noqa: E402
from tools.hubs_config import config  # noqa: E402

from traceback import print_tb


def transform_ring(coords, transformer):
  return [list(transformer.transform(x, y)) for x, y, *_ in coords]


def transform_geom(geom, transformer):
  if geom['type'] == 'Polygon':
    geom['coordinates'] = [transform_ring(ring, transformer) for ring in geom['coordinates']]
  elif geom['type'] == 'MultiPolygon':
    geom['coordinates'] = [[transform_ring(ring, transformer) for ring in poly] for poly in geom['coordinates']]
  else:
    raise ValueError("Geometry type must be MultiPolygon or Polygon")
  return geom


def get_stats_for(feature, region, api_config):
  id_in = config[region]['id']['in']
  ID = str(feature['properties'][id_in])
  fc = { "type": "FeatureCollection", "features": [ feature ] }
  try:
    geojson = get_response(fc, region, api_config)
    return geojson['features'][0]
  except Exception as e:
    print('Failed:', ID)
    print(e)


def getFieldMappedKey(key, region):
  field_maps = config[region]['field_maps']
  new_key = field_maps[key] if key in field_maps else key
  return new_key


def conform_feature(feature, region):
  new_feature = feature.copy()
  props = new_feature['properties']
  means = props['mean'].copy()
  props.pop('mean')
  for key in means:
    new_key = getFieldMappedKey(key, region)
    value = means[key]
    props[new_key] = value
  for key in props.copy():
    new_key = getFieldMappedKey(key, region)
    value = props[key]
    if new_key in config[region]['schema']['properties']:
      if new_key != key:
        props[new_key] = value
        props.pop(key, None)
    else:
      props.pop(new_key, None)
  return new_feature


def get_shp_out_at(shp_path, crs, region, append=False):
  if append:
    return fiona.open(shp_path, 'a')
  else:
    return fiona.open(shp_path, 'w', crs=crs, driver='ESRI Shapefile', schema=config[region]['schema'])
    #return fiona.open(shp_path, 'w', crs=crs, driver='GeoJSON', schema=config[region]['schema'])


def main(shpfile_path_in, shpfile_path_out, region, epsg, proj_string, api_config):

  with fiona.Env():
    with fiona.open(shpfile_path_in) as shpfile_read:
      id_in = config[region]['id']['in']
      id_out = config[region]['id']['out']
      crs = shpfile_read.crs
      if epsg:
        crs = from_epsg(int(epsg))
      elif proj_string:
        crs = from_string(proj_string)
      elif not epsg and not proj_string and crs == {}:
        print('Error: the shapefile is reporting an empty CRS. You\'ll need to use the --epsg flag in order to process the provided shapefile, or retool your file.')
        sys.exit()
      ids_done = []

      # TODO abstract to a function
      # Try opening in append mode first
      try:
        # Get IDs of hubs in the out file that are already done
        with fiona.open(shpfile_path_out) as shp_out_read:
          for f in shp_out_read:
            ids_done.append(f['properties'][id_out])
        shp_out = get_shp_out_at(shpfile_path_out, crs, region, True)
        print('WARNING: shapefile to write features to already exists, opening in \'append\' mode...')
      except:
        # Start getting stats for unprocessed features
        shp_out = get_shp_out_at(shpfile_path_out, crs, region)

      skipped_recently = False
      for feature in shpfile_read:
        f_id = feature['properties'][id_in]

        # Check if a feature with this ID is already in shp_out
        if f_id in ids_done:
          if not skipped_recently:
            print('Skipping some features that already exist...')
            skipped_recently = True
        else:
          # This is an unprocessed feature that is not yet in shp_out
          skipped_recently = False
          try:
            # Get a copy of the geometry so we can copy it back to the feature later
            native_geom = copy.deepcopy(feature['geometry'])
            proj_string = to_string(crs)
            transformer = Transformer.from_crs(proj_string, 'epsg:4326', always_xy=True)
            new_geom = transform_geom(copy.deepcopy(native_geom), transformer)
            feature['geometry'] = new_geom
            stats_feature = get_stats_for(feature, region, api_config)
            new_feature = conform_feature(stats_feature, region)
            new_feature['geometry'] = native_geom
            shp_out.write(new_feature)
            print('Success:', new_feature['properties'][id_out])
          except Exception as e:
            print('Failed to write', f_id)
            print(e)
            print_tb(e.__traceback__)
            


def setup_argparser():
  parser = argparse.ArgumentParser()
  parser.add_argument('shp_path_in')
  parser.add_argument('shp_path_out')
  parser.add_argument('--region', required=True)
  parser.add_argument('--epsg')
  parser.add_argument('--proj_string')
  parser.add_argument('--config', help='alternative config.yml, for example one whose VRTs point at local rasters')
  return parser


if __name__ == '__main__':
  parser = setup_argparser()
  args = parser.parse_args()
  shp_path_in = args.shp_path_in
  shp_path_out = args.shp_path_out
  region = args.region
  epsg = args.epsg
  proj_string = args.proj_string
  if epsg and proj_string:
    print('Error: you may use either --epsg or --proj_string, but not both.')
    sys.exit(1)
  main(shp_path_in, shp_path_out, region, epsg, proj_string, cfg.load_config(args.config))

