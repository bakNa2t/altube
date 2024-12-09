import { Thumbnails } from "./videos";

export interface IVideoDetails {
  contentDetails: IContentDetails;
  id: string;
  kind?: string;
  snippet: Snippet;
  statistics: Statistics;
}

export interface IContentDetails {
  caption: boolean;
  contentRating?: object;
  definition: string;
  dimension: string;
  duration: string;
  licensedContent: boolean;
  projection: string;
}

export interface Snippet {
  categoryId: string;
  channelId: string;
  channelTitle: string;
  defaultAudioLanguage: string;
  description: string;
  liveBroadcastContent: string;
  localized: Localized;
  publishedAt: string;
  thumbnails: Thumbnails;
  title: string;
}

export interface Localized {
  description: string;
  title: string;
}

export interface Statistics {
  commentCount: string;
  favoriteCount: string;
  likeCount: string;
  viewCount: string;
}
