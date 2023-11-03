'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { getLastThreeSearchedSongs } from "../utils/getLastThreeSearchedSongs"
import { IlastThreeSongs } from "../utils/interfaces"

const SearchedSongComponent = () => {
  const [songs, setSongs] = useState<IlastThreeSongs[]>([])

  useEffect(() => {
    const getLastThreeSongs = async () => {
      const songsData = await getLastThreeSearchedSongs()
      setSongs(songsData)
    }

    getLastThreeSongs()
  }, [])

  return (
    <div>
      {songs.map((song) => (
        <div className="flex flex-col items-center justify-center p-1  bg-white w-full mb-2 border-b-2" key={song.id}>
          <Link href={`/search/${song.query}`}>
            <p className="text-sm text-gray-800">{song.query}</p>
          </Link>
          <p className="text-xs text-gray-700">Bad Words: {song.badWords}</p>
          <p className="text-xs text-gray-700 font-thin">{song.date.toString()}</p>
        </div>
      ))}
    </div>
  )
}

export default SearchedSongComponent

