// Importing necessary modules and packages
import { NextResponse, NextRequest } from "next/server";
import { getLyrics, getSong } from "genius-lyrics-api";
import { ISong } from "@/app/utils/interfaces";
interface sentData {
  textInput: string;
}
export async function POST(request: NextRequest) {
  const sentData: sentData = await request.json();
  let query = sentData.textInput.split("-");

  const options = {
    apiKey: process.env.NEXT_PUBLIC_GENIUS_KEY,
    title: query[1].trim(),
    artist: query[0].trim(),
    optimizeQuery: true,
  };

  try {
    let song: ISong = await getSong(options);
    console.log("Song: ", song);

    return NextResponse.json({
      songLyrics: song.lyrics,
      song: song,
    });
  } catch (error) {
    return NextResponse.json({
      error: error,
      songLyrics: null,
    });
  }
}
