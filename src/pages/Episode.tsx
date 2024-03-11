import { useParams } from 'react-router-dom';
import EpisodeDetails from '../components/EpisodeDetails';
import ErrorDisplay from '../components/ErrorDisplay';
import LoadingDisplay from '../components/LoadingDisplay';
import useEpisodes from '../hooks/useEpisodes';

export default function Episode() {
  const { podcastId, episodeId } = useParams();
  const { episodes, loading, error } = useEpisodes(podcastId);

  if (loading) {
    return <LoadingDisplay />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  const episode = episodeId ? episodes.find((e) => e.trackId.toString() === episodeId) : undefined;

  return <>{episode && <EpisodeDetails episode={episode} />}</>;
}
