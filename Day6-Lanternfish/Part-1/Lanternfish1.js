const fs = require("fs");

const array = fs
    .readFileSync('input.txt', {
        encoding: 'utf-8'
    })
    .split(",")
    .map(Number);

function calc(array, days) {
    const fish = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    array.forEach((n) => fish[n]++);
    for (let day = 0; day < days; day++) {
        fish[7] += fish[0];
        fish.push(fish.shift());
    }
    return fish.reduce((acc, n) => acc + n, 0);
}

function part1(array) {
    return calc(array, 80);
}

console.log("How many fish after 80 days:", part1(array));