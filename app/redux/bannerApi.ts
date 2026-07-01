import { baseApi } from "./baseApi";

export const bannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBanner: builder.query({
      query: () => ({
        url: `/banners`,
      }),
    }),
  }),
});

export const { useGetAllBannerQuery } = bannerApi;
