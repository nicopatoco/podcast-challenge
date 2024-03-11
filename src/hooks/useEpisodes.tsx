import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import { useEffect } from 'react';
import { getEpisodes } from '../state/episodeSlice';

const useEpisodes = (podcastId: string | undefined) => {
  const { albumEpisodes, episodes, loading, error } = useSelector((state: RootState) => state.episodes);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (podcastId) {
      dispatch(getEpisodes(podcastId));
    }
  }, [dispatch, podcastId]);

  return { albumEpisodes, episodes, loading, error };
};

export default useEpisodes;
