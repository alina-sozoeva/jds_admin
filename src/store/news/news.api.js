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
    addNews: builder.mutation({
      query: (newNews) => ({
        url: "/add_news",
        method: "POST",
        body: newNews,
      }),
      providesTags: ["NewsList"],
    }),
  }),
});

export const { useGetNewsQuery, useAddNewsMutation } = newsApi;
