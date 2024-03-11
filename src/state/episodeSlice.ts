import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PodcastEpisode } from '../types/episode';
import { now, oneDay } from '../functions/helpers';

interface AlbumEpisodes {
  key: string;
  value: PodcastEpisode[];
  lastFetch: number; // Each album's episodes have their own lastFetch
}

interface EpisodeState {
  albumEpisodes: AlbumEpisodes[];
  episodes: PodcastEpisode[];
  loading: boolean;
  error: string | null;
}

const initialState: EpisodeState = {
  albumEpisodes: [],
  episodes: [],
  loading: false,
  error: null,
};

export const getEpisodes = createAsyncThunk(
  'episodes/getEpisodes',
  async (podcastId: string, { getState, rejectWithValue }) => {
    const state = getState() as { episodes: EpisodeState };
    const episodeCache = state.episodes.albumEpisodes.find((e) => e.key.toString() === podcastId);

    // Check if the lastFetch is more than one day old
    if (episodeCache && episodeCache.lastFetch && now() - episodeCache.lastFetch < oneDay()) {
      return { podcastId, episodes: episodeCache.value };
    }

    try {
      const response = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode`)}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const episodes: PodcastEpisode[] = JSON.parse(data.contents).results;
      episodes.shift(); // Take episode reference

      const sortedEpisodes = episodes.sort((a: PodcastEpisode, b: PodcastEpisode) => a.releaseDate - b.releaseDate);

      return { podcastId, episodes: sortedEpisodes };
    } catch (error) {
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const episodesSlice = createSlice({
  name: 'episodes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEpisodes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEpisodes.fulfilled, (state, action) => {
        const { podcastId, episodes } = action.payload;

        const index = state.albumEpisodes.findIndex((e) => e.key === podcastId);
        if (index === -1) {
          // Add a new list of episodes with current timestamp
          state.albumEpisodes.push({
            key: podcastId,
            value: episodes,
            lastFetch: now(),
          });
        } else {
          // Update existing list of episodes and its lastFetch timestamp
          state.albumEpisodes[index].value = episodes;
          state.albumEpisodes[index].lastFetch = now();
        }
        // This is cos I want to have the episode in the context
        state.episodes = episodes;
        state.loading = false;
      })
      .addCase(getEpisodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default episodesSlice.reducer;
