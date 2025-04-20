import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const OrdersApi = createApi({
  reducerPath: "OrdersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["getAllOrders"],
  endpoints: (builder) => ({
    CreateOrder: builder.mutation<any, any>({
      query: (body) => ({
        url: "/orders/create-order",
        method: "POST",
        body,
      }),
      invalidatesTags: ["getAllOrders"],
    }),

    getAllOrders: builder.query<any, any>({
      query: ({ query, page }) => ({
        url: `/orders/get-orders?query=${query}&page=${page}`,
        method: "GET",
      }),
      providesTags: ["getAllOrders"],
    }),

    DeleteOrder: builder.mutation<any, any>({
      query: (id) => ({
        url: `/orders/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getAllOrders"],
    }),

    getInvoiceById: builder.query<any, any>({
      query: (id) => ({
        url: `/orders/get-invoice/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
  useGetInvoiceByIdQuery,
} = OrdersApi;
