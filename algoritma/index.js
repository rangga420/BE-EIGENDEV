function reverseAlphabet(str) {
  const reversedChars = str
    .match(/[a-zA-Z]/g)
    .reverse()
    .join('');
  const digit = str.match(/\d+/)[0];
  return reversedChars + digit;
}

const inputReverseAlphabet = 'NEGIE1';
const outputReverseAlphabet = reverseAlphabet(inputReverseAlphabet);
console.log(outputReverseAlphabet);

function longestWord(sentence) {
  const words = sentence.split(' ');
  const longest = words.reduce((prevWord, currentWord) => {
    return currentWord.length > prevWord.length ? currentWord : prevWord;
  }, '');
  return longest;
}

const inputLongestWord = 'Saya sangat senang mengerjakan soal algoritma';
const outputLongestWord = longestWord(inputLongestWord);
console.log(outputLongestWord);

function countWords(input, query) {
  const wordCount = {};
  input.forEach((word) => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });
  const result = query.map((query) => wordCount[query] || 0);
  return result;
}

const inputCountWords = ['xc', 'dz', 'bbb', 'dz'];
const query = ['bbb', 'ac', 'dz'];
const outputCountWords = countWords(inputCountWords, query);
console.log(outputCountWords);

function diagonalDifference(matrix) {
  const primaryDiagonalSum = matrix.reduce(
    (sum, row, index) => sum + row[index],
    0,
  );
  const secondaryDiagonalSum = matrix.reduce(
    (sum, row, index) => sum + row[matrix.length - 1 - index],
    0,
  );

  const difference = Math.abs(primaryDiagonalSum - secondaryDiagonalSum);
  return difference;
}

const matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];
const result = diagonalDifference(matrix);
console.log(result);
