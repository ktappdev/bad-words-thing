"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useAtom } from "jotai";
import { songAtom, songData, wordCountAtom } from "../store/store";
import { lyricsAtom } from "../store/store";
import { ISongInfo } from "../store/store";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ISong } from "../utils/interfaces";
import BadWordsInDb from "./BadWordsInDb";
import SearchedSongComponent from "./SearchedSongComponent";

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
    e.preventDefault();
    //quick content check
    if (textInput.trim() === "" || songName.trim() === "") {
      alert("Please enter a song name and artist name");
      return;
    }
    const searchText = () => {
      if (textInput.length > 0 && songName.length > 0) {
        return textInput + " -- " + songName; // i used double hyphens because some names would have hyphens in them, but hopefully not double
      } else {
        return; //not necesaary but can't hurt
      }
    };
    const searchtext = searchText(); //ok so this is the function that returns the song name and artist name
    // update the ui
    setDisableButton(true);
    setButtonText("Please Wait...");
    setButtonColour(false);
    setDisableCancelButton(false);
    // so this is tthe search endpoint, we send the artist and song name here and get back the lyrics.
    // getlyrics endpoint goes like this:
    /*
    it splits the input text at double hyphens, retrieves data from the request, 
    and sets options for a song search. If the title or artist options are empty, 
    it returns an error response. Otherwise, it uses the options to retrieve a 
    song and perform some operations on the lyrics and duration. Finally, 
    it returns a JSON response with the song, word count, and duration information. 
    If an error occurs, it returns an error response.
    */
    try {
      const response: IResponse = await axios.post("/api/getlyrics", {
        searchtext,
      }); // here i also hit youtube to get song duration

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
      let res = processedResponse.data as unknown as ISongInfo;
      setSongInfo(res);
      // write to the databaase
      const addSearchedSongToDb = await axios.post("/api/addsearchedsong", {
        badWords: res.curseWords.count,
        songTitle: song.title,
      });
      // console.log("song added to db", addSearchedSongToDb)
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
    <div className="container mx-auto flex w-full flex-col items-center p-2 min-h-screen">
      <div className="text-center md:w-3/4 mx-auto py-4">
        <h1 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-800 transition-transform hover:scale-105 p-4 text-5xl md:text-7xl">
          Bad Words Thing
        </h1>
        <h1 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-700 transition-transform hover:scale-105 md:text-3xl">
          by Lugetech
        </h1>
        <p className="mt-4 text-gray-600 md:text-lg md:w-96 mx-auto">
          Find those not-so-obvious words in songs that might not be
          radio-friendly. Not just the regular bad words.
        </p>
        <p className="text-sm text-gray-500">lugetechgy@gmail.com</p>
      </div>
      <div className="w-4xl  gap-2  md:mt-8 ">
        <div className="w-full min-h-full" id="main-content">
          <div className="flex p-2 bg-gradient-to-r from-pink-600 to-blue-800 transition-transform w-full gap-2 flex-col md:flex-row sm:justify-center sm:items-center">
            <form
              className="mb-4 md:flex-col md:w-1/2"
              onSubmit={handleTextInputSubmit}
            >
              {/* <label className="mt-2 block text-gray-700">Artist Name:</label> */}
              <input
                placeholder="Artist Name"
                disabled={disableButton}
                className="w-full rounded border mb-2 border-gray-300 p-2 focus:border-blue-500 focus:outline-none "
                type="text"
                value={textInput}
                onChange={handleTextInputChange}
                autoComplete="off"
                required
                autoFocus
              />
              {/* <label className="mt-2 block text-gray-700">Song Title:</label> */}
              <input
                placeholder="Song Title"
                disabled={disableButton}
                className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none "
                type="text"
                value={songName}
                onChange={handleSongNameChange}
                autoComplete="off"
                required
              />
              <button
                disabled={disableButton}
                className={
                  buttonColour
                    ? "mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-600 shadow-lg"
                    : "mt-2 rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 focus:bg-gray-600"
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
                    ? "ml-2 mt-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:bg-red-600 shadow-lg"
                    : "ml-2 mt-2 rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 focus:bg-gray-600"
                }
                // className="mt-2 ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:bg-red-600"
              >
                Cancel
              </button>
            </form>
            <div className="flex flex-col w-full flex-wrap items-center justify-center rounded bg-gradient-to-r from-pink-600 to-blue-800 transition-transform p-2 md:flex md:w-1/2">
              <h1 className="flex text-center text-xl font-extrabold text">
                Previous Searches{" "}
              </h1>
              <SearchedSongComponent />
            </div>
          </div>
          <footer className="mt-2">
            <div className="text-center text-sm text-gray-600">
              <BadWordsInDb />
            </div>
            <p className="text-xs text-center text-gray-400">
              © 2023 Lugetech. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Main;
