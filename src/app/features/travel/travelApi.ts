import { baseApi } from "../../baseApi";

export const travelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBusServices: builder.query({
      query: () => "/travel/bus",
      providesTags: ["Bus"],
    }),
    getBusById: builder.query({
      query: (id) => `/travel/bus/${id}`,
      providesTags: ["Bus"],
    }),
    createBusService: builder.mutation({
      query: (data) => ({
        url: "/travel/bus-create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bus"],
    }),
    updateBusService: builder.mutation({
      query: ({ id, data }) => ({
        url: `/travel/bus/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Bus"],
    }),
    deleteBusService: builder.mutation({
      query: (id) => ({
        url: `/travel/bus/${id}`,
        method: "DELETE",
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
          url: "/travel/bus-ticket",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Bus"],
    }),
    createBusTicket: builder.mutation({
      query: (data) => ({
        url: "/travel/bus-ticket",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bus"],
    }),
    createTravelLocation: builder.mutation({
      query: (data) => ({
        url: "/travel",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bus"],
    }),
  }),
});

export const {
  useGetBusServicesQuery,
  useGetBusByIdQuery,
  useCreateBusServiceMutation,
  useUpdateBusServiceMutation,
  useDeleteBusServiceMutation,
  useGetBusTicketsQuery,
  useLazyGetBusTicketsQuery,
  useCreateBusTicketMutation,
  useGetBusStandsQuery,
  useGetTravelLocationsQuery,
  useCreateTravelLocationMutation
} = travelApi;
