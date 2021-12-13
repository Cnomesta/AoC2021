const fs = require('fs');

const array = fs
    .readFileSync('input.txt')
    .toString()
    .split("\r\n")

function isLarge(cave) {
    return cave === cave.toUpperCase();
}

function visits(count, pos) {

    if (isLarge(pos)) return true;
    if ((count[pos] || 0) == 0) return true;
    for (let i in count) {
        if (!isLarge(i) && count[i] > 1) return false;
    }
    return true;
}

function getPaths(ends, pre, get = {}) {
    let count = 0;
    let link = pre[pre.length - 1];
    if (link == 'end') {
        return 1;
    }
    for (let i of ends[link]) {
        if (i == 'start') continue;
        if (visits(get, i)) {
            get[i] = (get[i] || 0) + 1;
            pre.push(i);
            count += getPaths(ends, pre, get);
            pre.pop();
            get[i] = (get[i] || 0) - 1;
        }
    }
    return count;
}

function part2() {
    let set = array;
    let ends = {}
    for (let i of set) {
        let [from, to] = i.split('-');
        ends[from] = ends[from] || [];
        ends[from].push(to);
        ends[to] = ends[to] || [];
        ends[to].push(from);
    }
    for (let i in ends) {
        ends[i].sort();
    }
    let count = getPaths(ends, ['start']);
    return count;
}

(() => {
    const begin = new Date();
    const output = part2();
    console.log("PART-2:", "Paths with only one stop in any small cave exept one", output);
    const end = new Date() - begin;
    console.info('Execution time: %dms', end);
})();