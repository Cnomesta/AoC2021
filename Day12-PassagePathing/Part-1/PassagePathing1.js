const fs = require('fs');

const array = fs
    .readFileSync('input.txt')
    .toString()
    .split("\r\n")

function isLarge(cave) {
    return cave === cave.toUpperCase();
}

function findPaths(ends, start) {
    let paths = [];
    let link = start[start.length - 1];
    if (link == 'end') return [start];
    for (let i of ends[link]) {
        if (isLarge(i) || start.indexOf(i) == -1) {
            for (let path of findPaths(ends, [...start, i])) {
                paths.push(path);
            }
        }
    }
    return paths;
}

function part1() {
    let set = array;
    let ends = {}
    for (let i of set) {
        let [from, to] = i.split('-');
        ends[from] = ends[from] || [];
        ends[from].push(to);
        ends[to] = ends[to] || [];
        ends[to].push(from);
    }
    let paths = findPaths(ends, ['start']);
    return paths.length;
}

(() => {
    const begin = new Date();
    const output = part1();
    console.log("PART-1:", "Paths with only single stop in any small cave", output);
    const end = new Date() - begin;
    console.info('Execution time: %dms', end);
})();