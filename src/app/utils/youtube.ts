import youtube from "youtube-finder";
import { IYouTubeSearchResponse } from "./interfaces";
import axios from "axios";

var client = youtube.createClient({
  key: process.env.YOUTUBE_KEY,
});

export default async function searchYoutube(
  query: string
): Promise<string | undefined> {
  try {
    const params = {
      part: "snippet",
      q: query + "audio",
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
    const resData = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${process.env.YOUTUBE_KEY}`
    );

    const songDuration = resData.data.items[0].contentDetails.duration;
    return songDuration;
  } catch (error) {
    console.error("Error searching YouTube:", error);
    return undefined;
  }
}
