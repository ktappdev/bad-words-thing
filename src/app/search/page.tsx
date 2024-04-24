"use client";
import { useSearchParams } from "next/navigation";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useAtom } from "jotai";
import { songAtom, songData, wordCountAtom } from "../store/store";
import { lyricsAtom } from "../store/store";
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
  const [textInput, setTextInput] = useState("");
  const [songName, setSongName] = useState("");
  const [songInfo, setSongInfo] = useAtom(songData);
  const [lyrics_Atom, setLyricsAtom] = useAtom(lyricsAtom);
  const [wordCount_Atom, setWordCountAtom] = useAtom(wordCountAtom);
  const [song_Atom, setSongAtom] = useAtom(songAtom);

  const search = useSearchParams().get("q");

  useEffect(() => {
    async function fetchData() {
      const spl = search!.split(/\s+by\s+/);
      const searchtext = spl![1] + " -- " + spl![0];
      try {
        const response: IResponse = await axios.post("/api/getlyrics", {
          searchtext,
        }); // here i also hit youtube to get song duration - april 24 i disabled youtube

        setLyricsAtom(response.data.song.lyrics);
        let lyricsWordCount = response.data.wordCount;
        setWordCountAtom(lyricsWordCount);
        let lyrics = response.data.song.lyrics;
        let song = response.data.song;
        let songDuration = response.data.songDuration;
        setSongAtom(song);
        let packageToProcess = { lyrics, songDuration, lyricsWordCount };
        const processedResponse = await axios.post("/api/processtext", {
          packageToProcess,
        });
        // console.log(processedResponse.data);
        let res = processedResponse.data as unknown as ISongInfo;
        setSongInfo(res);

        router.push("/results");
      } catch (error) {
      } finally {
      }
    }
    fetchData();
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Compiling data... </h1>
      <p className="text-2xl font-bold">for {search}</p>
    </div>
  );
}
