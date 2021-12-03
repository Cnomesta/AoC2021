const fs = require('fs');

const array = fs 
    .readFileSync("input.txt", { encoding: "utf-8" })
    .split("\n")
    .filter((x) => Boolean(x))
    .map((x) => {
        const [dir, n] = x.split(" ");
        return {
            dir,
            n: parseInt(n)
        }
    });


let sub = {
    pos: 0,
    depth: 0
};

for (const line of array) {
    switch (line.dir) {
        case "forward":
            sub.pos += line.n;
            break;
        case "down":
            sub.depth += line.n;
            break;
        case "up":
            sub.depth -= line.n;
            break;
    }
}

let truePos = sub.pos * sub.depth;
console.log(truePos);

sub = {
    pos: 0,
    depth: 0,
    aim: 0
};

for (const line of array) {
    switch (line.dir) {
        case "forward":
            sub.pos += line.n;
            sub.depth += sub.aim * line.n
            break;
        case "down":
            sub.aim += line.n;
            break;
        case "up":
            sub.aim -= line.n;
            break;
    }
}
truePos = sub.pos * sub.depth;
console.log(truePos);