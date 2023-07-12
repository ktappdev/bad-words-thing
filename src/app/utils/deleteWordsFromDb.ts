import { prisma } from "@/app/utils/prismaClient";

export async function deleteWordsFromDb(words: string[]): Promise<{
  deletedWordsCount: number;
  skippedWordsCount: number;
}> {
  let deletedWordsCount = 0;
  let skippedWordsCount = 0;

  for (const word of words) {
    try {
      const existingWord = await prisma.badWordsList.findUnique({
        where: {
          word: word.trim(),
        },
      });

      if (!existingWord) {
        skippedWordsCount++;
        continue; // Skip the current word and move to the next one
      }

      await prisma.badWordsList.delete({
        where: {
          word: word,
        },
      });

      deletedWordsCount++;
    } catch (error) {
      console.error(`Error deleting word '${word}': ${error as string}`);
    }
  }
  return { deletedWordsCount, skippedWordsCount };
}
