import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import EpisodeDetails from '../components/EpisodeDetails';
import ErrorDisplay from '../components/ErrorDisplay';
import LoadingDisplay from '../components/LoadingDisplay';
import { getEpisodes } from '../state/episodeSlice';
import { AppDispatch, RootState } from '../state/store';

export default function Episode() {
  const params = useParams<{ episodeId: string; podcastId: string }>();
  const { episodes, loading, error } = useSelector((state: RootState) => state.episodes);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (params?.podcastId) {
      dispatch(getEpisodes(params.podcastId));
    }
  }, [dispatch, params]);

  if (loading) {
    return <LoadingDisplay />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  const episode = episodes.find((e) => e.trackId.toString() === params?.episodeId);

  return <>{episode && <EpisodeDetails episode={episode} />}</>;
}
