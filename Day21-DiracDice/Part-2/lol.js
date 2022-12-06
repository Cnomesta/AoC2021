const input = `Player 1 starting position: 2
Player 2 starting position: 5`;

let [p1, p2] = input.split("\n");
let [, p1pos] = p1.split(": ");
p1pos = eval(p1pos) - 1;
let [, p2pos] = p2.split(": ");
p2pos = eval(p2pos) - 1;

const rollCountsByResult = {
    3: 1,
    4: 3,
    5: 6,
    6: 7,
    7: 6,
    8: 3,
    9: 1,
};

const cache = {};

function countWins({
    p1pos,
    p2pos,
    p1score,
    p2score,
    p1turn,
    rollSum
}) {
    if (p1turn) {
        p1pos += rollSum;
        p1pos %= 10;
        p1score += p1pos + 1;
        p1turn = !p1turn;
    } else {
        p2pos += rollSum;
        p2pos %= 10;
        p2score += p2pos + 1;
        p1turn = !p1turn;
    }
    if (p1score >= 21) {
        return {
            p1wins: 1,
            p2wins: 0,
        };
    }
    if (p2score >= 21) {
        return {
            p1wins: 0,
            p2wins: 1,
        };
    }
    return forkUniverse({
        p1pos,
        p2pos,
        p1score,
        p2score,
        p1turn
    });
}

function forkUniverse({
    p1pos,
    p2pos,
    p1score,
    p2score,
    p1turn
}) {
    const key = [p1pos, p2pos, p1score, p2score, p1turn].join(",");
    if (cache[key]) {
        return cache[key];
    }
    const wins = {
        p1wins: 0,
        p2wins: 0,
    };
    for (let rollSum in rollCountsByResult) {
        rollSum = eval(rollSum);
        const w = countWins({
            p1pos,
            p2pos,
            p1score,
            p2score,
            p1turn,
            rollSum,
        });
        wins.p1wins += w.p1wins * rollCountsByResult[rollSum];
        wins.p2wins += w.p2wins * rollCountsByResult[rollSum];
    }
    cache[key] = wins;
    return wins;
}

console.log(
    forkUniverse({
        p1pos,
        p2pos,
        p1score: 0,
        p2score: 0,
        p1turn: true
    })
);