const fs = require("fs");

const array = fs
    .readFileSync('input.txt', {
        encoding: 'utf-8'
    })
    .split(",")
    .map(Number);

function part1() {
    let pos = 0;
    let crab = 0;
    let crabfuel = 0;
    let leastFuel = 0;
    let currentFuel = 0;
    for (let i = 0; i <= array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            crab = array[j];
            pos = i;
            if (crab > pos) {
                crabfuel = crab - pos;
                currentFuel += crabfuel;
            } else {
                crabfuel = pos - crab;
                currentFuel += crabfuel;
            }
            //console.log(pos, crab, currentFuel);
        }
        if (leastFuel > currentFuel || leastFuel === 0) {
            leastFuel = currentFuel;
            console.log(leastFuel, currentFuel);
            currentFuel = 0;
        } else {
            console.log(leastFuel, currentFuel);
            currentFuel = 0;
        }
    }
}

part1();