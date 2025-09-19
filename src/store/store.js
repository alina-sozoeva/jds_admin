import { configureStore } from "@reduxjs/toolkit";
import { newsApi } from "./news";
import { newsSlice } from "./news/newsSlice";
import { reviewsApi } from "./reviews";
import { educationApi } from "./edu";

export const store = configureStore({
  reducer: {
    [newsApi.reducerPath]: newsApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [educationApi.reducerPath]: educationApi.reducer,
    newsFoto: newsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      newsApi.middleware,
      reviewsApi.middleware,
      educationApi.middleware
    ),
});
