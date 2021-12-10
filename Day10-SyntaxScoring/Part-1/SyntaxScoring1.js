const fs = require("fs");

const chunks = fs
    .readFileSync('input.txt', {
        encoding: 'utf-8'
    })
    .replace(/\r/g, "")
    .trim()
    .split("\n")

function part1() {
    let score = 0;
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
            console.log(i + 1, "Is incomplite");
        } else {
            while (input.charAt(0) === "(" || input.charAt(0) === "[" || input.charAt(0) === "{" || input.charAt(0) === "<") {
                input = input.substring(1);
            }
        }
        if (input.charAt(0) === ")") {
            console.log(i + 1, "Illegal character", input.charAt(0));
            score += 3;
        } else {
            x = true;
        }
        if (input.charAt(0) === "]") {
            console.log(i + 1, "Illegal character", input.charAt(0));
            score += 57;
        } else {
            x = true;
        }
        if (input.charAt(0) === "}") {
            console.log(i + 1, "Illegal character", input.charAt(0));
            score += 1197;
        } else {
            x = true;
        }
        if (input.charAt(0) === ">") {
            console.log(i + 1, "Illegal character", input.charAt(0));
            score += 25137;
        } else {
            x = true;
        }
    }
    console.log("PART-1:", "Score of illegal lines:", score);
}
part1();