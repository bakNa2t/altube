export interface IVideoComments {
  id: string;
  kind: string;
  snippet: Snippet;
}

export interface Snippet {
  canReply: boolean;
  channelId: string;
  isPublic: boolean;
  topLevelComment: TopLevelComment;
  totalReplyCount: number;
  videoId: string;
}

export interface TopLevelComment {
  id: string;
  kind: string;
  snippet: Snippet2;
}

export interface Snippet2 {
  authorChannelId: AuthorChannelId;
  authorChannelUrl: string;
  authorDisplayName: string;
  authorProfileImageUrl: string;
  canRate: boolean;
  channelId: string;
  likeCount: number;
  publishedAt: string;
  textDisplay: string;
  textOriginal: string;
  updatedAt: string;
  videoId: string;
  videoRating: string;
}

export interface AuthorChannelId {
  value: string;
}
