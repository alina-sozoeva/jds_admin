import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const educationApi = createApi({
  reducerPath: "educationApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_MAIN_URL }),
  tagTypes: ["EducationList"],
  endpoints: (builder) => ({
    getEdu: builder.query({
      query: (search) => ({
        url: "/education",
        method: "GET",
        params: search,
      }),
      providesTags: ["EducationList"],
    }),
    addEdu: builder.mutation({
      query: (newEdu) => ({
        url: "/education/add",
        method: "POST",
        body: newEdu,
      }),
      invalidatesTags: ["EducationList"],
    }),
    updateEdu: builder.mutation({
      query: (edu) => ({
        url: "/education/add",
        method: "POST",
        body: edu,
      }),
      invalidatesTags: ["EducationList"],
    }),
    removeEdu: builder.mutation({
      query: (codeid) => ({
        url: "/education/delete",
        method: "POST",
        body: codeid,
      }),
      invalidatesTags: ["EducationList"],
    }),
    removeEduImg: builder.mutation({
      query: (codeid) => ({
        url: "/edu-img/delete",
        method: "POST",
        body: codeid,
      }),
      invalidatesTags: ["EducationList"],
    }),
  }),
});

export const {
  useGetEduQuery,
  useAddEduMutation,
  useUpdateEduMutation,
  useRemoveEduImgMutation,
  useRemoveEduMutation,
} = educationApi;
