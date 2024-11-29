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
  try {
    function splitTextAtHyphens(inputText: string): string[] {
      const splitResult = inputText.split(/ -- /);
      console.log(" Splitting search text:", { input: inputText, result: splitResult });
      return splitResult;
    }

    const sentData: sentData = await request.json();
    console.log(" Received search request:", sentData);

    let query = splitTextAtHyphens(sentData.searchtext);

    if (!process.env.NEXT_PUBLIC_GENIUS_KEY) {
      console.error(" Missing Genius API key");
      return NextResponse.json({
        error: "Genius API key is not configured",
        songLyrics: null,
      }, { status: 500 });
    }

    const options = {
      apiKey: process.env.NEXT_PUBLIC_GENIUS_KEY,
      title: query[1]?.trim(),
      artist: query[0]?.trim(),
      optimizeQuery: true,
    };

    console.log(" Genius API options:", { 
      title: options.title, 
      artist: options.artist,
      hasApiKey: true 
    });

    if (!options.title || !options.artist) {
      console.warn(" Empty artist or song name");
      return NextResponse.json({
        error: "Artist or song name was empty",
        songLyrics: null,
      }, { status: 400 });
    }

    console.log(" Fetching song from Genius...");
    let song: ISong = await getSong(options); // Get song from Genius

    if (!song || !song.lyrics) {
      console.error(" No song or lyrics found");
      return NextResponse.json({
        error: "Could not find song or lyrics",
        songLyrics: null,
      }, { status: 404 });
    }

    console.log(" Song found:", { 
      title: song.title, 
      artist: song.artist,
      hasLyrics: true,
      lyricsLength: song.lyrics.length
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
      song: {
        ...song,
        lyrics: editLyrics, // Use the cleaned lyrics
      },
      wordCount: lyricsWordCount,
      songDuration: durationNumber,
      releaseDate: releaseDate,
    };
    
    console.log(" Sending response:", {
      hasSong: true,
      wordCount: response.wordCount,
      duration: response.songDuration
    });
    
    return NextResponse.json(response);
  } catch (error) {
    console.error(" Error in getlyrics:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });

    // Determine if it's an API-related error
    if (error.message?.includes('API') || error.message?.includes('network')) {
      return NextResponse.json({
        error: "Failed to connect to Genius API. Please try again later.",
        songLyrics: null,
      }, { status: 503 });
    }

    return NextResponse.json({
      error: "An unexpected error occurred while fetching lyrics",
      songLyrics: null,
    }, { status: 500 });
  }
}
