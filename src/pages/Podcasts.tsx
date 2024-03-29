import { useMemo, useState } from 'react';
import ErrorDisplay from '../components/ErrorDisplay';
import PodcastList from '../components/PodcastList';
import Skeleton from '../components/Skeleton';
import usePodcasts from '../hooks/usePodcasts';

export default function Podcasts() {
  const { podcasts, loading, error } = usePodcasts();
  const [filter, setFilter] = useState<string | undefined>(undefined);

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
    const skeletonLines = Array.from({ length: 8 }, (_, index) => <Skeleton density={3} key={index} />);
    return (
      <div className="mt-16">
        <div className="grid grid-cols-4 gap-4">{skeletonLines}</div>;
      </div>
    );
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
