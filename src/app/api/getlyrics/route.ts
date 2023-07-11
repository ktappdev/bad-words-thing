import { NextResponse, NextRequest } from "next/server";
import { removeSquareBrackets } from "@/app/utils/removeSquareBrackets";
import { wordCount } from "@/app/utils/wordCount";
import { getSong } from "genius-lyrics-api-mod";
import { ISong } from "@/app/utils/interfaces";
import getSongDuration from "@/app/utils/getSongDuration";
import { youtubeTimeStringToSeconds } from "@/app/utils/youtubeTimeStringToSeconds";

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
    const editLyrics = removeSquareBrackets(song.lyrics);
    const lyricsWordCount = wordCount(editLyrics);
    const songDuration: string | undefined = await getSongDuration(song.title);

    if (songDuration !== undefined) {
      let durationNumber = youtubeTimeStringToSeconds(songDuration);
      return NextResponse.json({
        song: song,
        wordCount: lyricsWordCount,
        songDuration: durationNumber,
      });
    } else {
      let durationNumber: number = 0;
      return NextResponse.json({
        song: song,
        wordCount: lyricsWordCount,
        songDuration: durationNumber,
      });
    }
  } catch (error) {
    return NextResponse.json({
      error: error,
      songLyrics: null,
    });
  }
}
