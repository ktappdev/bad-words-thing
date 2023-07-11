// Importing necessary modules and packages
import { NextResponse, NextRequest } from "next/server";
import { deleteWordsFromDb } from "@/app/utils/deleteWordsFromDb";
import { IDeleteFromDbRes } from "@/app/utils/interfaces";

interface SentData {
  textAreaInput?: string;
}

export async function POST(request: NextRequest) {
  const sentData: SentData = await request.json();
  console.log(sentData);
  if (!sentData.textAreaInput || sentData.textAreaInput.length === 0) {
    return NextResponse.json({
      error: "No words to delete.",
    });
  }

  try {
    const wordsInArray = sentData.textAreaInput?.split(",");
    const result: IDeleteFromDbRes = await deleteWordsFromDb(wordsInArray);
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
