import { CancelToken, get } from 'axios';


const apiEndpoint = 'https://s3.amazonaws.com/nfwf-tool-user-shapes/08-2018-projects/';

const testGeojsonFile = 'projected_4326_62155.geojson';


/** API Wrapper Service Class
* this wrapps the call to a s3 bucket for save geojson into local storage
* TODO add support github gist
*/
export class StoreShapesAPI {
  constructor(url = apiEndpoint) {
    this.url = url;
    this.cancelToken = CancelToken.source();
  }

  async httpGet(queryString = '') {
    this.cancelToken.cancel('Cancelled Ongoing Request');
    this.cancelToken = CancelToken.source();
    const axiosConfig = {
      cancelToken: this.cancelToken.token,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };

    try {
      const response = await get(`${this.url}${queryString}`, axiosConfig);
      return response.data;
    } catch (err) {
      return {};
    }
  }

  // get geojson from s3 bucket
  getSavedGeoJSON(GeojsonFile = testGeojsonFile) {
    return this.httpGet(GeojsonFile);
  }
}
