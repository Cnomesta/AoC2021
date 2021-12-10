const fs = require("fs");

const chunks = fs
    .readFileSync('input.txt', {
        encoding: 'utf-8'
    })
    .replace(/\r/g, "")
    .trim()
    .split("\n")

function reverseStr(str) {
    var split = str.split("");
    var rever = split.reverse();
    var join = rever.join();
    return join;
}

function part2() {
    let score = 0;
    let scores = [];
    let middleScore = 0;
    for (let i = 0; i < chunks.length; i++) {
        let x = Boolean;
        let input = chunks[i];
        while (input.includes('()') || input.includes('[]') || input.includes('{}') || input.includes('<>')) {
            let fix1 = input.replace('()', '');
            let fix2 = fix1.replace('[]', '');
            let fix3 = fix2.replace('{}', '');
            let fix4 = fix3.replace('<>', '');
            input = fix4;
        }
        if (!input.includes(')') && !input.includes(']') && !input.includes('}') && !input.includes('>')) {
            console.log(i + 1, "Is incomplite", input);
            let slack = input.length
            let y = 0;
            let key = "";
            while (y < slack) {
                console.log(y, slack, input.charAt(y));
                if (input.charAt(y) === "(") {
                    key = key.replace(/^/, ')')
                    y++;
                } else if (input.charAt(y) === "[") {
                    key = key.replace(/^/, ']')
                    y++;
                } else if (input.charAt(y) === "{") {
                    key = key.replace(/^/, '}')
                    y++;
                } else if (input.charAt(y) === "<") {
                    key = key.replace(/^/, '>')
                    y++;
                }
                console.log(key);
            }
            k = 0;
            while (k < key.length) {
                if (key.charAt(0) === ")") {
                    key = key.substring(1);
                    score = (score * 5);
                    score += 1;
                } else if (key.charAt(0) === "]") {
                    key = key.substring(1);
                    score = (score * 5);
                    score += 2;
                } else if (key.charAt(0) === "}") {
                    key = key.substring(1);
                    score = (score * 5);
                    score += 3;
                } else if (key.charAt(0) === ">") {
                    key = key.substring(1);
                    score = (score * 5);
                    score += 4;
                }
            }
            scores.push(score);
            scores.sort((a, b) => a - b);
            middleScore = scores[Math.floor(scores.length / 2)];
            console.log(scores);
            score = 0;
        }
    }
    console.log("PART-2:", "Score of fixed incompleted lines:", scores);
    console.log("PART-2:", "Score of middle score:", middleScore);
}
part2();