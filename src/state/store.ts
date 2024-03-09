import { configureStore } from '@reduxjs/toolkit';
import podcastsReducer from './podcastSlice';
import episodesReducer from './episodeSlice';

export const store = configureStore({
  reducer: {
    podcasts: podcastsReducer,
    episodes: episodesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
