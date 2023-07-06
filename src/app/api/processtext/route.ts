// Importing necessary modules and packages
import { clean } from "profanity-cleaner";
import { NextResponse, NextRequest } from "next/server";
import identifierOccurrences from "@/app/utils/identifierOccurrences";
interface sentData {
  textAreaInput?: string;
  lyrics?: string;
}
export async function POST(request: NextRequest) {
  const sentData: sentData = await request.json();
  const identifier = "ADmCby4J";
  const badWordsArray = [
    "gimmie top",
    "top",
    "give me top",
    "drink",
    "champaign",
    "vodka",
    "rum",
    "beer",
    "drinks",
    "pills",
    "molly",
    "smoke",
    "high",
    "drunk",
    "alchohol",
    "dead",
    "matic",
  ];

  try {
    const result: string = clean(sentData.textAreaInput || sentData.lyrics, {
      exceptions: ["fun"],
      customBadWords: badWordsArray,
      customReplacement: (badWord: string) => {
        return ` ${identifier} ${badWord}`;
      },
    });

    let words = result.split(" ");
    const processedSongLyrics = identifierOccurrences(words, identifier);
    // ;
    return NextResponse.json({
      curseWords: processedSongLyrics,
      data: result,
    });
  } catch (err) {
    return NextResponse.json({
      curseWords: 0,
      data: null,
      error: err,
    });
  }
}
