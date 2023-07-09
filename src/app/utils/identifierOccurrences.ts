export default function identifierOccurrences(
  words: string[],
  identifier: string
) {
  let linesToEdit: string[] = [];
  let count = 0;
  for (let i = 0; i < words.length; i++) {
    if (words[i] === identifier) {
      count++;
      let chopWordsOriginal = words.slice(i - 8, i + 4);
      let chopWords = chopWordsOriginal.filter((item) => item !== identifier);

      let joinedString = chopWords.join(" ").replace("\r\n", " ");

      linesToEdit.push(joinedString);
    }
  }
  if (count === 0) {
    return {
      count: count,
      linesToEdit: linesToEdit,
    };
  }

  return {
    count: count,
    linesToEdit: linesToEdit,
  };
}
