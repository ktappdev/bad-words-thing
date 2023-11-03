// Importing necessary modules and packages
import { NextResponse, NextRequest } from "next/server";
import { addSearchedSong } from "@/app/utils/addSearchedSong";
// import { ISong } from "@/app/utils/interfaces";
// interface sentData {
//   song: ISong;
// }
export async function POST(request: NextRequest) {
  const sentData = await request.json();
  // console.log("sentDataaa", sentData);
  let songTitle: string = sentData.songTitle;
  let badWords: number = sentData.badWords;

  try {
    const { success } = await addSearchedSong(songTitle, badWords);
    // console.log(result);
    return NextResponse.json({
      data: success,
    });
  } catch (err) {
    let e = err as Error;
    return NextResponse.json({
      data: null,
      error: e.message,
    });
  }
}
