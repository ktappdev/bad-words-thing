// Importing necessary modules and packages
// import { clean } from "profanity-cleaner";
import { NextResponse, NextRequest } from "next/server";
import identifierOccurrences from "@/app/utils/identifierOccurrences";
// import { badWordsArray } from "@/app/utils/badWords";
import { getBadWordsFromDb } from "@/app/utils/getBadWordsFromDb";
import processTextOperations from "@/app/utils/processTextOperations";
import { percentageToTime } from "@/app/utils/percentageToTime";

interface sentData {
  packageToProcess: {
    lyrics: string;
    songDuration: number;
    lyricsWordCount: number;
  };
}
export async function POST(request: NextRequest) {
  const sentData: sentData = await request.json();
  const identifier = "ADmCby4J";
  const badWordsArray = await getBadWordsFromDb();

  try {
    // console.log(
    //   "this is duration number",
    //   sentData.packageToProcess.songDuration
    // );
    if (!sentData.packageToProcess.lyrics === undefined) {
      return NextResponse.json({
        curseWords: 0,
        data: null,
        error: "No lyrics found",
      });
    }
    const result: string = processTextOperations(
      sentData.packageToProcess.lyrics!,
      {
        exceptions: ["fun", "funny", "funky", "were"],
        customBadWords: badWordsArray,
        customReplacement: (badWord: string) => {
          return ` ${identifier} ${badWord}`;
        },
      },
    );

    let words = result.split(" ");
    const count_badWords_percentageIntoSong = identifierOccurrences(
      words,
      identifier,
    );
    const percentages = count_badWords_percentageIntoSong.linesToEdit.map(
      (line) => line.percentageIntoSong,
    );
    // console.log("this is percentages ", percentages);
    // let timeFromPercentage = percentageToTime(
    //   percentages,
    //   sentData.packageToProcess.songDuration,
    //   sentData.packageToProcess.lyricsWordCount,
    // );

    // console.log(timeFromPercentage);
    return NextResponse.json({
      curseWords: count_badWords_percentageIntoSong,
      // timeFromPercentage,
      percentages,
      // data: result,
    });
  } catch (err) {
    return NextResponse.json({
      curseWords: 0,
      data: null,
      error: err,
    });
  }
}
