import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import Episodes from '../components/Episodes';
import Header from '../components/Header';
import PodcastDetailCard from '../components/PodcastDetailCard';
import { RootState } from '../state/store';
import Episode from './Episode';

export default function PodcastDetail() {
  const params = useParams<{ podcastId: string }>();
  const location = useLocation();
  const { podcasts } = useSelector((state: RootState) => state.podcasts);
  const isEpisodePage = location.pathname.includes('/episode/');

  const podcast = podcasts?.find((pod) => pod.id.attributes['im:id'] === params.podcastId);

  return (
    <>
      <Header />
      <div className="flex flex-row gap-8">
        {podcast && <PodcastDetailCard podcast={podcast} />}
        {!isEpisodePage ? <Episodes /> : <Episode />}
      </div>
    </>
  );
}
