const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8");
const lines = input.trim().split("\n");

let sum = 0;
const lineLength = 140;
const numberRegex = /\d+/g;

function stringHasSymbols(string) {
  return Boolean(
    string?.split("")?.find((char) => isNaN(char) && char !== ".")
  );
}

function calculatePosition(number, line, previousNumberEndPosition) {
  //get index of number in current line, but search only from last number end position
  const index = line.indexOf(number, previousNumberEndPosition);

  //get starting and ending positions of surrondings
  let startPosition = index - 1;
  let endPosition = index + number.length + 1;

  //prevent cases where surrondings doesn't exist (right or left)
  startPosition = startPosition < 0 ? 0 : startPosition;
  endPosition = endPosition > lineLength ? lineLength : endPosition;

  return { startPosition, endPosition };
}

lines.forEach((currentLine, lineIndex) => {
  const topLine = lines[lineIndex - 1];
  const bottomLine = lines[lineIndex + 1];
  const numbersInCurrentLine = currentLine.match(numberRegex);

  if (numbersInCurrentLine) {
    let previousNumberEndPosition = 0;

    numbersInCurrentLine.forEach((number) => {
      let surronding = "";
      const { startPosition, endPosition } = calculatePosition(
        number,
        currentLine,
        previousNumberEndPosition
      );

      previousNumberEndPosition = endPosition;

      surronding += topLine?.substring(startPosition, endPosition) ?? "";
      surronding += currentLine.substring(startPosition, endPosition);
      surronding += bottomLine?.substring(startPosition, endPosition) ?? "";

      if (stringHasSymbols(surronding)) {
        sum += parseInt(number);
      }
    });
  }
});

console.log(`Result: ` + sum);
