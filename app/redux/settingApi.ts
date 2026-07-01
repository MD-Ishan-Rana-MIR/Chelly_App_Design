import { baseApi } from "./baseApi";

export const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    storeSettingPage: builder.mutation({
      query: (payload) => ({
        url: `/admin/settings`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Setting"],
    }),
    getSettingPage: builder.query({
      query: (pageName) => ({
        url: `/settings/${pageName}`,
        method: "GET",
      }),
    }),
    getAllContactInformation: builder.query({
      query: () => ({
        url: `/settings`,
      }),
      providesTags: ["Setting"],
    }),
  }),
});

export const { useStoreSettingPageMutation, useGetSettingPageQuery, useGetAllContactInformationQuery } =
  settingApi;
