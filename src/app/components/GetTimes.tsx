import React, { Suspense } from "react";
// import searchYoutube from "@/app/utils/youtube";
import youtube from "youtube-finder";
import { IYouTubeSearchResponse } from "@/app/utils/interfaces";
import axios from "axios";
var client = youtube.createClient({
  key: process.env.NEXT_PUBLIC_YOUTUBE_KEY,
});

const GetTimes = async (param: { song: string }) => {
  console.log(process.env.NEXT_PUBLIC_YOUTUBE_KEY);

  const params = {
    part: "snippet",
    q: param.song + "audio",
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
    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${process.env.NEXT_PUBLIC_YOUTUBE_KEY}`
  );

  const songDuration: string = resData.data.items[0].contentDetails.duration;
  console.log("Duration:", songDuration);

  return (
    // <Suspense fallback={<div>Loading...</div>}>
    <span className="mr-2">{songDuration}</span>
    // </Suspense>
  );
};

export default GetTimes;
