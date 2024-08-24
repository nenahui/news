import { deleteComment, fetchPost } from '@/features/posts/onePost/onePostThunks';
import type { NewsDetails } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

interface OnePostState {
  news: NewsDetails | null;
  isFetching: boolean;
  isCommentDeleting: boolean;
}

const initialState: OnePostState = {
  news: null,
  isFetching: false,
  isCommentDeleting: false,
};

export const onePostSlice = createSlice({
  name: 'onePost',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchPost.fulfilled, (state, { payload: apiNewsDetails }) => {
        state.news = apiNewsDetails;
        state.isFetching = false;
      })
      .addCase(fetchPost.rejected, (state) => {
        state.isFetching = false;
      });

    builder
      .addCase(deleteComment.pending, (state) => {
        state.isCommentDeleting = true;
      })
      .addCase(deleteComment.fulfilled, (state) => {
        state.isCommentDeleting = false;
      })
      .addCase(deleteComment.rejected, (state) => {
        state.isCommentDeleting = false;
      });
  },
  selectors: {
    selectOnePostNews: (state) => state.news,
    selectOnePostFetching: (state) => state.isFetching,
    selectOnePostCommentDeleting: (state) => state.isCommentDeleting,
  },
});

export const { selectOnePostNews, selectOnePostFetching, selectOnePostCommentDeleting } = onePostSlice.selectors;
