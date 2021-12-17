const fs = require("fs");

const target = fs
    .readFileSync('input.txt', {
        encoding: 'utf-8'
    })
    .trim()
    .replace(/\r/g, "")
    .split("\n")
    .map((x) => x.split(' '))

let xSpace = target[0][2].slice(2).split('..');
let ySpace = target[0][3].slice(2).split('..');

function part2() {
    let [x, y] = [0, 0];
    let xSpeed = 17;
    let xRun = 0;
    let ySpeed = 105;
    let yRun = 0;
    let total = 0;
    let hitCount = 0;
    for (xSpeed; xSpeed <= parseInt(xSpace[1]);) {
        for (ySpeed; ySpeed >= parseInt(ySpace[0]);) {
            xRun = xSpeed;
            yRun = ySpeed;
            do {
                x += xRun;
                y += yRun;
                if (xRun > 0) xRun--;
                yRun--;
                if (parseInt(xSpace[0]) <= x && x <= parseInt(xSpace[1]) && parseInt(ySpace[0]) <= y && y <= parseInt(ySpace[1])) {
                    hitCount++;
                };
            } while (x < parseInt(xSpace[1]) && y > parseInt(ySpace[0]))
            if (hitCount > 0) total++;
            hitCount = 0;
            ySpeed--;
            x = 0;
            y = 0;
        }
        ySpeed = 105;
        xSpeed++;
    }
    return total;
}

(() => {
    const begin = new Date();
    const output = part2();
    console.log("PART-2:", "Some idiot output:", output);
    const end = new Date() - begin;
    console.info('Execution time: %dms', end);
})();