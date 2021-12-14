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

function part2() {
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
    }
    const set = new Set(points.map(p => `${p.x},${p.y}`));
    const setArray = [...set].map((x) => x.split(','));
    const xMax = Math.max(...setArray.map(x => x[0]))
    const yMax = Math.max(...setArray.map(x => x[1]))
    for (let j = 0; j <= yMax; j++) {
        let string = '';
        for (let i = 0; i <= xMax; i++) {
            const key = `${i},${j}`;
            if (set.has(key)) {
                string += '#';
            } else {
                string += '.';
            }
        }
        console.log(string)
    }

}

(() => {
    const begin = new Date();
    const output = part2();
    console.log("PART-2:", "Output word of the folded paper")
    const end = new Date() - begin;
    console.info('Execution time: %dms', end);
})();