"use client";
import React, { useState } from "react";
import { useAtom } from "jotai";
import { songData } from "../store/store";

interface singInfo {
  curseWords: {
    count: number;
    linesToEdit: string[];
  };
  error?: string;
}

const ResultsDashboard = () => {
  const [songInfo, setSongInfo] = useAtom<singInfo>(songData);
  const [checkedLines, setCheckedLines] = useState(
    new Array(songInfo.curseWords.linesToEdit.length).fill(false)
  );

  if (songInfo.curseWords.count === 0) {
    return <div>The song is clean or you did not provide lyrics</div>;
  }

  const handleCheckboxChange = (index: number) => {
    const newCheckedLines = [...checkedLines];
    newCheckedLines[index] = !newCheckedLines[index];
    setCheckedLines(newCheckedLines);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Song Details</h2>
          <div>
            <h3 className="text-lg font-bold mb-2">Number of Profanity:</h3>
            <p>{songInfo.curseWords.count}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Song Lyrics to Edit:</h3>
            <ul>
              {songInfo.curseWords.linesToEdit.map((lyric, index) => (
                <li
                  key={index}
                  className="flex items-center mb-2 border border-gray-300 rounded px-2 py-1"
                >
                  <input
                    type="checkbox"
                    checked={checkedLines[index]}
                    onChange={() => handleCheckboxChange(index)}
                    className="mr-2"
                  />
                  <span>{lyric}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;
