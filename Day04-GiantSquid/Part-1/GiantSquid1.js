const fs = require('fs');

const array = fs
    .readFileSync("input.txt", {
        encoding: "utf-8"
    })
    .replace(/\r/g, "")
    .split("\n\n")
    .filter((x) => Boolean(x))
    .map((x) =>
        x
        .replace(/[\n ,]+/g, " ")
        .trim()
        .split(" ")
        .map((y) => parseInt(y))
    );

let [keys, ...boards] = array;

class Board {
    constructor(numbers) {
        this.cardSize = 5;
        this.numbers = numbers;
        this.numToPos = new Map();
        for (let i = 0; i < this.numbers.length; i++) {
            const n = this.numbers[i];
            this.numToPos.set(n, {
                line: Math.floor(i / this.cardSize),
                column: i % this.cardSize,
            })

        }
        this.lines = Array(this.cardSize).fill(0);
        this.columns = Array(this.cardSize).fill(0);
        this.isComplete = false;
    }

    addKey(number) {
        const pos = this.numToPos.get(number);
        if (!pos) {
            return;
        }
        this.lines[pos.line]++;
        this.columns[pos.column]
        if (this.lines[pos.line] === this.cardSize || this.columns[pos.column] === this.cardSize) {
            this.isComplete = true;
        }
    }
}
boards = boards.map(x => new Board(x));

let winningBoard;
const drawnKeys = [];
for (const key of keys) {
    let finished = false;
    drawnKeys.push(key);
    for (const board of boards) {
        board.addKey(key);
        if (board.isComplete) {
            finished = true;
            winningBoard = board
            break;
        }
    }
    if (finished) {
        break;
    }
}

const unUsedKeys = winningBoard.numbers.filter(n => !drawnKeys.includes(n));

console.log(unUsedKeys.reduce((a, b) => a + b, 0) * drawnKeys.slice(-1));