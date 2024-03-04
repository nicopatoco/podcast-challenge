import { useLocation, useParams } from 'react-router-dom';
import Episodes from '../components/Episodes';
import Header from '../components/header';
import Episode from './Episode';

export default function PodcastDetail() {
  const params = useParams<{ podcastId: string }>();
  const location = useLocation();
  const isEpisodePage = location.pathname.includes('/episode/');

  return (
    <>
      <Header />
      <div className="flex flex-row gap-8">
        <div>Podcast {params.podcastId}</div>
        {!isEpisodePage ? <Episodes /> : <Episode />}
      </div>
    </>
  );
}
