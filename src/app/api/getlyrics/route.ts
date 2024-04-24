import { NextResponse, NextRequest } from "next/server";
import { removeSquareBrackets } from "@/app/utils/removeSquareBrackets";
import { wordCount } from "@/app/utils/wordCount";
import { getSong } from "genius-lyrics-api-mod";
import { ISong } from "@/app/utils/interfaces";
import getSongDuration from "@/app/utils/getSongDuration";
import { youtubeTimeStringToSeconds } from "@/app/utils/youtubeTimeStringToSeconds";

interface sentData {
  searchtext: string;
}
export async function POST(request: NextRequest) {
  function splitTextAtHyphens(inputText: string): string[] {
    // Use a regular expression to split at hyphens with spaces around them and not if the name has hyphen
    const splitResult = inputText.split(/ -- /);
    return splitResult;
  }
  const sentData: sentData = await request.json();
  // console.log(sentData);
  // let query = sentData.textInput.split("-");
  let query = splitTextAtHyphens(sentData.searchtext);

  const options = {
    apiKey: process.env.NEXT_PUBLIC_GENIUS_KEY,
    title: query[1].trim(),
    artist: query[0].trim(),
    optimizeQuery: true,
  };
  //if options.title or options.artist are empty return nill
  if (options.title === "" || options.artist === "") {
    return NextResponse.json({
      error: "artist or song name was empty",
      songLyrics: null,
    });
  }

  try {
    let song: ISong = await getSong(options); // Get song from Genius
    const releaseDate = song.releaseDate;
    const editLyrics = removeSquareBrackets(song.lyrics);
    const lyricsWordCount = wordCount(editLyrics);
    // future ken, if you ever need to drop the youtube feature. look here
    // April 24th 2024 - i decided to remove the youtube search but will just side step it
    // const songDuration: string | undefined = await getSongDuration(song.title);
    const songDuration: string | undefined = undefined;
    if (songDuration !== undefined) {
      let durationNumber = youtubeTimeStringToSeconds(songDuration);
      return NextResponse.json({
        song: song,
        wordCount: lyricsWordCount,
        songDuration: durationNumber,
        releaseDate: releaseDate,
      });
    } else {
      let durationNumber: number = 0;
      return NextResponse.json({
        song: song,
        wordCount: lyricsWordCount,
        songDuration: durationNumber,
        releaseDate: releaseDate,
      });
    }
  } catch (error) {
    return NextResponse.json({
      error: error,
      songLyrics: null,
    });
  }
}
