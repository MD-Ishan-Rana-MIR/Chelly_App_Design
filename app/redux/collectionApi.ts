import { baseApi } from "./baseApi";

export const collectionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCollection: builder.query({
      query: () => ({
        url: `/collections`,
        method: "GET",
      }),
      providesTags: ["Collection"],
    }),

    getCollectionByFood: builder.query({
      query: (id) => ({
        url: `/collections/${id}`,
      }),
      providesTags: ["Collection"],
    }),
    onlyGetBreakFast: builder.query({
      query: () => ({
        url: `/collections/1?per_page=4&current_page=1`,
      }),
    }),
    onlyGetLunch: builder.query({
      query: () => ({
        url: `/collections/2?per_page=4`,
      }),
    }),
  }),
});

export const {
  useGetAllCollectionQuery,
  useGetCollectionByFoodQuery,
  useOnlyGetBreakFastQuery,
  useOnlyGetLunchQuery,
} = collectionApi;
