"use client";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { songAtom, songData, wordCountAtom, lyricsAtom } from "../store/store";
import { ISongInfo } from "../store/store";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ISong } from "../utils/interfaces";

interface SearchParamsProps {
  searchParams: URLSearchParams;
}

interface IResponse {
  data: {
    songLyrics: string;
    error?: string;
    song: ISong;
    wordCount: number;
    songDuration: number;
    releaseDate: string;
  };
}

export default function SearchBar({ searchParams }: SearchParamsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  // Jotai states
  const [songInfo, setSongInfo] = useAtom(songData);
  const [lyrics_Atom, setLyricsAtom] = useAtom(lyricsAtom);
  const [wordCount_Atom, setWordCountAtom] = useAtom(wordCountAtom);
  const [song_Atom, setSongAtom] = useAtom(songAtom);

  const search = useSearchParams().get("q");

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        setProgress(20);
        const spl = search!.split(/\s+by\s+/);
        const searchtext = spl![1] + " -- " + spl![0];

        setProgress(40);
        const response: IResponse = await axios.post("/api/getlyrics", {
          searchtext,
        });

        setProgress(60);
        setLyricsAtom(response.data.song.lyrics);
        let lyricsWordCount = response.data.wordCount;
        setWordCountAtom(lyricsWordCount);
        let lyrics = response.data.song.lyrics;
        let song = response.data.song;
        let songDuration = response.data.songDuration;
        setSongAtom(song);

        setProgress(80);
        let packageToProcess = { lyrics, songDuration, lyricsWordCount };
        const processedResponse = await axios.post("/api/processtext", {
          packageToProcess,
        });

        let res = processedResponse.data as unknown as ISongInfo;
        setSongInfo(res);

        setProgress(100);
        router.push("/results");
      } catch (error) {
        setError("An error occurred while processing your request");
        setIsLoading(false);
      }
    }

    if (search) {
      fetchData();
    }
  }, [search]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {error ? (
            <div className="space-y-4">
              <div className="text-red-500">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Error Processing Request
              </h2>
              <p className="text-gray-600">{error}</p>
              <button
                onClick={() => router.push("/")}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="animate-pulse">
                <div className="w-16 h-16 mx-auto bg-blue-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                    />
                  </svg>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-800">
                  Analyzing Song
                </h2>
                <p className="text-gray-600">
                  {search && `Processing "${search}"`}
                </p>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="text-sm text-gray-500">
                {progress < 100 ? "Please wait..." : "Redirecting..."}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
