export function youtubeTimeStringToSeconds(duration: string): number {
  const regex = /PT(\d+M)?(\d+S)?/;
  const matches = regex.exec(duration);

  if (!matches) {
    throw new Error("Invalid duration format");
  }

  const minutes = matches[1] ? parseInt(matches[1]) : 0;
  const seconds = matches[2] ? parseInt(matches[2]) : 0;

  const totalSeconds = minutes * 60 + seconds;

  return totalSeconds;
}
