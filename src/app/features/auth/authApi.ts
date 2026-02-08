import { baseApi } from "../../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Register new user
    registerUser: builder.mutation({
      query: (userData) => ({
        url: `/auth/register`,
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    // Login user with email and password
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials, // { email: string, password: string }
      }),
    }),

    // Logout user
    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    // Change password (requires authentication)
    changePassword: builder.mutation({
      query: (passwordData) => ({
        url: "/auth/change-password",
        method: "PUT",
        body: passwordData, // { oldPassword: string, newPassword: string }
      }),
    }),

    // Forgot password - sends OTP to email
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data, // { email: string }
      }),
    }),

    // Reset password
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data, // { email: string, newPassword: string }
      }),
    }),

    // Send OTP to email for verification
    sendOtpEmail: builder.mutation({
      query: (data) => ({
        url: "/auth/email-verification-otp",
        method: "POST",
        body: data, // { email: string }
      }),
    }),

    // Resend OTP
    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: data, // { email: string }
      }),
    }),

    // Verify OTP for forgot password
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data, // { email: string, otp: string }
      }),
    }),

    // Delete user account (requires authentication)
    deleteUser: builder.mutation({
      query: () => ({
        url: "/auth/delete-user",
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useSendOtpEmailMutation,
  useResendOtpMutation,
  useVerifyOtpMutation,
  useDeleteUserMutation,
} = authApi;
