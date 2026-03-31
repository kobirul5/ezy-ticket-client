import { baseApi } from "../../baseApi";

export const eventApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Create a new event with image upload (FormData)
        createEvent: builder.mutation({
            query: (formData) => ({
                url: "/events",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Event"], // Adjust tag types as necessary
        }),

        // Get all events
        getAllEvents: builder.query({
            query: (params) => ({
                url: "/events",
                method: "GET",
                params,
            }),
            providesTags: (result) =>
                result?.data
                    ? [
                        ...result.data.map(({ id }: { id: number }) => ({ type: "Event" as const, id })),
                        { type: "Event", id: "LIST" },
                    ]
                    : [{ type: "Event", id: "LIST" }],
        }),

        // Get current user's added events
        getMyEvents: builder.query({
            query: (email) => ({
                url: `/events/my-added-events/${email}`,
                method: "GET",
            }),
            providesTags: ["Event"],
        }),

        // Get single event
        getSingleEvent: builder.query({
            query: (id) => ({
                url: `/events/${id}`,
                method: "GET",
            }),
            providesTags: ["Event"],
        }),

        // Update an event (FormData supported)
        updateEvent: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/events/${id}`,
                method: "PATCH",
                body: formData,
            }),
            invalidatesTags: ["Event"],
        }),

        // Delete an event
        deleteEvent: builder.mutation({
            query: (id) => ({
                url: `/events/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Event"],
        }),

        // Verify/Reject an event (admin only)
        verifyEvent: builder.mutation({
            query: ({ id, status }) => ({
                url: `/verifyEvent/${id}`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: ["Event"],
        }),
    }),
});

export const {
    useCreateEventMutation,
    useGetAllEventsQuery,
    useGetMyEventsQuery,
    useGetSingleEventQuery,
    useUpdateEventMutation,
    useDeleteEventMutation,
    useVerifyEventMutation,
} = eventApi;
