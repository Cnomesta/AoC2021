const fs = require("fs");

const input = fs
    .readFileSync('input.txt', {
        encoding: 'utf-8'
    })
    .replace(/\r/g, "")
    .trim()
    .split("\n")

let map = [],
    column = input[0].length,
    rows = input.length;

input.map((line, i) => map[i] = line.split('').map(n => parseInt(n)));

const adjacent = (x, y, rest = []) => {
    if (x > 0) rest.push({
        x: x - 1,
        y: y
    });
    if (y > 0) rest.push({
        x: x,
        y: y - 1
    });
    if (x < column - 1) rest.push({
        x: x + 1,
        y: y
    });
    if (y < rows - 1) rest.push({
        x: x,
        y: y + 1
    });
    return rest;
}

const part1 = (lowest = []) => {
    for (let y = 0; y < rows; y++)
        for (let x = 0; x < column; x++)
            if (Math.min(...adjacent(x, y).map(p => map[p.y][p.x])) > map[y][x]) lowest.push({
                x: x,
                y: y
            })

    console.log("PART-1:", "Lowest point risk:", lowest.reduce((acc, p) => acc + map[p.y][p.x] + 1, 0));
    return lowest;
}

const part2 = lowest => {
    const spread = (x, y) => {
        if (map[y][x] < 9) basin++;
        else return;
        map[y][x] = 9;
        adjacent(x, y).map(p => spread(p.x, p.y));
    }

    let basins = [],
        basin = 0;
    lowest.map(p => {
        basin = 0;
        spread(p.x, p.y);
        basins.push(basin);
    })

    return basins.sort((a, b) => b - a).slice(0, 3).reduce((acc, n) => acc * n, 1);
}

console.log("PART-2:", "Multiplied size of three largest basins:", part2(part1()));