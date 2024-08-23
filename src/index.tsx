import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
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
      <Root/>
      <RouterProvider router={router}/>
    </QueryClientProvider>
  </React.StrictMode>
);
