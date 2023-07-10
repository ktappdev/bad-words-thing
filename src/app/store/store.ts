import { atom } from "jotai";
import { ISong } from "../utils/interfaces";

export interface ISongInfo {
  curseWords: {
    count: number;
    linesToEdit: string[];
  };
}



export const songData = atom<ISongInfo>({
  curseWords: {
    count: 0,
    linesToEdit: [] ,
  },
});

export const lyricsAtom = atom<string>("");

export const wordCountAtom = atom<number>(0);

export const songAtom = atom<ISong | null>(null)

