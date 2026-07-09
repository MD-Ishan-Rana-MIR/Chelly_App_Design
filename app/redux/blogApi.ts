import { baseApi } from "./baseApi";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: ({ current_page,page = 1 }) => ({
        url: `/blogs?current_page=${current_page}&page=${page}`,
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
    getFourBlog: builder.query({
      query: ({ page = 2 }) => ({
        url: `/blogs?page=${page}&per_page=4`,
        method: "GET",
      }),
      providesTags: ["Blog"],
    }),
  }),
});

export const { useGetBlogsQuery, useBlogDetailsQuery,useGetFourBlogQuery } = blogApi;
