const fs = require("fs");

const [polymerInput, pairKeyInput] = fs
    .readFileSync('input.txt', {
        encoding: 'utf-8'
    })
    .replace(/\r/g, "")
    .split("\n\n")

const polymer = polymerInput;
const pairs = pairKeyInput.replace(/ -> /g, "").split('\n')
    .map((x) =>
        ({
            pair: x[0] + x[1],
            fill: x[2]
        }));

function count(array) {
    let a = [],
        b = [],
        arr = [...array],
        prev;
    arr.sort();
    for (let element of arr) {
        if (element !== prev) {
            a.push(element);
            b.push(1);
        } else ++b[b.length - 1];
        prev = element;


    }
    return [a, b];
}

function part1() {
    let newPoly = polymer;
    let filledPoly = [];
    for (let j = 0; j < 40; j++) {
        filledPoly.push(newPoly[0]);
        for (let i = 0; i < newPoly.length - 1; i++) {
            for (const pair of pairs) {
                if (newPoly[i] + newPoly[i + 1] === pair.pair) {
                    filledPoly.push(pair.fill, newPoly[i + 1]);
                }
            }
        }
        newPoly = filledPoly;
        filledPoly = [];
    }
    const result = count(newPoly);
    let fixed = result[1].sort((a, b) => a - b)
    //console.log(fixed[0], fixed[fixed.length - 1]);
    return [fixed[fixed.length - 1], fixed[0], fixed[fixed.length - 1] - fixed[0]];
}

(() => {
    const begin = new Date();
    const output = part1();
    console.log("PART-1:", "Most and least occuring polymers and their subtraction after 10 steps", output)
    const end = new Date() - begin;
    console.info('Execution time: %dms', end);
})();