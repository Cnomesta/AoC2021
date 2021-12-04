const fs = require('fs');

const array = fs 
    .readFileSync("input.txt", { encoding: "utf-8" })
    .split("\n")
    .filter((x) => Boolean(x));

const length = array[0].length;

const zero = Array(length).fill(0);
const one = Array(length).fill(0);

for (const set of array) {
    const bits = [... set];
    bits.forEach((bit, index) => {
        if (bit === "0") {
            zero[index]++;
        } else {
            one[index]++;
        }
    });
}

let gr = "";
for (let i = 0; i < length - 1; i++) {
    let bit = 0;
    if (one[i] > zero[i]) {
        bit = 1;
    }
    gr += bit;
    
}

let er = "";
for (let i = 0; i < length - 1; i++) {
    let bit = 0;
    if (zero[i] > one[i]) {
        bit = 1;
    }
    er += bit;
    
}

console.log(parseInt(gr, 2) * parseInt(er, 2));