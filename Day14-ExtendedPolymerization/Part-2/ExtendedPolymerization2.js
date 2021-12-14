const fs = require("fs");

const input = fs
    .readFileSync('input.txt', {
        encoding: 'utf-8'
    })
    .trimEnd()
    .replace(/\r/g, "")

function part2(input, steps) {
    let [template, rules] = input.split('\n\n');
    const nextPairs = rules.split('\n').reduce((acc, rule) => {
        const [left, right] = rule.split(' -> ');
        acc[left] = [left[0] + right, right + left[1]];
        return acc;
    }, {});
    let pairCount = {};
    for (let i = 0; i < template.length - 1; i++) {
        const pair = template.slice(i, i + 2);
        pairCount[pair] = (pairCount[pair] ?? 0) + 1;

    }
    for (let step = 0; step < steps; step++) {
        const nextPairCount = {};
        for (const pair in pairCount) {
            console.log(pair);
            for (const nextPair of nextPairs[pair]) {
                nextPairCount[nextPair] = 
                (nextPairCount[nextPair] ?? 0)+pairCount[pair];
            }
        }
        pairCount = nextPairCount;
    }
    const polyCount = {
        [template[0]]: 1,
    }
    for (const pair in pairCount) {
        polyCount[pair[1]] = (polyCount[pair[1]] ?? 0) + pairCount[pair];
    }
    const polyCountVal = Object.values(polyCount);
    return [Math.max(...polyCountVal) - Math.min(...polyCountVal)]
}


(() => {
    const begin = new Date();
    const output = part2(input, 40);
    console.log("PART-2:", "Most and least occuring polymers and their subtraction after 40 steps", output)
    const end = new Date() - begin;
    console.info('Execution time: %dms', end);
})();