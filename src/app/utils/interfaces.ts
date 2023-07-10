import { wordCount } from "@/app/utils/wordCount";
export interface ISong {
  id: number;
  title: string;
  url: string;
  lyrics: string;
  albumArt: string;
}

export interface IUpdateDbResponse {
  data: {
    newWordsCount: number;
    skippedWordsCount: number;
  };
}
export interface IUpdateDbRes {
  newWordsCount: number;
  skippedWordsCount: number;
}


export interface IYouTubeSearchResponse {
  kind: "youtube#searchListResponse";
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YouTubeSearchResult[];
}

interface YouTubeSearchResult {
  kind: "youtube#searchResult";
  etag: string;
  id: YouTubeVideoId;
}

interface YouTubeVideoId {
  kind: string;
  videoId: string;
}
