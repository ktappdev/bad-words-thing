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
  const [songName, setSongName] = useState("");
  // const [textAreaInput, setTextAreaInput] = useState("");
  const [songInfo, setSongInfo] = useAtom(songData);
  const [lyrics_Atom, setLyricsAtom] = useAtom(lyricsAtom);
  const [wordCount_Atom, setWordCountAtom] = useAtom(wordCountAtom);
  const [song_Atom, setSongAtom] = useAtom(songAtom);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [disableCancelButton, setDisableCancelButton] = useState<boolean>(true);
  const [buttonText, setButtonText] = useState<string>("Submit");
  const [buttonColour, setButtonColour] = useState<boolean>(true);

  const handleTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };
  const handleSongNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSongName(e.target.value);
  };

  // const handleTextAreaInputChange = async (
  //   e: ChangeEvent<HTMLTextAreaElement>
  // ) => {
  //   setTextAreaInput(e.target.value);
  // };

  const handleTextInputSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (textInput.trim() === "" || songName.trim() === "") {
      alert("Please enter a song name and artist name");
      return
    }


    const searchText = () => {
      if (textInput.length > 0 && songName.length > 0) {
        return textInput + " -- " + songName;
      }
      else {
        return //cancel
      }
    }
    e.preventDefault();
    const searchtext = searchText();

    setDisableButton(true);
    setButtonText("Please Wait...");
    setButtonColour(false);
    setDisableCancelButton(false);
    try {
      const response: IResponse = await axios.post("/api/getlyrics", {
        searchtext,
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
    } catch (error) {
    } finally {
      setDisableCancelButton(false);
    }
  };

  const handleCancelButtonClick = () => {
    // e.preventDefault();
    window.location.reload();
    setDisableButton(false);
    setButtonText("Submit");
    setButtonColour(true);
  };

  return (
    <div className="container mx-auto p-2 flex flex-col items-center w-full">


      <div className="text-center pt-2">
        <h1 className="text-5xl font-extrabold text-pink-600 hover:text-pink-800 transform transition-transform hover:scale-105">Bad Words Detective</h1>
        <h1 className="text-4xl font-semibold text-blue-500 hover:text-blue-700 transform transition-transform hover:scale-105">by Lugetech</h1>
        <p className="text-sm md:text-lg text-gray-600 mt-4">
          Your Song Lyrics Scanner for Radio-Friendly Tunes. Find those not-so-obvious words in songs that might not be radio-friendly. Not just the regular bad words.
        </p>
        <p className="text-xs text-gray-600">
          lugetechgy@gmail.com
        </p>
      </div>



      <form className="mb-4 md:px-24 w-full" onSubmit={handleTextInputSubmit}>
        <label className="block mt-2 font-bold text-gray-700">
          Artist Name:
        </label>
        <input
          // placeholder="Artist Name"
          disabled={disableButton}
          className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none "
          type="text"
          value={textInput}
          onChange={handleTextInputChange}
        />
        <label className="block mt-2 font-bold text-gray-700">
          Song Title:
        </label>
        <input
          // placeholder="Song Title"
          disabled={disableButton}
          className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none "
          type="text"
          value={songName}
          onChange={handleSongNameChange}
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
        <button
          disabled={disableCancelButton}
          type="button"
          onClick={handleCancelButtonClick}
          className={
            !disableCancelButton
              ? "mt-2 ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:bg-red-600"
              : "mt-2 ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:bg-gray-600"
          }
        // className="mt-2 ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:bg-red-600"
        >
          Cancel
        </button>
      </form>
      <footer className="mt-4">
        <p className="text-sm text-gray-600">
          © 2023 Lugetech. All rights reserved.
        </p>

      </footer>
    </div>
  );
};

export default Main;
