import { axiosApi } from '@/axiosApi';
import type { News } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk('posts/fetch', async () => {
  const { data: apiPosts } = await axiosApi.get<News[]>('/news');

  return apiPosts;
});

export const deletePost = createAsyncThunk('posts/delete', async (id: string) => {
  await axiosApi.delete(`/news/${id}`);

  return id;
});
