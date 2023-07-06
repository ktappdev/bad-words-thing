import { atom } from "jotai";

export interface ISongInfo {
  curseWords: {
    count: number;
    linesToEdit: string[];
  };
}

export const songData = atom<ISongInfo>({
  curseWords: {
    count: 0,
    linesToEdit: [],
  },
});
export const lyricsAtom = atom<string>("");
