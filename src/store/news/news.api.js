import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_MAIN_URL }),
  tagTypes: ["NewsList"],
  endpoints: (builder) => ({
    getNews: builder.query({
      query: () => ({
        url: "/get_news",
        method: "GET",
      }),
      providesTags: ["NewsList"],
    }),
    getNewsById: builder.query({
      query: (id) => ({
        url: `get_news/${id}`,
        method: "GET",
      }),
      providesTags: ["NewsList"],
    }),
    addNews: builder.mutation({
      query: (newNews) => ({
        url: "/add_news",
        method: "POST",
        body: newNews,
      }),
      invalidatesTags: ["NewsList"],
    }),
    removeNews: builder.mutation({
      query: (id) => ({
        url: "/delete_news",
        method: "POST",
        body: { codeid: id },
      }),
      invalidatesTags: ["NewsList"],
    }),
    updateNews: builder.mutation({
      query: (news) => ({
        url: "/add_news",
        method: "POST",
        body: news,
      }),
      invalidatesTags: ["NewsList"],
    }),
    uploadFile: builder.mutation({
      query: (formData) => ({
        url: "/upload",
        method: "POST",
        body: formData,
        formData: true,
      }),
    }),
  }),
});

export const {
  useGetNewsQuery,
  useAddNewsMutation,
  useRemoveNewsMutation,
  useGetNewsByIdQuery,
  useUpdateNewsMutation,
  useUploadFileMutation,
} = newsApi;
