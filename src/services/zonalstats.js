// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { zonalStatsEndpoint } from "../configuration/config";

// Define a service using a base URL and expected endpoints
export const zonalStatsApi = createApi({
  reducerPath: "zonalStatsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: zonalStatsEndpoint,
    timeout: 100000,
  }),
  endpoints: (builder) => ({
    getZonalStats: builder.query({
      query: ({ region, queryData, source }) => ({
        url: `/?region=${encodeURIComponent(region)}&source=${encodeURIComponent(source ?? "unknown")}`,
        method: "POST",
        body: JSON.stringify(queryData),
      }),
    }),
  }),
});

// True while any zonal statistics request is in flight; it turns false on success, failure or timeout.
export const selectZonalStatsLoading = (state) =>
  Object.values(state[zonalStatsApi.reducerPath].queries).some(
    (query) => query?.status === "pending",
  );

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetZonalStatsQuery } = zonalStatsApi;
