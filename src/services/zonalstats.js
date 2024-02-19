// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { betaZonalStatsLambdaEndpoint } from "../configuration/config";

// uncomment the endpoint you want to use and comment out the other
// const endpoint = betaZonalStatsEndpoint;
const endpoint = betaZonalStatsLambdaEndpoint;
// const endpoint = prodZonalStatsEndpoint;

// Define a service using a base URL and expected endpoints
export const zonalStatsApi = createApi({
  reducerPath: "zonalStatsApi",
  baseQuery: fetchBaseQuery({ baseUrl: endpoint, timeout: 100000 }),
  endpoints: (builder) => ({
    getZonalStats: builder.query({
      query: ({ region, queryData }) => ({
        url: `/?region=${encodeURIComponent(region)}`,
        method: "POST",
        body: JSON.stringify(queryData),
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetZonalStatsQuery } = zonalStatsApi;
