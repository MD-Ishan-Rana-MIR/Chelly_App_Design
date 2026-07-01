import { baseApi } from "./baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allCategories: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    categoryByFood: builder.query({
      query: ({ id, page, perPage }) => ({
        url: `/categories/${id}?page=${page}&per_page=${perPage}`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
  }),
});

export const { useAllCategoriesQuery, useCategoryByFoodQuery } = categoryApi;
