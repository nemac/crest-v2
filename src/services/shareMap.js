// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// eslint-disable-next-line no-unused-vars
import {
  betaShareLinkEndpoint,
  prodShareLinkEndpoint,
} from "../configuration/config";

// uncomment the endpoint you want to use and comment out the other
const endpoint = betaShareLinkEndpoint;
// const endpoint = prodShareLinkEndpoint;

// Define a service using a base URL and expected endpoints
export const shareMapApi = createApi({
  reducerPath: "shareMapApi",
  baseQuery: fetchBaseQuery({ baseUrl: endpoint }),
  endpoints: (builder) => ({
    getShareMap: builder.query({
      query: ({ shareUrl }) => ({
        url: `?shareUrl=${encodeURIComponent(shareUrl)}`,
        method: "GET",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetShareMapQuery } = shareMapApi;
