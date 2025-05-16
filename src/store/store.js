import { configureStore } from "@reduxjs/toolkit";
import { newsApi } from "./news";
import { newsSlice } from "./news/newsSlice";

export const store = configureStore({
  reducer: {
    [newsApi.reducerPath]: newsApi.reducer,
    newsFoto: newsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsApi.middleware),
});
