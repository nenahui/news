import { axiosApi } from '@/axiosApi';
import type { Comment, News, NewsDetails } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPost = createAsyncThunk('onePost/fetch', async (id: string) => {
  const { data: newsInfo } = await axiosApi.get<News>(`/news/${id}`);
  const { data: newsComments } = await axiosApi.get<Comment[]>(`/comments?news_id=${id}`);

  const newsDetails: NewsDetails = {
    newsInfo,
    comments: newsComments,
  };

  return newsDetails;
});

export const deleteComment = createAsyncThunk('onePost/delete', async (id: string) => {
  console.log('Deleting...');
  await axiosApi.delete(`/comments/${id}`);
});
