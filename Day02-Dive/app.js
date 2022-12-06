require('../util/time')
require('../util/fsPull')

const array = singleDepth('input.txt').map((x) => {
  const [dir, n] = x.split(" ");
  return { dir, n: parseInt(n) }
});

function part1() {
  let sub = { pos: 0, depth: 0 };
  for (const line of array) {
    switch (line.dir) {
      case "forward": sub.pos += line.n; break;
      case "down": sub.depth += line.n; break;
      case "up": sub.depth -= line.n; break;
    }
  }
  let truePos = sub.pos * sub.depth;
  return truePos;
}

function part2() {
  let sub = { pos: 0, depth: 0, aim: 0 };
  let truePos = 0;
  for (const line of array) {
    switch (line.dir) {
      case "forward": sub.pos += line.n; sub.depth += sub.aim * line.n; break;
      case "down": sub.aim += line.n; break;
      case "up": sub.aim -= line.n; break;
    }
  }
  truePos = sub.pos * sub.depth;
  return truePos;
}

timeScript(part1(), 1)
timeScript(part2(), 2)