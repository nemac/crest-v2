// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// eslint-disable-next-line no-unused-vars
import {
  betaIdentifyEndpoint,
  prodIdentifyEndpoint,
} from "../configuration/config";

// uncomment the endpoint you want to use and comment out the other
const endpoint = betaIdentifyEndpoint;
// const endpoint = prodIdentifyEndpoint;

// Define a service using a base URL and expected endpoints
export const identifyApi = createApi({
  reducerPath: "identifyApi",
  baseQuery: fetchBaseQuery({ baseUrl: endpoint }),
  endpoints: (builder) => ({
    getIdentify: builder.query({
      query: ({ region, coordinates }) => ({
        url: `?lat=${coordinates.lat}&lng=${coordinates.lng}&region=${encodeURIComponent(region)}`,
        method: "GET",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetIdentifyQuery } = identifyApi;
