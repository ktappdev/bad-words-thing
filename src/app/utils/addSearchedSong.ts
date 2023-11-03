import { prisma } from "@/app/utils/prismaClient";
import { ISong } from "@/app/utils/interfaces";
export async function addSearchedSong(songTitle: string, badWordCount: number): Promise<{
  success: boolean;
}> {
  try {
    console.log("songInfo", songTitle)
    await prisma.searchedSong.create({
      data: {
        query: songTitle,
        badWords: badWordCount,
      },
    });
  } catch (error) {
    console.error(`Error adding searched song '${songTitle}': ${error as string}`);
    return {
      success: false,
    }
  }
  return {
    success: true,
  }
}
