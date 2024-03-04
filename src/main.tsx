import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import NotFound from './pages/404';
import PodcastDetail from './pages/PodcastDetail.tsx';
import Episode from './pages/Episode';
import { Provider } from 'react-redux';
import { store } from './state/store.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: '/podcast/:podcastId',
    element: <PodcastDetail />,
    children: [
      {
        path: '/podcast/:podcastId/episode/:episodeId',
        element: <Episode />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
