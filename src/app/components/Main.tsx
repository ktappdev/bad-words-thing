"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useAtom } from "jotai";
import { songAtom, songData } from "../store/store";
import { lyricsAtom } from "../store/store";
import { ISongInfo } from "../store/store";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ISong } from "../utils/interfaces";
import SmallLoadingSpinner from "./LoadingSpinner";

interface IResponse {
  data: {
    songLyrics: string;
    error?: string;
    song: ISong;
  };
}
const Main: React.FC = () => {
  const router = useRouter();
  const [textInput, setTextInput] = useState("");
  const [textAreaInput, setTextAreaInput] = useState("");
  const [songInfo, setSongInfo] = useAtom(songData);
  const [lyrics_Atom, setLyricsAtom] = useAtom(lyricsAtom);
  const [song_Atom, setSongAtom] = useAtom(songAtom);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("Submit");

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
    try {
      const response: IResponse = await axios.post("/api/getlyrics", {
        textInput,
      });
      setLyricsAtom(response.data.songLyrics);

      let lyrics = response.data.songLyrics;
      let song = response.data.song;
      setSongAtom(song);
      const processedResponse = await axios.post("/api/processtext", {
        lyrics,
      });
      let res = processedResponse.data as unknown as ISongInfo;
      setSongInfo(res);
      router.push("/results");
    } catch (error) {}
  };

  const handleTextAreaSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/processtext", { textAreaInput });
      let res = response.data as ISongInfo;
      setSongInfo(res);
      //   ;
      router.push("/results");
    } catch (error) {}
  };

  const handleTextAreaClear = () => {
    setTextAreaInput("");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-2 text-sm text-gray-500">
        <p>For best results use the format:</p>
        <p className=" font-semibold">Artist Name - Song Title</p>
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
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:bg-blue-600"
        >
          {buttonText}
          {/* <SmallLoadingSpinner /> */}
        </button>
      </form>
      <form className="mb-4" onSubmit={handleTextAreaSubmit}>
        <label className="block mb-2 font-bold text-gray-700">
          Paste lyrics here:
        </label>
        <textarea
          disabled={disableButton}
          className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
          rows={4}
          value={textAreaInput}
          onChange={handleTextAreaInputChange}
        ></textarea>
        <div className="mt-2 space-x-2">
          <button
            disabled={disableButton}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:bg-blue-600"
          >
            {buttonText}
          </button>
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 focus:bg-gray-400"
            onClick={handleTextAreaClear}
            disabled={disableButton}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default Main;
