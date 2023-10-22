// Importing necessary modules and packages
import { NextResponse, NextRequest } from "next/server";
import { getBadWordsFromDb } from "@/app/utils/getBadWordsFromDb";
import { IDeleteFromDbRes } from "@/app/utils/interfaces";

export async function GET(request: NextRequest) {
  // const sentData: SentData = await request.json();
  // console.log(sentData);
  // if (!sentData.textAreaInput || sentData.textAreaInput.length === 0) {
  //   return NextResponse.json({
  //     error: "No words to delete.",
  //   });
  // }
  console.log('getbwcount got hit')

  try {
    // const wordsInArray = sentData.textAreaInput?.split(",");
    const result = await getBadWordsFromDb();
    // console.log(result.length);
    return NextResponse.json({
      data: result.length,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      data: null,
      error: err,
    });
  }
}
