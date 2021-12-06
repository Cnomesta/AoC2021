const fs = require("fs");

const array = fs
    .readFileSync('input.txt', {
        encoding: 'utf-8'
    })
    .split(",")
    .map(Number);

function calc(array, days) {
    const school = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    array.forEach((n) => school[n]++);
    for (let day = 0; day < days; day++) {
        //console.log(school, day);
        school[7] += school[0];
        school.push(school.shift());
    }
    return school.reduce((acc, n) => acc + n, 0);
}

function part1(array) {
    return calc(array, 80);
}

function part2(array) {
    return calc(array, 256);
}

console.log("How many fish after 80 days:", part1(array));
console.log("How many fish after 256 days:", part2(array));