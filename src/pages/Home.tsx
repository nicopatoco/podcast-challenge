import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import { getFirst100Podcast } from '../state/podcastSlice';
import { Link } from 'react-router-dom';

export default function Home() {
  const { podcasts, loading, error } = useSelector((state: RootState) => state.podcasts);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getFirst100Podcast());
  }, [dispatch]);

  if (loading) {
    return <div>Loading podcasts...</div>;
  }

  if (error) {
    return <div>Error fetching podcasts: {error}</div>;
  }

  return (
    <>
      <div className="flex flex-row my-4 justify-end gap-2">
        <div className="bg-blue-400 text-white rounded text-lg">100</div>
        <input className="border border-gray-400 mr-4 rounded text-lg w-64 h-8" placeholder="Filter podcast..."></input>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {podcasts.map((podcast, i) => (
          <Link key={`podcast-${i}`} to={`/podcast/${podcast}`}>
            <div className="bg-red-200 py-32 text-center">{podcast['im:name'].label}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
