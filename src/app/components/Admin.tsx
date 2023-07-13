"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

export interface IUpdateDbResponse {
  newWordsCount?: number | null;
  skippedWordsCount?: number | null;
  deletedWordsCount?: number | null;
}

const Main: React.FC = () => {
  const [textAreaInput, setTextAreaInput] = useState("");
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("Submit");
  const [buttonColour, setButtonColour] = useState<boolean>(true);
  const [updateResponse, setUpdateResponse] = useState<IUpdateDbResponse>();

  const handleTextAreaInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaInput(e.target.value);
  };

  const handleTextAreaSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/updatedb", { textAreaInput });
      let res = response.data.data as IUpdateDbResponse;
      console.log(res);
      setUpdateResponse(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTextAreaClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTextAreaInput("");
    setButtonText("Submit");
    setButtonColour(true);
    setDisableButton(false);
    setUpdateResponse({
      newWordsCount: null,
      skippedWordsCount: null,
      deletedWordsCount: null,
    });
  };

  const handleDeleteButtonClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      setTextAreaInput("");
      const response = await axios.post("/api/removefromdb", { textAreaInput });
      let res = response.data.data as IUpdateDbResponse;
      console.log(res);
      setUpdateResponse(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center">
        <p className="text-2xl font-extrabold text-gray-600 mb-4">[ADMIN]</p>
      </div>

      <form className="mb-4" onSubmit={handleTextAreaSubmit}>
        <label className="block mb-2 font-bold text-gray-700">
          Update Bad Words List:
        </label>
        <textarea
          placeholder="Separate words by comma or newline"
          disabled={disableButton}
          className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
          rows={4}
          value={textAreaInput}
          onChange={handleTextAreaInputChange}
        ></textarea>
        <div className="mt-2 flex justify-center items-center gap-2">
          <button
            disabled={disableButton}
            className={
              buttonColour
                ? " bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:bg-blue-600"
                : " bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:bg-gray-600"
            }
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
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:bg-red-600"
            onClick={handleDeleteButtonClick}
            disabled={disableButton}
          >
            Delete
          </button>
        </div>
      </form>
      <div className="flex flex-col justify-center overflow-scroll">
        <p className="text-gray-800 text-lg text-center">Report</p>
        <div className="flex flex-wrap justify-center mt-2 gap-2">
          <div className="bg-green-100 px-4 py-2 rounded-lg mx-2">
            <p className="text-green-800">
              New Words Added: {updateResponse?.newWordsCount}
            </p>
          </div>
          <div className="bg-red-100 px-4 py-2 rounded-lg mx-2">
            <p className="text-red-800">
              No Action Taken: {updateResponse?.skippedWordsCount}
            </p>
          </div>
          <div className="bg-blue-100 px-4 py-2 rounded-lg mx-2">
            <p className="text-blue-800">
              Words Deleted: {updateResponse?.deletedWordsCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
