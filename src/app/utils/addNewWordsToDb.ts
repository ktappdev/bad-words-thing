import { prisma } from "@/app/utils/prismaClient";

export async function insertWords(words: string[]): Promise<{
  newWordsCount: number;
  skippedWordsCount: number;
}> {
  let newWordsCount = 0;
  let skippedWordsCount = 0;

  for (const word of words) {
    try {
      const existingWord = await prisma.badWordsList.findUnique({
        where: {
          word: word,
        },
      });

      if (existingWord) {
        skippedWordsCount++;
        continue; // Skip the current word and move to the next one
      }

      await prisma.badWordsList.create({
        data: {
          word: word,
        },
      });

      newWordsCount++;
    } catch (error) {
      console.error(`Error inserting word '${word}': ${error as string}`);
    }
  }

  console.log(`New words added: ${newWordsCount}`);
  console.log(`Skipped words: ${skippedWordsCount}`);
  return { newWordsCount, skippedWordsCount };
}
