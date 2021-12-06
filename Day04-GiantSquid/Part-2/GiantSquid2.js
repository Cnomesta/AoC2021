const fs = require("fs");

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
        this.numberToPosition = new Map();
        for (let i = 0; i < this.numbers.length; i++) {
            const n = this.numbers[i];
            this.numberToPosition.set(n, {
                line: Math.floor(i / this.cardSize),
                column: i % this.cardSize,
            });
        }
        this.lines = Array(this.cardSize).fill(0);
        this.columns = Array(this.cardSize).fill(0);
        this.isComplete = false;
        this.usedKeys = new Set();
    }

    addKeys(number) {
        const position = this.numberToPosition.get(number);
        if (!position) {
            return;
        }
        this.usedKeys.add(number);
        this.lines[position.line]++;
        this.columns[position.column]++;
        if (
            this.lines[position.line] === this.cardSize ||
            this.columns[position.column] === this.cardSize
        ) {
            this.isComplete = true;
        }
    }

    unUsedKeys() {
        return this.numbers.filter((n) => !this.usedKeys.has(n));
    }
}

function part1(_boards) {
    let boards = _boards.map((x) => new Board(x));

    let winningBoard;
    let winningNumber;
    const drawnKeys = [];
    for (const key of keys) {
        let finished = false;
        drawnKeys.push(key);
        for (const board of boards) {
            board.addKeys(key);
            if (board.isComplete) {
                finished = true;
                winningBoard = board;
                winningNumber = key;
                break;
            }
        }
        if (finished) {
            break;
        }
    }

    const unUsedKeys = winningBoard.unUsedKeys();

    console.log(unUsedKeys.reduce((a, b) => a + b, 0), winningNumber);
    console.log(unUsedKeys.reduce((a, b) => a + b, 0) * winningNumber);
}

part1(boards);

function part2(_boards) {
    let boards = _boards.map((x) => new Board(x));

    let lastWinningBoard;
    let lastWinningNumber;
    const drawnKeys = [];
    for (const key of keys) {
        drawnKeys.push(key);
        let hasIncompleteCards = false;
        for (const board of boards) {
            if (!board.isComplete) {
                hasIncompleteCards = true;
                board.addKeys(key);
                if (board.isComplete) {
                    lastWinningBoard = board;
                    lastWinningNumber = key;
                }
            }
        }
        if (!hasIncompleteCards) {
            break;
        }
    }

    const unUsedKeys = lastWinningBoard.unUsedKeys();

    console.log(unUsedKeys.reduce((a, b) => a + b, 0), lastWinningNumber);
    console.log(unUsedKeys.reduce((a, b) => a + b, 0) * lastWinningNumber);
}

part2(boards);