import { CancelToken, get } from 'axios';

const api_url = 'https://3kmdsrwopk.execute-api.us-east-1.amazonaws.com/';
const indentify_path = 'Prod/';

//https://xi4lrz17r8.execute-api.us-east-1.amazonaws.com/Prod/identify/proxy?x=1745727&y=451980

/** API Wrapper Service Class */
export class IndentifyAPI {


  constructor (url = api_url, path = indentify_path) {
    this.url = url + indentify_path;
    this.cancelToken = CancelToken.source();
  }

  async httpGet (queryString = '') {
    this.cancelToken.cancel('Cancelled Ongoing Request');
    this.cancelToken = CancelToken.source();
    const axiosConfig = {
      cancelToken: this.cancelToken.token,
      // headers: {
      //   'Access-Control-Allow-Origin': '*'
      // },
    }
    const response = await get(`${this.url}${queryString}`, axiosConfig);
    return response.data
  }

  getIndentifySummary (x = '1745727', y ='451980') {
    console.log(`identify/proxy?x=${x}&y=${y}`)
    return this.httpGet(`identify/proxy?x=${x}&y=${y}`);
  }


  async getAllKingdomDetails (id) {
    return {
      kingdomSize: await this.getKingdomSize(id)
    }
  }
}
