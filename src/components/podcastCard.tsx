import { PodcastEntry } from '../types/podcast';

export default function PodcastCard({ podcast }: { podcast: PodcastEntry }) {
  return (
    <div className="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center">
        <div className="mb-3 w-24 h-24 overflow-hidden rounded-full shadow-lg">
          <img
            className="w-full h-full object-cover"
            src={podcast['im:image'][2].label}
            alt={podcast['im:image'][2].label}
          />
        </div>
        <div className="text-center">
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white uppercase">
            <div className="line-clamp-2 text-sm">{podcast['im:name'].label}</div>
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400 italic">Author: {podcast['im:artist'].label}</span>
        </div>
      </div>
    </div>
  );
}
