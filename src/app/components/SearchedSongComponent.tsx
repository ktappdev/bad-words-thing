"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getLastThreeSearchedSongs } from "../utils/getLastThreeSearchedSongs";
import { IlastThreeSongs } from "../utils/interfaces";

const SearchedSongComponent = () => {
  const [songs, setSongs] = useState<IlastThreeSongs[]>([]);

  useEffect(() => {
    const getLastThreeSongs = async () => {
      const songsData = await getLastThreeSearchedSongs();
      setSongs(songsData);
    };

    getLastThreeSongs();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {songs.map((song) => (
        <div
          className="flex flex-col items-center justify-center p-1  bg-gradient-to-r from-pink-600 to-blue-800 transition-transform w-full mb-2 border border-gray-700 rounded-lg"
          key={song.id}
        >
          <Link href={`/search?q=${song.query}`}>
            <p className="text-sm text-white">{song.query}</p>
          </Link>
          <p className="text-xs text-white">Bad Words: {song.badWords}</p>
          <p className="text-xs text-white font-thin">{song.date.toString()}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchedSongComponent;
