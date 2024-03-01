// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { identifyEndpoint } from "../configuration/config";

// Define a service using a base URL and expected endpoints
export const identifyApi = createApi({
  reducerPath: "identifyApi",
  baseQuery: fetchBaseQuery({ baseUrl: identifyEndpoint }),
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
