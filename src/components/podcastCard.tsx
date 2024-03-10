import { PodcastEntry } from '../types/podcast';

export default function PodcastCard({ podcast }: { podcast: PodcastEntry }) {
  return (
    <div className="h-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 mb-3 overflow-hidden rounded-full shadow-lg">
          <img
            className="object-cover w-full h-full"
            src={podcast['im:image'][2].label}
            alt={podcast['im:image'][2].label}
          />
        </div>
        <div className="text-center">
          <h5 className="mb-1 text-xl font-medium text-gray-900 uppercase dark:text-white">
            <div className="text-sm line-clamp-2">{podcast['im:name'].label}</div>
          </h5>
          <span className="text-sm italic text-gray-500 dark:text-gray-400">Author: {podcast['im:artist'].label}</span>
        </div>
      </div>
    </div>
  );
}
