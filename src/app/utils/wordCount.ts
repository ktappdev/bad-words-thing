export function wordCount(str: string): number {
  return str.split(/\s+/).length - 1; // the -1 is to account for the first "word" being a space
}