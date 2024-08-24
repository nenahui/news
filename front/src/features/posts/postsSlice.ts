import { deletePost, fetchPosts } from '@/features/posts/postsThunks';
import type { News } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

interface PostsState {
  posts: News[];
  isFetching: boolean;
  isDeleting: boolean;
}

const initialState: PostsState = {
  posts: [],
  isFetching: false,
  isDeleting: false,
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

    builder
      .addCase(deletePost.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.isDeleting = false;
      })
      .addCase(deletePost.rejected, (state) => {
        state.isDeleting = false;
      });
  },
  selectors: {
    selectPosts: (state) => state.posts,
    selectPostsFetching: (state) => state.isFetching,
    selectPostsDeleting: (state) => state.isDeleting,
  },
});

export const { selectPosts, selectPostsFetching, selectPostsDeleting } = postsSlice.selectors;
