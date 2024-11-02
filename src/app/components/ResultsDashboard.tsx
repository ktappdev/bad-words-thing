"use client";

import React, { Suspense } from "react";
import { useAtom } from "jotai";
import { songAtom, songData, wordCountAtom } from "../store/store";
import { ISong } from "../utils/interfaces";
import Image from "next/image";
import Link from "next/link";

interface SongInfo {
  curseWords: {
    count: number;
    linesToEdit: string[];
  };
  percentages: string[];
  error?: string;
}

const ResultsDashboard = () => {
  const [songInfo] = useAtom<SongInfo>(songData);
  const [song] = useAtom<ISong | null>(songAtom);
  const [wordCount] = useAtom(wordCountAtom);

  const removeIdentifierAndStyleRed = (lyric: string) => {
    const regex = /ADmCby4J\s{1,3}(\w+)/g;
    let result = lyric;
    let match;
    while ((match = regex.exec(lyric)) !== null) {
      const word = match[1];
      result = result.replace(
        match[0],
        `<span class="text-red-500 font-semibold">${word}</span>`,
      );
    }
    return result.replace(/ADmCby4J/g, "");
  };

  if (songInfo.curseWords?.count === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center space-y-6">
          {song?.title ? (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Song is Clean! 🎉
              </h2>
              <div className="space-y-4">
                <p className="text-lg text-gray-600">{song.title}</p>
                <Image
                  src={song.albumArt!}
                  alt={song.title!}
                  width={300}
                  height={300}
                  className="rounded-lg shadow-md mx-auto transition-transform hover:scale-105"
                />
                <Link
                  href={song.url!}
                  className="text-blue-500 hover:text-blue-600 underline block"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  View Full Lyrics
                </Link>
              </div>
            </>
          ) : (
            <p className="text-red-500">
              Error: Could not find song information
            </p>
          )}
          <Link
            href="/"
            className="inline-block mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            ← Back to Search
          </Link>
        </div>
      </div>
    );
  }

  songInfo.curseWords.linesToEdit.shift();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold">
                  {song?.title}
                </h1>
                <div className="flex gap-6">
                  <div>
                    <p className="text-sm opacity-80">Bad Words</p>
                    <p className="text-xl font-bold">
                      {songInfo.curseWords?.count}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Total Words</p>
                    <p className="text-xl font-bold">{wordCount}</p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <Image
                  src={song?.albumArt!}
                  alt="Album Art"
                  width={150}
                  height={150}
                  className="rounded-lg shadow-lg transition-transform hover:scale-105"
                />
                <p className="mt-2 text-sm opacity-80">
                  Released: {song?.releaseDate}
                </p>
                <Link
                  href={song?.url!}
                  className="mt-2 text-sm underline hover:text-blue-200"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  View Original Lyrics
                </Link>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Lyrics Analysis
            </h2>
            <div className="space-y-3">
              {songInfo.curseWords.linesToEdit.map((lyric: any, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="min-w-[60px] text-center">
                    <span className="font-mono text-sm text-gray-600">
                      {songInfo.percentages[index]}%
                    </span>
                  </div>
                  <div className="flex-1">
                    <span
                      className="text-gray-700"
                      dangerouslySetInnerHTML={{
                        __html: removeIdentifierAndStyleRed(lyric.badWords),
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4">
            <Link
              href="/"
              className="inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Search
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;
