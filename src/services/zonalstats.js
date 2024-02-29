// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { zonalStatsLambdaEndpoint } from "../configuration/config";

// Define a service using a base URL and expected endpoints
export const zonalStatsApi = createApi({
  reducerPath: "zonalStatsApi",
  baseQuery: fetchBaseQuery({ baseUrl: zonalStatsLambdaEndpoint, timeout: 100000 }),
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
