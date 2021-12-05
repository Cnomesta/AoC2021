const fs = require("fs");

const array = fs
    .readFileSync('input.txt', {
        encoding: 'utf-8'
    })
    .replace(/\r/g, "")
    .split("\n")
    .filter(Boolean)
    .map((line) => {
        const [start, end] = line.split(" -> ").map((point) => {
            const [x, y] = point.split(",").map(Number);
            return {
                x,
                y
            };
        });
        return {
            start,
            end
        }
    });

function part1() {
    const filterdVents = array.filter((s) => s.start.x === s.end.x || s.start.y === s.end.y)
    const meme = new Map();
    let amount = 0;

    function addPos(key) {
        let cont = meme.get(key);
        if (!cont) {
            cont = 0;
        }
        cont++;
        if (cont === 2) {
            amount++;
        }
        meme.set(key, cont);
    }
    for (const vent of filterdVents) {
        const isHoz = vent.start.y === vent.end.y;
        let currentPos = {
            x: vent.start.x,
            y: vent.start.y
        };
        while (currentPos.x !== vent.end.x || currentPos.y !== vent.end.y) {
            addPos([currentPos.x, currentPos.y].join(','));

            if (isHoz) {
                currentPos.x += currentPos.x < vent.end.x ? 1 : -1;
            } else {
                currentPos.y += currentPos.y < vent.end.y ? 1 : -1;
            }
        }
        addPos([currentPos.x, currentPos.y].join(','));

    }
    console.log(amount);
}

part1();