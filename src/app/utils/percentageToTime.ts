export function percentageToTime(
  percentages: number[],
  songDuration: number,
  songWordCount: number
): string[] {
  // Calculate the times in seconds for the given percentages of words
  percentages.shift();
  const times = percentages.map((percentage) => {
    // let x = songDuration * (percentage / 100);
    // let time = x / 60;

    const timeInSeconds: number = (percentage / 100) * songDuration;
    const minutes: number = Math.floor(timeInSeconds / 60);
    const seconds: number = Math.floor(timeInSeconds % 60);

    // Formatting the time as MM:SS
    const formattedTime: string = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;

    return formattedTime;
  });

  return times;
}
