// Importing necessary modules and packages
import { NextResponse, NextRequest } from "next/server";
import { getBadWordsFromDb } from "@/app/utils/getBadWordsFromDb";
import { IDeleteFromDbRes } from "@/app/utils/interfaces";

export async function GET(request: NextRequest) {
  try {
    const result = await getBadWordsFromDb();
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
