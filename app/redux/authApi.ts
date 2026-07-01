import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    userProfile: builder.query({
      query: () => ({
        url: `/profile/me`,
      }),
      providesTags: ["Auth"],
    }),
    emailVerify: builder.mutation({
      query: (data) => ({
        url: `/auth/forgot-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    otpVerify: builder.mutation({
      query: (payload) => ({
        url: `/auth/verify`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Auth"],
    }),
    forgetOtpVerify: builder.mutation({
      query: (payload) => ({
        url: `/auth/verify-password-otp`,
        method: "POST",
        body: payload,
      }),
    }),
    passwordChange: builder.mutation({
      query: (payload) => ({
        url: `/auth/reset-password-with-token`,
        method: "POST",
        body: payload,
      }),
    }),
    userProfileUpdate: builder.mutation({
      query: (formData) => ({
        url: `/profile/update`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useRegistrationMutation,
  useLoginMutation,
  useLogoutMutation,
  useUserProfileQuery,
  useEmailVerifyMutation,
  useOtpVerifyMutation,
  useUserProfileUpdateMutation,
  useForgetOtpVerifyMutation,
  usePasswordChangeMutation
} = authApi;
