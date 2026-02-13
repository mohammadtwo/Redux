import { configureStore } from "@reduxjs/toolkit";
import  counterReducer  from "./counterSlice/counterSlice";
import themeReducer from "./ThemeSlice/themeSlice"
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    theme: themeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
