// Importing necessary modules and packages
import { NextResponse, NextRequest } from "next/server";
import { removeSquareBrackets } from "@/app/utils/removeSquareBrackets";
import { wordCount } from "@/app/utils/wordCount";
import { getLyrics, getSong, getSongById } from "genius-lyrics-api-mod";
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
  const options2 = {
    apiKey: process.env.NEXT_PUBLIC_GENIUS_KEY,
    id: 772,
  };

  try {
    let song: ISong = await getSong(options);
    const editLyrics = removeSquareBrackets(song.lyrics);
    const lyricsWordCount = wordCount(editLyrics);
    return NextResponse.json({
      songLyrics: song.lyrics,
      song: song,
      wordCount: lyricsWordCount,
    });
  } catch (error) {
    return NextResponse.json({
      error: error,
      songLyrics: null,
    });
  }
}
