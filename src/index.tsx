import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import router from './Router';
import Root from './Root';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClint = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClint}>
      <ThemeProvider theme={theme}>
        <Root/>
        <RouterProvider router={router}/>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
