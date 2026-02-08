import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "http://localhost:5000/api/v1",
    credentials: "include", 
    prepareHeaders: (headers) => {
      // Add any global headers here if needed
      return headers;
    },
  }),
  tagTypes: ["User", "Bus", "Order"],
  endpoints: () => ({}),
});
