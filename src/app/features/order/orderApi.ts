import { baseApi } from "../../baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/orders/create-payment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"], // Assuming Order tag exists or will be added
    }),
    getAllOrders: builder.query({
      query: () => "/orders",
      providesTags: ["Order"],
    }),
  }),
});

export const { useCreateOrderMutation, useGetAllOrdersQuery } = orderApi;
