import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_MAIN_URL }),
  tagTypes: ["ReviewsList"],
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: (search) => ({
        url: "/reviews",
        method: "GET",
        params: search,
      }),
      providesTags: ["ReviewsList"],
    }),
    addReviews: builder.mutation({
      query: (newReviews) => ({
        url: "/reviews/add",
        method: "POST",
        body: newReviews,
      }),
      invalidatesTags: ["ReviewsList"],
    }),
    updateReviewsPublished: builder.mutation({
      query: (codeid) => ({
        url: "/reviews/update-published",
        method: "POST",
        body: codeid,
      }),
      invalidatesTags: ["ReviewsList"],
    }),
    removeReview: builder.mutation({
      query: (codeid) => ({
        url: "/reviews/delete",
        method: "POST",
        body: codeid,
      }),
      invalidatesTags: ["ReviewsList"],
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useAddReviewsMutation,
  useUpdateReviewsPublishedMutation,
  useRemoveReviewMutation,
} = reviewsApi;
