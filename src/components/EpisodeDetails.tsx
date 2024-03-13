import { PodcastEpisode } from '../types/episode';
import AudioPlayer from './AudioPlayer';

type EpisodeProps = {
  episode: PodcastEpisode;
};

export default function EpisodeDetails({ episode }: EpisodeProps) {
  // Function to create markup
  const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent };
  };

  return (
    <div className="flex flex-col">
      <div className="p-2 mb-2 bg-white border border-gray-200 rounded-lg shadow-md max-w-88 dark:bg-gray-800 dark:border-gray-700">
        <div className="mb-2 font-bold text-xxl">{episode.trackName}</div>
        {/* Use dangerouslySetInnerHTML to render HTML */}
        <p className="mb-8 text-xs" dangerouslySetInnerHTML={createMarkup(episode.description)}></p>
        <AudioPlayer src={episode.episodeUrl} />
      </div>
    </div>
  );
}
