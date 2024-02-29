// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { shareLinkReadEndpoint } from "../configuration/config";

// Define a service using a base URL and expected endpoints
export const shareMapApi = createApi({
  reducerPath: "shareMapApi",
  baseQuery: fetchBaseQuery({ baseUrl: shareLinkReadEndpoint }),
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
