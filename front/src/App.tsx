import { Posts } from '@/features/posts/Posts';
import React from 'react';
import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider';
import { Route, Routes } from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme={'dark'}>
      <Routes>
        <Route path={'/'} element={<Posts />} />
      </Routes>
    </ThemeProvider>
  );
};
