const fs = require('fs');
globalThis.singleDepth = function fsPull(input) {
  const lines = fs
    .readFileSync(input, {
      encoding: 'utf-8'
    })
    .replace(/\r/g, "")
    .split("\n")
    .filter((x) => Boolean(x));
  return lines
}

globalThis.doubleDepth = function fsPull(input, secondSplit) {
  const lines = fs
    .readFileSync(input, {
      encoding: 'utf-8'
    })
    .replace(/\r/g, "")
    .split("\n")
    .filter((x) => Boolean(x))
    .map((x) =>
      x
        .trim()
        .split(secondSplit)
    );
  return lines
}