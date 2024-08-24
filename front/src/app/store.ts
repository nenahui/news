import { newPostSlice } from '@/features/posts/newPost/newPostSlice';
import { onePostSlice } from '@/features/posts/onePost/onePostSlice';
import { postsSlice } from '@/features/posts/postsSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
    onePost: onePostSlice.reducer,
    newPost: newPostSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
