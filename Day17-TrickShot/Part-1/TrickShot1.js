const fs = require("fs");

const target = fs // target area: x=143..177, y=-106..-71
    .readFileSync('input.txt', {
        encoding: 'utf-8'
    })
    .trim()
    .replace(/\r/g, "")
    .split("\n")
    .map((x) => x.split(' '))

let xSpace = target[0][2].slice(2).split('..');
let ySpace = target[0][3].slice(2).split('..');

function part1() {
    let x = 0;
    let xSpeed = 17;
    let y = 0;
    let ySpeed = 105;
    let yMax = 0;
    do {
        if (y > yMax) yMax = y;
        x += xSpeed;
        y += ySpeed;
        if (xSpeed > 0) xSpeed--;
        ySpeed--;
        console.log(x, y, yMax, xSpeed, ySpeed);
    } while (x < parseInt(xSpace[1]) && y > parseInt(ySpace[0]))
    if (x < parseInt(xSpace[0]) || y > parseInt(ySpace[1])) yMax = 'Target not reached';
    return yMax;
}

(() => {
    const begin = new Date();
    const output = part1();
    console.log("PART-1:", "Max y highth achieved while getting to the target zone:", output);
    const end = new Date() - begin;
    console.info('Execution time: %dms', end);
})();