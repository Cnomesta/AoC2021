const fs = require("fs");

const octopuses = fs
    .readFileSync('input.txt', 'utf-8')
    .replace(/\r/g, "")
    .split("\n")
    .map((x) => x.split("").map(j => parseInt(j)))

function part2() {
    let input = octopuses;
    let outget = [];
    let pumpFlash = (y, x) => {
        if (y < 0 || y >= 10 || x < 0 || x >= 10) return;
        input[y][x]++;
        if (input[y][x] == 10) {
            pumpFlash(y - 1, x - 1);
            pumpFlash(y - 1, x - 0);
            pumpFlash(y - 1, x + 1);
            pumpFlash(y - 0, x - 1);
            pumpFlash(y - 0, x + 1);
            pumpFlash(y + 1, x - 1);
            pumpFlash(y + 1, x - 0);
            pumpFlash(y + 1, x + 1);
        }
    }
    for (let i = 0; i < 1000; i++) {
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                pumpFlash(y, x);
            }
        }
        let allFlash = true;
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                if (input[y][x] > 9) {
                    input[y][x] = 0;
                } else {
                    allFlash = false;
                }
            }
        }
        outget = input.join();
        if (allFlash) {
            return i + 1;
        }
    }
}

(() => {
    const begin = new Date();
    const output = part2(); // 1043101
    console.log("PART-2:", "Round number when all octopuses flash", output);
    const end = new Date() - begin;
    console.info('Execution time: %dms', end);
})();