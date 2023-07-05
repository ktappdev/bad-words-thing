// Importing necessary modules and packages
import { clean } from "profanity-cleaner";
import { NextResponse, NextRequest } from "next/server";
import identifierOccurrences from "@/app/utils/identifierOccurrences";
interface sentData {
  songLyrics: string;
}
export async function POST(request: NextRequest) {
  // const sentData: sentData = await request.json();
  const sentData: FormData = await request.formData();
  const songLyrics = sentData.get("songLyrics");
  const identifier = "ADmCby4J";
  const badWordsArray = ["gimmie top", "top", "give me top"];

  try {
    const result: string = clean(songLyrics, {
      exceptions: ["fun"],
      customBadWords: badWordsArray,
      customReplacement: (badWord: string) => {
        return ` ${identifier} ${badWord}`;
      },
    });

    let words = result.split(" ");
    const processedSongLyrics = identifierOccurrences(words, identifier);
    // console.log(`processedSongLyrics: ${processedSongLyrics}`);
    return NextResponse.json({
      curseWords: processedSongLyrics,
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
}
