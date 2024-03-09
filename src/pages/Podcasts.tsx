import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorDisplay from '../components/ErrorDisplay';
import LoadingDisplay from '../components/LoadingDisplay';
import PodcastList from '../components/PodcastList';
import { getFirst100Podcast } from '../state/podcastSlice';
import { AppDispatch, RootState } from '../state/store';

export default function Podcasts() {
  const { podcasts, loading, error } = useSelector((state: RootState) => state.podcasts);
  const dispatch = useDispatch<AppDispatch>();
  const [filter, setFilter] = useState<string | undefined>(undefined);

  useEffect(() => {
    dispatch(getFirst100Podcast());
  }, [dispatch]);

  const filteredPodcasts = useMemo(() => {
    if (filter) {
      return podcasts.filter(
        (podcast) =>
          podcast['im:name'].label.toLowerCase().includes(filter.toLowerCase()) ||
          podcast['im:artist'].label.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return podcasts;
  }, [podcasts, filter]);

  if (loading) {
    return <LoadingDisplay />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <>
      {filteredPodcasts && (
        <>
          <div className="flex flex-row justify-end gap-2 my-4">
            <div className="p-1 text-lg text-white bg-blue-400 rounded">{filteredPodcasts.length}</div>
            <input
              className="w-64 h-8 mr-4 text-lg border border-gray-400 rounded"
              type="text"
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter podcast..."
            />
          </div>
          <PodcastList podcasts={filteredPodcasts} />
        </>
      )}
    </>
  );
}
