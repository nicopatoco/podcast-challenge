import { useParams } from 'react-router-dom';

export default function Episode() {
  const params = useParams<{ episodeId: string }>();

  return <div>Episode {params.episodeId}</div>;
}
