"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useAtom } from "jotai";
import { songAtom, songData, wordCountAtom } from "../store/store";
import { lyricsAtom } from "../store/store";
import { ISongInfo } from "../store/store";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ISong } from "../utils/interfaces";

interface IResponse {
  data: {
    songLyrics: string;
    error?: string;
    song: ISong;
    wordCount: number;
    songDuration: number;
  };
}
const Main: React.FC = () => {
  const router = useRouter();
  const [textInput, setTextInput] = useState("");
  const [textAreaInput, setTextAreaInput] = useState("");
  const [songInfo, setSongInfo] = useAtom(songData);
  const [lyrics_Atom, setLyricsAtom] = useAtom(lyricsAtom);
  const [wordCount_Atom, setWordCountAtom] = useAtom(wordCountAtom);
  const [song_Atom, setSongAtom] = useAtom(songAtom);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("Submit");
  const [buttonColour, setButtonColour] = useState<boolean>(true);

  const handleTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };

  const handleTextAreaInputChange = async (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTextAreaInput(e.target.value);
  };

  const handleTextInputSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisableButton(true);
    setButtonText("Please Wait...");
    setButtonColour(false);
    try {
      const response: IResponse = await axios.post("/api/getlyrics", {
        textInput,
      });

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
    } catch (error) {}
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center">
        <p className=" text-2xl font-extrabold text-gray-600 mb-4 ">
          [bad words thing]
        </p>
      </div>

      <form className="mb-4" onSubmit={handleTextInputSubmit}>
        <label className="block mb-2 font-bold text-gray-700">
          Song Search:
        </label>
        <input
          placeholder="Artist Name - Song Title"
          disabled={disableButton}
          className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
          type="text"
          value={textInput}
          onChange={handleTextInputChange}
        />
        <button
          disabled={disableButton}
          className={
            buttonColour
              ? "mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:bg-blue-600"
              : "mt-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:bg-gray-600"
          }
        >
          {buttonText}
          {/* <SmallLoadingSpinner /> */}
        </button>
      </form>
    </div>
  );
};

export default Main;
