import { fetchPosts } from '@/features/posts/postsThunks';
import type { News } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

interface PostsState {
  posts: News[];
  isFetching: boolean;
}

const initialState: PostsState = {
  posts: [],
  isFetching: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchPosts.fulfilled, (state, { payload: apiPosts }) => {
        state.posts = apiPosts;
        state.isFetching = false;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.isFetching = false;
      });
  },
  selectors: {
    selectPosts: (state) => state.posts,
    selectPostsFetching: (state) => state.isFetching,
  },
});

export const { selectPosts, selectPostsFetching } = postsSlice.selectors;
