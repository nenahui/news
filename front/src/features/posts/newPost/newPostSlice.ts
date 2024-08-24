import { createPost } from '@/features/posts/newPost/newPostThunks';
import { createSlice } from '@reduxjs/toolkit';

interface NewPostState {
  isCreating: boolean;
}

const initialState: NewPostState = {
  isCreating: false,
};

export const newPostSlice = createSlice({
  name: 'newPost',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createPost.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createPost.rejected, (state) => {
        state.isCreating = false;
      });
  },
  selectors: {
    selectNewPostCreating: (state) => state.isCreating,
  },
});

export const { selectNewPostCreating } = newPostSlice.selectors;
