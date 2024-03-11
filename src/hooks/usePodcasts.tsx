import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFirst100Podcast } from '../state/podcastSlice';
import { AppDispatch, RootState } from '../state/store';

const usePodcasts = () => {
  const { podcasts, loading, error } = useSelector((state: RootState) => state.podcasts);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getFirst100Podcast());
  }, [dispatch]);

  return { podcasts, loading, error };
};

export default usePodcasts;
