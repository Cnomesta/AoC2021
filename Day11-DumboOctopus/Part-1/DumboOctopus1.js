const fs = require("fs");

const octopuses = fs
    .readFileSync('input.txt', 'utf-8')
    .replace(/\r/g, "")
    .split("\n")
    .map((x) => x.split("").map(j => parseInt(j)))

function part1() {
    let input = octopuses;
    let flash = 0;
    let pumpFlash = (y, x) => {
        if (y < 0 || y >= 10 || x < 0 || x >= 10) return;
        input[y][x]++;
        if (input[y][x] == 10) {
            flash++;
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
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                if (input[y][x] > 9) {
                    input[y][x] = 0;
                }
            }
        }
        if (i == 99) {
            return flash;
        }
    }
}

(() => {
    const time = new Date();
    const output = part1(); // 1043101
    console.log("PART-1:", "Number of octopus flashes", output);
    const end = new Date() - time;
    console.info('Execution time: %dms', end);
})();