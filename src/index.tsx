import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './Router';
import Root from './Root';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

const queryClint = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClint}>
        <Root/>
        <RouterProvider router={router}/>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
