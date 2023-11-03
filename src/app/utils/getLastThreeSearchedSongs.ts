'use server'
import { prisma } from "../utils/prismaClient"
import { IlastThreeSongs } from "./interfaces"

export async function getLastThreeSearchedSongs() {

  const songs: IlastThreeSongs[] = await prisma.searchedSong.findMany({
    take: 3,
    orderBy: {
      date: "desc",
    },
  })
  return songs
}
