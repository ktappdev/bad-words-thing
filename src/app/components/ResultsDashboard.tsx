"use client";
import React, { useState } from "react";
import { useAtom } from "jotai";
import { songAtom, songData } from "../store/store";
import { ISong } from "../utils/interfaces";
import Image from "next/image";
import Link from "next/link";
interface singInfo {
  curseWords: {
    count: number;
    linesToEdit: string[];
  };
  error?: string;
}

const ResultsDashboard = () => {
  const [songInfo, setSongInfo] = useAtom<singInfo>(songData);
  const [song_Atom, setSongAtom] = useAtom<ISong | null>(songAtom);

  if (songInfo.curseWords.count === 0) {
    return <div>The song is clean or you did not provide lyrics</div>;
  }


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto p-4">
        <div
          id="main_card"
          className="flrx flex-col bg-white shadow-lg rounded-lg p-6"
        >
          <div className="flex flex-row flex-1 w-full justify-center gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-4">{song_Atom?.title}</h2>
              <div>
                <h3 className="text-lg font-bold mb-2">
                  Number of Profanities:
                </h3>
                <p>{songInfo.curseWords.count}</p>
              </div>
              <div>
                <Link
                  href={song_Atom?.url!}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Lyrics
                </Link>
              </div>
            </div>
            <div>
              <Image
                src={song_Atom?.albumArt!}
                alt="album art"
                width={180}
                height={180}
              ></Image>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Bad lyrics to edit:</h3>
            <ul>
              {songInfo.curseWords.linesToEdit.map((lyric, index) => (
                <li
                  key={index}
                  className="flex items-center mb-2 border border-gray-300 rounded px-2 py-1"
                >
                  <span className="mr-2">10%</span>
                  <span>{lyric}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;
