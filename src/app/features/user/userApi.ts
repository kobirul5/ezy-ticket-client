import { baseApi } from "../../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get current user's profile (requires authentication)
    getMyProfile: builder.query({
      query: () => "/user/profile",
      providesTags: ["User"],
    }),

    // Update current user's profile (requires authentication, supports file upload)
    updateProfile: builder.mutation({
      query: (formData) => ({
        url: "/user/update-profile",
        method: "PUT",
        body: formData, // FormData object with user data and optional image file
      }),
      invalidatesTags: ["User"],
    }),

    // Change user role (requires authentication)
    changeUserRole: builder.mutation({
      query: (data) => ({
        url: "/user/role-change",
        method: "PUT",
        body: data, // { role: string }
      }),
      invalidatesTags: ["User"],
    }),

    // Get all users with pagination and search (admin only)
    getAllUsers: builder.query({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.append("page", params.page.toString());
        if (params?.limit) searchParams.append("limit", params.limit.toString());
        if (params?.searchTerm) searchParams.append("searchTerm", params.searchTerm);
        if (params?.sortBy) searchParams.append("sortBy", params.sortBy);
        if (params?.sortOrder) searchParams.append("sortOrder", params.sortOrder);
        
        return `/user/admin/users?${searchParams.toString()}`;
      },
      providesTags: ["User"],
    }),

    // Get single user by ID (admin only)
    getSingleUser: builder.query({
      query: (id) => `/user/admin/user/${id}`,
      providesTags: ["User"],
    }),

    // Suspend user (admin only)
    suspendUser: builder.mutation({
      query: (id) => ({
        url: `/user/admin/user/suspend/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),

    // Remove user by admin (admin only)
    removeUserByAdmin: builder.mutation({
      query: (id) => ({
        url: `/user/admin/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
  useChangeUserRoleMutation,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useSuspendUserMutation,
  useRemoveUserByAdminMutation,
} = userApi;
