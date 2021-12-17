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

function killme() {
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
                //console.log(x, y, xRun, yRun, xSpeed, ySpeed);
                if (parseInt(xSpace[0]) <= x && x <= parseInt(xSpace[1]) && parseInt(ySpace[0]) <= y && y <= parseInt(ySpace[1])) {
                    hitCount++;
                    console.log('Hits', hitCount);
                };
            } while (x < parseInt(xSpace[1]) && y > parseInt(ySpace[0]))
            if (hitCount > 0) total++;
            console.log('Hits out:', hitCount, 'Total:', total);
            hitCount = 0;
            ySpeed--;
            x = 0;
            y = 0;
        }
        ySpeed = 105;
        xSpeed++;
        console.log('Total', total, xSpeed);
    }
}

killme();