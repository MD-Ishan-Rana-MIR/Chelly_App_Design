import { baseApi } from "./baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allOrder: builder.query({
      query: (params) => {
        const page = params?.page ?? 1;
        const perPage = params?.per_page ?? 10;
        return `orders?per_page=${perPage}&page=${page}`;
      },
      providesTags: ["Order", "CheckOut"],
    }),
    orderCancel: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}/cancel`,
        method: "PUT",
      }),
      invalidatesTags: ["Order"],
    }),
    paymentApi: builder.mutation({
      query: (payload) => ({
        url: `/checkout`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Order", "CheckOut"],
    }),
  }),
});

export const { useAllOrderQuery, usePaymentApiMutation,useOrderCancelMutation } = orderApi;
