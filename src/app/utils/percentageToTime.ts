export function percentageToTime(percentage: number): number {
  let MaxTime = Math.round(percentage * 60 * 60 * 1000);

  return MaxTime;
}
