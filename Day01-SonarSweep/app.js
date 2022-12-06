require('../util/time')
require('../util/fsPull')

const array = singleDepth('input.txt').map((x) => parseInt(x));

function part1() {
    let output = 0
    for (let i = 0; i < array.length; i++) {
        let curr = array[i]
        let comp = array[i + 1]
        if (curr < comp) { output++; }
    }
    return output;
}

function part2() {
    let output = 0
    for (let i = 0; i < array.length; i++) {
        let curr = array[i] + array[i + 1] + array[i + 2]
        let next = array[i + 1] + array[i + 2] + array[i + 3]
        if (curr < next) { output++; }
    }
    return output;
}

timeScript(part1(), 1)
timeScript(part2(), 2)