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
  const badWordsArray = ["bad", "evil"];

  try {
    // console.log("x", data.toolImage);
    // console.log(sentData.songLyrics);
    const result: string = clean(songLyrics, {
      customBadWords: badWordsArray,
      customReplacement: (badWord: string) => {
        return ` ${identifier} ${badWord} ${identifier} `;
      },
    });
    const curseWords = identifierOccurrences(result, identifier);
    // console.log(result);
    console.log(`curseWords: ${curseWords}`);

    return NextResponse.json({
      curseWords: curseWords,
      data: result,
    });
  } catch (err) {
    console.log(err);
  }

  return NextResponse.json({
    data: sentData,
  });
}
