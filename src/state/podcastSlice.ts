import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { PodcastEntry, PodcastsFeed } from '../types/podcast';

interface PodcastState {
  podcasts: PodcastEntry[];
  lastFetch: number | null; // Timestamp of the last fetch
  loading: boolean;
  error: string | null;
}

const initialState: PodcastState = {
  podcasts: [],
  lastFetch: null,
  loading: false,
  error: null,
};

export const getFirst100Podcast = createAsyncThunk(
  'podcasts/getFirst100Podcast',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as { podcasts: PodcastState };
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in one day

    // Check if the lastFetch is more than one day old
    if (state.podcasts.lastFetch && now - state.podcasts.lastFetch < oneDay) {
      return { podcast: state.podcasts.podcasts };
    }

    try {
      const res: PodcastsFeed = (
        await axios.get('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
      ).data.feed;
      dispatch(podcastSlice.actions.updateLastFetch(Date.now()));
      return { podcast: res.entry, cache: false } as { podcast: PodcastEntry[] };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const podcastSlice = createSlice({
  name: 'podcasts',
  initialState,
  reducers: {
    // Reducer to update the last fetch timestamp
    updateLastFetch: (state, action: PayloadAction<number>) => {
      state.lastFetch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFirst100Podcast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFirst100Podcast.fulfilled, (state, action) => {
        const { podcast } = action.payload;
        state.podcasts = podcast;
        state.loading = false;
      })
      .addCase(getFirst100Podcast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch podcasts';
      });
  },
});

// Export the reducer and actions
export const { updateLastFetch } = podcastSlice.actions;
export default podcastSlice.reducer;
