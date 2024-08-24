import { axiosApi } from '@/axiosApi';
import type { News } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk('posts/fetch', async () => {
  const { data: apiPosts } = await axiosApi.get<News[]>('/news');

  return apiPosts;
});
