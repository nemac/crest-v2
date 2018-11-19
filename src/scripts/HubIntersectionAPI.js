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

import { CancelToken, get } from 'axios';
import L from 'leaflet';
import * as EL from 'esri-leaflet';

// import * as Terraformer from "terraformer";
// //
// import * as Terraformer from 'terraformer-arcgis-parser';
//
// const Terraformer = require('terraformer');
// TerraformerArcGIS = require('terraformer-arcgis-parser');
// const axios = require('axios');

function transformAgolAttrs(attrs) {
  const props = { mean: {} };
  Object.keys(attrs).forEach((agolField) => {
    let fieldName;
    const val = attrs[agolField];
    // console.log(agolField, val)
    if (agolField in config.fieldMaps) {
      fieldName = config.fieldMaps[agolField];
    } else {
      fieldName = agolField;
    }
    props.mean[fieldName] = val;
  });
  return props;
  // console.log('transformAgolAttrs',props.mean)
}


function convertAgolHubsFeature(feature) {
  const geojsonGeom = EL.Util.arcgisToGeoJSON(feature.geometry);  //TerraformerArcGIS.parse(feature.geometry);
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
    // console.log(this.queryUrl, this.agolOutFields)
  }

  async getIntersectedHubs(feature) {
    // try {
      // console.log('getIntersectedHubs1',feature.geometry)
      const esriGeom = EL.Util.geojsonToArcGIS(feature) //TerraformerArcGIS.convert(feature.geometry);
      // console.log('getIntersectedHubs2', esriGeom)
      const esriGeomStr = JSON.stringify(esriGeom.geometry);
      // console.log('getIntersectedHubs3')
      // console.log(esriGeom, esriGeomStr)
      const queryParams = {
        geometry: esriGeomStr,
        spatialRel: 'esriSpatialRelIntersects',
        geometryType: 'esriGeometryPolygon',
        outFields: this.agolOutFields.join(),
        f: 'json',
        inSR: 4326,
        outSR: 4326
      };

      // console.log(JSON.stringify(esriGeom.geometry), queryParams);

      const response = await get(this.queryUrl, {
        params: queryParams
      });

      // console.log(response);


      if (Object.prototype.hasOwnProperty.call(response.data, 'error')) {
        throw response.data.message;
      }

      const esriFeatures = response.data.features;
      console.log('esriFeatures',esriFeatures);

      const geojsonFeatures = esriFeatures.map(f => convertAgolHubsFeature(f));

      console.log('geojsonFeatures',geojsonFeatures);

      return geojsonFeatures;
    // } catch (err) {
      // return new Error(err);
    // }
  }
}
