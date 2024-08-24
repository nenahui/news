import { Toaster } from '@/components/ui/sonner';
import { NewPost } from '@/features/posts/newPost/NewPost';
import { OnePost } from '@/features/posts/onePost/OnePost';
import { Posts } from '@/features/posts/Posts';
import React from 'react';
import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider';
import { Route, Routes } from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme={'dark'}>
      <Toaster />
      <Routes>
        <Route path={'/'} element={<Posts />} />
        <Route path={'/new-post'} element={<NewPost />} />
        <Route path={'/news/:id'} element={<OnePost />} />
      </Routes>
    </ThemeProvider>
  );
};
