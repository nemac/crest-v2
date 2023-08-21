// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// eslint-disable-next-line no-unused-vars
import { betaReadGeojsonEndpoint, prodReadGeojsonEndpoint } from '../configuration/config';

// uncomment the endpoint you want to use and comment out the other
const endpoint = betaReadGeojsonEndpoint;
// const endpoint = prodReadGeojsonEndpoint;

// Define a service using a base URL and expected endpoints
export const readGeoApi = createApi({
  reducerPath: 'readGeoApi',
  baseQuery: fetchBaseQuery({ baseUrl: endpoint }),
  endpoints: (builder) => ({
    getReadGeo: builder.query({
      query: ({ region, name, fileToRead }) => ({
        url: `?region=${encodeURIComponent(region)}&name=${encodeURIComponent(name)}&fileToRead=${encodeURIComponent(fileToRead)}`,
        method: 'GET'
      })
    })
  })
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetReadGeoQuery } = readGeoApi;
