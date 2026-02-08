import { baseApi } from "../../baseApi";

export const travelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBusServices: builder.query({
      query: () => "/travel/services",
      providesTags: ["Bus"],
    }),
    createBusService: builder.mutation({
      query: (data) => ({
        url: "/travel/services",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bus"],
    }),
    getBusStands: builder.query({
      query: () => "/travel/stand",
      providesTags: ["Bus"],
    }),
    getTravelLocations: builder.query({
      query: () => "/travel",
      providesTags: ["Bus"],
    }),
    getBusTickets: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          Object.entries(args).forEach(([key, value]) => {
            if (value) params.append(key, value as string);
          });
        }
        return {
          url: "/travel/tickets",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Bus"],
    }),
    createBusTicket: builder.mutation({
      query: (data) => ({
        url: "/travel/tickets",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bus"],
    }),
  }),
});

export const {
  useGetBusServicesQuery,
  useCreateBusServiceMutation,
  useGetBusTicketsQuery,
  useLazyGetBusTicketsQuery,
  useCreateBusTicketMutation,
  useGetBusStandsQuery,
  useGetTravelLocationsQuery
} = travelApi;
