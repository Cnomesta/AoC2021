const fs = require('fs');

const readFileLines = () =>
    fs
    .readFileSync('input.txt')
    .toString('UTF8')
    .split('\n');

var input = readFileLines();

function part1(pair) {
    pair = eval(pair)
    const [a, b] = pair.map((n) => (Array.isArray(n) ? part1(n) : n));
    return 3 * a + 2 * b;
}

function getDepth(line, index) {
    let depth = 0;
    for (let i = 0; i < index; i++) {
        if (line[i] === '[') depth++;
        else if (line[i] === ']') depth--;
    }
    return depth;
}

function sum(a1, a2) {
    var num = `[${a1},${a2}]`
    return reduce(num)
}

function split(line, index, length) {
    var num = line.substr(index, length);
    var l = line.substr(0, index);
    var r = line.substr(index + length);
    return `${l}[${Math.floor(num/2)},${Math.ceil(num/2)}]${r}`;
}

function explode(num, index) {
    let end = index + num.slice(index).indexOf(']');
    let [left, right] = num.slice(index + 1, end).split(",");
    let [strL, strR] = [num.slice(0, index), num.slice(end + 1)];
    let t = [...strL.matchAll(/\d+/g)],
        digit = "",
        idx = -1;
    if (t.length > 0) {
        digit = t[t.length - 1][0]
        idx = strL.lastIndexOf(digit)
        strL = strL.slice(0, idx) + ((+digit) + (+left)) + strL.slice(idx + digit.length)
    }
    t = strR.match(/\d+/), digit = "", idx = -1;
    if (t) {
        digit = t[0]
        idx = strR.indexOf(digit)
        strR = strR.slice(0, idx) + ((+digit) + (+right)) + strR.slice(idx + digit.length)
    }
    return strL + 0 + strR
}

function getExplodeIndex(num) {
    let n = 0;
    for (let i = 0; i < num.length; i++) {
        if (getDepth(num, i) == 5) return i - 1;
    }
    return -1
}

function getSplitIndex(sNum) {
    let t = sNum.match(/\d{2,}/),
        splNum = "",
        index = -1;
    if (t) {
        splNum = t[0]
        index = sNum.indexOf(splNum)
    }
    return {
        splNum,
        index
    }
}

function reduce(num) {
    let {
        splNum,
        index
    } = getSplitIndex(num)
    let explosionIndex = getExplodeIndex(num)
    while (index > -1 || explosionIndex > -1) {
        while (explosionIndex > -1) {
            num = explode(num, explosionIndex)
            explosionIndex = getExplodeIndex(num)
        }
        ({
            splNum,
            index
        } = getSplitIndex(num))
        if (index > -1) {
            num = split(num, index, splNum.length)
        }
        explosionIndex = getExplodeIndex(num)
    }
    return num
}

var summed = undefined;
input.forEach((e) => {
    if (!summed) summed = e;
    else summed = sum(summed, e);
});

(() => {
    const begin = new Date();
    const output = part1(summed);
    console.log("PART-1:", "Magnitude of final sum", output);
    const end = new Date() - begin;
    console.info('Execution time: %dms', end);
})();