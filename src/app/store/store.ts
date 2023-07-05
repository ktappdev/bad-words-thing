import { atom } from "jotai";

interface singInfo {
  curseWords: {
    count: number;
    linesToEdit: string[];
  };
}

export const songData = atom<singInfo>({
  curseWords: {
    count: 0,
    linesToEdit: [],
  },
});
