import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import Episodes from '../components/Episodes';
import Header from '../components/Header';
import PodcastDetailCard from '../components/PodcastDetailCard';
import { RootState } from '../state/store';
import { PodcastEntry } from '../types/podcast';
import Episode from './Episode';

export default function PodcastDetail() {
  const params = useParams<{ podcastId: string }>();
  const location = useLocation();
  const { podcasts } = useSelector((state: RootState) => state.podcasts);

  const isEpisodePage = location.pathname.includes('/episode/');
  const podcast: PodcastEntry | undefined = podcasts?.find((pod) => pod.id.attributes['im:id'] === params.podcastId);

  return (
    <>
      <Header />
      {podcast && (
        <div className="flex gap-8">
          <div className="flex w-3/12 h-full">{<PodcastDetailCard podcast={podcast} />}</div>
          <div className="flex w-9/12 h-full">
            {!isEpisodePage ? <Episodes podcastId={podcast.id.attributes['im:id']} /> : <Episode />}
          </div>
        </div>
      )}
    </>
  );
}
