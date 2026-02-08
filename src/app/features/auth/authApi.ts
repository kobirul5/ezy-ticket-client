import { baseApi } from "../../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: `/auth/register`,
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    loginUser: builder.mutation({
      query: (email) => ({
        url: "/jwt",
        method: "POST",
        body: { email },
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    getUserInfo: builder.query({
      query: (email) => `/users/${email}`,
      providesTags: ["User"],
    }),
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    updateUserRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `/users/role/${id}`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: ["User"],
    }),
    checkAdmin: builder.query({
      query: (email) => `/users/admin/${email}`,
    }),
    checkEventManager: builder.query({
      query: (email) => `/users/eventManager/${email}`,
    }),
    checkTravelManager: builder.query({
      query: (email) => `/users/travelManager/${email}`,
    }),
  }),
});

export const { 
  useRegisterUserMutation, 
  useLoginUserMutation, 
  useLogoutUserMutation,
  useGetUserInfoQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
  useCheckAdminQuery,
  useCheckEventManagerQuery,
  useCheckTravelManagerQuery,
} = authApi;
