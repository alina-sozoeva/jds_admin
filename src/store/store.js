import { configureStore } from "@reduxjs/toolkit";
import { newsApi } from "./news";
import { newsSlice } from "./news/newsSlice";
import { reviewsApi } from "./reviews";
import { educationApi } from "./edu";
import { bannersApi } from "./banners";

export const store = configureStore({
  reducer: {
    [newsApi.reducerPath]: newsApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [educationApi.reducerPath]: educationApi.reducer,
    [bannersApi.reducerPath]: bannersApi.reducer,
    newsFoto: newsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      newsApi.middleware,
      reviewsApi.middleware,
      educationApi.middleware,
      bannersApi.middleware
    ),
});
