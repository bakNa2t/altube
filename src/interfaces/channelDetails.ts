import { Thumbnails } from "./videos";

export interface IChannelDetails {
  id: string;
  kind: string;
  snippet: Snippet;
  contentDetails: ContentDetails;
  statistics: Statistics;
  brandingSettings: BrandingSettings;
}

export interface Snippet {
  title: string;
  description: string;
  customUrl: string;
  publishedAt: string;
  thumbnails: Thumbnails;
  localized: Localized;
  country: string;
}

export interface Localized {
  title: string;
  description: string;
}

export interface ContentDetails {
  relatedPlaylists: { likes: string; uploads: string };
}

export interface Statistics {
  viewCount: string;
  subscriberCount: string;
  hiddenSubscriberCount: string;
  videoCount: string;
}

export interface BrandingSettings {
  channel: Channel;
  image: { bannerExternalUrl: string };
}

export interface Channel {
  title: string;
  description: string;
  keywords: string;
  unsubscribedTrailer: string;
  country: string;
}
