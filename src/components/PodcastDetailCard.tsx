import { PodcastEntry } from '../types/podcast';

export default function PodcastDetailCard({ podcast }: { podcast: PodcastEntry }) {
  return (
    <div className="w-full px-8 py-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center">
        <div className="w-48 h-48 mb-3">
          <img className="w-full h-full center" src={podcast['im:image'][2].label} alt={podcast['im:image'][2].label} />
        </div>
      </div>
      <div className="my-4 border-t border-gray-200"></div>
      <div className="ml-2 text-base font-bold">{podcast['im:name'].label}</div>
      <div className="ml-2 text-sm italic">by {podcast['im:name'].label}</div>
      <div className="my-4 border-t border-gray-200"></div>
      <div className="text-base font-bold">Desciption </div>
      <div className="text-sm italic">{podcast.summary.label}</div>
    </div>
  );
}
