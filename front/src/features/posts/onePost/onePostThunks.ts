import { axiosApi } from '@/axiosApi';
import type { Comment, CommentMutation, News, NewsDetails } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPost = createAsyncThunk('onePost/fetch', async (id: number) => {
  const { data: newsInfo } = await axiosApi.get<News>(`/news/${id}`);
  const { data: newsComments } = await axiosApi.get<Comment[]>(`/comments?news_id=${id}`);

  const newsDetails: NewsDetails = {
    newsInfo,
    comments: newsComments,
  };

  return newsDetails;
});

export const deleteComment = createAsyncThunk('onePost/delete', async (id: number) => {
  await axiosApi.delete(`/comments/${id}`);
});

export const addComment = createAsyncThunk('onePost/create', async (comment: CommentMutation) => {
  await axiosApi.post('/comments', comment);
});
