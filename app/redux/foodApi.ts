import { baseApi } from "./baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allFoods: builder.query({
      query: () => ({
        url: `/foods?include=category&page=2&per_page=6`,
        method: "GET",
      }),
    }),
    foodById: builder.query({
      query: (id) => ({
        url: `/foods/${id}`,
        method: "GET",
      }),
    }),
    foodSearch: builder.query({
      query: (search) => ({
        url: `/foods?filter[search]=${search}`,
      }),
    }),
    foodWithoutSearch: builder.query({
      query: ({ perPage = 10 }) => ({
        url: "foods",
        params: {
          include: "category",
          per_page: perPage,
        },
      }),
    }),
    getFoods: builder.query({
      query: ({ page = 1, categoryId, search, perPage }) => {
        let queryString = `foods?include=category&per_page=${perPage}&page=${page}`;

        if (categoryId && categoryId !== "All") {
          queryString += `&filter[category_id]=${categoryId}`;
        }

        if (search && search.trim() !== "") {
          queryString += `&filter[search]=${encodeURIComponent(search)}`;
        }

        return queryString;
      },
    }),
    twoMealApi : builder.query({
      query : ()=>({
        url: `/foods?include=category&page=1&per_page=2`,
      })
      
    })
  }),
});

export const {
  useAllFoodsQuery,
  useFoodByIdQuery,
  useFoodSearchQuery,
  useFoodWithoutSearchQuery,
  useGetFoodsQuery,
  useTwoMealApiQuery
} = categoryApi;
