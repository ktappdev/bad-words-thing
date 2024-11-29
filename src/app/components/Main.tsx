"use client";

import React, { useState, ChangeEvent, FormEvent, Suspense } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import axios from "axios";

// Components - Import directly, no dynamic import
import BadWordsInDb from "./BadWordsInDb";
import SearchedSongComponent from "./SearchedSongComponent";
import LoadingSpinner from "./LoadingSpinner";

// Store and Interfaces
import { songAtom, songData, wordCountAtom, lyricsAtom } from "../store/store";
import { ISongInfo } from "../store/store";
import { ISong } from "../utils/interfaces";

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

  // Form States
  const [textInput, setTextInput] = useState("");
  const [songName, setSongName] = useState("");

  // UI States
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [disableCancelButton, setDisableCancelButton] = useState<boolean>(true);
  const [buttonText, setButtonText] = useState<string>("Submit");
  const [buttonColour, setButtonColour] = useState<boolean>(true);

  // Jotai States
  const [songInfo, setSongInfo] = useAtom(songData);
  const [lyrics_Atom, setLyricsAtom] = useAtom(lyricsAtom);
  const [wordCount_Atom, setWordCountAtom] = useAtom(wordCountAtom);
  const [song_Atom, setSongAtom] = useAtom(songAtom);

  const handleTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };

  const handleSongNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSongName(e.target.value);
  };

  const handleTextInputSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (textInput.trim() === "" || songName.trim() === "") {
      alert("Please enter a song name and artist name");
      return;
    }

    const searchText = () => {
      if (textInput.length > 0 && songName.length > 0) {
        const searchString = textInput + " -- " + songName;
        console.log("🔍 Search string created:", searchString);
        return searchString;
      }
      return;
    };

    const searchtext = searchText();

    // Update UI state
    setDisableButton(true);
    setButtonText("Please Wait...");
    setButtonColour(false);
    setDisableCancelButton(false);

    try {
      console.log("📤 Sending request to /api/getlyrics with searchtext:", searchtext);
      const response: IResponse = await axios.post("/api/getlyrics", {
        searchtext,
      });
      console.log("📥 Received response from /api/getlyrics:", response.data);

      setLyricsAtom(response.data.song.lyrics);
      let lyricsWordCount = response.data.wordCount;
      setWordCountAtom(lyricsWordCount);
      let lyrics = response.data.song.lyrics;
      let song = response.data.song;
      let songDuration = response.data.songDuration;
      setSongAtom(song);

      console.log("📦 Preparing package to process:", { lyrics: lyrics.substring(0, 50) + "...", songDuration, lyricsWordCount });
      let packageToProcess = { lyrics, songDuration, lyricsWordCount };
      const processedResponse = await axios.post("/api/processtext", {
        packageToProcess,
      });
      console.log("✨ Processed response:", processedResponse.data);

      let res = processedResponse.data as unknown as ISongInfo;
      setSongInfo(res);

      // Write to database
      console.log("💾 Adding searched song to database:", { title: song.title, badWords: res.curseWords.count });
      await axios.post("/api/addsearchedsong", {
        badWords: res.curseWords.count,
        songTitle: song.title,
      });

      router.push("/results");
    } catch (error) {
      console.error("❌ Error details:", {
        message: error,
      });
      alert("An error occurred while processing your request");
    } finally {
      setDisableCancelButton(false);
    }
  };

  const handleCancelButtonClick = () => {
    window.location.reload();
    setDisableButton(false);
    setButtonText("Submit");
    setButtonColour(true);
  };

  const validateInput = (input: string): boolean => {
    return input.trim().length > 0 && !/^\d+$/.test(input);
  };

  const isFormValid = (): boolean => {
    return validateInput(textInput) && validateInput(songName);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Bad Words Thing
          </h1>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              by Lugetech
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find those not-so-obvious words in songs that might not be
              radio-friendly. Not just the regular bad words.
            </p>
            <p className="text-sm text-gray-500">lugetechgy@gmail.com</p>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Search Form */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Search a Song
              </h2>
              <form onSubmit={handleTextInputSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Artist Name
                  </label>
                  <input
                    placeholder="Enter artist name..."
                    disabled={disableButton}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    type="text"
                    value={textInput}
                    onChange={handleTextInputChange}
                    autoComplete="off"
                    required
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Song Title
                  </label>
                  <input
                    placeholder="Enter song title..."
                    disabled={disableButton}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    type="text"
                    value={songName}
                    onChange={handleSongNameChange}
                    autoComplete="off"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={disableButton}
                    className={`flex-1 py-3 px-6 rounded-lg text-white font-medium transition-all ${
                      buttonColour
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-400"
                    } shadow-lg hover:shadow-xl`}
                  >
                    {buttonText}
                  </button>
                  <button
                    type="button"
                    disabled={disableCancelButton}
                    onClick={handleCancelButtonClick}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      !disableCancelButton
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-gray-200 text-gray-400"
                    } shadow-lg hover:shadow-xl`}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>

            {/* Previous Searches */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Recent Searches
              </h2>
              <div className="bg-gray-50 rounded-xl p-4">
                <SearchedSongComponent />
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Database Statistics
            </h2>
            <div className="bg-gray-50 rounded-xl p-4">
              <BadWordsInDb />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-600">
          <div className="max-w-4xl mx-auto border-t border-gray-200 pt-6">
            <p className="text-sm">
              {new Date().getFullYear()} Bad Words Thing. All rights
              reserved.
            </p>
            <p className="text-xs mt-2">Contact: lugetechgy@gmail.com</p>
          </div>
        </footer>
      </div>
    </div>
  );
};
export default Main;
