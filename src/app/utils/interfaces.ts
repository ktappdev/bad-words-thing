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
