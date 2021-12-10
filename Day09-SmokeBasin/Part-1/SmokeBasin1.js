const fs = require("fs");

const tunnel = fs
    .readFileSync('input.txt', {
        encoding: 'utf-8'
    })
    .replace(/\r/g, "")
    .trim()
    .split("\n")


console.log(tunnel);

function part1() {
    let risk = 0;
    for (let i = 0; i < tunnel.length; i++) {
        let width = tunnel[i].length;
        let row = tunnel[i]
        let [adju3r, adju4r] = [tunnel[i - 1], tunnel[i + 1]]
        for (let j = 0; j < width; j++) {
            if (adju3r === undefined) {
                adju3r = "";
            }
            if (adju4r === undefined) {
                adju4r = "";
            }
            trg = row[j];
            adju1 = row[j - 1];
            adju2 = row[j + 1];
            if (adju1 === undefined) {
                adju1 = 99;
            }
            if (adju2 === undefined) {
                adju2 = 99;
            }
            adju3 = adju3r[j];
            adju4 = adju4r[j];
            if (adju3 === undefined) {
                adju3 = 99;
            }
            if (adju4 === undefined) {
                adju4 = 99;
            }
            if (adju1 > trg && adju2 > trg && adju3 > trg && adju4 > trg) {
                trg++;
                risk = risk + trg;
            }
        }
    }
    console.log("PART-1:", "Lowest point risk:", risk);
}

part1();