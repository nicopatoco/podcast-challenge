import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PodcastEntry, PodcastsFeed } from '../types/podcast';
import axios from 'axios';

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

const podcastSlice = createSlice({
  name: 'podcasts',
  initialState,
  reducers: {
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
      .addCase(getFirst100Podcast.fulfilled, (state, action: PayloadAction<PodcastsFeed>) => {
        if (action.payload) {
          state.podcasts = action.payload.entry;
        }
        state.loading = false;
      })
      .addCase(getFirst100Podcast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const getFirst100Podcast = createAsyncThunk(
  'podcasts/getFirst100Podcast',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as { podcasts: PodcastState };
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in one day

    // Check if lastFetch is more than one day old
    if (state.podcasts.lastFetch && now - state.podcasts.lastFetch < oneDay) {
      return state.podcasts.podcasts;
    }

    try {
      // Fetching new data
      const res = await axios.get('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
      dispatch(updateLastFetch(Date.now()));
      return res.data.feed;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const updateLastFetch = (timestamp: number) => ({
  type: 'podcasts/updateLastFetch',
  payload: timestamp,
});

export default podcastSlice.reducer;
