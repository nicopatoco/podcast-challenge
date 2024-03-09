import { Link } from 'react-router-dom';
import { PodcastEntry } from '../types/podcast';
import PodcastCard from './PodcastCard';

type PodcastListProps = {
  podcasts: PodcastEntry[];
};

export default function PodcastList({ podcasts }: PodcastListProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {podcasts.map((podcast, i) => (
        <Link key={`podcast-${i}`} to={{ pathname: `/podcast/${podcast.id.attributes['im:id']}` }}>
          <PodcastCard podcast={podcast} />
        </Link>
      ))}
    </div>
  );
}
