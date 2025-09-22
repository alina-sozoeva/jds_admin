import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bannersApi = createApi({
  reducerPath: "bannersApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_MAIN_URL }),
  tagTypes: ["Bannersist"],
  endpoints: (builder) => ({
    getBanners: builder.query({
      query: (search) => ({
        url: "/banners",
        method: "GET",
        params: search,
      }),
      providesTags: ["Bannersist"],
    }),
    addBanner: builder.mutation({
      query: (newBanner) => ({
        url: "/banners/add",
        method: "POST",
        body: newBanner,
      }),
      invalidatesTags: ["Bannersist"],
    }),
    updateBanner: builder.mutation({
      query: (banner) => ({
        url: "/banners/add",
        method: "POST",
        body: banner,
      }),
      invalidatesTags: ["Bannersist"],
    }),
    removeBanner: builder.mutation({
      query: (codeid) => ({
        url: "/banners/delete",
        method: "POST",
        body: codeid,
      }),
      invalidatesTags: ["Bannersist"],
    }),
  }),
});

export const {
  useGetBannersQuery,
  useAddBannerMutation,
  useUpdateBannerMutation,
  useRemoveBannerMutation,
} = bannersApi;
