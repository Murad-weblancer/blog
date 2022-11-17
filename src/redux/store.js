import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { blogsApi } from "./services/bglogsApi";

export const store =  configureStore({
  reducer: {
    [blogsApi.reducerPath]: blogsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck:false
  }).concat(blogsApi.middleware),
});
setupListeners(store.dispatch)

