import { CancelToken, get } from 'axios';

import { identifyConfig } from '../config/identifyConfig';

const apiEndpoint = 'https://lg0njzoglg.execute-api.us-east-1.amazonaws.com/';
const identifyPath = 'Prod/';

// https://xi4lrz17r8.execute-api.us-east-1.amazonaws.com/Prod/identify/proxy?x=1745727&y=451980

/** API Wrapper Service Class */
export class IdentifyAPI {
  constructor(url = apiEndpoint, path = identifyPath) {
    this.url = url + path;
    this.cancelToken = CancelToken.source();
  }

  async httpGet(queryString = '') {
    this.cancelToken.cancel('Cancelled Ongoing Request');
    this.cancelToken = CancelToken.source();
    const axiosConfig = {
      cancelToken: this.cancelToken.token
      // headers: {
      //   'Access-Control-Allow-Origin': '*'
      // },
    };
    const response = await get(`${this.url}${queryString}`, axiosConfig);
    return response.data;
  }

  getIdentifySummary(lat = '1745727', lng = '451980') {
    return this.httpGet(`identify?lat=${lat}&lng=${lng}`);
  }

  async getAllKingdomDetails(id) {
    return {
      kingdomSize: await this.getKingdomSize(id)
    };
  }

  static getIdentifyItem(item, value) {
    let filteredItems = [{
      layer: item,
      value: 255,
      backgroundColor: '#e9ecef',
      color: '#343A4F',
      label: 'N/A'
    }];

    const returnedFilteredItems = identifyConfig.colorLookup.filter(layer => (
      layer.layer === item && layer.value === value
    ));

    if (returnedFilteredItems !== undefined && returnedFilteredItems.length > 0) {
      filteredItems = returnedFilteredItems;
    }

    return filteredItems;
  }
}
