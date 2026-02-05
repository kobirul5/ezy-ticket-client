import { baseApi } from '../../baseApi';

export const busApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBuses: builder.query({
      query: () => '/bus',
      providesTags: ['User'], // Adjust tags as needed, maybe 'Bus' tag?
    }),
  }),
});

export const { useGetBusesQuery } = busApi;
