const fs = require("fs");

const array = fs
    .readFileSync('testInput.txt', {
        encoding: 'utf-8'
    })
    .replace(/\r/g, "")
    .split("\n")
    .filter(Boolean)
    .map(X);