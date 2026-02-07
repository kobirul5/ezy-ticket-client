import { baseApi } from "../../baseApi";

export const travelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBuses: builder.query({
      query: () => "/bus",
      providesTags: ["Bus"],
    }),
    postBusPayment: builder.mutation({
      query: (data) => ({
        url: "/payment-bus-ticket",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bus"],
    }),
  }),
});

export const { useGetBusesQuery, usePostBusPaymentMutation } = travelApi;
