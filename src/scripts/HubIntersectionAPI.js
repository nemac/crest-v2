
// Use Case
//
// Normal Flow:
//  Using a supplied geojson feature, convert the geometry to Esri json and
//  send a request for an intersection query to the hubs Feature Server hosted on ArcGIS Online.
//  The response contains a list of Esri feature objects that intersect the supplied feature.
//
//  Each feature object is then transformed back into a geojson feature to match the structure
//  of a geojson feature returned from the zonal stats API (nfwf-tool-api).
//  When all features have finished processing, return an Array of processed features.
//
// Alternate Flow:
//  The request for intersection is a success, but no features are returned.
//  Return an empty Array.
//
// Alternate Flow (Errors):
//  - The geojson feature is malformed.
//  - The Feature Server returns a bad request status code (400).
//  In these cases an Error object is returned.

import config from '../config/hubIntersectionConfig';

const Terraformer = require('terraformer');
Terraformer.ArcGIS = require('terraformer-arcgis-parser');
const axios = require('axios');

// import { CancelToken, get } from 'axios';
// import L from 'leaflet';
// import * as EL from 'esri-leaflet';
//
// // import * as Terraformer from "terraformer";
// // //
// // import * as Terraformer from 'terraformer-arcgis-parser';

function transformAgolAttrs(attrs) {
  const props = { mean: {} };
  Object.keys(attrs).forEach((agolField) => {
    let fieldName;
    const val = attrs[agolField];
    if (agolField in config.fieldMaps) {
      fieldName = config.fieldMaps[agolField];
    } else {
      fieldName = agolField;
    }
    props.mean[fieldName] = val;
  });
  return props;
}

function convertAgolHubsFeature(feature) {
  const geojsonGeom = Terraformer.ArcGIS.parse(feature.geometry);
  const featureGeojson = {
    type: 'Feature',
    properties: transformAgolAttrs(feature.attributes),
    geometry: geojsonGeom
  };
  return featureGeojson;
}

export class HubIntersectionApi {
  constructor(url = config.queryUrl) {
    this.queryUrl = url;
    this.agolOutFields = config.agolOutFields;
  }

  async getIntersectedHubs(feature) {
    try {
      const esriGeom = Terraformer.ArcGIS.convert(feature.geometry);
      const esriGeomStr = JSON.stringify(esriGeom);

      const queryParams = {
        geometry: esriGeomStr,
        spatialRel: 'esriSpatialRelIntersects',
        geometryType: 'esriGeometryPolygon',
        outFields: this.agolOutFields.join(),
        f: 'json',
        inSR: 4326,
        outSR: 4326
      };

      const response = await axios.get(this.queryUrl, {
        params: queryParams
      });
      if (Object.prototype.hasOwnProperty.call(response.data, 'error')) {
        throw response.data.message;
      }
      const esriFeatures = response.data.features;
      const geojsonFeatures = esriFeatures.map(f => convertAgolHubsFeature(f));

      return geojsonFeatures;
    } catch (err) {
      return new Error(err);
    }
  }
}
