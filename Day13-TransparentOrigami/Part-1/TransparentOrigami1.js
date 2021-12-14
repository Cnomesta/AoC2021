const fs = require("fs");

const [input1, input2] = fs
    .readFileSync('input.txt', {
        encoding: 'utf-8'
    })
    .trim()
    .replace(/\r/g, "")
    .split("\n\n");

const cords = input1
    .trim()
    .split('\n')
    .map((x) => {
        const p =
            x
            .split(',')
            .map(Number)
        return {
            x: p[0],
            y: p[1]
        };
    });
const foldPoints = input2
    .split('\n')
    .map((x) =>
        x
        .match(/fold along (?<axis>[xy])=(?<position>\d+)/)
        .groups).map((x) => ({
        axis: x.axis,
        position: Number(x.position)
    }));

function part1() {
    let points = [...cords.map((x) => ({
        ...x
    }))];
    let nextPoint = [];
    for (const fold of foldPoints) {
        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            if (point[fold.axis] > fold.position) {
                point[fold.axis] = (point[fold.axis] - fold.position) * -1 + fold.position;
            }
            nextPoint.push(point);
        }
        break;
    }
    const set = new Set(points.map(p => `${p.x},${p.y}`))
    return set.size;
}

(() => {
    const begin = new Date();
    const output = part1();
    console.log("PART-1:", "Out put info", output)
    const end = new Date() - begin;
    console.info('Execution time: %dms', end);
})();