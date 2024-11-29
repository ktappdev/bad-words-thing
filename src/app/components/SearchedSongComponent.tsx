// components/SearchedSongComponent.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getLastThreeSearchedSongs } from "../utils/getLastThreeSearchedSongs";
import { IlastThreeSongs } from "../utils/interfaces";

const SearchedSongComponent = () => {
  const [songs, setSongs] = useState<IlastThreeSongs[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getLastThreeSongs = async () => {
      try {
        const songsData = await getLastThreeSearchedSongs();
        setSongs(songsData);
      } catch (error) {
        console.error("Error fetching songs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getLastThreeSongs();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (songs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-gray-500">
        <svg
          className="w-12 h-12 mb-3 text-gray-400"
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
        <p className="text-sm">No recent searches yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 w-full">
      {songs.map((song) => (
        <div
          key={song.id}
          className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
        >
          <Link
            href={`/search?q=${song.query}`}
            className="block p-4 hover:bg-gray-50"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {song.query}
                </h3>
                <div className="mt-1 flex items-center space-x-2 text-sm">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {song.badWords} bad words
                  </span>
                  <span className="text-gray-500 text-xs">
                    {new Date(song.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              <div className="ml-2">
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      ))}

      {songs.length > 0 && (
        <div className="pt-2 text-center">
          <span className="text-sm text-gray-600">
            Found {songs.length} results
          </span>
        </div>
      )}
    </div>
  );
};

export default SearchedSongComponent;
