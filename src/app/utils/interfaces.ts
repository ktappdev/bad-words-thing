import { wordCount } from '@/app/utils/wordCount';
export interface ISong {
  id: number;
  title: string;
  url: string;
  lyrics: string;
  albumArt: string;
}
