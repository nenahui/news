import React from 'react';
import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider';

export const App: React.FC = () => {
  return <ThemeProvider defaultTheme={'dark'}>App</ThemeProvider>;
};
