const fs = require("fs");

const array = fs
    .readFileSync('input.txt', {
        encoding: 'utf-8'
    })
    .replace(/\r/g, "")
    .split("\n")

function part2() {
    let [lastRoll, currRoll, rolls] = [0, 0, 0];
    let prev = 2;
    let p1Pos = parseInt(array[0][28]);
    let p2Pos = parseInt(array[1][28]);
    let [p1Score, p2Score] = [0, 0];
    while (p1Score < 1000 || p2Score < 1000) {
        switch (prev) {
            case 1:
                currRoll = p2Pos;
                lastRoll++;
                currRoll += lastRoll;
                lastRoll++;
                currRoll += lastRoll;
                lastRoll++;
                currRoll += lastRoll;
                while (currRoll > 10) {
                    currRoll -= 10;
                };
                p2Score += currRoll;
                rolls += 3;
                prev++;
                p2Pos = currRoll;
                if (p2Score >= 1000) return p1Score * rolls;
            case 2:
                currRoll = p1Pos;
                lastRoll++;
                currRoll += lastRoll;
                lastRoll++;
                currRoll += lastRoll;
                lastRoll++;
                currRoll += lastRoll;
                while (currRoll > 10) {
                    currRoll -= 10;
                };
                p1Score += currRoll;
                rolls += 3;
                prev--;
                p1Pos = currRoll;
                if (p1Score >= 1000) return p2Score * rolls;
        }
    }
}

(() => {
    const begin = new Date();
    const output = part2();
    console.log("PART-2:", "Losing players score multiplied by number of dice rolls", output);
    const end = new Date() - begin;
    console.info('Execution time: %dms', end);
})();