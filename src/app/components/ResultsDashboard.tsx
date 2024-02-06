"use client";
import React, { Suspense, useState } from "react";
import { useAtom } from "jotai";
import { songAtom, songData, wordCountAtom } from "../store/store";
import { ISong } from "../utils/interfaces";
import Image from "next/image";
import Link from "next/link";
interface singInfo {
  curseWords: {
    count: number;
    linesToEdit: string[];
  };
  timeFromPercentage: string[];
  error?: string;
}

interface IParam {
  percentageIntoSong: number;
  badWords: string;
}

const ResultsDashboard = () => {
  const [songInfo, setSongInfo] = useAtom<singInfo>(songData);
  const [song_Atom, setSongAtom] = useAtom<ISong | null>(songAtom);
  const [wordCount_Atom, setWordCountAtom] = useAtom(wordCountAtom);

  if (songInfo.curseWords?.count === 0) {
    return (
      <div className="flex flex-col items-center justify-center  bg-gray-100">
        {song_Atom?.title ? (
          <div className="flex flex-col items-center justify-center">
            {song_Atom?.title} is clean -
            <Link
              href={song_Atom?.url!}
              rel="noopener noreferrer"
              target="_blank"
            >
              Click here for lyrics
            </Link>
            <Image src={song_Atom?.albumArt!} alt={song_Atom?.title!}
              width={300} height={300} />
          </div>
        ) : (
          <p className="text-red-400">
            Minor error - Did not find a song or something went wrong.
          </p>
        )}
        <div className="mt-4">
          <Link href="/">Go Back</Link>
        </div>
      </div>
    );
  }

  songInfo.curseWords.linesToEdit.shift();

  const removeIdentifierAndStyleRed = (lyric: any) => {
    const regex = /ADmCby4J\s{1,3}(\w+)/g;

    let result = lyric;
    let match;
    while ((match = regex.exec(lyric)) !== null) {
      const word = match[1];
      result = result.replace(match[0], `<span class="text-red-500">${word}</span>`);
    }
    return result.replace(/ADmCby4J/g, "")
    // .replace(/ADmCby4J/g, "")
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center">
      <div className="container mx-auto p-4">
        <div
          id="main_card"
          className="flrx flex-col bg-white shadow-lg rounded-lg p-6"
        >
          <div className="flex flex-row flex-1 w-full justify-center gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-4">{song_Atom?.title}</h2>
              <div>
                <h3 className="md:text-lg font-bold ">Bad Words:</h3>
                <p>{songInfo.curseWords?.count}</p>
              </div>
              <div>
                <h3 className="md:text-lg font-bold ">Word count:</h3>
                <p>{wordCount_Atom}</p>
              </div>
              <div className="mt-4">
                <Link href="/" className="my-2 text-blue-500 flex justify-start items-center "> Go Back</Link>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center ">
              <Image
                src={song_Atom?.albumArt!}
                alt="album art"
                width={180}
                height={180}
              ></Image>
              <div>
                <p className="mt-1 text-xs text-gray-500">Release Date {song_Atom?.releaseDate}</p>
                <Link
                  className="mt-2 text-blue-500 flex justify-center items-center"
                  href={song_Atom?.url!}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Lyrics
                </Link>
              </div>
              {/* <Link href="/" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:bg-blue-600 ">Back</Link> */}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="md:text-lg font-bold m-1">Bad words to edit:</h3>
            <ul>
              {songInfo.curseWords.linesToEdit.map((lyric: any, index) => (
                <li
                  key={index}
                  className="flex items-center mb-2 border border-gray-300 rounded px-2 py-1 gap-2"
                >
                  <Suspense fallback={<div>...</div>}>
                    <span>{songInfo.timeFromPercentage[index]}</span>
                  </Suspense>
                  <span
                    dangerouslySetInnerHTML={{ __html: removeIdentifierAndStyleRed(lyric.badWords) }}
                  />
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
