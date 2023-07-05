export default function identifierOccurrences(
  songLyrics: string,
  identifier: string
) {
  let words = songLyrics.split(" ");
  console.log(words);
  let count = 0;
  for (let i = 0; i < words.length; i++) {
    if (words[i] === identifier) {
      count++;
    }
  }
  if (count === 0) {
    return count;
  }
  return count / 2;
}
