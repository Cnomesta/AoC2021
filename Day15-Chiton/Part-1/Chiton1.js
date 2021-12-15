const fs = require("fs");

const input = fs
    .readFileSync('input.txt', {
        encoding: 'utf-8'
    })
    .replace(/\r/g, "")
    .split("\n")

let row = input.length,
    colum = input[0].length;
let screen = input.map(x => x.split('').map(n => parseInt(n))),
    bottom = Array.from({
        length: row
    }, v => Array(colum).fill(0));
let minRisk = (screen[row - 1].reduce((acc, n) => acc + n) + screen.reduce((acc, row) => acc + row[0], 0)) * 0.7;
let path = [{
    x: 0,
    y: 0,
    risk: -screen[0][0]
}]

function part1() {
    while (path.length > 0) {
        let p = path.pop();
        p.risk += screen[p.y][p.x];
        if ((p.risk < minRisk) && (p.risk < bottom[p.y][p.x] || bottom[p.y][p.x] == 0)) {
            bottom[p.y][p.x] = p.risk;
            if (p.x == colum - 1 && p.y == row - 1) {
                if (p.risk < minRisk) {
                    minRisk = p.risk;
                }
            } else {
                if (p.x < colum - 1) path.push({
                    x: p.x + 1,
                    y: p.y,
                    risk: p.risk
                })
                if (p.y < row - 1) path.push({
                    x: p.x,
                    y: p.y + 1,
                    risk: p.risk
                })
                if (p.x > 0) path.push({
                    x: p.x - 1,
                    y: p.y,
                    risk: p.risk
                })
                if (p.y > 0) path.push({
                    x: p.x,
                    y: p.y - 1,
                    risk: p.risk
                })
            }
        }
    }
    return minRisk;
}

(() => {
    const begin = new Date();
    const output = part1();
    console.log("PART-1:", "Lowest risk level to reach bottom right:", output);
    const end = new Date() - begin;
    console.info('Execution time: %dms', end);
})();