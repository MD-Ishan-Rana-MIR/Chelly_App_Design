import { baseApi } from "./baseApi";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postContact: builder.mutation({
      query: (formData) => ({
        url: `/contact-us`,
        method: "POST",
        body: formData,
      }),

    }),
  }),
});

export const { usePostContactMutation } = contactApi;
