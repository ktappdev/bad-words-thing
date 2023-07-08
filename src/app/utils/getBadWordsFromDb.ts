import { prisma } from "@/app/utils/prismaClient";
export const getBadWordsFromDb = async () => {
  const badWordsFromDb = await prisma.badWordsList.findMany();
  return badWordsFromDb;
};
