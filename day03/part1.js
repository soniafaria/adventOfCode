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

function calculatePosition(number, index) {
  let startPosition = index - 1;
  let endPosition = index + number.length + 1;

  startPosition = startPosition < 0 ? 0 : startPosition;
  endPosition = endPosition > lineLength ? lineLength : endPosition;

  return { startPosition, endPosition };
}

lines.forEach((currentLine, lineIndex) => {
  const topLine = lines[lineIndex - 1];
  const bottomLine = lines[lineIndex + 1];
  const numbersInCurrentLine = currentLine.match(numberRegex);

  if (numbersInCurrentLine) {
    numbersInCurrentLine.forEach((number) => {
      let surronding = "";
      let isEligible = false;
      const { startPosition, endPosition } = calculatePosition(
        number,
        currentLine.indexOf(number)
      );

      surronding += topLine?.substring(startPosition, endPosition);
      surronding += currentLine.substring(startPosition, endPosition);
      surronding += bottomLine?.substring(startPosition, endPosition);

      if (stringHasSymbols(surronding)) {
        sum += parseInt(number);
        isEligible = true;
      }

      console.log(
        `Line: ${
          lineIndex + 1
        } Eligible: ${isEligible} Number: ${number} StartPosition: ${
          startPosition + 1
        } EndPosition: ${endPosition + 1}`
      );
    });
  }
});

console.log(`Result: ` + sum);
