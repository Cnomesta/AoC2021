const fs = require("fs");

const array = fs
    .readFileSync('testInput.txt', {
        encoding: 'utf-8'
    })
    .replace(/\r/g, "")
    .split("\n")
    .filter(Boolean)
    .map(X);


function part1() {

}

part1();

function part2() {

}

part2();