import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PodcastEpisode } from '../types/episode';

interface EpisodeState {
  episodes: PodcastEpisode[];
  loading: boolean;
  error: string | null;
}

const initialState: EpisodeState = {
  episodes: [],
  loading: false,
  error: null,
};

export const getEpisodes = createAsyncThunk('episodes/getEpisodes', async (id: string, { rejectWithValue }) => {
  // TODO add chache
  try {
    // Fetching new data
    const response = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode`)}`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    return rejectWithValue('An unknown error occurred');
  }
});

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
        const episodes = JSON.parse(action.payload.contents).results;

        // TODO insert this in a variable
        const firstElement = episodes.shift();
        console.log('firstElement: ', firstElement);

        state.episodes = episodes.sort((a: PodcastEpisode, b: PodcastEpisode) => a.releaseDate - b.releaseDate);
        state.loading = false;
      })
      .addCase(getEpisodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default episodesSlice.reducer;
