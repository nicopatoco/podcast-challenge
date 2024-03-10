import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PodcastEpisode } from '../types/episode';

interface AlbumEpisodes {
  key: string;
  value: PodcastEpisode[];
}

interface EpisodeState {
  albumEpisodes: AlbumEpisodes[];
  episodes: PodcastEpisode[];
  lastFetch: number | null; // Timestamp of the last fetch
  loading: boolean;
  error: string | null;
}

const initialState: EpisodeState = {
  albumEpisodes: [],
  episodes: [],
  lastFetch: null,
  loading: false,
  error: null,
};

export const getEpisodes = createAsyncThunk(
  'episodes/getEpisodes',
  async (podcastId: string, { getState, rejectWithValue }) => {
    const state = getState() as { episodes: EpisodeState };
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in one day
    const episodeCache = state.episodes.albumEpisodes.find((e) => e.key.toString() === podcastId);

    // Check if the lastFetch is more than one day old
    if (episodeCache && state.episodes.lastFetch && now - state.episodes.lastFetch < oneDay) {
      return { podcastId, episodes: episodeCache.value, cache: true };
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

      return { podcastId, episodes, cache: false };
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
        const { podcastId, episodes, cache } = action.payload;

        if (!cache) {
          const sortedEpisodes: PodcastEpisode[] = episodes.sort(
            (a: PodcastEpisode, b: PodcastEpisode) => a.releaseDate - b.releaseDate
          );

          const index = state.albumEpisodes.findIndex((e) => e.key === podcastId);

          if (index === -1) {
            state.albumEpisodes.push({ key: podcastId, value: sortedEpisodes }); // Add a new list of episodes
          } else {
            state.albumEpisodes[index].value = sortedEpisodes;
          }
          state.lastFetch = Date.now(); // Update the lastFetch timestamp
          state.episodes = sortedEpisodes;
        } else {
          state.episodes = episodes;
        }
        state.loading = false;
      })
      .addCase(getEpisodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default episodesSlice.reducer;
