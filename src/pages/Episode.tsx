import { useParams } from 'react-router-dom';

export default function Episode() {
  const params = useParams<{ episodeId: string }>();

  return (
    <>
      <div className="flex flex-col">
        <div className="p-2 mb-2 bg-white border border-gray-200 rounded-lg shadow-md max-w-88 dark:bg-gray-800 dark:border-gray-700">
          <div>Episode: {params.episodeId}</div>
        </div>
      </div>
    </>
  );
}
