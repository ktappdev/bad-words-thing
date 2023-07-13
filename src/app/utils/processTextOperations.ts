/* eslint-disable max-len */
// const defaultBadWords = require('./badWords.json');
// extracted this code as js from the npm package Profanity-cleaner but i stripped away what i won't use -ken
// "profanity-cleaner": "^0.0.3",
export default function processTextOperations(
  text: string,
  options: {
    placeholder?: string;
    caseSensitive?: boolean;
    wholeWordsOnly?: boolean;
    exceptions?: string[];
    keepFirstAndLastChar?: boolean;
    customReplacement?: ((match: string) => string) | null;
    replacePartialWords?: boolean;
    includePunctuation?: boolean;
    minimumWordLength?: number;
    customMatch?: ((match: string) => boolean) | null;
    customBadWords?: string[];
  } = {}
): string {
  // Set default options
  const defaultOptions = {
    placeholder: "*",
    caseSensitive: false,
    wholeWordsOnly: true,
    exceptions: [],
    keepFirstAndLastChar: false,
    customReplacement: null,
    replacePartialWords: false,
    includePunctuation: false,
    minimumWordLength: 2,
    customMatch: null,
    customBadWords: [],
  };

  const option = {
    ...defaultOptions,
    ...options,
  };

  const censoredWords = option.customBadWords.map((word) =>
    word.replace(/\*/g, "\\w+")
  );

  let regex = new RegExp(censoredWords.join("|"), "g");

  if (!option.caseSensitive) {
    regex = new RegExp(censoredWords.join("|"), "gi");
  }
  if (option.wholeWordsOnly) {
    regex = new RegExp(`\\b(${censoredWords.join("|")})\\b`, "gi");
  }
  if (option.replacePartialWords) {
    regex = new RegExp(censoredWords.join("|"), "gi");
  }

  // console.log(regex);

  // Replace the censored words with the censor character or custom replacement
  return text.replace(regex, (match: string) => {
    // Check if the word is shorter than the minimum length
    if (match.length < option.minimumWordLength) {
      return match;
    }

    // Check if the word matches the custom match function
    if (
      typeof option.customMatch === "function" &&
      !option.customMatch(match)
    ) {
      return match;
    }

    // Check if the word is in the exceptions list
    if (option.exceptions.includes(match.toLowerCase())) {
      return match;
    }

    // Use the custom replacement function if provided
    if (typeof option.customReplacement === "function") {
      return option.customReplacement(match);
    }

    // Keep the first and last characters of the word
    if (option.keepFirstAndLastChar) {
      return `${match[0]}${option.placeholder.repeat(match.length - 2)}${
        match[match.length - 1]
      }`;
    }

    return "x";
  });
}

/**
 * A function to check if a given text contains any bad words.
 *
 * @param {string} text - The input text to check.
 * @param {object} options - The options object (optional).
 *
 * @returns {boolean}
 */
