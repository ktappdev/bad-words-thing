import youtube from "youtube-finder";
import { IYouTubeSearchResponse } from "./interfaces";
import axios from "axios";

var client = youtube.createClient({
  key: process.env.NEXT_PUBLIC_YOUTUBE_KEY,
});

export default async function getSongDuration(
  query: string
): Promise<string | undefined> {
  console.log("search youtube query ", query);
  try {
    const params = {
      part: "snippet",
      q: query + " audio",
      maxResults: 1,
      type: "video",
      contentDetails: true,
    };

    const searchResults = await new Promise<IYouTubeSearchResponse>(
      (resolve, reject) => {
        client.search(params, (err: Error, data: IYouTubeSearchResponse) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      }
    );

    const videoId = searchResults.items[0].id.videoId;
    let qString = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${process.env.NEXT_PUBLIC_YOUTUBE_KEY}`;
    const resData = await axios.get(qString);

    const songDuration = resData.data.items[0].contentDetails.duration;
    console.log("Duration:", songDuration);
    return songDuration;
  } catch (error) {
    console.error("Error searching YouTube:", error);
    return undefined;
  }
}
