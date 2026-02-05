import { baseApi } from '../../baseApi';

export const travelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postBusPayment: builder.mutation({
      query: (data) => ({
        url: '/payment-bus-ticket',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Bus'],
    }),
  }),
});

export const { usePostBusPaymentMutation } = travelApi;
