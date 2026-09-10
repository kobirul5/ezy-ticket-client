import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../config/api.config";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      // Add any global headers here if needed
      return headers;
    },
  }),
  tagTypes: ["User", "Bus", "Order", "Event"],
  endpoints: () => ({}),
});
