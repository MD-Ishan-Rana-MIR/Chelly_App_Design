import { baseApi } from "./baseApi";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: ({ page = 1 }) => ({
        url: `/blogs?page=${page}`,
        method: "GET",
      }),
      providesTags: ["Blog"],
    }),
    blogDetails: builder.query({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "GET",
      }),
      providesTags: ["Blog"],
    }),
  }),
});

export const { useGetBlogsQuery, useBlogDetailsQuery } = blogApi;
