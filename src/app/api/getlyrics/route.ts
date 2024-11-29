import { NextResponse, NextRequest } from "next/server";
import { removeSquareBrackets } from "@/app/utils/removeSquareBrackets";
import { wordCount } from "@/app/utils/wordCount";
import { getSong } from "genius-lyrics-api-mod";
import { ISong } from "@/app/utils/interfaces";
import { youtubeTimeStringToSeconds } from "@/app/utils/youtubeTimeStringToSeconds";

interface sentData {
  searchtext: string;
}

export async function POST(request: NextRequest) {
  function splitTextAtHyphens(inputText: string): string[] {
    // Use a regular expression to split at hyphens with spaces around them and not if the name has hyphen
    const splitResult = inputText.split(/ -- /);
    console.log(" Splitting search text:", { input: inputText, result: splitResult });
    return splitResult;
  }

  const sentData: sentData = await request.json();
  console.log(" Received search request:", sentData);

  let query = splitTextAtHyphens(sentData.searchtext);

  const options = {
    apiKey: process.env.NEXT_PUBLIC_GENIUS_KEY,
    title: query[1].trim(),
    artist: query[0].trim(),
    optimizeQuery: true,
  };

  console.log(" Genius API options:", { 
    title: options.title, 
    artist: options.artist,
    hasApiKey: !!process.env.NEXT_PUBLIC_GENIUS_KEY 
  });

  //if options.title or options.artist are empty return nill
  if (options.title === "" || options.artist === "") {
    console.warn(" Empty artist or song name");
    return NextResponse.json({
      error: "artist or song name was empty",
      songLyrics: null,
    });
  }

  try {
    console.log(" Fetching song from Genius...");
    let song: ISong = await getSong(options); // Get song from Genius
    console.log(" Song found:", { 
      title: song.title, 
      artist: song.artist,
      hasLyrics: !!song.lyrics,
      lyricsLength: song.lyrics?.length
    });
    
    const releaseDate = song.releaseDate;
    const editLyrics = removeSquareBrackets(song.lyrics);
    const lyricsWordCount = wordCount(editLyrics);
    
    console.log(" Processed lyrics stats:", { 
      wordCount: lyricsWordCount,
      releaseDate
    });

    // future ken, if you ever need to drop the youtube feature. look here
    // April 24th 2024 - i decided to remove the youtube search but will just side step it
    // const songDuration: string | undefined = await getSongDuration(song.title);
    const songDuration: string | undefined = undefined;
    let durationNumber: number = songDuration ? youtubeTimeStringToSeconds(songDuration) : 0;

    const response = {
      song: song,
      wordCount: lyricsWordCount,
      songDuration: durationNumber,
      releaseDate: releaseDate,
    };
    
    console.log(" Sending response:", {
      hasSong: !!response.song,
      wordCount: response.wordCount,
      duration: response.songDuration
    });
    
    return NextResponse.json(response);
  } catch (error) {
    console.error(" Error in getlyrics:", {
      message: error.message,
      stack: error.stack
    });
    return NextResponse.json({
      error: error,
      songLyrics: null,
    });
  }
}
