"use client";
import axios from "axios";
import React, { FormEvent, useState } from "react";

const TextInputComponent = ({ onTextSubmit }: any) => {
  const [text, setText] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Get the form data
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      // Make a POST request to the backend API
      const response = await axios.post("/api/processtext", formData);

      // Handle the response
      console.log(response.data); // or do something else

      // Reset the form fields if needed
      form.reset();
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        name="songLyrics"
        value={text}
        onChange={handleInputChange}
        placeholder="Enter your song lyrics here..."
        rows={5}
        cols={40}
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default TextInputComponent;
