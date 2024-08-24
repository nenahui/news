import { axiosApi } from '@/axiosApi';
import type { NewsMutation } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createPost = createAsyncThunk('newPost/create', async (post: NewsMutation) => {
  const formData = new FormData();
  formData.append('title', post.title);
  formData.append('content', post.content);
  if (post.image) formData.append('image', post.image);

  await axiosApi.post('/news', formData);
});
