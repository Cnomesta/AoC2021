const fs = require("fs");

const input = fs
    .readFileSync('input.txt', {
        encoding: 'utf-8'
    })
    .replace(/\r/g, "")
    .split("\n")

let row = input.length,
    colum = input[0].length,
    screen = [];
let smallScreen = input.map(x => x.split('').map(n => parseInt(n))),
    bottom = Array.from({
        length: row * 5
    }, v => Array(colum * 5).fill(0));
for (let y = 0; y < row * 5; y++) {
    screen[y] = [];
    for (let x = 0; x < colum * 5; x++) {
        let v = smallScreen[y % row][x % colum] + Math.floor(y / row) + Math.floor(x / colum);
        while (v > 9) v -= 9;
        screen[y][x] = v;
    }
}
let minRisk = (screen[row * 5 - 1].reduce((acc, n) => acc + n) + screen.reduce((acc, row) => acc + row[0], 0)) * 0.7;
let path = [{
    x: 0,
    y: 0,
    risk: -screen[0][0]
}];

function part2() {
    while (path.length > 0) {
        let p = path.pop();
        p.risk += screen[p.y][p.x];
        if ((p.risk < minRisk) && (p.risk < bottom[p.y][p.x] || bottom[p.y][p.x] == 0)) {
            bottom[p.y][p.x] = p.risk;
            if (p.x == (colum * 5 - 1) && p.y == (row * 5 - 1)) {
                if (p.risk < minRisk) {
                    minRisk = p.risk;
                }
            } else {
                if (p.x < colum * 5 - 1) path.push({
                    x: p.x + 1,
                    y: p.y,
                    risk: p.risk
                })
                if (p.y < row * 5 - 1) path.push({
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
    const output = part2();
    console.log("PART-2:", "Lowest risk level to get out of the full map:", output);
    const end = new Date() - begin;
    console.info('Execution time: %dms', end);
})();