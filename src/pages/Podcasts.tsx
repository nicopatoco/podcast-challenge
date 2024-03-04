import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import { getFirst100Podcast } from '../state/podcastSlice';
import { Link } from 'react-router-dom';
import PodcastCard from '../components/podcastCard';

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
    return <div>Loading podcasts...</div>;
  }

  if (error) {
    return <div>Error fetching podcasts: {error}</div>;
  }

  return (
    <>
      <div className="flex flex-row my-4 justify-end gap-2">
        <div className="bg-blue-400 text-white rounded text-lg p-1">{filteredPodcasts.length}</div>
        <input
          className="border border-gray-400 mr-4 rounded text-lg w-64 h-8"
          type="text"
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter podcast..."
        ></input>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {filteredPodcasts.map((podcast, i) => (
          <Link key={`podcast-${i}`} to={`/podcast/${podcast}`}>
            <PodcastCard podcast={podcast} />
          </Link>
        ))}
      </div>
    </>
  );
}
