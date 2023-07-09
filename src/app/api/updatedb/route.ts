// Importing necessary modules and packages
import { clean } from "profanity-cleaner";
import { NextResponse, NextRequest } from "next/server";
import identifierOccurrences from "@/app/utils/identifierOccurrences";
// import { badWordsArray } from "@/app/utils/badWords";
import { getBadWordsFromDb } from "@/app/utils/getBadWordsFromDb";
import { addNewWordsToDb } from "@/app/utils/addNewWordsToDb";
import { IUpdateDbRes } from "@/app/utils/interfaces";
interface sentData {
  textAreaInput?: string;
  lyrics?: string;
}
export async function POST(request: NextRequest) {
  const sentData: sentData = await request.json();
  if (sentData.textAreaInput === undefined) {
    return NextResponse.json({
      error: "textarea input empty",
    });
  }

  try {
    const wordsInArray = sentData.textAreaInput?.split(",");

    const result: IUpdateDbRes = await addNewWordsToDb(wordsInArray);
    console.log(result);
    return NextResponse.json({
      data: result,
    });
  } catch (err) {
    return NextResponse.json({
      data: null,
      error: err,
    });
  }
}
