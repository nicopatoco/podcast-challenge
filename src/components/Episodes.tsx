import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { getEpisodes } from '../state/episodeSlice';
import { AppDispatch, RootState } from '../state/store';
import ErrorDisplay from './ErrorDisplay';
import Skeleton from './Skeleton';

export default function Episodes({ podcastId }: { podcastId: string }) {
  const { episodes, loading, error } = useSelector((state: RootState) => state.episodes);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (podcastId) {
      dispatch(getEpisodes(podcastId));
    }
  }, [dispatch, podcastId]);

  if (loading) {
    return (
      <div className="w-full">
        <Skeleton width="mb-4 w-full" />
        <Skeleton width="w-full" density={6} />
      </div>
    );
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <div className="flex flex-col w-11/12">
      <div className="px-8 py-4 mb-2 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        Episodes: {episodes.length}
      </div>
      <div className="flex flex-col p-4 overflow-auto bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th>Title</th>
              <th>Date</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {episodes.map((episode) => (
              <tr className="my-4 text-sm border-t border-gray-200" key={`episode-${episode.trackId}`}>
                <td className="p-2 text-blue-400">
                  <NavLink to={`episode/${episode.trackId}`}>{episode.trackName}</NavLink>
                </td>
                <td>{new Date(episode.releaseDate).toLocaleDateString()}</td>
                <td>{(episode.trackTimeMillis / 60000).toFixed(2)} minutes</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Outlet />
      </div>
    </div>
  );
}
