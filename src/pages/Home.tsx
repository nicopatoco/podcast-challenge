import { Link } from 'react-router-dom';

export default function Home() {
  const podcasts = [1, 2, 3, 4, 5, 6];

  return (
    <>
      <div className="flex flex-row my-4 justify-end gap-2">
        <div className="bg-blue-400 text-white rounded text-lg">100</div>
        <input className="border border-gray-400 mr-4 rounded text-lg w-64 h-8" placeholder="Filter podcast..."></input>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {podcasts.map((podcast) => (
          <Link key={podcast} to={`/podcast/${podcast}`}>
            <div className="bg-red-200 py-32 text-center">Podcasts {podcast}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
