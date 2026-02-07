import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:3000",
    prepareHeaders: (headers) => {
      // Add any global headers here if needed
      return headers;
    },
  }),
  tagTypes: ["User", "Bus"],
  endpoints: () => ({}),
});
