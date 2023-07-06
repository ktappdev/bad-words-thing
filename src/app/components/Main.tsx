"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useAtom } from "jotai";
import { songData } from "../store/store";
import { lyricsAtom } from "../store/store";
import { ISongInfo } from "../store/store";
import { useRouter } from "next/navigation";
import axios from "axios";

interface IResponse {
  data: {
    songLyrics: string;
  };
}
const Main: React.FC = () => {
  const router = useRouter();
  const [textInput, setTextInput] = useState("");
  const [textAreaInput, setTextAreaInput] = useState("");
  const [songInfo, setSongInfo] = useAtom(songData);
  const [lyricsAton, setLyricsAtom] = useAtom(lyricsAtom);

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
    try {
      console.log(1);
      const response: IResponse = await axios.post("/api/getlyrics", {
        textInput,
      });
      console.log(2);
      setLyricsAtom(response.data.songLyrics);

      let lyrics = response.data.songLyrics;
      console.log(lyrics);
      const processedResponse = await axios.post("/api/processtext", {
        lyrics,
      });
      console.log(3);
      console.log(processedResponse.data);
      let res = processedResponse.data as unknown as ISongInfo;
      console.log(4);
      setSongInfo(res);
      console.log(5);
      router.push("/results");
    } catch (error) {
      console.error(error);
    }
  };

  const handleTextAreaSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/processtext", { textAreaInput });
      let res = response.data as ISongInfo;
      setSongInfo(res);
      //   console.log("Text Area Input:", response.data);
      router.push("/results");
    } catch (error) {
      console.error(error);
    }
  };

  const handleTextAreaClear = () => {
    setTextAreaInput("");
  };

  return (
    <div className="container mx-auto p-4">
      <form className="mb-4" onSubmit={handleTextInputSubmit}>
        <label className="block mb-2">Text Input:</label>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          type="text"
          value={textInput}
          onChange={handleTextInputChange}
        />
        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
      <form className="mb-4" onSubmit={handleTextAreaSubmit}>
        <label className="block mb-2">Text Area:</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          rows={4}
          value={textAreaInput}
          onChange={handleTextAreaInputChange}
        ></textarea>
        <div className="mt-2 space-x-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Submit
          </button>
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
            onClick={handleTextAreaClear}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default Main;
