export interface PodcastEpisode {
  country: string;
  closedCaptioning: string;
  collectionId: number;
  collectionName: string;
  description: string;
  artistIds: number[];
  feedUrl: string;
  releaseDate: number; // checkThis
  trackId: number;
  trackName: string;
  shortDescription: string;
  artworkUrl160: string;
  episodeFileExtension: string;
  episodeContentType: string;
  previewUrl: string;
  artworkUrl600: string;
  episodeUrl: string;
  trackViewUrl: string;
  artworkUrl60: string;
  artistViewUrl: string;
  contentAdvisoryRating: string;
  collectionViewUrl: string;
  trackTimeMillis: number;
  kind: string;
  wrapperType: string;
  episodeGuid: string;
  genres: Genre[];
}

interface Genre {
  name: string;
  id: string;
}
