/**
 * Title cases a word
 * 
 * @param word - word to be title cased
 * @returns title cased word or empty string if invalid input
 */
export function titleCaseWord(word: string): string {
    // Handle empty or null input
    if (!word) return '';
  
    // Split the string by spaces and handle multiple spaces
    return word
      .split(/\s+/)
      .filter(word => word.length > 0)
      .map(word => {
        // Handle words that might start with non-letter characters
        const firstLetter = word.match(/[a-zA-Z]/);
        if (!firstLetter) return word;
  
        const index = firstLetter.index || 0;
        return (
          word.slice(0, index) +
          word.charAt(index).toUpperCase() +
          word.slice(index + 1).toLowerCase()
        );
      })
      .join(' ');
}