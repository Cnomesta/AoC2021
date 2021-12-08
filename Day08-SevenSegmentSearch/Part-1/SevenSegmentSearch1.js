const fs = require("fs")

const array = fs
    .readFileSync('input.txt', {
        encoding: 'utf-8'
    })
    .replace(/\r/g, "")
    .split("\n")
    .filter(Boolean)
    .map((x) =>
        x
        .trim()
        .split('|')
        .map((y) =>
            y
            .trim()
            .split("  ")
        )
    );

//console.log(array[1][1]);

function part1() {
    let output = 0;
    for (let i = 0; i < array.length; i++) {
        let iSeg = array[i][0];
        let oSeg = array[i][1];
        console.log(iSeg, oSeg);
        for (let k = 0; k < 4; k++) {
            const count = oSeg.toString().split(" ");
            const trueCount = count[k]
            if (trueCount.length === 2 | trueCount.length === 3 | trueCount.length === 4 | trueCount.length === 7) {
                output++;
                console.log(trueCount, trueCount.length, output);
            }
        }
    }
    console.log(output);
}

part1();